let GopostalMenu;
mp.events.add('OpenJobGopostalMenu', (workid) => {
	if (global.menuCheck() || GopostalMenu != null) return;
    global.menuOpen();
	GopostalMenu = mp.browsers.new('package://browser/modules/Jobs/Gopostal/index.html');
	GopostalMenu.execute(`Gopostal.workid=${workid}`)
});
mp.events.add('ChangeWorkDayGopostal', () => {
	mp.events.call("CloseMenuGopostal");
	mp.events.callRemote("Server::GoPostalCases", "start");
});

mp.events.add('TakePocketsGoPostal', () => {
	mp.events.call("CloseMenuGopostal");
	mp.events.callRemote("Server::GoPostalCases", "get");
});
mp.events.add('CloseMenuGopostal', () => {
	if (GopostalMenu == null) return;
	GopostalMenu.destroy();
	GopostalMenu = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});