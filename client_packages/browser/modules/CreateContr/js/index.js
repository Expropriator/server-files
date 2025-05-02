var Contracts = new Vue({
    el: ".ped",
    data: {
	active: false,
	menu: 0,
	style: 0,
	name: null,
	surname: null,
	price: null,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		open: function(id){
            this.menu = id;
        },
		crcont: function() {
			mp.trigger("client::createcontractonkill", this.name, this.surname, this.price);
			this.surname = null;
			this.name = null;
			this.price = null;
		},
    }
});
function closemenu() {
    mp.trigger("client::closecontracts")
}