var GovPedMenu = new Vue({
    el: ".ped",
    data: {
	active: false,
	menu: 0,
	style: 0,
	fracid: 6,
	namep: "Ilya",
	surnamep: "Merumond",
	price: 100,
	workdaystatus: false,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		BuyFishLic: function() {
			mp.trigger("BuyFishLic");
		},
		BuyWeapLic: function() {
			mp.trigger("BuyWeapLic");
		},
		StartWorkDayGov: function() {
			mp.trigger("StartWorkDayGov");
		},
    }
});
function closemenu() {
    mp.trigger("CloseGovPedMenu")
}