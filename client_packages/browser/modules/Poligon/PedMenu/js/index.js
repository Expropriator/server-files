var poligonpedmenu = new Vue({
    el: ".poligon",
    data: {
    active: false,
	menu: 0,
	style: 0,
	lvl: 1,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		selectgun: function(id) {
			mp.trigger("selectthisweapon_poligon", id);
		},
		close: function() {
			mp.trigger("ClosePedPoligon")
		}
    }
});