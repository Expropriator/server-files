var main = new Vue({
    el: ".main",
    data: {
	active: false,
	menu: 0,
	style: 0,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		closemenu: function(){
            mp.trigger("close_globalquesthelp")
        }
    }
});
