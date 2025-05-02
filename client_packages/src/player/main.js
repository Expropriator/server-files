var cam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), false);
var effect = '';
global.loggedin = false;
global.lastCheck = 0;
global.chatLastCheck = 0;
global.pocketEnabled = false;

mp.peds.new(0x1BCC157B, new mp.Vector3(-1268.3584, -1450.1157, 4.5948085), 22.6695, 0);
mp.peds.new(0x14C3E407, new mp.Vector3(-1268.6962, -1448.8938, 4.5953885), -168.6695, 0);
mp.peds.new(0x81441B71, new mp.Vector3(-1257.2031, -1479.01, 4.3489405), -146.6695, 0);
mp.peds.new(0x80E59F2E, new mp.Vector3(-1257.5394, -1478.6963, 4.3489405), -146.6695, 0);
mp.peds.new(0x7B0E452F, new mp.Vector3(-1240.1415, -1474.7213, 4.3285243), 70.6695, 0);
mp.peds.new(0xE7A963D9, new mp.Vector3(-1233.934, -1455.4933, 4.254521), 160.6695, 0);
mp.peds.new(0x0B4A6862, new mp.Vector3(-1234.3534, -1456.988, 4.269508), -16.6695, 0);
mp.peds.new(0xF0AC2626, new mp.Vector3(-1255.3428, -1453.0127, 4.5531675), 77.6695, 0);
mp.peds.new(0x46E39E63, new mp.Vector3(-1277.3029, -1419.1233, 4.3491164), -30.6695, 0);
mp.peds.new(0x3521A8D2, new mp.Vector3(-1257.7683, -1491.4387, 4.3305098), -76.6695, 0);
mp.peds.new(0xD1FEB884, new mp.Vector3(-1266.9015, -1486.9998, 4.3204976), -38.6695, 0);
mp.peds.new(0xD1FEB884, new mp.Vector3(-1287.7128, -1428.6512, 4.5681049), -55.6695, 0);
mp.peds.new(-1686040670, new mp.Vector3(-495.14215, -684.2896, 33.21113), -146.6695, 0);
mp.peds.new(193817059, new mp.Vector3(694.5975, 252.09875, 93.47306), 149.6695, 0);
mp.peds.new(0x3C438CD2, new mp.Vector3(-1225.3202, -1498.2853, 4.3722717), 92.6695, 0);

mp.peds.new(2014052797, new mp.Vector3(130.07095, -1284.9728, 29.249323), 121.6695, 0);
mp.peds.new(0x5C14EDFA, new mp.Vector3(102.82939, -1290.1981, 29.229707), -24.6695, 0);
mp.peds.new(0x52580019, new mp.Vector3(104.6681, -1294.2317, 29.229707), -70.6695, 0);
mp.peds.new(2014052797, new mp.Vector3(4905.7383, -4941.266, 4.4659426), 21.6695, 0);
mp.peds.new(2014052797, new mp.Vector3(-1391.7186, -605.5828, 30.39955), 117.6695, 0);
mp.peds.new(0x5C14EDFA, new mp.Vector3(-1383.4264, -612.297, 31.736133), 121.6695, 0);
mp.peds.new(0x52580019, new mp.Vector3(-1379.9653, -617.60425, 31.737846), 101.6695, 0);
mp.peds.new(0xB594F5C3, new mp.Vector3(-305.2498, 6268.427, 31.506794), -131.6695, 0);
mp.peds.new(0xFD5537DE, new mp.Vector3(987.3634, -95.67454, 74.825945), -143.6695, 0);
mp.peds.new(0xFBB374CA, new mp.Vector3(1984.4019, 3054.5178, 47.195165), -112.6695, 0);
mp.peds.new(0x3053E555, new mp.Vector3(-561.7963, 287.26086, 82.15646), -95.6695, 0);

mp.game.gameplay.disableAutomaticRespawn(true);
mp.game.gameplay.ignoreNextRestart(true);
mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeOutAfterDeath(false);
mp.game.gameplay.setFadeInAfterLoad(false);

mp.events.add('freeze', function (toggle) {
    localplayer.freezePosition(toggle);
});

mp.events.add('destroyCamera', function () {
    cam.destroy();
    mp.game.cam.renderScriptCams(false, false, 3000, true, true);
});

mp.events.add('carRoom', function () {
    cam = mp.cameras.new('default', new mp.Vector3(-42.3758, -1101.672, 27.52235), new mp.Vector3(0, 0, 0), 50);
    cam.pointAtCoord(-42.79771, -1095.676, 26.0117);
    cam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add('setHUDVisible', function (arg) {
    mp.game.ui.displayHud(arg);
    mp.gui.chat.show(arg);
    mp.game.ui.displayRadar(arg);
});

mp.events.add('setPocketEnabled', function (state) {
    pocketEnabled = state;
    if (state) {
        mp.gui.execute("fx.set('inpocket')");
        mp.game.invoke(getNative("SET_FOLLOW_PED_CAM_VIEW_MODE"), 4);
    }
    else {
        mp.gui.execute("fx.reset()");
    }
});

mp.keys.bind(Keys.VK_Y, false, function () {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('acceptPressed');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_N, false, function () {
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    mp.events.callRemote('cancelPressed');
    lastCheck = new Date().getTime();
});

mp.events.add('connected', function () {
    mp.game.ui.displayHud(false);
    cam = mp.cameras.new('default', startCamPos, startCamRot, 90.0);
    cam.setActive(true);
    mp.game.graphics.startScreenEffect('SwitchSceneMichael', 5000, false);
    var effect = 'SwitchSceneMichael';
});

mp.events.add('ready', function () {
    mp.game.ui.displayHud(true);
    //cam.setActive(false);
    //mp.game.graphics.stopScreenEffect(effect);
});

mp.events.add('kick', function (notify) {
    mp.events.call('notify', 4, 9, notify, 10000);
    mp.events.callRemote('kickclient');
});

mp.events.add('loggedIn', function () {
    loggedin = true;
});

mp.events.add('setFollow', function (toggle, entity) {
    if (toggle) {
        if (entity && mp.players.exists(entity))
            localplayer.taskFollowToOffsetOf(entity.handle, 0, 0, 0, 1, -1, 1, true)
    }
    else
        localplayer.clearTasks();
});

setInterval(function () {
    if (localplayer.getArmour() <= 0 && localplayer.getVariable('HASARMOR') === true) {
        mp.events.callRemote('deletearmor');
    }
}, 600);

// mp.keys.bind(Keys.VK_U, false, function () { // Animations selector
    // if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened) return;
    // if (localplayer.isInAnyVehicle(true)) return;
    // OpenCircle("Категории", 0);
// });


mp.keys.bind(Keys.VK_E, false, function () { // E key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000) return;
    if(global.casinoOpened){
        mp.events.callRemote('interactionPressed');
    }
    if(global.menuOpened) return;
    mp.events.callRemote('interactionPressed');
    lastCheck = new Date().getTime();
    global.acheat.pos();
});

mp.keys.bind(Keys.VK_L, false, function () { // L key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 2000 || global.menuOpened) return;
    mp.events.callRemote('lockCarPressed');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_LEFT, true, () => {
	if(mp.gui.cursor.visible || !loggedin) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('leftlight') == true) mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 1, 0);
		}
	}
});

mp.keys.bind(Keys.VK_RIGHT, true, () => {
	if(mp.gui.cursor.visible || !loggedin) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('rightlight') == true) mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 1);
		}
	}
});

mp.keys.bind(Keys.VK_DOWN, true, () => {
	if(mp.gui.cursor.visible || !loggedin) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) return;
		if(new Date().getTime() - lastCheck > 500) {
			lastCheck = new Date().getTime();
			if(localplayer.vehicle.getVariable('leftlight') == true && localplayer.vehicle.getVariable('rightlight') == true) mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 0, 0);
			else mp.events.callRemote("VehStream_SetIndicatorLightsData", localplayer.vehicle, 1, 1);
		}
	}
});

mp.keys.bind(Keys.VK_ALT, false, function () { // alt key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 400 || global.menuOpened) return;
    if (localplayer.isInAnyVehicle(false) && localplayer.vehicle.getSpeed() <= 3) {
        lastCheck = new Date().getTime();
        mp.events.callRemote('engineCarPressed');
    }
});

mp.keys.bind(Keys.VK_M, false, function () {
    
    if (!loggedin || chatActive || editing || global.menuCheck() || cuffed || localplayer.getVariable('InDeath') == true || new Date().getTime() - lastCheck < 400) return;

    if (global.phoneOpen)
    {
        mp.events.callRemote("closePlayerMenu");
        global.phoneOpen = 0;
    }
    else if (!checkConditions() || global.talkingOnThePhone)
    {
        mp.events.callRemote('openPlayerMenu');
        lastCheck = new Date().getTime();
        global.phoneOpen = 1;
    }
});

global.phoneOpen = false;
mp.keys.bind(Keys.VK_UP, false, function () {
    if (!loggedin || chatActive || editing || global.menuCheck() && !phoneOpen || cuffed || localplayer.getVariable('InDeath') == true || new Date().getTime() - lastCheck < 1600 || mp.players.local.isFalling() || mp.players.local.isShooting() || mp.players.local.isSwimming() || mp.players.local.isSwimmingUnderWater() || localplayer.getVariable("PickAxe.InHands") == true) return;
    if (!phoneOpen) {
        mp.events.callRemote('server::phone:open');
    }
    else {
        mp.events.callRemote('server::phone:close');
    }
    lastCheck = new Date().getTime();
});

const checkConditions = () => {
    return (	
		localplayer.getVariable('AntiAnimDown') || 
		localplayer.isSwimming() || 
		localplayer.isSwimmingUnderWater() || 
		localplayer.isInAir() || 
		localplayer.isRunningRagdollTask() || 
		localplayer.isRagdoll() ||
		localplayer.isJumping() || 
        localplayer.isShooting() ||
        localplayer.isReloading() ||
		localplayer.isFalling() ||
        localplayer.getIsTaskActive(160) ||
        localplayer.getIsTaskActive(2)
    );
}

// mp.keys.bind(0x77, true, function () {  //F8-Key
//     var date = new Date();
//     var name = "sanstreetlife-" + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + "-" + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds() + ".png";
//     mp.gui.takeScreenshot(name, 1, 100, 0);
// });

mp.keys.bind(Keys.VK_6, false, function () { // X key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened || localplayer.getVariable('fraction') == 0 || localplayer.vehicle || localplayer.getVariable('IS_DYING') || checkConditions()) return;
    mp.events.callRemote('playerPressCuffBut');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_7, false, function () { // Z key
    if (!loggedin || chatActive || editing || new Date().getTime() - lastCheck < 1000 || global.menuOpened || localplayer.getVariable('InDeath')) return;
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) != localplayer.handle) CheckMyWaypoint();
		else {
			if (localplayer.vehicle.getClass() == 18) mp.events.callRemote('syncSirenSound', localplayer.vehicle);
		}
	} else mp.events.callRemote('playerPressFollowBut');
    lastCheck = new Date().getTime();
});

function CheckMyWaypoint() {
	try {
		if(mp.game.invoke('0x1DD1F58F493F1DA5')) {
			let foundblip = false;
			let blipIterator = mp.game.invoke('0x186E5D252FA50E7D');
			let totalBlipsFound = mp.game.invoke('0x9A3FF3DE163034E8');
			let FirstInfoId = mp.game.invoke('0x1BEDE233E6CD2A1F', blipIterator);
			let NextInfoId = mp.game.invoke('0x14F96AA50D6FBEA7', blipIterator);
			for (let i = FirstInfoId, blipCount = 0; blipCount != totalBlipsFound; blipCount++, i = NextInfoId) {
				if (mp.game.invoke('0x1FC877464A04FC4F', i) == 8) {
					var coord = mp.game.ui.getBlipInfoIdCoord(i);
					foundblip = true;
					break;
				}
			}
			if(foundblip) mp.events.callRemote('syncWaypoint', coord.x, coord.y);
		}
	} catch (e) { }
}

mp.events.add('syncWP', function (bX, bY, type) {
    if(!mp.game.invoke('0x1DD1F58F493F1DA5')) {
		mp.game.ui.setNewWaypoint(bX, bY);
		if(type == 0) mp.events.call('notify', 2, 9, "Пассажир передал Вам информацию о своём маршруте!", 3000);
		else if(type == 1) mp.events.call('notify', 2, 9, "Человек из списка контактов Вашего телефона передал Вам метку его местоположения!", 3000);
	} else {
		if(type == 0) mp.events.call('notify', 4, 9, "Пассажир попытался передать Вам информацию о маршруте, но у Вас уже установлен другой маршрут.", 5000);
		else if(type == 1) mp.events.call('notify', 4, 9, "Человек из списка контактов Вашего телефона попытался передать Вам метку его местоположения, но у Вас уже установлена другая метка.", 5000);
	}
});

mp.keys.bind(Keys.VK_U, false, function () { // U key
    if (!loggedin || chatActive || editing || global.menuOpened || new Date().getTime() - lastCheck < 1000) return;
    mp.events.callRemote('openCopCarMenu');
    lastCheck = new Date().getTime();
});

mp.keys.bind(Keys.VK_OEM_3, false, function () { // ` key
    if (chatActive || (global.menuOpened && mp.gui.cursor.visible)) return;
    mp.gui.cursor.visible = !mp.gui.cursor.visible;
});

var lastPos = new mp.Vector3(0, 0, 0);

mp.game.gameplay.setFadeInAfterDeathArrest(false);
mp.game.gameplay.setFadeInAfterLoad(false);

var deathTimerOn = false;
var deathTimer = 0;

mp.events.add('DeathTimer', (time) => {
    if (time === false) {
        deathTimerOn = false;
		global.dialog.closeMED();
		
	}
    else {
		global.menu.execute(`death.buttonact=false`);
        deathTimerOn = true;
        deathTimer = new Date().getTime() + time;
    }
});

mp.events.add('screenDeath', function () {
	mp.game.graphics.stopScreenEffect("DeathFailOut");
});

mp.events.add('render', () => {
    if (localplayer.getVariable('InDeath') == true) {
        mp.game.controls.disableAllControlActions(2);
        mp.game.controls.enableControlAction(2, 1, true);
        mp.game.controls.enableControlAction(2, 2, true);
        mp.game.controls.enableControlAction(2, 3, true);
        mp.game.controls.enableControlAction(2, 4, true);
        mp.game.controls.enableControlAction(2, 5, true);
        mp.game.controls.enableControlAction(2, 6, true);
    }

    if (deathTimerOn) {
        var secondsLeft = Math.trunc((deathTimer - new Date().getTime()) / 1000);
        var minutes = Math.trunc(secondsLeft / 60);
        var seconds = secondsLeft % 60;
		var sseconds = seconds;
		if (seconds < 10)
		{
			sseconds =  "0" + seconds;
		}
		else if (seconds < 0)
		{
			sseconds = 0;
		}
		global.menu.execute(`death.time="${minutes}:${sseconds}"`);
    }

    if (mp.game.controls.isControlPressed(0, 32) || 
        mp.game.controls.isControlPressed(0, 33) || 
        mp.game.controls.isControlPressed(0, 321) ||
        mp.game.controls.isControlPressed(0, 34) || 
        mp.game.controls.isControlPressed(0, 35) || 
        mp.game.controls.isControlPressed(0, 24) || 
        localplayer.getVariable('InDeath') == true) 
    {
        afkSecondsCount = 0;
    }
    else if (localplayer.isInAnyVehicle(false) && localplayer.vehicle.getSpeed() != 0) 
    {
        afkSecondsCount = 0;
    } 
    else if(global.spectating) 
    { // Чтобы не кикало администратора в режиме слежки
		afkSecondsCount = 0;
	}
});

mp.events.add("playerRuleTriggered", (rule, counter) => {
    if (rule === 'ping' && counter > 5) {
        mp.events.call('notify', 4, 2, "Ваш ping слишком большой. Зайдите позже", 5000);
        mp.events.callRemote("kickclient");
    }
    /*if (rule === 'packetLoss' && counter => 10) {
        mp.events.call('notify', 4, 2, "У Вас большая потеря пакетов. Зайдите позже", 5000);
        mp.events.callRemote("kickclient");
    }*/
});
let allblips = [];
mp.events.add("client::createblip", (id, type, name, color, pos, shortRange) => {
	allblips[id] = mp.blips.new(type, pos,
	{
		name: name,
		scale: 0.8,
		color: color,
		alpha: 255,
		dimension: 0,
		drawDistance: 100,
		shortRange: shortRange,
	});
});
mp.events.add("client::destroyblips", (id) => {
	allblips[id].destroy();
	allblips[id] = null;
}); 

mp.events.add("playerQuit", (player, exitType, reason) => {
    allblips = null;
});

let highlightedPlayer = null;
let highlightMarker = null;

// setInterval(() => {
//     const camPos = mp.game.cam.getGameplayCamCoord();
//     const camRot = mp.game.cam.getGameplayCamRot(2);
//
//     // Переводим углы в радианы
//     const pitch = camRot.x * Math.PI / 180;
//     const yaw = camRot.z * Math.PI / 180;
//
//     // Высчитываем вектор направления
//     const dirX = -Math.sin(yaw) * Math.cos(pitch);
//     const dirY = Math.cos(yaw) * Math.cos(pitch);
//     const dirZ = Math.sin(pitch);
//
//     // Вычисляем точку в 10 метрах по направлению камеры
//     const distance = 10.0;
//     const targetPos = {
//         x: camPos.x + dirX * distance,
//         y: camPos.y + dirY * distance,
//         z: camPos.z + dirZ * distance
//     };
//
//     mp.game.graphics.drawMarker(
//         1,
//         targetPos.x, targetPos.y, targetPos.z,
//         0, 0, 0,
//         0, 0, 0,
//         0.2, 0.2, 0.2,
//         255, 255, 0, 200,
//         false, true, 2,
//         false, null, null, false
//     );
// }, 0);
let clearPedsAt = (x, y, z, radius) => {
    mp.peds.forEach(ped => {
        let pos = ped.position;
        if (mp.game.system.vdist(pos.x, pos.y, pos.z, x, y, z) < radius) {
            ped.destroy();
        }
    });
};

clearPedsAt(-1257.7041, -1479.3696, 3.22649, 5.0);
