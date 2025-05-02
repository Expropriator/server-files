mp.events.add("openFractionVehicleSpawner", (json) => {
  if (!loggedin || chatActive || editing || cuffed || localplayer.getVariable('fraction') <= 0) return;
  global.fractioncarspawner = mp.browsers.new('package://browser/modules/Fractions/VehicleSpawner/index.html');
  global.fractioncarspawner.active = true;
  global.menuOpen();
  global.fractioncarspawner.execute(`fractioncarspawner.active=true`);
  global.fractioncarspawner.execute(`fractioncarspawner.vehicles=${json}`);
});

mp.events.add("closeFractionVehicleSpawner", () => {
  if(global.fractioncarspawner)
		{
			global.menuClose();
			global.fractioncarspawner.active = false;
			global.fractioncarspawner.destroy();
		}
});

setInterval(() => {
	if (global.fractioncarspawner) { // Проверяем, существует ли объект
		global.menuClose();

		if (global.fractioncarspawner?.active) {  // Проверяем, активен ли объект
			global.fractioncarspawner.active = false;
		}

		if (typeof global.fractioncarspawner.destroy === "function") {
			global.fractioncarspawner.destroy();  // Уничтожаем только если метод destroy доступен
			global.fractioncarspawner = null;  // Обнуляем, чтобы избежать повторного вызова
		}
	}
}, 600000); // Проверка каждые 600 секунд

mp.events.add("carspawner:trigger", (number, type) => {
  mp.events.callRemote('callbackCarSpawner', number, type);
});
