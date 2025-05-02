let player = mp.players.local;
player.setAlpha(0);

const Natives = {
    SWITCH_OUT_PLAYER: '0xAAB3200ED59016BC',
    SWITCH_IN_PLAYER: '0xD8295AF639FD9CB8',
    IS_PLAYER_SWITCH_IN_PROGRESS: '0xD9D2CFFF49FAB35F'
};

var respawn = mp.browsers["new"]('package://browser/respawn.html');
global.auth = mp.browsers["new"]('package://browser/modules/Auth/index.html');
mp.gui.cursor.visible = true;

var lastButAuth = 0;
var lastButSlots = 0;
var lastButSlots2 = 0;

setTimeout(function () { 
    if (mp.storage.data.account)
    {
        global.auth.execute(`document.getElementById("entry-login-id").value = "${mp.storage.data.account.username}";`);
        global.auth.execute(`document.getElementById("entry-password-id").value = "${mp.storage.data.account.pass}";`);
        global.auth.execute(`document.getElementById("entry-savemy").checked = true;`);
    }
}, 150);

// events from cef
mp.events.add('signin', function (authData) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
    lastButAuth = new Date().getTime();

    authData = JSON.parse(authData);

    var username = authData['entry-login'],
        pass = authData['entry-password'];
        check = authData['entry-savemy'];
		
	var checks = true;
    if (checks) {
        mp.storage.data.account = {
            username: username,
            pass: pass
        };
    } else delete mp.storage.data.account;

    mp.events.callRemote('signin', username, pass)
});

mp.events.add('restorepass', function (state, authData) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
    lastButAuth = new Date().getTime();

    authData = JSON.parse(authData);

    var nameorcode = authData['entry-login'];

    mp.events.callRemote('restorepass', state, nameorcode)
});

mp.events.add('signup', function (regData) {
    if (new Date().getTime() - lastButAuth < 3000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
    lastButAuth = new Date().getTime();

    regData = JSON.parse(regData);
    var username = regData['new-user__login'],
        email = regData['new-user__email'],
        promo = regData['new-user__promo-code'],
        pass1 = regData['new-user__pw'],
        pass2 = regData['new-user__pw-repeat'];

    if (checkLgin(username) || username.length > 50) {
        mp.events.call('notify', 1, 9, 'Логин не соответствует формату или слишком длинный!', 3000);
        return;
    }
	
    if (pass1 != pass2 || pass1.length < 3) {
        mp.events.call('notify', 1, 9, 'Ошибка при вводе пароля!', 3000);
        return;
    }

	mp.events.callRemote('signup', username, pass1, email, promo);
	// player.position = new mp.Vector3(-1117.778, -1557.625, 3.3819);
	// mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS);
	// mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle, 0, parseInt(1));
});
mp.events.add('chooseChar', function (slot) {
	if (new Date().getTime() - lastButSlots < 1000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
	lastButSlots = new Date().getTime();
	player.setAlpha(255);	
	mp.events.callRemote('playercharacterselectrot');
	mp.events.callRemote('choosecharacter', slot);
});
mp.events.add('selectChar', function (slot) {
    if (new Date().getTime() - lastButSlots2 < 5000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
    lastButSlots2 = new Date().getTime();
	if (global.auth != null) {
		player.taskGoToCoordAnyMeans(409.70855, -1003.3483, -99.0, 1, 0, false, 12, 100);
		setTimeout( function() {
			mp.events.callRemote('selectchar', slot);
		}, 4000);
		setTimeout( function() {
			global.auth.destroy();
			global.auth = null;
			CharacterCamera.destroy(true);
			CharacterCamera = null;
		}, 4800);
    }
});

mp.events.add('newChar', function (slot, name, lastname) {
    if (checkName(name) || !checkName2(name) || name.length > 25 || name.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат имени: 3-25 символов и первая буква имени заглавная', 3000);
        return;
    }

    if (checkName(lastname) || !checkName2(lastname) || lastname.length > 25 || lastname.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат фамилии: 3-25 символов и первая буква фамилии заглавная', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('newchar', slot, name, lastname);
});

mp.events.add('delChar', function (slot, name, lastname, pass) {
    if (checkName(name) || name.length > 25 || name.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат имени: 3-25 символов и первая буква имени заглавная', 3000);
        return;
    }

    if (checkName(lastname) || lastname.length > 25 || lastname.length <= 2) {
        mp.events.call('notify', 1, 9, 'Правильный формат фамилии: 3-25 символов и первая буква фамилии заглавная', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('delchar', slot, name, lastname, pass);
});

mp.events.add('transferChar', function (slot, name, lastname, pass) {
    if (checkName(name)) {
        mp.events.call('notify', 1, 9, 'Имя не соответствует формату или слишком длинное!', 3000);
        return;
    }

    if (checkName(lastname)) {
        mp.events.call('notify', 1, 9, 'Фамилия не соответствует формату или слишком длинное!', 3000);
        return;
    }

    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
    lastButSlots = new Date().getTime();

    mp.events.callRemote('transferchar', slot, name, lastname, pass);
});

mp.events.add('spawn', function (data) {
    if (new Date().getTime() - lastButSlots < 1000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
	if (respawn != null) {
        respawn.destroy();
        respawn = null;
		lastButSlots = new Date().getTime();
		mp.events.callRemote('spawn', data);
		mp.events.call("sound.main");
    }
});

mp.events.add('buyNewSlot', function (data) {
    if (new Date().getTime() - lastButSlots < 3000) {
        mp.events.call('notify', 4, 9, "Не так быстро", 3000);
        return;
    }
	lastButSlots = new Date().getTime();
	mp.events.callRemote('donate', 8, data);
});

// events from server
mp.events.add('delCharSuccess', function (data) {
    global.auth.execute(`delchar(${data})`);
});

mp.events.add('unlockSlot', function (data) {
    global.auth.execute(`unlockSlot(${data})`);
});

mp.events.add('toslots', function (data) {
	global.auth.execute(`toslots('${data}')`);
	player.setAlpha(0);
	global.soundCEF.execute(`Volumesound(0.02);`);
	player.position = new mp.Vector3(409.69162, -998.4499, -99.0);
	setTimeout(() => {
		mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS);
		mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle, 0, parseInt(1));
		checkCamInAirCharSelect();
		CharacterCamera = mp.cameras.new('default', new mp.Vector3(415.55112, -998.34155, -99), new mp.Vector3(0,0,0), 40);
		CharacterCamera.pointAtCoord(409.69162, -998.4499, -98.5);
		CharacterCamera.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 0, true, true);
	}, 10);
	setTimeout(() => {
		mp.events.callRemote('playercharacterselectrot');
	}, 200);
});
function checkCamInAirCharSelect() {
    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAirCharSelect();
        }, 400);
    } else {
        global.auth.execute(`showslots()`);
		global.soundCEF.execute(`Volumesound(0.05);`);
		mp.events.callRemote('playercharacterselectrot');
    }
}
mp.events.add('spawnShow', function (data) {
    if (data === false) {
        if (respawn != null) {
            respawn.destroy();
            respawn = null;
        }
    }
    else {
		// CharacterCamera.destroy(true);
		// CharacterCamera = null;
	    // mp.game.cam.renderScriptCams(false, true, 0, true, false);
        respawn.execute(`set('${data}')`);
    }

    if (global.auth != null) {
        global.auth.destroy();
        global.auth = null;
    }
});
setTimeout(function () { 
	mp.game.invoke(Natives.SWITCH_OUT_PLAYER, player.handle, 0, parseInt(1));
}, 500);
// player.position = new mp.Vector3(4874.797, -4923.96, 3.2655556)
mp.events.add('ready', function () {
	mp.game.cam.renderScriptCams(false, true, 0, true, true);
	global.loggedin = true;
	mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS);
	mp.game.invoke(Natives.SWITCH_IN_PLAYER, player.handle, 0, parseInt(1));
	checkCamInAir();
	player.setAlpha(255);
    global.menuClose();
	mp.game.player.setHealthRechargeMultiplier(0);

	global.menu = mp.browsers["new"]('package://browser/menu.html');

	if (respawn != null) {
		respawn.destroy();
		respawn = null;
	}

	if (global.auth != null) {
		global.auth.destroy();
		global.auth = null;
	}
	setTimeout(() => {
		mp.events.callRemote('GetBack2');
	}, 2500);
});

function checkCamInAir() {
    if (mp.game.invoke(Natives.IS_PLAYER_SWITCH_IN_PROGRESS)) {
        setTimeout(() => {
            checkCamInAir();
        }, 400);
    } else {
        mp.events.call('showHUD', true);
    }
}

function checkLgin(str) {
    return !(/^[a-zA-Z1-9]*$/g.test(str));
}

function checkName(str) {
    return !(/^[a-zA-Z]*$/g.test(str));
}

function checkName2(str) {
    let ascii = str.charCodeAt(0);
    if (ascii < 65 || ascii > 90) return false; // Если первый символ не заглавный, сразу отказ
    let bsymbs = 0; // Кол-во заглавных символов
    for (let i = 0; i != str.length; i++) {
        ascii = str.charCodeAt(i);
        if (ascii >= 65 && ascii <= 90) bsymbs++;
    }
    if (bsymbs > 2) return false; // Если больше 2х заглавных символов, то отказ. (На сервере по правилам разрешено иметь Фамилию, например McCry, то есть с приставками).
    return true; // string (имя или фамилия) соответствует
}

mp.events.add('authNotify', (type, layout, msg, time) => {
    if(global.auth != null) global.auth.execute(`notify(${type},${layout},'${msg}',${time})`);
	else mp.events.call('notify', type, layout, msg, time);
});