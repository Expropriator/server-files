var Comp = new Vue({
    el: ".main",
    data: {
	active: false,
	menu: 0,
	style: 0,
	killlist: []
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		takecont: function(id) {
			mp.trigger("client::takecontractkillers", id)
		},
    }
});
function closemenu() {
    mp.trigger("clinet::closecomputerkillers")
}