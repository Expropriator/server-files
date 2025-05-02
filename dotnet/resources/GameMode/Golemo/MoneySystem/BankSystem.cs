using GTANetworkAPI;
using System;
using System.Collections.Generic;
using Golemo.Core;
using GolemoSDK;
using System.Data;
using System.Linq;
using Newtonsoft.Json;
using Golemo.GUI;
using System.Threading.Tasks;
using MySqlConnector;
using Golemo.MoneySystem;

namespace Golemo.MoneySystem
{
    public class BankSystem : Script
    {
        public List<Vector3> atmLocations = new List<Vector3>()
        {
            new Vector3(-160.0, -580.0, 30.0),
            new Vector3(-125.0, -530.0, 30.0),
            new Vector3(-90.0, -480.0, 30.0),
            new Vector3(-55.0, -450.0, 30.0),
            new Vector3(-20.0, -420.0, 30.0)
            // Добавьте свои координаты ATM здесь
        };
        public static List<Vector3> GetRandomATMPoints(int count)
        {
            return ATM.ATMs.OrderBy(x => Guid.NewGuid()).Take(count).ToList();
        }

        private Dictionary<Player, List<Vector3>> activeRoutes = new Dictionary<Player, List<Vector3>>();
        private Dictionary<Player, int> currentATMIndex = new Dictionary<Player, int>();
        private Dictionary<Player, DateTime> lastHeistAttempt = new Dictionary<Player, DateTime>();

        private Vector3 bankEntrance = new Vector3(150.0, -1040.0, 29.0);
        private Vector3 bankExit = new Vector3(253.0, 228.0, 101.0);
        private Vector3 safeDoorPosition = new Vector3(265.0, 215.0, 101.0);
        private Vector3 safeCrackPosition = new Vector3(267.0, 213.0, 101.0);
        private Vector3 vaultTruckUnload = new Vector3(140.0, -1050.0, 29.0);

        private static Vector3 centralBankPos = new Vector3(247.50386, 218.99425, 105.16678);

        private Random random = new Random();

        [ServerEvent(Event.ResourceStart)]
        public void OnResourceStart()
        {
            // Добавление blip на карту
            NAPI.Blip.CreateBlip(408, centralBankPos, 1.0f, 2, "Устройство на работу", 255, 0, true, 0, 0);

            CreateBankNPC();
            CreateCashierNPC();
            CreateSafeDoorGuard();
        }

        public void CreateBankNPC()
        {
            Ped bankNpc = NAPI.Ped.CreatePed(PedHash.Bankman, bankEntrance, 0);
            bankNpc.SetData("BANK_NPC", true);
        }

        public void CreateCashierNPC()
        {
            Ped npc = NAPI.Ped.CreatePed(PedHash.Business01AMM, new Vector3(-152.0, -573.0, 30.0), 0);
            npc.SetData("JOB_TYPE", "cash_in");

            ColShape shape = NAPI.ColShape.CreateCylinderColShape(npc.Position, 1.5f, 2f);
            shape.SetData("NPC_JOB", true);
        }

        public void CreateSafeDoorGuard()
        {
            Ped guard = NAPI.Ped.CreatePed(PedHash.Security01SMM, safeDoorPosition, 180.0f);
            guard.SetData("BANK_GUARD", true);
        }

        [ServerEvent(Event.PlayerEnterColshape)]
        public void OnPlayerEnterColshape(ColShape shape, Player player)
        {
            if (shape.HasData("NPC_JOB"))
            {
                player.SetData("CAN_START_CASH_JOB", true);
                player.TriggerEvent("showHint", "Нажмите ~g~E~w~ чтобы начать работу инкассатора.");
            }
        }

        [ServerEvent(Event.PlayerExitColshape)]
        public void OnPlayerExitColshape(ColShape shape, Player player)
        {
            player.ResetData("CAN_START_CASH_JOB");
        }

        [RemoteEvent("cashier:startJob")]
        public void StartCashierJob(Player player)
        {
            // Проверка, может ли игрок начать работу
            if (!player.HasData("CAN_START_CASH_JOB"))
            {
                player.SendChatMessage("~r~Вы не можете начать работу инкассатора.");
                return;
            }

            // Устанавливаем данные работы для игрока
            player.SetData("currentJob", "cash_in");

            // Создаем маркер для переодевания
            player.TriggerEvent("createChangeClothesMarker");

            // Получаем случайные точки банкоматов
            List<Vector3> route = GetRandomATMPoints(20);

            // Отправляем точки на клиент
            foreach (var point in route)
            {
                player.TriggerEvent("setATMRoute", point.X, point.Y, point.Z);
            }

            player.SendChatMessage("~g~Маршрут по банкоматам построен.");
        }


        [RemoteEvent("cashier:changeClothes")]
        public void ChangeToCashierClothes(Player player)
        {
            player.SetClothes(11, 0, 0);
            GiveCashTruck(player);
        }

        public void GiveCashTruck(Player player)
        {
            Vehicle truck = NAPI.Vehicle.CreateVehicle(VehicleHash.Benson, player.Position.Around(5.0f), 0, 111, 111, "INKASSA");
            player.SetIntoVehicle(truck, 0);
            StartRoute(player);
        }

        public void StartRoute(Player player)
        {
            List<Vector3> route = new List<Vector3>();

            while (route.Count < 5 && route.Count < atmLocations.Count)
            {
                Vector3 atm = atmLocations[random.Next(atmLocations.Count)];
                if (!route.Contains(atm)) route.Add(atm);
            }

            activeRoutes[player] = route;
            currentATMIndex[player] = 0;
            player.TriggerEvent("setATMRoute", route[0]);
        }

        [RemoteEvent("cashier:collectATM")]
        public void CollectATM(Player player)
        {
            if (!activeRoutes.ContainsKey(player)) return;

            int index = currentATMIndex[player];
            List<Vector3> route = activeRoutes[player];

            float distance = player.Position.DistanceTo(route[index]);
            int payout = (int)(distance * 100);
            Wallet.Change(player, payout);

            currentATMIndex[player]++;
            if (currentATMIndex[player] < route.Count)
            {
                player.TriggerEvent("setATMRoute", route[currentATMIndex[player]]);
            }
            else
            {
                player.TriggerEvent("goBackToBank");
            }
        }

        [RemoteEvent("cashier:returnToBank")]
        public void FinishJob(Player player)
        {
            player.SendChatMessage("~g~Вы успешно завершили смену инкассатора!");
            activeRoutes.Remove(player);
            currentATMIndex.Remove(player);
            player.ResetData("currentJob");
        }

        [RemoteEvent("bank:tryHeist")]
        public void TryStartHeist(Player player)
        {
            if (!player.HasData("FRACTION_ID")) return;
            if (lastHeistAttempt.ContainsKey(player) && (DateTime.Now - lastHeistAttempt[player]).TotalMinutes < 60)
            {
                player.SendChatMessage("~r~Вы уже пытались недавно. Попробуйте позже.");
                return;
            }

            lastHeistAttempt[player] = DateTime.Now;
            player.TriggerEvent("startSafeCrackAnimation", safeCrackPosition);
            TriggerHeistAlarm();
        }

        public void TriggerHeistAlarm()
        {
            foreach (Player p in NAPI.Pools.GetAllPlayers())
            {
                if (p.HasData("IS_POLICE"))
                {
                    p.SendChatMessage("~r~Тревога в банке! Ограбление!");
                    p.TriggerEvent("blipBankHeist", bankEntrance);
                }
            }
        }

        [RemoteEvent("heist:minigameSuccess")]
        public void OnHeistMinigameSuccess(Player player)
        {
            player.TriggerEvent("playSafeOpenAnim", safeDoorPosition);
            NAPI.Task.Run(() =>
            {
                player.TriggerEvent("spawnMoneyBag");
            }, 5000);
        }

        [RemoteEvent("heist:loadMoney")]
        public void LoadMoneyToTruck(Player player)
        {
            if (!player.IsInVehicle) return;
            player.SendChatMessage("~g~Мешок с деньгами загружен в грузовик!");
            player.SetData("HAS_MONEY_BAG", false);
        }

        [RemoteEvent("heist:unloadToBase")]
        public void UnloadMoneyToBase(Player player)
        {
            if (player.HasData("FRACTION_ID") && player.HasData("HAS_MONEY_IN_TRUCK"))
            {
                player.SendChatMessage("~g~Деньги успешно загружены в сейф фракции!");
                player.ResetData("HAS_MONEY_IN_TRUCK");
            }
        }
    }
}