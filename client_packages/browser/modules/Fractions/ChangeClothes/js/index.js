var changeclothes = new Vue({
    el: ".changeclothes",
    data: {
		active: false,
		style: 0,
		name: "GOVER",
		items: [1,2,3,4,5,6,7,8,9,10,11,12],
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		btn: function(index) {
			mp.trigger("SetFracClothes", index);
		},
		exit: function() {
			mp.trigger("CloseFracClothes");
		},
    }
});