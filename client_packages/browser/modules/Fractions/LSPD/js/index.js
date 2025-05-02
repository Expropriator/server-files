var LspdPedMenu = new Vue({
    el: ".ped",
    data: {
	active: false,
	menu: 0,
	style: 0,
	fine: 0,
	frac: 7,
	workday: false,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		nelegal: function() {
			mp.trigger("DropNelegal");
		},
		payfines: function() {
			mp.trigger("PayFines");
		},
		starworkday: function() {
			mp.trigger("StarWorkDayLSPD");
		},
    }
});
function closemenu() {
    mp.trigger("CloseLspdPedMenu")
}