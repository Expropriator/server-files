let _SIZE = 0.2;
let _DENS = 10;

let _BURNOUT_SIZE = 1.5;

let _BIND_KEY = 70;
let _SMOKE_ON = true;

let bone_list = ["wheel_lr","wheel_rr"];
let bone_list2 = ["IK_Head","IK_Head"];

let base = "scr_recartheft";
let base2 = "core";

//RequestParticle
function RequestParticle(fxName) {
    mp.game.streaming.requestNamedPtfxAsset(fxName);
    while(!mp.game.streaming.hasNamedPtfxAssetLoaded(fxName)) {
        mp.game.wait(1);
    }
}

//DriftSmoke
function DriftSmoke(base, sub, car, dens, size) {
    let all_part = [];

    for (let i = 0; i < dens; i++) {
        mp.game.invoke('0x6C38AF3693A69A91', base);
        let W1 = mp.game.graphics.startParticleFxLoopedOnEntityBone(sub, car.handle, 0.05, 0, 0, 0, 90, 0, car.getBoneIndexByName(bone_list[0]), size, false, false, false);

        mp.game.invoke('0x6C38AF3693A69A91', base);
        let W2 = mp.game.graphics.startParticleFxLoopedOnEntityBone(sub, car.handle, 0.05, 0, 0, 0, 90, 0, car.getBoneIndexByName(bone_list[1]), size, false, false, false);

        all_part.push(W1);
        all_part.push(W2);
    }
    mp.game.wait(1000);
    
    for (let i = 0; i < all_part.length; i++) {
        mp.game.graphics.stopParticleFxLooped(all_part[i], true);
    }
}

// Ange =========
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}
function radians_to_degrees(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function angle(veh) {
    if(veh) {
        let velocity = veh.getVelocity();
        let modV = Math.sqrt(velocity.x*velocity.x + velocity.y*velocity.y);
        
        let rz = veh.getHeading();
        const [sn,cs] = [-Math.sin(degrees_to_radians(rz)), Math.cos(degrees_to_radians(rz))];
        
        let speed = veh.getSpeed() * 3.6;

        if(speed < 5 || veh.gear == 0) return [0, modV];
        
        let cosX = (sn*velocity.x + cs*velocity.y)/modV;
        if(cosX > 0.966 || cosX < 0) return [0, modV];

        return [radians_to_degrees(Math.acos(cosX))*0.5, modV];
    } else {
        return [0, 0];
    }
}
let drift_mode = false;
//render smoke
mp.events.add('render', () => {
    if(localplayer.vehicle) {
        if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			RequestParticle(base);
			RequestParticle(base2);
			
            let car = localplayer.vehicle;
            let [ang, speed] = angle(car);

            // if(mp.game.controls.isControlJustPressed(0, _BIND_KEY)) {
                // _SMOKE_ON = !_SMOKE_ON;
            // }

            if(drift_mode) {
                if(speed >= 3.0 && ang != 0) {
                    DriftSmoke(base, "scr_wheel_burnout", car, _DENS, _SIZE);
                } else if (speed < 1.0 && car.isInBurnout()) {
                    DriftSmoke(base2, "exp_grd_bzgas_smoke", car, 3, _BURNOUT_SIZE);
                }
            }
        }
    }
});

mp.events.add('smoketest', () => {
	RequestParticle(base);
	PlayerSmoke(base, "scr_wheel_burnout", localplayer, _DENS, 0.1);
});

function PlayerSmoke(base, sub, car, dens, size) {
    let all_part = [];

    for (let i = 0; i < dens; i++) {
        mp.game.invoke('0x6C38AF3693A69A91', base);
        let W1 = mp.game.graphics.startParticleFxLoopedOnEntityBone(sub, car.handle, 0.05, 0, 0, 0, 90, 0, car.getBoneIndexByName(bone_list2[0]), size, false, false, false);

        // mp.game.invoke('0x6C38AF3693A69A91', base);
        // let W2 = mp.game.graphics.startParticleFxLoopedOnEntityBone(sub, car.handle, 0.05, 0, 0, 0, 90, 0, car.getBoneIndexByName(bone_list2[1]), size, false, false, false);

        all_part.push(W1);
        // all_part.push(W2);
    }
    mp.game.wait(1000);
    
    for (let i = 0; i < all_part.length; i++) {
        mp.game.graphics.stopParticleFxLooped(all_part[i], true);
    }
}

mp.keys.bind(Keys.VK_RSHIFT, true, () => {
	if(localplayer.vehicle) {
		if(localplayer.vehicle.getPedInSeat(-1) == localplayer.handle) {
			let vehicle = localplayer.vehicle;
			drift_mode = !drift_mode;
			//drift
			mp.game.invoke('0x222FF6A823D122E2', vehicle.handle, drift_mode);
			mp.game.invoke('0x6DEE944E1EE90CFB', vehicle.handle, drift_mode);
		}
	}
})