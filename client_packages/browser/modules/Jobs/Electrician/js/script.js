// let correctOrder = ["1", "2", "3"];
// let userOrder = [];
//
// document.querySelectorAll(".wire").forEach(wire => {
//     wire.addEventListener("click", function () {
//         if (!userOrder.includes(this.dataset.wire)) {
//             userOrder.push(this.dataset.wire);
//             this.style.background = "green";
//         }
//     });
// });
//
// function checkWires() {
//     if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
//         mp.trigger("closeElectricianMenu", true); // Успешно
//     } else {
//         alert("Ошибка! Попробуйте снова.");
//         userOrder = [];
//         document.querySelectorAll(".wire").forEach(wire => wire.style.background = "red");
//     }
// }
mp.peds.new(0x49EA5685, new mp.Vector3(728.9811, 134.54457, 79.63455), 288.2411); // ped Miner
var Electrician = new Vue({
    el: ".ped",  // Класс для отображения меню на экране
    data: {
        active: false,   // Активность меню
        menu: 0,         // ID активного меню
        style: 0,        // Выбор стиля/формы
        workid: 1,       // ID работы для электрика (например 2)
    },
    methods: {
        // Открытие меню электрика
        open: function() {
            mp.events.callRemote("openElectricianMenu");  // Отправка события на сервер для открытия меню
        },

        // Закрытие меню электрика
        close: function(success) {
            mp.events.callRemote("closeElectricianMenu", success);  // Отправка события на сервер для закрытия меню
        },

        // Сменить стиль (например, форму электрика)
        gostyle: function(index) {
            this.style = index;
        },

        // Открыть меню по ID
        openMenu: function(id) {
            this.menu = id;
        },

        // Завершить работу электрика
        endWork: function(success) {
            this.close(success);  // Закрывает меню и отправляет успешный сигнал
        },

        // Обработчик нажатия кнопки E
        playerPressE: function() {
            mp.events.callRemote("playerPressE");  // Отправка события на сервер для обработки нажатия кнопки E
        }
    }
});
// Добавление глобального слушателя для нажатия кнопки E
document.addEventListener('keydown', function(event) {
    if (event.key === 'E' || event.key === 'е') {  // Проверка нажатия клавиши E (латинская и русская)
        Electrician.playerPressE();
    }
});