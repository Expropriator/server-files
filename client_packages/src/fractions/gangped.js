let GangPedMenu = null
let ContractsCreate = null
player = mp.players.local;
mp.events.add('open_GangPedMenu', (id, fracid, header) => {
    if (GangPedMenu == null) {
        GangPedMenu = mp.browsers.new("package://browser/modules/Fractions/GANG/index.html")
		global.menuOpen();
		GangPedMenu.execute(`GangPedMenu.fracid=${fracid}`);
		GangPedMenu.execute(`GangPedMenu.pedtype=${id}`);
		GangPedMenu.execute(`GangPedMenu.header=${JSON.stringify(header)}`);
		mp.events.call('showHUD', false);
		localplayer.freezePosition(true);
    } else if (GangPedMenu.active == false){
        GangPedMenu.active = true
		GangPedMenu.execute(`GangPedMenu.fracid=${fracid}`);
		GangPedMenu.execute(`GangPedMenu.pedtype=${id}`);
		GangPedMenu.execute(`GangPedMenu.header=${JSON.stringify(header)}`);
		localplayer.freezePosition(true);
		global.menuOpen();
    }
});

mp.events.add('StarHijacking', () => {
	mp.events.callRemote("StartHijackingOnBand");
	mp.events.call("CloseGangPedMenu");
});

mp.events.add('StarHijackingHouse', () => {
	mp.events.callRemote("StarHijackingHouse");
	mp.events.call("CloseGangPedMenu");
});

mp.events.add('CloseGangPedMenu', () => {
    GangPedMenu.active = false
	GangPedMenu.execute('GangPedMenu.style=0');
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
	localplayer.freezePosition(false);
    GangPedMenu = null;
});


mp.events.add('client::closecontracts', () => {
    ContractsCreate.active = false
	ContractsCreate.execute('Contracts.style=0');
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
	localplayer.freezePosition(false);
    ContractsCreate = null;
});

mp.events.add('openConractKillMenu', () => {
    if (ContractsCreate == null) {
        ContractsCreate = mp.browsers.new("package://browser/modules/CreateContr/index.html")
		global.menuOpen();
		mp.events.call('showHUD', false);
		localplayer.freezePosition(true);
    } else if (ContractsCreate.active == false){
        ContractsCreate.active = true
		localplayer.freezePosition(true);
		global.menuOpen();
    }
});