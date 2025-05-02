var wshop = new Vue({
    el: ".shop",
    data: {
        active: false,
		header: "SHARP MARKET",
		street: "МАГАЗИН ОРУЖИЯ",
        btns: [true,false,false,false,false],
        index: 1,
        items: [["Pistol",1],["SNSPistol",1]],
		sliderActive: false,
		sliders: [["Pistol",1],["SNSPistol",1]],
    },
    methods: {
        btn: function (id, event) {
            if (id == 4) return;
            //console.log(event.target)
            let ind = this.btns.indexOf(true);
            if (ind > -1) this.btns[ind] = false;
            this.btns[id] = true;
            //console.log(event.target.classList)
            this.index=id;
            //bullshit
            this.active=false;
            this.active=true;
            mp.trigger('wshop', 'cat', id);
        },
        buy: function(id){
            //console.log(id)
            mp.trigger('wshop', 'buy', id);
        },
        set: function(type, json){

            let prices = JSON.parse(json);

            this.sliderActive = false;
            this.sliders = [];
            if (type == 3) {
                let ammoData = ammo;
                prices.forEach(function (item, i, arr) {
                    ammoData[i][3] = item;
                });

				this.sliderActive=true;
                this.sliders = ammoData;
				this.items = [];
				return;
			}

            let data = weapData[type];
            prices.forEach(function (item, i, arr) {
                data[i][1] = item;
            });
            this.items = data;
        },
		range: function(e){
			let id = e.target.id;
			let val = e.target.value;
			this.sliders[id][4] = val * this.sliders[id][3];
			$("output#wbuyslider"+id).val(this.sliders[id][4] + "$");
		},
		rangebuy: function(e){
			mp.trigger('wshop', 'rangebuy', e, 20);
		},
        exit: function(){
            this.active = false;
            this.items = [];
            this.index = 0;
            this.btns = [true, false, false, false, false];
            mp.trigger('closeWShop');
        }
    }
})
var weapData = [
    [ 
		["Pistol",10],
		["CombatPistol",10],
		["HeavyPistol",10],
		["DoubleAction",10],
		["Revolver",10],
		["BullpupShotgun",10],
		["CombatPDW",10],
		["MachinePistol",10],
		["Hammer",10],
		["Crowbar",10],
		["GolfClub",10],
		["Bottle",10],
		["BattleAxe",10],
		["Bat",10],
		["KnuckleDuster",10],
		["Knife",10],
    ],
]
var ammo = [
	["Патроны 45ACP",100,60,2,0],
	["Патроны 9x19mm",200,100,2,0],
	["Патроны 357 Magnum 9x32",15,100,2,0],
	["Патроны 62x39mm",300,20,2,0],
	["Патроны 12ga Buckshots",1000,100,2,0],
	["Патроны 50BMG",15000,100,2,0],
	["Патроны 12ga Rifles",80,100,2,0],
	["Патроны 56x45mm",200,100,2,0],
]