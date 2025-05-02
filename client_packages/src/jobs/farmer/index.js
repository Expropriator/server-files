
global.needped[0] = mp.peds.new(0x6C9B2849, new mp.Vector3(-607.50726, 5794.2153, 30.10518), -48, 0); //Голем

mp.events.add("openJobsMenu", (json) => {
	if (!loggedin || chatActive || editing || cuffed) return;
	global.menuOpen();
	global.menuJobs = mp.browsers.new('package://browser/modules/Jobs/Farmer/index.html');
	global.menuJobs.active = true;
	global.menuJobs.execute(`menuJobs.active=true`);
	global.menuJobs.execute(`menuJobs.setinfo(${json})`);
	
	mp.game.audio.playAmbientSpeechWithVoice(global.needped[0].handle, 'GENERIC_HI', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
	
	MushCam = mp.cameras.new('default', new mp.Vector3(-606.2814, 5795.4487, 30.651908), new mp.Vector3(0,0,0), 25);
	MushCam.setRot(0.0, 0, 135, 2);
	MushCam.setActive(true);
	mp.game.cam.renderScriptCams(true, true, 1200, true, false);
	localplayer.freezePosition(true);
	player.setAlpha(0);
});
mp.events.add("closeJobsMenu", () => {
	global.menuClose();
	global.menuJobs.active = false;
	// global.menuJobs.destroy();
	
	MushCam.destroy(true);
    MushCam = null;
	mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	localplayer.freezePosition(false);
	player.setAlpha(255);
	
	mp.game.audio.playAmbientSpeechWithVoice(global.needped[0].handle, 'GENERIC_BYE', '', 'SPEECH_PARAMS_FORCE_SHOUTED', false);
});

mp.events.add("changeWorkState", (state, name) => {
	mp.events.callRemote("workstate", state, name);
	global.menuClose();
	global.menuJobs.active = false;
	
	MushCam.destroy(true);
	MushCam = null;
	mp.game.cam.renderScriptCams(false, true, 1000, true, false);
	localplayer.freezePosition(false);
	player.setAlpha(255);
});

var plantBlips = [];
var plantMarkers = [];
mp.events.add('createPlant', function (uid, names, type, position, scale, dimension, r, g, b) {
	try
	{
		if (typeof plantBlips[uid] != "undefined") {
        plantBlips[uid].destroy();
        plantBlips[uid] = undefined;
		}
		if (typeof plantMarkers[uid] != "undefined") {
			plantMarkers[uid].destroy();
			plantMarkers[uid] = undefined;
		}
		plantBlips[uid] = mp.blips.new(type, position,
				{
					name: names,
					scale: 1,
					color: 4,
					alpha: 0,
					drawDistance: 100,
					shortRange: false,
					rotation: 0,
					dimension: dimension
				});
		plantMarkers[uid] = mp.markers.new(type, position, scale,
				{
					visible: true,
					dimension: dimension,
					color: [r, g, b, 0]
				});
	}
	catch {}
});
mp.events.add('deletePlant', function (uid) {
    if (typeof plantBlips[uid] == "undefined") return;
    plantBlips[uid].destroy();
    plantBlips[uid] = undefined;
	if (typeof plantMarkers[uid] == "undefined") return;
    plantMarkers[uid].destroy();
    plantMarkers[uid] = undefined;
});