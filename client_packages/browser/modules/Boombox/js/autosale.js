var boombox = new Vue({
    el: ".main",
    data: {
	active: false,
	menu: 0,
	style: 0,
	input: null,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		btn: function(){
           mp.trigger('client::addaudioonBoomBox', this.input)
        },
		btnreset: function() {
			mp.trigger('client::addaudioonBoomBox', " ")
		},
		closemenu: function() {
			this.input = null;
			mp.trigger('client::closeboombox');
		},
    }
});