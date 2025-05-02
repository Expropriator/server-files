var FibPedMenu = new Vue({
    el: ".ped",
    data: {
	active: false,
	menu: 0,
	style: 0,
	fracid: 9,
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
		StartWorkDayGov: function() {
			mp.trigger("StartWorkDayfib");
		},
		nelegal: function() {
			mp.trigger("DropNelegalFib");
		},
    }
});
function closemenu() {
    mp.trigger("CloseFibPedMenu")
}