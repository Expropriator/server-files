//ALL BUGS
//FIXLATER

// const movementClipSet = "move_ped_crouched";
// const strafeClipSet = "move_ped_crouched_strafing";
// const clipSetSwitchTime = 0.25;

// function sleep(ms) {
  // return new Promise(resolve => setTimeout(resolve, ms));
// }

// const loadClipSet = (clipSetName) => {
    // mp.game.streaming.requestClipSet(clipSetName);
    // while (!mp.game.streaming.hasClipSetLoaded(clipSetName)) mp.game.wait(0);
// };
// var snowboarddest = false


// mp.events.add('entityStreamIn', (entity) => {
  // if(entity.type != "player") return;
  // if(entity.getVariable('skate')) attachsnowboard(entity)
// });
// mp.events.add('entityStreamOut', (entity) => {
  // if(entity.type != "player") return;
  // if(entity.getVariable('skate')) dettach2(entity);
// });

// mp.events.addDataHandler("skate", (entity, value) => {
  // if(entity.type != "player") return;
  // if(!value) dettach2(entity);
  // else attachsnowboard(entity)
// });

// mp.events.add('entityStreamIn', (entity) => {
  // if(entity.type != "player" && entity.type != "vehicle") return;
  // if(entity.getVariable('skate')) entity.setAlpha(0)
// });

// mp.events.addDataHandler("skate", (entity, value) => {
  // if(entity.type != "player" && entity.type != "vehicle") return;
  // if(!value) return;
  // entity.setAlpha(0)
// });

// loadClipSet(movementClipSet);
// loadClipSet(strafeClipSet);
// let IsInSnowboard = false;
// let spacepressed = false;
// let spacenonpress = false;
// let snowboard = {
    // enter: function() {
        // IsInSnowboard = true;
		// mp.gui.execute(`HUD.startsnowboard=false`);
		// mp.gui.execute(`HUD.stopsnowboard=true`);
        // mp.events.callRemote('startSnowboard');
    // },
    // exit: function(entity) {
		// if (IsInSnowboard) {
			// snowboarddest = true;
			// mp.events.callRemote('StopSnowMisson');
			// dettach(entity);
			// spacepressed = false;
			// spacenonpress = false;
			// IsInSnowboard = false;
			// mp.gui.execute(`HUD.stopsnowboard=false`);
		// }
    // },
// };
// mp.events.add('stopsnowboarddest', function () {
	// snowboarddest = false;
// });
// mp.events.add('client:StartSnowBoard', function () {
    // snowboard.enter();
// });

// mp.events.add('client:stopSnowBoard', function () {
    // if (IsInSnowboard) {
		// snowboard.exit(mp.players.local);
    // }
// });	
// const boardprop = mp.game.joaat("snowboard1")

// mp.events.add('render', function () {
    // if (localplayer.isInAnyVehicle(false)) {
		// if (localplayer.vehicle.getVariable("skate")) {
		  // mp.game.controls.disableControlAction(0, 75, true);
		  // mp.game.controls.disableControlAction(2, 137, true);
		// }
	// }
// });

// mp.events.add("render", () => {
  // if(!mp.players.local.skate) return;
  // if(!mp.players.local.vehicle){
	// snowboard.exit(mp.players.local);
    // return;
  // }
		
// })

// mp.events.add("render", () => {
  // if (localplayer.getVariable("SnowboardAttached") == true) {
	  // mp.gui.execute(`HUD.startsnowboard=true`);
      // mp.game.controls.disableControlAction(0, 75, true);
      // mp.game.controls.disableControlAction(0, 22, true);
      // mp.game.controls.disableControlAction(0, 21, true);
      // mp.game.controls.disableControlAction(0, 49, true);
    // }
	// if (localplayer.getVariable("SnowboardAttached") == false) {
	  // mp.gui.execute(`HUD.startsnowboard=false`);
    // }	
// })
// mp.events.add("render", () => {
	// if (localplayers.getVariable("carrystate")) {
	  // mp.game.controls.disableControlAction(0, 75, true);
      // mp.game.controls.disableControlAction(0, 22, true);
      // mp.game.controls.disableControlAction(0, 21, true);
      // mp.game.controls.disableControlAction(0, 49, true);
	// }
// })
// async function attachsnowboard(player, first = true){
  // if (!loggedin || chatActive || editing) return;
  // if (snowboarddest) return;
  // await sleep(100)
  // if (snowboarddest) return;
  // if (player.vehicle != null) {
	// player.vehicle.setAlpha(0)
  // }
  // mp.gui.execute(`HUD.inVeh=0`)
  // if (player.vehicle != null) {
	// player.skate.objveh = player.vehicle
  // }
  // if(!player.skate.objped) player.skate.objped = mp.peds.new(player.model, player.position, 0, player.dimension)
  // if(first) player.skate.objped.setVisible(false, false);
  // player.skate.objveh.setNoCollision(player.skate.objped.handle, false)
  // if(!first) return;
  // setTimeout(() => {
    // attachsnowboard(player, false);
  // }, 1000)
  // while(player.handle && player.skate && player.skate.objped){
	// if (snowboarddest) return;
    // await sleep(1000);
	// if (snowboarddest) return;
    // if(!player.skate.objped.isPlayingAnim("move_strafe@stealth", "idle", 3) && !spacepressed) player.skate.objped.taskPlayAnim("move_strafe@stealth", "idle", 8.0, -8, -1, 9, 0, false, false, false)
  // }
// }

// function dettach(player){
  // if (player.skate.objped) player.skate.objped.destroy();
  // player.skate = null;
// }

// function dettach2(player){
  // if (!loggedin || chatActive || editing) return;
  // if (!player.skate) return;
  // snowboarddest = true;
// }

// mp.keys.bind(Keys.VK_SPACE, true, () => {
	// if (IsInSnowboard) {
		// spacenonpress = false
		// setTimeout(() => {
			// if (!spacenonpress) {
				// spacepressed = true;
				// localplayer.skate.objped.clearTasksImmediately()
				// localplayer.skate.objped.setMovementClipset(movementClipSet, clipSetSwitchTime);
				// localplayer.skate.objped.setStrafeClipset(strafeClipSet);
			// }
		// }, 50);
	// }
// });

// mp.keys.bind(Keys.VK_SPACE, false, () => {
	// if (IsInSnowboard) {
		// spacenonpress = true;
		// spacepressed = false;
		// localplayer.skate.objped.resetMovementClipset(clipSetSwitchTime);
		// localplayer.skate.objped.resetStrafeClipset();
		// player.skate.objped.taskPlayAnim("move_strafe@stealth", "idle", 8.0, -8, -1, 9, 0, false, false, false)
	// }
// });

// mp.keys.bind(Keys.VK_X, false, () => {
	// if (localplayer.getVariable("SnowboardAttached") == true) {
		// snowboard.enter();
		// mp.gui.execute(`HUD.startsnowboard=false`);
		// mp.events.callRemote("Unactivesnowboarditem")
	// }
// });

// mp.keys.bind(Keys.VK_E, false, () => {
	// if (IsInSnowboard) {
		// snowboard.exit(mp.players.local);
		// return;
	// }
// });

// mp.events.add("giveparachute", () => {
	// mp.game.invoke(getNative("GIVE_WEAPON_TO_PED"), localplayer.handle, -72657034, 150, true, true);
// });

// mp.events.add("LeaveSnowboardServer", () => {
	// if (IsInSnowboard) {
		// snowboard.exit(mp.players.local);
		// return;
	// }
// });

// mp.events.add('client:snow:status', (status) => {
    // IsInSnowboard = status;
// });


mp.objects.new(118627012, new mp.Vector3(223.75413513183594, -898.2467041015625, 29.69229507446289), { rotation: new mp.Vector3(0, 0, 0)}); // main tree
mp.objects.new(579156093, new mp.Vector3(227.43310546875, -896.32666015625, 31.017484664916992), { rotation: new mp.Vector3(0, 0, 0)});
mp.objects.new(388143302, new mp.Vector3(227.1011199951172, -895.8756713867188, 31.311553955078125), { rotation: new mp.Vector3(-57.908416748046875, -0.34047794342041016, -0.4018842875957489)});
mp.objects.new(2596205386, new mp.Vector3(226.42324829101562, -894.9705810546875, 31.017484664916992), { rotation: new mp.Vector3(0, 0, 0)});
mp.objects.new(2223607550, new mp.Vector3(227.01446533203125, -895.132080078125, 31.0197696685791), { rotation: new mp.Vector3(0, 0, 0)});
mp.objects.new(1840863642, new mp.Vector3(226.44422912597656,-895.5636596679688, 31.137483596801758), { rotation: new mp.Vector3(0, 0, 3.68159930985712e-7)});
mp.objects.new(4283117964, new mp.Vector3(225.40365600585938,-894.0590209960938, 31.017484664916992), { rotation: new mp.Vector3(0, 0, 90.00007629394531)});
mp.objects.new(1022578470, new mp.Vector3(225.15167236328125,-893.9659423828125, 31.220783233642578), { rotation: new mp.Vector3(0, 0, 90)});
mp.objects.new(3770126145, new mp.Vector3(223.9942169189453,-893.45166015625, 31.01761245727539), { rotation: new mp.Vector3(0, 0, -179.99989318847656)});
mp.objects.new(1301925404, new mp.Vector3(224.63548278808594,-893.46240234375, 31.030635833740234), { rotation: new mp.Vector3(0, 0, 90)});
mp.objects.new(384965730, new mp.Vector3(224.74957275390625,-894.2634887695312, 31.017484664916992), { rotation: new mp.Vector3(0, 0, -179.99989318847656)});
mp.objects.new(2402448418, new mp.Vector3(222.94400024414062,-893.8110961914062, 31.017484664916992), { rotation: new mp.Vector3(0, 0, 0)});
mp.objects.new(388143302, new mp.Vector3(225.803466796875,-894.590087890625, 31.06805419921875), { rotation: new mp.Vector3(0, 0, -179.99989318847656)});
mp.objects.new(809669486, new mp.Vector3(223.21324157714844,-893.0670776367188, 31.032052993774414), { rotation: new mp.Vector3(0, 0, -179.99989318847656)});


mp.objects.new(1544445682, new mp.Vector3(217.9998016357422,-877.1159057617188, 29.49209976196289), { rotation: new mp.Vector3(0, 0, 104.49956512451172)}); //decor
mp.objects.new(2012837021, new mp.Vector3(218.4585723876953,-878.99755859375, 29.49209976196289), { rotation: new mp.Vector3(0, 0, 0)});
mp.objects.new(176971574, new mp.Vector3(217.59341430664062,-877.1614379882812, 30.925251007080078), { rotation: new mp.Vector3(84.8873291015625, -53.823307037353516, 154.34521484375)});
mp.objects.new(2677555217, new mp.Vector3(217.49267578125,-875.2236938476562, 29.49209976196289), { rotation: new mp.Vector3(0, 0, -116.49864959716797)});
mp.objects.new(2677555217, new mp.Vector3(238.3955841064453,-895.0291137695312, 29.49209976196289), { rotation: new mp.Vector3(0, 0, -31.99979591369629)});


mp.objects.new(2944353280, new mp.Vector3(256.580078125,-391.7232360839844, 44.67080307006836), { rotation: new mp.Vector3(0, 0, 0)}); //city hall
mp.objects.new(2944353280, new mp.Vector3(428.9919128417969,-985.6815795898438, 29.978683471679688), { rotation: new mp.Vector3(0, 0, 0)}); //lspd
mp.objects.new(2944353280, new mp.Vector3(-1788.819091796875,3082.6962890625, 32.072669982910156), { rotation: new mp.Vector3(0, 0, 0)}); //army
mp.objects.new(2944353280, new mp.Vector3(260.73333740234375,-1353.75341796875, 23.80482292175293), { rotation: new mp.Vector3(0, 0, 94.499244)}); //md
mp.objects.new(2944353280, new mp.Vector3(927.495361328125,52.92498779296875, 80.36307525634766), { rotation: new mp.Vector3(0, 0, -171.03311157226562)}); //casino
mp.objects.new(2944353280, new mp.Vector3(851.7434692382812,-2929.011962890625, 5.167807102203369), { rotation: new mp.Vector3(0, 0, 0)}); //containers
mp.objects.new(2944353280, new mp.Vector3(-404.72528076171875,1196.7958984375, 325.1559423828125), { rotation: new mp.Vector3(0, 0, 0)}); //trade


mp.objects.new(2677555217, new mp.Vector3(197.498046875,-934.89306640625, 29.691797256469727), { rotation: new mp.Vector3(0, 0, -89.9998779296875)}); //snowballs
mp.objects.new(739293418, new mp.Vector3(192.12884521484375,-930.4503784179688, 29.29443359375), { rotation: new mp.Vector3(-1.3340212490220438e-8, -0.4999992847442627, 63.99966812133789)}); 
mp.objects.new(739293418, new mp.Vector3(204.15640258789062,-938.9528198242188, 29.29179573059082), { rotation: new mp.Vector3(6.670105534567483e-8, -1.4901159772762185e-7, 61.499656677246094)});