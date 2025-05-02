var Gopostal = new Vue({
    el: ".ped",
    data: {
	active: false,
	menu: 0,
	style: 0,
	workid: 2,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		takepockets: function() {
			mp.trigger("TakePocketsGoPostal");
		},
		changework: function() {
			mp.trigger("ChangeWorkDayGopostal");
		},
    }
});
function closemenu() {
    mp.trigger("CloseMenuGopostal")
}