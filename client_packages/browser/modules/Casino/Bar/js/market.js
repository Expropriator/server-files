var casinoBar = new Vue({
  el: '#app',
  data: {
	active: true,
    header: "Freeodm",
    page: 0,
    onWork: false,
    buyitems: [1],
    sellitems: [1],
	buyValue: 1,
	sellValue: 1,
	indexp: 0,
	btns: [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
  },
  methods: {
    setinfo(json) {
      this.curs = json[0]
      this.hays = json[1]
      this.seedcount = json[2]
    },
    changePage(value) {
      this.page = value
      mp.trigger("OpenCasunoBarMenu", value);
    },
	buy(indexp) {
		this.buyValue = 1;
		mp.trigger("CasinoBarBuy", indexp, this.buyValue);
	},
    closeMenu() {
      this.active = false
	  this.page = 0
      mp.trigger("CloseCasinoBarMenu")
    },
	btn: function(id){
            //console.log(event.target)
            let ind = this.btns.indexOf(true);
            if (ind > -1) this.btns[ind] = false;
            this.btns[id] = true;
            //console.log(event.target.classList)
            this.item=id;
			this.indexp=id;	
            //bullshit
            this.active=false;
            this.active=true;
            //mp.trigger('clothes', 'cat', id);
    },
	selectprod: function(index){
			this.indexp=index
	},
  }
})
