let LspdPedMenu = null
player = mp.players.local;
mp.events.add('open_LspdPedMenu', (fines, frac, workday) => {
    if (LspdPedMenu == null) {
        LspdPedMenu = mp.browsers.new("package://browser/modules/Fractions/LSPD/index.html")
		LspdPedMenu.active = true
		LspdPedMenu.execute(`LspdPedMenu.fine=${fines}`);
		LspdPedMenu.execute(`LspdPedMenu.frac=${frac}`);
		LspdPedMenu.execute(`LspdPedMenu.workday=${workday}`);
		global.menuOpen();
    } else if (LspdPedMenu.active == false){
        LspdPedMenu.active = true
		global.menuOpen();
		LspdPedMenu.execute(`LspdPedMenu.fine=${fines}`);
		LspdPedMenu.execute(`LspdPedMenu.frac=${frac}`);
		LspdPedMenu.execute(`LspdPedMenu.workday=${workday}`);
    }
});

mp.events.add('PayFines', () => {
	mp.events.callRemote("PayAllFines");
	LspdPedMenu.active = false
	global.menuClose();
	LspdPedMenu.execute('LspdPedMenu.style=0');
	LspdPedMenu = null;
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('StarWorkDayLSPD', () => {
	mp.events.callRemote("StarWorkDayLSPD");
	LspdPedMenu.active = false
	global.menuClose();
	LspdPedMenu.execute('LspdPedMenu.style=0');
	LspdPedMenu = null;
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('DropNelegal', () => {
	mp.events.callRemote("DropAllNelegal");
	LspdPedMenu.active = false
	global.menuClose();
	LspdPedMenu.execute('LspdPedMenu.style=0');
	LspdPedMenu = null;
	mp.events.call("NPC.cameraOff", 1500);
});

mp.events.add('CloseLspdPedMenu', () => {
    LspdPedMenu.active = false
	global.menuClose();
	LspdPedMenu.execute('LspdPedMenu.style=0');
	LspdPedMenu = null;
	mp.events.call("NPC.cameraOff", 1500);
});


let WantedMenu = null
mp.events.add("wantedClose", () => { 
	global.menuClose(); 
	WantedMenu.active = false
	WantedMenu = null
});

mp.events.add("SendWanted", (title, time, stars, coment) => {
	mp.events.callRemote("SendWanted", title, time, stars, coment); 
	mp.events.call("wantedClose");
});

mp.events.add("OpenWantedMenu", (title) => { 
	if (global.menuCheck()) return; 
	WantedMenu = mp.browsers.new("package://browser/modules/Fractions/LSPD/wanted/wanted.html")
	WantedMenu.execute(`wanted.offender=${title}`); 
	global.menuOpen();
});