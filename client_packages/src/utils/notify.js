//Событие отправки кастомных уведомлений игроку
//тип, расположение, сообщение, время
var typetostring = ["Оповещение", "Ошибка", "Успешно!", "Информация", "Предупреждение", "Объявление", "Банк","SMS - Уведомление" ];
var statustostring = [ "alert", "error", "success", "info", "warning", "news", "fleeca","sms" ];

mp.events.add('notify', (type, layout, msg, time) => {
    if (global.loggedin) {
		
		mp.gui.execute(`HUD.showNotify('${typetostring[type]}', '${statustostring[type]}', '${msg}')`);
	}
    else mp.events.call('authNotify', type, layout, msg, time)
});


global.INTERACTIONCHECK = false;
mp.events.add('playerInteractionCheck', function (state){
    global.INTERACTIONCHECK = state;
});
mp.events.add('render', () => {
    if (global.INTERACTIONCHECK === true && !global.menuOpened) {
        mp.gui.execute(`HUD.hint=true`);
    } 
    else if (!global.INTERACTIONCHECK === true || global.menuOpened) {
        mp.gui.execute(`HUD.hint=false`);
    }
});