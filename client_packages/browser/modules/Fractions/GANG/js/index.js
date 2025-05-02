var GangPedMenu = new Vue({
    el: ".allped",
    data: {
	active: false,
	menu: 0,
	style: 0,
	fracid: 2,
	header: "Дарнелл Стивенс",
	pedtype: 2,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		StarHijacking: function() {
			mp.trigger("StarHijacking");
		},
		StarHijackingHouse: function() {
			mp.trigger("StarHijackingHouse");
		},
    }
});
function closemenu() {
    mp.trigger("CloseGangPedMenu")
}