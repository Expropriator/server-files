let AutoSchool;
mp.events.add('OpenSchoolMenu', () => {
	if (global.menuCheck() || AutoSchool != null) return;
    global.menuOpen();
	AutoSchool = mp.browsers.new('package://browser/modules/Autoschool/index.html');
});
mp.events.add('StartExam', (id) => {
	mp.events.call("CloseSchoolMenu");
	mp.events.callRemote("StartExam:Server", id);
});
mp.events.add('CloseSchoolMenu', () => {
	if (AutoSchool == null) return;
	AutoSchool.destroy();
	AutoSchool = null;
	global.menuClose();
	mp.events.call("NPC.cameraOff", 1500);
});