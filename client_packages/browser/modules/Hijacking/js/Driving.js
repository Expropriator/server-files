var Driving = new Vue({
    el: ".Driving",
    data: {
    active: false,
	menu: 0,
	style: 0,
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