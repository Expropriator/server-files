let changeclothes = null
let changeclothescam = null
player = mp.players.local;
mp.events.add('OpenClothesChange', (data, name, fracid) => {
    if (changeclothes == null) {
        changeclothes = mp.browsers.new("package://browser/modules/Fractions/ChangeClothes/index.html")
        mp.gui.cursor.show(true, true)
		changeclothes.active = true
		changeclothes.execute(`changeclothes.name = ${JSON.stringify(name)}`);
		changeclothes.execute(`changeclothes.items = ${JSON.stringify(data)}`);
		global.menuOpen();
		CameraChangeClothes(fracid);
		global.playerheading.startveh(mp.players.local);
    } else if (changeclothes.active == false){
        mp.gui.cursor.show(true, true)
		changeclothes.active = true
		changeclothes.execute(`changeclothes.name = ${JSON.stringify(name)}`);
		changeclothes.execute(`changeclothes.items = ${JSON.stringify(data)}`);
		global.menuOpen();
		CameraChangeClothes(fracid);
		global.playerheading.startveh(mp.players.local);
    }
});

function CameraChangeClothes(id)
{
	if (id == 6) {
		player.position = new mp.Vector3(-571.0057, -195.54567, 38.17885);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(-573.7934, -197.00546, 39.4885), new mp.Vector3(0,0,0), 35);
		changeclothescam.pointAtCoord(-571.0057, -195.54567, 38.04884);
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
	if (id == 8) {
		player.position = new mp.Vector3(298.6097, -598.26526, 43.284093);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(300.8047, -598.9901, 44.471152), new mp.Vector3(0,0,0), 45);
		changeclothescam.pointAtCoord(298.6097, -598.26526, 43.254093);	
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
	if (id == 7) {
		player.position = new mp.Vector3(463.5568, -999.0581, 30.699565);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(461.12445, -998.9995, 31.569565), new mp.Vector3(0,0,0), 45);
		changeclothescam.pointAtCoord(463.5568, -999.0581, 30.799565);
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
	if (id == 9) {
		player.position = new mp.Vector3(2518.5847, -340.4426, 101.893346);
		changeclothescam = mp.cameras.new('default', new mp.Vector3(2517.0728, -342.20483, 102.763346), new mp.Vector3(0,0,0), 45);
		changeclothescam.pointAtCoord(2518.5847, -340.4426, 101.993346);
		changeclothescam.setActive(true);
		mp.game.cam.renderScriptCams(true, true, 1200, true, false);
		localplayer.freezePosition(true);
	}
}

mp.events.add('SetFracClothes', (index) => {
	mp.events.callRemote("SetFracClothes", index);
});

mp.events.add('CloseFracClothes', () => {
    changeclothes.active = false
	player.dimension = 0;
    mp.gui.cursor.show(false, false)
	changeclothes.execute('changeclothes.style=0');
	mp.events.callRemote("SetEntityDimensionOnClient", 0);
	changeclothes.execute(`changeclothes.items=null`);
	changeclothes.execute(`changeclothes.name=null`);
	global.menuClose();
	localplayer.freezePosition(false);
	mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	changeclothescam.destroy(true);
    changeclothescam = null;
	global.playerheading.stop();
});

let camerabunker = null
mp.events.add('ExitBunkerScenario', () => {
	let vehiclebunk = mp.players.local.vehicle;
	camerabunker = mp.cameras.new('default', new mp.Vector3(890.7814, -3243.798, -96.04867), new mp.Vector3(0,0,0), 45);
	camerabunker.pointAtCoord(916.3268, -3248.1023, -97.36505);
	camerabunker.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 0, true, false);
	localplayer.taskVehicleDriveToCoord(vehiclebunk.handle, 928.0663, -3244.8765, -97.24042, 30, 1, vehiclebunk.getLayoutHash(), 16777216, 1, true)
});

mp.events.add('ExitBunkerScenarioDestroy', () => {
	mp.game.cam.renderScriptCams(false, true, 0, true, false);
	camerabunker.destroy(true);
    camerabunker = null;
});