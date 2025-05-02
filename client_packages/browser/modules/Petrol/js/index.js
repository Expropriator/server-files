var petrol = new Vue({
    el: ".petrol",
    data: {
        active: false,
        price: 4,
        input: "",
        inputelectro: 0,
		street: "Вайнвуд Хиллз",
		fuel: 100,
		style: 0,
		maxfuel: 120,
		multi: 1,
		btns: [false,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
		regular: false,
		premium: false,
		diesel: false,
		card: false,
    },
    methods: {
		gostyle: function(index) {
			this.style = index
		},
        gov: function () {
            //console.log('full')
            mp.trigger('petrol.gov', this.diesel, this.regular, this.premium)
        },
		full: function () {
            //console.log('full')
            mp.trigger('petrol.full', this.diesel, this.regular, this.premium)
        },
        yes: function () {
            console.log(this.input * this.multi)
            mp.trigger('petrol', this.input * this.multi, this.diesel, this.regular, this.premium)
        },
        no: function () {
            //console.log('no')
            mp.trigger('closePetrol')
        },
		cardbtn: function() {
			if (this.card = 'false') {
				this.card = true;
			}
			else if (this.card = 'true') {
				this.card = false;
			}
			console.log(this.card);
		},
		checkbtn: function(id){
            let ind = this.btns.indexOf(true);
            if (ind > -1) this.btns[ind] = false;
            this.btns[id] = true;
			this.multi=id;	
            this.active=false;
            this.active=true;
			if (id == 1)
			{
				this.regular = true;
				this.premium = false;
				this.diesel = false;
				console.log(this.diesel, this.regular, this.premium)
			}
			else if (id == 2.2)
			{
				this.regular = false;
				this.premium = true;
				this.diesel = false;
				this.btns[2] = true;
				console.log(this.diesel, this.regular, this.premium)
			}
			if (id == 1.6)
			{
				this.regular = false;
				this.premium = false;
				this.diesel = true;
				this.btns[3] = true;
				console.log(this.diesel, this.regular, this.premium)
			}
		},
        reset: function () {
            this.active = false
            this.input = ""
			this.regular = true;
			this.premium = false;
			this.diesel = false;
        }
    }
});