mp.events.add("openElectricianMenu", () => {
    if (!loggedin || chatActive || editing || cuffed) return;
    global.menuOpen();
    global.menuElectrician = mp.browsers.new('package://browser/modules/Jobs/Electrician/index.html');
    global.menuElectrician.active = true;
    global.menuElectrician.execute(`initGame()`);
});

mp.events.add("closeElectricianMenu", (success) => {
    global.menuClose();
    global.menuElectrician.active = false;
    global.menuElectrician.destroy();
    mp.events.callRemote("electricianJobEnd", success);
});

mp.keys.bind(Keys.VK_ESCAPE, false, function () {
    if (global.menuElectrician) {
        global.menuClose();
        global.menuElectrician.active = false;
        global.menuElectrician.destroy();
    }
});