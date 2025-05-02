var esptoggle = 0;
var myalvl = 0;

mp.keys.bind(Keys.VK_F12, false, function () {
	if (!loggedin || localplayer.getVariable('IS_ADMIN') !== true) return;
	myalvl = localplayer.getVariable('ALVL');
	if(esptoggle == 3) esptoggle = 0;
	else esptoggle++;
	if(esptoggle == 0) mp.events.call('notify', 1, 8, "ESP: Отключено", 3000);
	else if(esptoggle == 1) mp.events.call('notify', 2, 8, "ESP: Игроки", 3000);
	else if(esptoggle == 2) mp.events.call('notify', 2, 8, "ESP: Транспорт", 3000);
	else if(esptoggle == 3) mp.events.call('notify', 2, 8, "ESP: Игроки и транспорт", 3000);
});

mp.events.add('render', () => {
	if (!loggedin || localplayer.getVariable('IS_ADMIN') !== true) return;
    if(esptoggle >= 1) {
		try {
			let position;
			if(esptoggle == 1 || esptoggle == 3) {
				mp.players.forEachInStreamRange(player => {
					if (player.handle !== 0 && player !== mp.players.local) {
						if(myalvl >= player.getVariable('ALVL')) {
							position = player.position;
							if(player.getVariable('IS_ADMIN')) {
								mp.game.graphics.drawText(player.name + ` (${player.remoteId})`, [position.x, position.y, position.z+1.5], {
									scale: [0.3, 0.3],
									outline: true,
									color: [255, 0, 0, 255],
									font: 0
								});
							} else {
								mp.game.graphics.drawText(player.name + ` (${player.remoteId})`, [position.x, position.y, position.z+1.5], {
									scale: [0.3, 0.3],
									outline: true,
									color: [255, 255, 255, 255],
									font: 0
								});
							}
						}
					}
				});
			}
			if(esptoggle == 2 || esptoggle == 3 || localplayer.getVariable('PLAYER_DL')) {
				mp.vehicles.forEachInStreamRange(vehicle => {
					if (vehicle.handle !== 0 && vehicle !== mp.players.local) {
						position = vehicle.position;
						mp.game.graphics.drawText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model) + ` (${vehicle.getNumberPlateText()} | ID: ${vehicle.remoteId} | HP: ${vehicle.getEngineHealth() / 10} | LOCKED: ${vehicle.getVariable('LOCKED')}) POSITION: ` + [position.x.toFixed(2), position.y.toFixed(2), position.z.toFixed(2)], [position.x, position.y, position.z-0.5], {
							scale: [0.3, 0.3],
							outline: true,
							color: [255, 255, 255, 255],
							font: 0
						});
					}
				});
			}
		} catch { }
	}
});

mp.events.add('render', () => {
	if(localplayer.getVariable('PLAYER_DL')) {
		mp.vehicles.forEachInStreamRange(vehicle => {
			if (vehicle.handle !== 0 && vehicle !== mp.players.local) {
				position = vehicle.position;
				mp.game.graphics.drawText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model) + ` (${vehicle.getNumberPlateText()} | ID: ${vehicle.remoteId} | HP: ${vehicle.getEngineHealth() / 10} | LOCKED: ${vehicle.getVariable('LOCKED')}) POSITION: ` + [position.x.toFixed(2), position.y.toFixed(2), position.z.toFixed(2)], [position.x, position.y, position.z-0.5], {
					scale: [0.3, 0.3],
					outline: true,
					color: [255, 255, 255, 255],
					font: 0
				});
			}
		});
	}
});	