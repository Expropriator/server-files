var ParkingMenu = new Vue({
    el: "#app",
    data: {
	active: false,
	menu: 0,
	style: 0,
	parkname: 2,
	vehicles: [],
	// vehicles: ["12","12"],
	street: "Вайнвуд хиллз",
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		takecar: function(name, number) {
			console.log(name, number)
			mp.trigger("takerentparking", name, number);
		},
		exit: function() {
			mp.trigger("closeparking")
		},
    }
});