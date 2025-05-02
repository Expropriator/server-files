var JobMenuOrange = new Vue({
    el: ".job",
    data: {
	active: true,
	style: 0,
	workid: 9,
	workstate2: 'false',
	workstate3: false,
	jobpayment: 500,
	jobpayment2: 1000,
	lvl: 1,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		btnchangeworkstate: function(act) {
			mp.trigger("ChangeWorkStateOrange", act);
		},
		btnselectjob: function(act) {
			mp.trigger("client::startOrangeWork", act);
		},
    }
});