// global.rebind = mp.browsers["new"]('package://browser/modules/PlayerMenu/index.html');
global.rebindBrowser = mp.browsers["new"]('package://browser/modules/PlayerMenu/Rebinder/RebinderBrowser/index.html');
// global.rebind.active = false;
		
global.keys = [
    76,
    73,
    85,
    77,
    88,
    54,
    66,
    75,
];

global.keyses = [
    {id: 48, key: "0"},
    {id: 49, key: "1"},
    {id: 50, key: "2"},
    {id: 51, key: "3"},
    {id: 52, key: "4"},
    {id: 53, key: "5"},
    {id: 54, key: "6"},
    {id: 55, key: "7"},
    {id: 56, key: "8"},
    {id: 57, key: "9"},

    {id: 65, key: "A"},
    {id: 66, key: "B"},
    {id: 67, key: "C"},
    {id: 68, key: "D"},
    {id: 69, key: "E"},
    {id: 70, key: "F"},
    {id: 71, key: "G"},
    {id: 72, key: "H"},
    {id: 73, key: "I"},
    {id: 74, key: "J"},
    {id: 75, key: "K"},

    {id: 76, key: "L"},
    {id: 77, key: "M"},
    {id: 78, key: "N"},
    {id: 79, key: "O"},

    {id: 80, key: "P"},
    {id: 81, key: "Q"},
    {id: 82, key: "R"},
    {id: 83, key: "S"},

    {id: 84, key: "T"},
    {id: 85, key: "U"},
    {id: 86, key: "V"},
    {id: 87, key: "W"},

    {id: 88, key: "X"},
    {id: 89, key: "Y"},
    {id: 90, key: "Z"},
    {id: 91, key: "S"},
    {id: 189, key: "-"},
    {id: 187, key: "="}
]

mp.events.add("REBINDERKEYS", () => {
    global.rebindBrowser.execute(`rebindBrowser.active=true`);
    if(mp.storage.data.rebindkeys == undefined){
        mp.storage.data.rebindkeys = {
            OpenCarDoor: 76,
            OpenInventory: 73,
            OpenAnimMenu: 85,
            OpenPhone: 77,
            HandCuff: 88,
            CruiseControl: 54,
            StartEngineVehicle: 66,
            safetyBelt: 75
        };
    }
    setTimeout(() => {
        global.keys[0] = mp.storage.data.rebindkeys.OpenCarDoor
        global.keys[1] = mp.storage.data.rebindkeys.OpenInventory
        global.keys[2] = mp.storage.data.rebindkeys.OpenAnimMenu
        global.keys[3] = mp.storage.data.rebindkeys.OpenPhone
        global.keys[4] = mp.storage.data.rebindkeys.HandCuff
        global.keys[5] = mp.storage.data.rebindkeys.CruiseControl
        global.keys[6] = mp.storage.data.rebindkeys.StartEngineVehicle
        global.keys[7] = mp.storage.data.rebindkeys.safetyBelt
		
		mp.gui.execute(`HUD.addKeysInList('${global.keyses.find(v => v.id === global.keys[0]).key}','${global.keyses.find(v => v.id === global.keys[1]).key}','${global.keyses.find(v => v.id === global.keys[2]).key}','${global.keyses.find(v => v.id === global.keys[3]).key}','${global.keyses.find(v => v.id === global.keys[4]).key}', '${global.keyses.find(v => v.id === global.keys[5]).key}','${global.keyses.find(v => v.id === global.keys[6]).key}','${global.keyses.find(v => v.id === global.keys[7]).key}');`);
    }, 1500);
});

global.playermenu = mp.browsers.new('package://browser/modules/PlayerMenu/index.html');;

var bool = false;

mp.keys.bind(Keys.VK_F2, false, function () {
	if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('InDeath') == true) return;
    
    if (bool == false) {
		if (global.menuCheck() )return;
			mp.events.callRemote("REMOTE::LOAD_PROPERTIES_INFO_TO_BOARD");
			playermenu.execute(`playermenu.active=true`);
			playermenu.execute(`playermenu.style=0`);
			playermenu.execute(`playermenu.modal=0`);
			mp.events.call("BOARD::GET_ASSETS_INFO");
			bool = true;
			// roulette = true;
			playermenu.execute(`playermenu.addKeysInList('${global.keyses.find(v => v.id === global.keys[0]).key}','${global.keyses.find(v => v.id === global.keys[1]).key}','${global.keyses.find(v => v.id === global.keys[2]).key}','${global.keyses.find(v => v.id === global.keys[3]).key}','${global.keyses.find(v => v.id === global.keys[4]).key}', '${global.keyses.find(v => v.id === global.keys[5]).key}','${global.keyses.find(v => v.id === global.keys[6]).key}','${global.keyses.find(v => v.id === global.keys[7]).key}');`);
			// mp.events.callRemote("REMOTE::LOAD_PROPERTIES_INFO_TO_BOARD");
			mp.gui.cursor.show(true, true);
			menuOpen();
			mp.events.callRemote("r:SendCasePrize");
    }
	 else
	 {
		menuClose();
		mp.gui.cursor.show(false, false);
		playermenu.execute(`playermenu.active=false`);
		mp.events.call('r:rouletteClose');
		bool = false;
	 }
})

mp.events.add("saveRebindKeys", (OpenInventory, OpenAnimMenu, OpenPhone, OpenCarDoor, CruiseControl, StartEngineVehicle, safetyBelt, HandCuff) => {
    global.keys[0] = OpenCarDoor
    global.keys[1] = OpenInventory
    global.keys[2] = OpenAnimMenu
    global.keys[3] = OpenPhone
    global.keys[4] = HandCuff
    global.keys[5] = CruiseControl
    global.keys[6] = StartEngineVehicle
    global.keys[7] = safetyBelt

    mp.storage.data.rebindkeys = {
        OpenCarDoor: OpenCarDoor,
        OpenInventory: OpenInventory,
        OpenAnimMenu: OpenAnimMenu,
        OpenPhone: OpenPhone,
        HandCuff: HandCuff,
        CruiseControl: CruiseControl,
        StartEngineVehicle: StartEngineVehicle,
        safetyBelt: safetyBelt
    };
	mp.gui.execute(`HUD.addKeysInList('${global.keyses.find(v => v.id === global.keys[0]).key}','${global.keyses.find(v => v.id === global.keys[1]).key}','${global.keyses.find(v => v.id === global.keys[2]).key}','${global.keyses.find(v => v.id === global.keys[3]).key}','${global.keyses.find(v => v.id === global.keys[4]).key}', '${global.keyses.find(v => v.id === global.keys[5]).key}','${global.keyses.find(v => v.id === global.keys[6]).key}','${global.keyses.find(v => v.id === global.keys[7]).key}');`);
    // mp.events.call('notify', 0, 2, "Вы успешно изменили настройки клавиш.", 5000);
});

mp.events.add("CheckKeyses", (key) => {
    switch(key){
        case global.keys[0]:
            mp.events.call("openCarDoor")
        break;
        case global.keys[1]:
            mp.events.call("openInventory")
        break;
        case global.keys[2]:
            mp.events.call("openAnimMenu")
        break;
        case global.keys[3]:
            mp.events.call("openPhoneMenu")
        break;
        case global.keys[4]:
            mp.events.call("cuffPlayerKey")
        break;
        case global.keys[5]:
            mp.events.call("cruiseControlKey")
        break;
        case global.keys[6]:
            mp.events.call("startEngineCar")
        break;
        case global.keys[7]:
            mp.events.call("safetyBeltKey")
        break;
    }
});
mp.events.add('client::buydonate', (id) => {
	mp.events.callRemote("server::buydonate", id);
});
let roulette;
let caseid;

mp.events.add('r:SendCasePrize', (prize,money) => {
    playermenu.execute(`playermenu.prizes=${prize}`);
    playermenu.execute(`playermenu.money=${money}`);
})
mp.events.add('r:setcase', (c) => {
    playermenu.execute(`playermenu.setCase(${c})`)
});
mp.events.add('r:getCase', (c) => {
    caseid = c;
    mp.events.callRemote('r:GetCase', c);
});
mp.events.add('r:getWinId', (type) => {
    mp.events.callRemote('r:getWinId', type, 1);
});
mp.events.add('r:getprize', (type, id) => {
    if (caseid == undefined) return;
    mp.events.callRemote('r:getPrize', type, id, caseid);
});
mp.events.add('r:getWinIdCallback', (e, type) => {
	playermenu.execute(`playermenu.getWinIdCallback(${e},'${type}')`);
});

mp.events.add('HelpMenu:SendNotify', (type, layout, msg, time)=>{
    if (roulette != null) roulette.execute(`notify(${type},${layout},'${msg}',${time})`);
});
mp.events.add('r:rouletteClose', () => {
    if (roulette != null) {
        roulette.destroy();
        roulette = null;
    }
    global.menuClose();
    mp.gui.cursor.visible = false;
})
// mp.events.add("Client:ReceiveAllWorkLevels", (jsonLevels) => {
//     const levels = JSON.parse(jsonLevels);
//     console.log("Уровни работ:", levels);
//     playermenu.execute(`playermenu.workLevels = ${JSON.stringify(levels)}`);
// });





// window.addEventListener("DOMContentLoaded", () => {
//     const workLevelsContainer = document.getElementById("workLevels");
//     if (workLevelsContainer) {
//         workLevelsContainer.innerHTML = `
//             <div>
//                 <strong>Электрик</strong><br>
//                 Уровень: 2<br>
//                 Опыт: 15 / 30<br>
//                 Максимум: 5<br>
//                 Очки: 50
//             </div>
//         `;
//     }
// });

