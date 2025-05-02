let EmsPedMenu = null
player = mp.players.local;
mp.events.add('open_EmsPedMenu', (fracid, name, surname, pricefishlic, workdaystatus, hp) => {
    if (EmsPedMenu == null) {
        EmsPedMenu = mp.browsers.new("package://browser/modules/Fractions/EMS/index.html")
		global.menuOpen();
		EmsPedMenu.execute(`EmsPedMenu.fracid=${fracid}`);
		EmsPedMenu.execute(`EmsPedMenu.namep=${JSON.stringify(name)}`);
		EmsPedMenu.execute(`EmsPedMenu.surnamep=${JSON.stringify(surname)}`);
		EmsPedMenu.execute(`EmsPedMenu.price=${pricefishlic}`);
		EmsPedMenu.execute(`EmsPedMenu.workdaystatus=${workdaystatus}`);
		EmsPedMenu.execute(`EmsPedMenu.hp=${hp}`);
		mp.events.call('showHUD', false);
		localplayer.freezePosition(true);
    } else if (EmsPedMenu.active == false){
        EmsPedMenu.active = true
		EmsPedMenu.execute(`EmsPedMenu.fracid=${fracid}`);
		EmsPedMenu.execute(`EmsPedMenu.namep=${JSON.stringify(name)}`);
		EmsPedMenu.execute(`EmsPedMenu.surnamep=${JSON.stringify(surname)}`);
		EmsPedMenu.execute(`EmsPedMenu.price=${pricefishlic}`);
		EmsPedMenu.execute(`EmsPedMenu.workdaystatus=${workdaystatus}`);
		EmsPedMenu.execute(`EmsPedMenu.hp=${hp}`);
		localplayer.freezePosition(true);
		global.menuOpen();
    }
});

mp.events.add('GetHealthEms', () => {
	mp.events.callRemote("GetHealthEms");
	mp.events.call("CloseEmsPedMenu");
});

mp.events.add('StartWorkDayEms', () => {
	mp.events.callRemote("StartWorkDayEms");
	mp.events.call("CloseEmsPedMenu");
});

mp.events.add('CloseEmsPedMenu', () => {
    EmsPedMenu.active = false
	EmsPedMenu.execute('EmsPedMenu.style=0');
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
	localplayer.freezePosition(false);
    EmsPedMenu = null;
});