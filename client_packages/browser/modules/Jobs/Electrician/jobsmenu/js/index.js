var JobMenuElectricity = new Vue({
    el: ".job",
    data: {
	active: true,
	style: 0,
	workid: 1,
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
			mp.trigger("ChangeWorkStateElectricity", act);
		},
		btnselectjob: function(act) {
			mp.trigger("client::startElectricityWork", act);
		},
    }
});