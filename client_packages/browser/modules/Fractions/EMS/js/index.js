var EmsPedMenu = new Vue({
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
	hp: 10,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		GetHealth: function() {
			mp.trigger("GetHealthEms");
		},
		close: function() {
			mp.trigger("CloseEmsPedMenu");
		},
		StartWorkDay: function() {
			mp.trigger("StartWorkDayEms");
		},
    }
});
function closemenu() {
    mp.trigger("CloseEmsPedMenu")
}