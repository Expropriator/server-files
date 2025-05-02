var poligonpointsmenu = new Vue({
    el: ".poligon",
    data: {
    active: false,
	menu: 0,
	style: 0,
	points: 20,
	targetleft: 60,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        }
    }
});