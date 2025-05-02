using System;
using System.Collections.Generic;
using System.Text;
using GTANetworkAPI;
using Golemo.Core;
using GolemoSDK;

namespace Golemo.Markets
{

    class MarketFish : Script
    {
        #region Settings
        private static Random rnd = new Random();

        private static nLog Log = new nLog("Скупщик рыбы");

        public static int marketMultiplier;
        private static int _minMultiplier = 2;
        private static int _maxMultiplier = 5;

        public static void UpdateMultiplier()
        {
            marketMultiplier = rnd.Next(_minMultiplier, _maxMultiplier);
            Log.Write($"Обновлен коэффициент на: {marketMultiplier}");
        }

        private static List<Vector3> shape = new List<Vector3>()
        {
            new Vector3(-1229.4137, -1507.4995, 3.049357),
        };
        #endregion

        #region Инициализация Работы Фермера
        [ServerEvent(Event.ResourceStart)]
        public void Event_MarketStart()
        {
            try
            {
                #region Создание блипа, текста, колшейпа
                // Создание блипа на карте
                NAPI.Blip.CreateBlip(68, new Vector3(-1229.4137, -1507.4995, 3.049357), 1, 81, "Скупщик рыбы", 255, 0, true, 0, 0);

                // Текст над головой у Ped
                NAPI.TextLabel.CreateTextLabel("~w~Скупщик", new Vector3(-1229.4137, -1507.4995, 3.049357), 10f, 0.2f, 4, new Color(255, 255, 255), true, NAPI.GlobalDimension);

                var melogShape = NAPI.ColShape.CreateCylinderColShape(shape[0], 2f, 2, 0);
                melogShape.OnEntityEnterColShape += (shape, player) =>
                {
                    try
                    {
                        player.SetData("INTERACTIONCHECK", 810);
                        // Сообщаем клиенту, что игрок вошел в зону взаимодействия
                        player.TriggerEvent("showInteractionHint", true);
                    }
                    catch (Exception e)
                    {
                        Log.Write(e.ToString(), nLog.Type.Error);
                    }
                };
                melogShape.OnEntityExitColShape += (shape, player) =>
                {
                    try
                    {
                        player.SetData("INTERACTIONCHECK", 0);
                        // Сообщаем клиенту, что игрок вышел из зоны взаимодействия
                        player.TriggerEvent("showInteractionHint", false);
                    }
                    catch (Exception e)
                    {
                        Log.Write(e.ToString(), nLog.Type.Error);
                    }
                };
                #endregion
                UpdateMultiplier();
            }
            catch (Exception e)
            {
                Log.Write(e.ToString(), nLog.Type.Error);
            }
        }
        #endregion

        #region Предметы в маркете
        //цена, номер предмета, название, предмет для покупки или для продажи (если true, то коэффициент будет умножаться на выставленную сумму)
        private static List<Product> SellItems = new List<Product>()
        {
            new Product(56, 209, "Корюшка", true, "Трофейный экземпляр, который мечтает получить каждый рыбак. Рыбка очень красивая и капризна"),
            new Product(78, 210, "Кунджа", true, "Вид лучепёрых рыб, азиатский эндемик из рода гольцов семейства лососёвых. Кунджа крупная рыба "),
            new Product(96, 211, "Лосось", true, "Семейство лучепёрых рыб из отряда лососеобразных. В составе семейства представлены как анадромные, так и пресноводные виды рыб."),                                                      
            new Product(130, 212, "Окунь", true, "Вид лучепёрых рыб рода пресноводных окуней семейства окунёвых. Очень часто попадается рыбакам"),
            new Product(150, 213, "Осётр", true, "Род пресноводных, полупроходных и проходных рыб из семейства осетровых."),
            new Product(600, 214, "Скат", true, "Настоящее сокровище, очень редко попадается рыбакам"),
            new Product(320, 215, "Тунец", true, "Морская хищная рыба"),
            new Product(520, 216, "Угорь", true, "Очень длинная рыба, можно сказать самая некрасивая по виду, но поймать его это честь для рыбака"),
            new Product(730, 217, "Чёрный амур", true, "Очень большая рыба и не найти ее рыбаку грех!"),
            new Product(272, 218, "Щука", true, "Длинная речная рыба, попадается достотчно часто"),
        };

        private static List<Product> BuyItems = new List<Product>()
        {
            new Product(2, 209, "Наживка2", false, "Обычный гриб, очень часто попадается"),
        };
        #endregion

        #region Открыть меню Маркета
        [RemoteEvent("changePage3")]
        public static void OpenMarketMenu(Player player, int page)
        {
            if (player.IsInVehicle) return;
            var hitem = nInventory.Find(Main.Players[player].UUID, ItemType.Hay);
            var shitem = nInventory.Find(Main.Players[player].UUID, ItemType.Seed);
            int hayscount = hitem != null ? hitem.Count : 0;
            int seedscount = shitem != null ? shitem.Count : 0;
            List<object> data = new List<object>()
    {
        marketMultiplier,
        hayscount,
        seedscount,
    };
            LoadPage3(player, page, data);
        }
        #endregion

        #region Взаимодействие с менюшкой Маркета
        public static void LoadPage3(Player player, int page, object data)
        {
            string json;
            string json2;
            string json3;
            switch (page)
            {
                case 0:
                    json = Newtonsoft.Json.JsonConvert.SerializeObject(data);
                    json2 = Newtonsoft.Json.JsonConvert.SerializeObject(BuyItems);
                    json3 = Newtonsoft.Json.JsonConvert.SerializeObject(SellItems);
                    Trigger.ClientEvent(player, "loadPage3", 0, json, json2, json3);
                    break;
            }
        }
        #endregion

        #region BuyItem
        [RemoteEvent("buyFarmerItem3")]
        public static void ButFarmerItem(Player player, int id, int count)
        {
            nItem aItem = new nItem((ItemType)id);
            var tryAdd = nInventory.TryAdd(player, new nItem(aItem.Type, count));
            if (tryAdd == -1 || tryAdd > 0)
            {
                Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, $"Недостаточно места в инвентаре", 2000);
                return;
            }
            var item = BuyItems.Find(x => x.ID == id);
            if (item == null)
            {
                Notify.Error(player, "Предмет не найден", 2500);
                return;
            }
            int price = item.Ordered ? item.Price * marketMultiplier * count : item.Price * count;
            if (Main.Players[player].Money < price)
            {
                Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, $"Недостаточно денег", 2000);
                return;
            }
            MoneySystem.Wallet.Change(player, -price);
            nInventory.Add(player, new nItem(aItem.Type, count));
            Trigger.ClientEvent(player, "sellgreat3");
            Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Вы купили {count} {item.Name} за ${price}", 2000);
        }
        #endregion

        #region SellItems
        [RemoteEvent("sellFarmerItem3")]
        public static void SellFarmerItem3(Player player, int id, int count)
        {
            if (Main.Players[player].Licenses[8] == false)
            {
                Notify.Error(player, "У вас нет лицензии на рыбалку");
                return;
            }
            var aItem = nInventory.Find(Main.Players[player].UUID, (ItemType)id);
            if (aItem == null || aItem.Count < count)
            {
                Notify.Send(player, NotifyType.Error, NotifyPosition.BottomCenter, "Недостаточно предмета в инвентаре", 2000);
                return;
            }
            var item = SellItems.Find(x => x.ID == id);
            if(item == null)
            {
                Notify.Error(player, "Предмет не найден", 2500);
                return;
            }
            int price = item.Ordered ? item.Price * marketMultiplier * count : item.Price * count;
            MoneySystem.Wallet.Change(player, price);
            nInventory.Remove(player, new nItem(aItem.Type, count));
            Trigger.ClientEvent(player, "sellgreat3");
            Notify.Send(player, NotifyType.Success, NotifyPosition.BottomCenter, $"Вы продали {count} {item.Name} за ${price}", 2000);
        }
        #endregion

        #region MarketProduct
        private class Product
        {
            public int Price { get; set; }
            public int ID { get; set; }
            public string Name { get; set; }
            public string Desc { get; set; }
            public bool Ordered { get; set; }

            public Product(int price, int id, string name, bool ordered, string desc)
            {
                Price = price;
                ID = id;
                Name = name;
                Ordered = ordered;
                Desc = desc;
            }
        }
        #endregion
    }
}
