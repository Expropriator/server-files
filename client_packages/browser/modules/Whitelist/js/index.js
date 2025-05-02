var WhitelistWait = new Vue({
    el: ".main",
    data: {
	active: false,
	style: 0,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
    }
});