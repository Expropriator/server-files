let FibPedMenu = null
player = mp.players.local;
mp.events.add('open_FibPedMenu', (fracid, name, surname, workdaystatus) => {
    if (FibPedMenu == null) {
        FibPedMenu = mp.browsers.new("package://browser/modules/Fractions/FIB/index.html")
		FibPedMenu.active = true
		FibPedMenu.execute(`FibPedMenu.fracid=${fracid}`);
		FibPedMenu.execute(`FibPedMenu.namep=${JSON.stringify(name)}`);
		FibPedMenu.execute(`FibPedMenu.surnamep=${JSON.stringify(surname)}`);
		FibPedMenu.execute(`FibPedMenu.workdaystatus=${workdaystatus}`);
		global.menuOpen();
    } else if (FibPedMenu.active == false){
        FibPedMenu.active = true
		global.menuOpen();
		FibPedMenu.execute(`FibPedMenu.fracid=${fracid}`);
		FibPedMenu.execute(`FibPedMenu.namep=${JSON.stringify(name)}`);
		FibPedMenu.execute(`FibPedMenu.surnamep=${JSON.stringify(surname)}`);
		FibPedMenu.execute(`FibPedMenu.workdaystatus=${workdaystatus}`);
    }
});

mp.events.add('DropNelegalFib', () => {
	mp.events.callRemote("DropAllNelegal");
	FibPedMenu.active = false
	global.menuClose();
	FibPedMenu.execute('FibPedMenu.style=0');
	FibPedMenu = null;
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('CloseFibPedMenu', () => {
    FibPedMenu.active = false
	FibPedMenu.execute('FibPedMenu.style=0');
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
	localplayer.freezePosition(false);
    FibPedMenu = null;
});

mp.events.add('StartWorkDayfib', () => {
	mp.events.callRemote("StartWorkDayGov");
	mp.events.call("CloseFibPedMenu");
});
