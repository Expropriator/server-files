var petrol = new Vue({
    el: ".petrol",
    data: {
        active: false,
        price: 10,
        input: "",
        inputelectro: 0,
		street: "Вайнвуд Хиллз",
		fuel: 100,
		style: 0,
    },
    methods: {
		gostyle: function(index) {
			this.style = index
		},
        gov: function () {
            //console.log('full')
            mp.trigger('electropetrol.gov')
        },
		full: function () {
            //console.log('full')
            mp.trigger('electropetrol.full')
        },
        yes: function () {
            //console.log('yes')
            mp.trigger('electropetrol', this.input)
        },
        no: function () {
            //console.log('no')
            mp.trigger('closeElectroPetrol')
        },
        reset: function () {
            this.active = false
            this.input = ""
        }
    }
});