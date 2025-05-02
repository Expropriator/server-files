using GTANetworkAPI;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Golemo.GUI;
using Golemo.MoneySystem;
using GolemoSDK;
using System.Threading;
using Golemo.Houses;
using Golemo.Core;
using static Golemo.Core.VehicleManager;
using Golemo;

namespace Golemo.Houses

{
    class ParkManager : Script
    {
        private static nLog Log = new nLog("Parking");
        private static Random rnd = new Random();
        private static List<ParkFine> _parkFines = new List<ParkFine>();

        [ServerEvent(Event.ResourceStart)]
        public void onResourceStart()
        {
            try
            {
                var result = MySQL.QueryRead($"SELECT * FROM `parkfines`");
                if (result == null || result.Rows.Count == 0)
                {
                    Log.Write("DB parkfines return null result.", nLog.Type.Warn);
                    return;
                }
                foreach (DataRow Row in result.Rows)
                {
                    ParkFine employment = new ParkFine(
                        Convert.ToInt32(Row["id"]),
                        Convert.ToInt32(Row["price"]),
                        Convert.ToSingle(Row["heading"]),
                        JsonConvert.DeserializeObject<Vector3>(Row["position"].ToString()),
                        JsonConvert.DeserializeObject<List<Vector3>>(Row["spawnpositions"].ToString()),
                        JsonConvert.DeserializeObject<List<Vector3>>(Row["spawnrotations"].ToString())
                        );
                    _parkFines.Add(employment);
                }
            }
            catch (Exception e)
            {
                Log.Write("EXCEPTION AT \"PARKMAMAGER\":\n" + e.ToString(), nLog.Type.Error);
            }
        }

        [ServerEvent(Event.PlayerEnterVehicle)]
        public void Event_OnPlayerEnterVehicle(Player player, Vehicle vehicle, sbyte seatid)
        {
            try
            {
                if (!vehicle.GetData<bool>("PARKING") || !vehicle.HasData("PARKING"))
                {
                    return;
                }
                vehicle.ResetData("PARKING");
                Trigger.ClientEvent(player, "deleteWorkBlip");
                Trigger.ClientEvent(player, "deleteCheckpoint", 900);
            }
            catch (Exception e) { Log.Write("PlayerEnterParkingVehicle: " + e.Message, nLog.Type.Error); }
        }

        [RemoteEvent("takerentparking")]
        public static void BuyParkPlace(Player player, string name, string number)
        {
            if (!Main.Players.ContainsKey(player)) return;
            if (!player.HasData("PARKFINE"))
            {
                Notify.Alert(player, "Вы должны находится рядом с парковщиком", 4500);
                return;
            }
            ParkFine park = _parkFines.Find(x => x.ID == player.GetData<int>("PARKFINE"));
            if (park == null)
            {
                Notify.Error(player, "Непредвиденная ошибка", 5000);
                return;
            }
            int costcar = park.Price;
            if (Main.Players[player].Money < costcar)
            {
                Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, $"Недостаточно средств, вам нужно: ${costcar}", 3000);
                return;
            }
            if (number == "" || number == null)
            {
                Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, $"У вас нет машины", 3000);
                return;
            }
            foreach (var v in NAPI.Pools.GetAllVehicles())
            {
                if (v.HasData("ACCESS") && v.GetData<string>("ACCESS") == "PERSONAL" && NAPI.Vehicle.GetVehicleNumberPlate(v) == number)
                {
                    Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, $"Машина уже вызвана", 3000);
                    return;
                }
            }
            MoneySystem.Wallet.Change(player, -costcar);
            SetCarInFreeParkPlace(player, name, number);
        }

        public static string FindFirstCarNum(Player player)
        {
            try
            {
                var targetVehicles = VehicleManager.getAllPlayerVehicles(player.Name);
                return targetVehicles.FirstOrDefault(); // Возвращает первый элемент или null
            }
            catch (Exception e)
            {
                Log.Write(e.Message, nLog.Type.Error);
                return null;
            }
        }
        public static void interactionPressed(Player player)
        {
            try
            { 
                    List<object> items = new List<object>();
                    foreach (var veh in VehicleManager.getAllPlayerVehicles(player.Name))
                    {
                        List<object> item = new List<object>
                    {
                        VehicleHandlers.VehiclesName.GetRealVehicleName(VehicleManager.Vehicles[veh].Model), veh
                    };
                        items.Add(item);
                    }
                    string json = JsonConvert.SerializeObject(items);
                    Trigger.ClientEvent(player, "open_ParkingMenu", json, player.GetData<int>("PARKFINE"));
                }
            catch (Exception e)
            {
                Log.Write("EXCEPTION AT \"PARK_INTERACTION\":\n" + e.ToString(), nLog.Type.Error);
            }
        }
        public static void SetCarInFreeParkPlace(Player player, string name, string number)
        {
            if (!player.HasData("PARKFINE"))
            {
                Notify.Alert(player, "Вы должны находится рядом с парковщиком", 4500);
                return;
            }
            ParkFine park = _parkFines.Find(x => x.ID == player.GetData<int>("PARKFINE"));
            if(park == null)
            {
                Notify.Error(player, "Непредвиденная ошибка", 5000);
                return;
            }
            park.SpawnPlayerVehicle(player, name, number);
        }

        internal class ParkFine
        {
            public int ID { get; }
            public int Price { get; }
            public float Heading { get; }
            public Vector3 Position { get; }

            [JsonIgnore]
            private Blip blip;
            [JsonIgnore]
            private ColShape shape;
            [JsonIgnore]
            private TextLabel label;
            [JsonIgnore]
            private Ped ped;

            private List<Vector3> _spawnPositions = new List<Vector3>();
            private List<Vector3> _spawnRotations = new List<Vector3>();

            private int _lastSpawnIndex = 0;

            public ParkFine(int id, int price, float heading, Vector3 position,  List<Vector3> spawnPositions, List<Vector3> spawnRotations)
            {
                ID = id;
                Price = price;
                Heading = heading;
                Position = position;
                _spawnPositions = spawnPositions;
                _spawnRotations = spawnRotations;

                label = NAPI.TextLabel.CreateTextLabel($"~y~NPC ~w~Парковщик ~n~ ~w~Парковка #{id}", Position, 5f, size: 1f, 0, new Color(255, 255, 255, 180), false, 0);
                shape = NAPI.ColShape.CreateCylinderColShape(Position - new Vector3(0, 0, 1f), 2f, 2f, 0);
                ped = NAPI.Ped.CreatePed(0x5719786D, Position, heading, false, true, true, true, 0);
                blip = NAPI.Blip.CreateBlip(267, Position, 0.9f, 1, "Парковка", 255, 0, true, 0, dimension: 0);

                shape.OnEntityEnterColShape += (s, entity) =>
                {
                    try
                    {
                        entity.SetData("INTERACTIONCHECK", 556);
                        entity.SetData("PARKFINE", id);
                    }
                    catch (Exception e) { Console.WriteLine("shape.OnEntityEnterColshape: " + e.Message); }
                };
                shape.OnEntityExitColShape += (s, entity) =>
                {
                    try
                    {
                        entity.SetData("INTERACTIONCHECK", 0);
                    }
                    catch (Exception e) { Console.WriteLine("shape.OnEntityEnterColshape: " + e.Message); }
                };

                InitSpawnPositions();
            }

            public void InitSpawnPositions()
            {
                if (_spawnPositions == null) return;
                for (int i = 0; i < _spawnPositions.Count; i++)
                {
                    //NAPI.TextLabel.CreateTextLabel($"Парковочное место #{i + 1}", _spawnPositions[i], 10f, 3f, 0, new Color(255, 255, 255), false, 0);
                }
            }
            internal void SpawnPlayerVehicle(Player player, string name, string number)
            {
                if (!Main.Players.ContainsKey(player))
                {
                    Log.Write($"Несуществуешийся игрок попытался вызвать машину на парковке {ID} с номером {number}", nLog.Type.Error);
                    return;
                }
                if(!Vehicles.ContainsKey(number))
                {
                    Log.Write($"Игрок {Main.Players[player].UUID} попытался вызвать несуществующееся авто {number}", nLog.Type.Error);
                    return;
                }
                var vehdata = VehicleManager.Vehicles[number];
                int spawnIndex = GetSpawnIndex();
                if (!Enum.TryParse(vehdata.Model, true, out VehicleHash modelHash))
                {
                    Log.Write($"Ошибка: Не удалось найти модель {vehdata.Model}", nLog.Type.Error);
                    return;
                }
                var veh = NAPI.Vehicle.CreateVehicle(modelHash, _spawnPositions[spawnIndex], _spawnRotations[spawnIndex], 0, 0);
                NAPI.Entity.SetEntityRotation(veh, _spawnRotations[spawnIndex]);

                
                VehicleStreaming.SetEngineState(veh, false);
                VehicleStreaming.SetLockStatus(veh, true);
                vehdata.Holder = player.Name;
                veh.SetData("ACCESS", "PERSONAL");
                //veh.SetData("PARKING", player);
                veh.SetData("PARKING", true);
                veh.SetData("ITEMS", vehdata.Items);
                veh.SetData("OWNER", player);
                Trigger.ClientEvent(player, "createWorkBlip", _spawnPositions[spawnIndex]);
                Trigger.ClientEvent(player, "createCheckpoint", 900, 0, new Vector3(_spawnPositions[spawnIndex].X, _spawnPositions[spawnIndex].Y, _spawnPositions[spawnIndex].Z + 0.4f), 0.8f, 0, 255, 0, 0);
                veh.SetSharedData("PETROL", vehdata.Fuel);
                NAPI.Vehicle.SetVehicleNumberPlate(veh, number);
                Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Вы вызвали {name} парковочное место: №{spawnIndex + 1}", 3000);
                VehicleManager.ApplyCustomization(veh);
            }

            private int GetSpawnIndex()
            {
                if (_lastSpawnIndex >= _spawnPositions.Count) _lastSpawnIndex = 0;
                return _lastSpawnIndex++;
            }
        }

        public static void OpenMenu(Player player)
        {
            Menu menu = new Menu("parkcars", false, false);
            menu.Callback = callback_cars;

            Menu.Item menuItem = new Menu.Item("header", Menu.MenuItem.Header);
            menuItem.Text = "Машина[Парковка]";
            menu.Add(menuItem);

            foreach (var v in VehicleManager.getAllPlayerVehicles(player.Name))
            {
                menuItem = new Menu.Item(v, Menu.MenuItem.Button);
                menuItem.Text = $"{VehicleHandlers.VehiclesName.GetRealVehicleName(VehicleManager.Vehicles[v].Model)} - {v}";
                menu.Add(menuItem);
            }   

            menuItem = new Menu.Item("back", Menu.MenuItem.Button);
            menuItem.Text = "Назад";
            menu.Add(menuItem);

            menu.Open(player);
        }

        private static void callback_cars(Player player, Menu menu, Menu.Item item, string eventName, dynamic data)
        {
            NAPI.Task.Run(() =>
            {
                try
                {
                    if (item.ID == "back")
                    {
                        Main.OpenPlayerMenu(player).Wait();
                    }
                    else
                    {
                        OpenSelectedCarMenu(player, item.ID);
                    }
                }
                catch (Exception e) { Log.Write("callback_cars: " + e.Message + e.Message, nLog.Type.Error); }
            });
        }

        public static void OpenSelectedCarMenu(Player player, string number)
        {
            Menu menu = new Menu("selectedcar", false, false);
            menu.Callback = callback_selectedcar;

            var vData = VehicleManager.Vehicles[number];

            Menu.Item menuItem = new Menu.Item("header", Menu.MenuItem.Header);
            menuItem.Text = number;
            menu.Add(menuItem);

            menuItem = new Menu.Item("model", Menu.MenuItem.Card);
            menuItem.Text = VehicleHandlers.VehiclesName.GetRealVehicleName(vData.Model);
            menu.Add(menuItem);

            var vClass = NAPI.Vehicle.GetVehicleClass(NAPI.Util.VehicleNameToModel(vData.Model));

            menuItem = new Menu.Item("repair", Menu.MenuItem.Button);
            menuItem.Text = $"Восстановить {VehicleManager.VehicleRepairPrice[vClass]}$";
            menu.Add(menuItem);

            menuItem = new Menu.Item("key", Menu.MenuItem.Button);
            menuItem.Text = $"Получить дубликат ключа";
            menu.Add(menuItem);

            menuItem = new Menu.Item("changekey", Menu.MenuItem.Button);
            menuItem.Text = $"Сменить замки";
            menu.Add(menuItem);

            menuItem = new Menu.Item("callcar", Menu.MenuItem.Button);
            menuItem.Text = $"Доставить к себе";
            menu.Add(menuItem);

            menuItem = new Menu.Item("evac", Menu.MenuItem.Button);
            menuItem.Text = $"Эвакуировать машину111";
            menu.Add(menuItem);


            int price = 0;
            if (BusinessManager.ProductsOrderPrice.ContainsKey(vData.Model))
            {
                switch (Main.Accounts[player].VipLvl)
                {
                    case 0: // None
                        price = Convert.ToInt32(BusinessManager.ProductsOrderPrice[vData.Model] * 0.5);
                        break;
                    case 1: // Bronze
                        price = Convert.ToInt32(BusinessManager.ProductsOrderPrice[vData.Model] * 0.6);
                        break;
                    case 2: // Silver
                        price = Convert.ToInt32(BusinessManager.ProductsOrderPrice[vData.Model] * 0.7);
                        break;
                    case 3: // Gold
                        price = Convert.ToInt32(BusinessManager.ProductsOrderPrice[vData.Model] * 0.8);
                        break;
                    case 4: // Platinum
                        price = Convert.ToInt32(BusinessManager.ProductsOrderPrice[vData.Model] * 0.9);
                        break;
                    default:
                        price = Convert.ToInt32(BusinessManager.ProductsOrderPrice[vData.Model] * 0.5);
                        break;
                }
            }

            menuItem = new Menu.Item("back", Menu.MenuItem.Button);
            menuItem.Text = "Назад";
            menu.Add(menuItem);

            menuItem = new Menu.Item("close", Menu.MenuItem.Button);
            menuItem.Text = "Закрыть";
            menu.Add(menuItem);

            menu.Open(player);
        }
        private static void callback_selectedcar(Player player, Menu menu, Menu.Item item, string eventName, dynamic data)
        {
            MenuManager.Close(player);
            if (!Vehicles.ContainsKey(menu.Items[0].Text)) return;
            VehicleData vData = Vehicles[menu.Items[0].Text];
            switch (item.ID)
            {
                case "repair":
                    vData = VehicleManager.Vehicles[menu.Items[0].Text];
                    if (vData.Health > 0)
                    {
                        Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, "Машина не нуждается в восстановлении", 3000);
                        return;
                    }

                    var vClass = NAPI.Vehicle.GetVehicleClass(NAPI.Util.VehicleNameToModel(vData.Model));
                    if (!MoneySystem.Wallet.Change(player, -VehicleManager.VehicleRepairPrice[vClass]))
                    {
                        Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, "У Вас недостаточно средств", 3000);
                        return;
                    }
                    vData.Items = new List<nItem>();
                    GameLog.Money($"player({Main.Players[player].UUID})", $"server", VehicleManager.VehicleRepairPrice[vClass], $"carRepair({vData.Model})");
                    vData.Health = 1000;
                    Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Вы восстановили {VehicleHandlers.VehiclesName.GetRealVehicleName(vData.Model)} ({menu.Items[0].Text})", 3000);
                    return;
                case "evac":
                    if (!Main.Players.ContainsKey(player))
                    {
                        Log.Write($"Игрок {player.Name} не найден в Main.Players", nLog.Type.Warn);
                        return;
                    }

                    var number = menu.Items[0].Text;
                    Log.Write($"Эвакуация машины с номером: {number} для игрока {player.Name}", nLog.Type.Info);

                    if (Main.Players[player].Money < 200)
                    {
                        Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, $"Недостаточно средств (не хватает {200 - Main.Players[player].Money}$)", 3000);
                        Log.Write($"У игрока {player.Name} недостаточно средств для эвакуации машины", nLog.Type.Warn);
                        return;
                    }

                    var targetVehicles = VehicleManager.getAllPlayerVehicles(player.Name.ToString());
                    Log.Write($"Список машин игрока {player.Name}: {string.Join(", ", targetVehicles)}", nLog.Type.Info);

                    if (!targetVehicles.Contains(number))
                    {
                        Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, $"Машина с номером {number} не найдена у игрока", 3000);
                        Log.Write($"Машина с номером {number} не найдена у игрока {player.Name}", nLog.Type.Error);
                        return;
                    }

                    foreach (var v in NAPI.Pools.GetAllVehicles())
                    {
                        if (v.HasData("ACCESS") && v.GetData<string>("ACCESS") == "PERSONAL" && NAPI.Vehicle.GetVehicleNumberPlate(v) == number)
                        {
                            var veh = v;
                            if (veh == null)
                            {
                                Log.Write($"Машина с номером {number} не найдена в пуле", nLog.Type.Error);
                                return;
                            }

                            Log.Write($"Машина найдена. Эвакуация машины с номером {number}", nLog.Type.Info);
                            VehicleManager.Vehicles[number].Fuel = (!NAPI.Data.HasEntitySharedData(veh, "PETROL")) ? VehicleManager.VehicleTank[veh.Class] : veh.GetSharedData<int>("PETROL");
                            NAPI.Entity.DeleteEntity(veh);

                            MoneySystem.Wallet.Change(player, -200);
                            GameLog.Money($"player({Main.Players[player].UUID})", $"server", 200, $"carEvac");
                            Notify.Send(player, NotifyType.Info, NotifyPosition.BottomCenter, $"Ваша машина была отогнана на стоянку", 3000);
                            Log.Write($"Машина с номером {number} успешно эвакуирована", nLog.Type.Info);
                            break;
                        }
                    }
                    return;
                case "key":
                    if (!Main.Players.ContainsKey(player)) return;

                    nInventory.Add(player, new nItem(ItemType.CarKey, 1, $"{menu.Items[0].Text}_{VehicleManager.Vehicles[menu.Items[0].Text].KeyNum}"));
                    Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Вы получили ключ от машины с номером {menu.Items[0].Text}", 3000);
                    return;
                case "changekey":
                    if (!Main.Players.ContainsKey(player)) return;

                    if (!MoneySystem.Wallet.Change(player, -1000))
                    {
                        Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, "Смена замков стоит $1000", 3000);
                        return;
                    }

                    VehicleManager.Vehicles[menu.Items[0].Text].KeyNum++;
                    Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Вы сменили замки на машине {menu.Items[0].Text}. Теперь старые ключи не могут быть использованы", 3000);
                    return;
                case "callcar":
                    if (!Main.Players.ContainsKey(player)) return;

                    // Логируем попытку закрытия телефона
                    Log.Write($"Попытка закрытия телефона для игрока {player.Name}", nLog.Type.Info);

                    // Закрываем телефон
                    player.TriggerEvent("phoneClose");

                    var carNumber = menu.Items[0].Text;

                    if (!VehicleManager.Vehicles.ContainsKey(carNumber))
                    {
                        Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, "Машина не найдена", 3000);
                        return;
                    }

                    var playerVehicle = VehicleManager.Vehicles[carNumber];

                    Vehicle vehtp = null;
                    // Проверка, не находится ли уже машина в игре
                    foreach (var v in NAPI.Pools.GetAllVehicles())
                    {
                        if (v.HasData("ACCESS") && v.GetData<string>("ACCESS") == "PERSONAL" && NAPI.Vehicle.GetVehicleNumberPlate(v) == carNumber)
                        {
                            vehtp = v;
                            break;
                        }
                    }

                    if (vehtp != null)
                    {
                        // Телепорт существующей машины к игроку
                        vehtp.Position = player.Position.Around(5);
                        vehtp.Rotation = new Vector3(0, 0, player.Heading);
                        Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Машина {carNumber} доставлена к вам", 3000);
                        return;
                    }

                    if (!MoneySystem.Wallet.Change(player, -500))
                    {
                        Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, "Вызов машины стоит $500", 3000);
                        return;
                    }

                    GameLog.Money($"player({Main.Players[player].UUID})", $"server", 500, $"carCall");

                    var modelHash = (VehicleHash)NAPI.Util.GetHashKey(playerVehicle.Model);
                    var vehiclePosition = player.Position.Around(5); // Спавн машины рядом с игроком
                    var vehicleRotation = player.Rotation.Z;

                    var vehicleEntity = NAPI.Vehicle.CreateVehicle(modelHash, vehiclePosition, vehicleRotation, 0, 0);
                    NAPI.Vehicle.SetVehicleNumberPlate(vehicleEntity, carNumber);
                    vehicleEntity.SetData("ACCESS", "PERSONAL");
                    vehicleEntity.SetData("OWNER", player);
                    vehicleEntity.SetSharedData("PETROL", playerVehicle.Fuel);

                    Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Машина {VehicleHandlers.VehiclesName.GetRealVehicleName(playerVehicle.Model)} вызвана к вам", 3000);
                    return;
                case "back":
                    ParkManager.OpenMenu(player);
                    return;
            }
        }

    }
}