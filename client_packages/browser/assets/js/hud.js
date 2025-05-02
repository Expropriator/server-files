var HUD = new Vue({
    el: ".inGameHud",
    data: {
        personId: "AOAO",
        show: false,
        ammo: -1,
        money: "117 000 000",
        bank: "0",
        mic: false,
        time: "00:00",
		date: "123",
		monthDay: ["Января","Феварля","Марта","Апреля","Мая","Июня","Июля","Августа","Сеньтября","Октября","Ноября","Декабря"],
        street: "Юнион-роуд",
        crossingRoad: "Грейспид",
		greenzone: false,
		fishzone: false,
		hint: false,
		quest1: false,
		quest2: false,
		djeffy: false,
		djeffyoff: false,
		avram: false,
		avramoff: false,
		djeffyver: false,
		djeffyveroff: false,
		cashmoney: 200,
		cashbank: 200,
		cashb: false,
		cashm: false,
		
		timerheist: 0,
		
		speed1: true,
		speed2: false,
		speed3: false,
		mile: 100,
		inBoat: false,
		mood: 10,
		
		vehiclename: "BMW M4",
		
		hand: false,
		
		payday: false,
		fps: 0,
		ping: 0,
		sim: false,
		simoff: false,
		djefver: false,
		djefveroff: false,
		
		vehinteract: false,
		casinointeract: false,
		casinointeract2: false,
        server: 0,
		playerId : 102,
        online: 190,
        inVeh: false,
		belt: false,
        engine: false,
        doors: false,
        speed: 200,
        fuel: 10,
        hp: 0,
		rpm: 0,
		gear: 1,
        inSafeZone: false,
        minimapFix: 0,
		binds:[
		  "I",
		  "U",
		  "F2",
		  "L",
		  "A",
		  "ALT",
		  "J",
		  "A",
		],
		maxfuel: 120,
		
		lvl: 7,
		paydaycount: 400,
		
        bonusblock: true,
		lastbonus: "Вы уже получили бонус",
		
		statinons: ["LSIA Terminal","LSIA Parking","Puerto Del Sol","Strawberry","Pillbox North","Burton","Portola Drive","Del Perro","Little Seoul","Pillbox South","Davis"],
		showhelpmetro: false,
		startsnowboard: false,
		stopsnowboard: false,
		stopanim: false,
		stationmetro: 0,
		
		demorgan: false,
		demorganadmin: "Merumond",
		demorgantime: "200",
		demorganreason: "By Merumond",
		
		fine: false,
		fineprice: 200,
		finespeed: 150,
		
		gun: 984333226,
		//911657153
    },
    methods: {
        
        showNotify(title, status2, text2) {
            
            $('.notify_list').append(`
            <div class="notify ${status2} animate__animated animate__fadeInUp">
                <div class="line"></div>
                <img src="./assets/images/player_hud/noty_${status2}.png" alt="" class="icon">
                <div class="content">
                    <div class="title"></div>
                    <div class="text">${text2}</div>
                </div>
            </div>`);
				var notify = $(' .notify_list .notify:last');
				setInterval(function () {
					notify.removeClass('animate__fadeInUp');

					notify.addClass('animate__fadeOutUp');
					setInterval(function () {
						notify.remove();
					}, 600)

				}, 6000);
        },
        rpmm: function(rpm) {
            this.rpm = rpm;
        },
		addKeysInList: function(OpenCarDoor, OpenInventory, OpenAnimMenu, OpenPhone, HandCuff, CruiseControl, StartEngineVehicle, safetyBelt){
		  this.binds[0] = OpenInventory
		  this.binds[1] = OpenAnimMenu
		  this.binds[2] = OpenPhone
		  this.binds[3] = OpenCarDoor
		  this.binds[4] = CruiseControl
		  this.binds[5] = StartEngineVehicle
		  this.binds[6] = safetyBelt
		  this.binds[7] = HandCuff
		},
        getSpeed(){
            let num = 504.295 + (this.speed * 100 / 300) * 5;
            return num > 1007.295 ? 1007.295 : num;
        },
        getRpm(){
            let num = 504.295 + (this.rpm * 300 / 300) * 5;
            return num > 675.295 ? 675.295 : num;
        },
        updateSpeed(currentspeed, maxspeed = 650)
        {
            this.speed = currentspeed;

            /*
            var speedPercent = Math.floor(currentspeed / maxspeed * 100);
            if(speedPercent > 100) speedPercent = 100;

            var 
                redColor = new Color(228, 66, 66),
                whiteColor = new Color(255, 255, 255),
                yellowColor = new Color(225, 228, 66),
                start = whiteColor,
                end = yellowColor;
        
            if (speedPercent > 50) {
                speedPercent = speedPercent % 51;
                start = yellowColor;
                end = redColor;
            }

            var 
                startColors = start.getColors(),
                endColors = end.getColors();
            var r = InterpolateColor(startColors.r, endColors.r, 50, speedPercent);
            var g = InterpolateColor(startColors.g, endColors.g, 50, speedPercent);
            var b = InterpolateColor(startColors.b, endColors.b, 50, speedPercent);
        
            $('.speed_count').css("color", "rgb(" + r + "," + g + "," + b + ")");
            */

            //

            const meters = document.querySelectorAll('svg[data-value] .meter');

            meters.forEach( (path) => {
            
                let length = path.getTotalLength();
                

            
                let c = parseInt(path.parentNode.getAttribute('data-value'));
                
                let value = 0.4166666666666667 * c;
                let rotate = -130 + (value * 2.61153846153846);
                
                let to = length * ((100 - value) / 100);
                //alert(to);
                path.getBoundingClientRect();
                
                path.style.strokeDashoffset = Math.max(0, to);  
            });
        },     
    }
});

setInterval (function() {
	let date = new Date()
	HUD.time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
    HUD.date = `${date.getDate() + ' ' + HUD.monthDay[date.getMonth()] + ' ' + date.getFullYear()}`
})

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.ieRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();