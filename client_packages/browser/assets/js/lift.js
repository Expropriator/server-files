var lift = new Vue({
    el: ".lift",
    data: {
        active: false,
        floors: [
            "Гараж",
            "1 Этаж",
            "49 Этаж",
			// "Крыша"
        ],
        floor: 0,
		btns: [true,false,false],
    },
    methods: {
        set: function (json) {
            this.floors = JSON.parse(json);
        },
        stop: function () {
            //console.log('stop')
            mp.trigger('lift', 'stop');
        },
        start: function () {
            //console.log('start')
            mp.trigger('lift', 'start', this.floor);
        },
		btn: function(id){
            let ind = this.btns.indexOf(true);
            if (ind > -1) this.btns[ind] = false;
            this.btns[id] = true;
			this.floor=id;	
            this.active=false;
            this.active=true;
		},
        reset: function () {
            this.floors = []
            this.floor = 0
            this.text = ""
        }
    }
})