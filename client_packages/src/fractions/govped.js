let GovPedMenu = null
player = mp.players.local;
mp.events.add('open_GovPedMenu', (fracid, name, surname, pricefishlic, workdaystatus) => {
    if (GovPedMenu == null) {
        GovPedMenu = mp.browsers.new("package://browser/modules/Fractions/GOV/index.html")
		global.menuOpen();
		GovPedMenu.execute(`GovPedMenu.fracid=${fracid}`);
		GovPedMenu.execute(`GovPedMenu.namep=${JSON.stringify(name)}`);
		GovPedMenu.execute(`GovPedMenu.surnamep=${JSON.stringify(surname)}`);
		GovPedMenu.execute(`GovPedMenu.price=${pricefishlic}`);
		GovPedMenu.execute(`GovPedMenu.workdaystatus=${workdaystatus}`);
		mp.events.call('showHUD', false);
		localplayer.freezePosition(true);
    } else if (GovPedMenu.active == false){
        GovPedMenu.active = true
		GovPedMenu.execute(`GovPedMenu.fracid=${fracid}`);
		GovPedMenu.execute(`GovPedMenu.namep=${JSON.stringify(name)}`);
		GovPedMenu.execute(`GovPedMenu.surnamep=${JSON.stringify(surname)}`);
		GovPedMenu.execute(`GovPedMenu.price=${pricefishlic}`);
		GovPedMenu.execute(`GovPedMenu.workdaystatus=${workdaystatus}`);
		localplayer.freezePosition(true);
		global.menuOpen();
    }
});

mp.events.add('BuyFishLic', () => {
	mp.events.callRemote("BuyFishLic");
	mp.events.call("CloseGovPedMenu");
});

mp.events.add('BuyWeapLic', () => {
	mp.events.callRemote("BuyWeapLic");
	mp.events.call("CloseGovPedMenu");
});

mp.events.add('StartWorkDayGov', () => {
	mp.events.callRemote("StartWorkDayGov");
	mp.events.call("CloseGovPedMenu");
});

mp.events.add('CloseGovPedMenu', () => {
    GovPedMenu.active = false
	GovPedMenu.execute('GovPedMenu.style=0');
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
	localplayer.freezePosition(false);
    GovPedMenu = null;
});