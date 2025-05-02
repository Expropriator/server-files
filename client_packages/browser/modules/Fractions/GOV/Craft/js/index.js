var StockGov = new Vue({
    el: ".main",
    data: {
		active: false,
		style: 0,
		name: "Ебать не должно кого",
		items: null,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		buy: function(index) {
			mp.trigger("client::craftgov", index);
		},
		exit: function() {
			mp.trigger("exitcraftgov");
		},
    }
});