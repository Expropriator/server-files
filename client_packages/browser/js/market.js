var blackMarket = new Vue({
  el: '#app',
  data: {
    active: false,
    header: "David Hancock",
    page: 0,
    onWork: false,
    buyitems: [],
    sellitems: [],
    curs: 1,
    hays: 1,
    seedcount: 1,
	buyValue: 1,
	sellValue: 1,
	timeout: null,
  },
  methods: {
    setinfo(json) {
      this.curs = json[0]
      this.hays = json[1]
      this.seedcount = json[2]
    },
    changePage(value) {
      this.page = value
      mp.trigger("changePage5", value);
    },
	buy(item) {
		this.buyValue = parseInt(this.buyValue);
		if(this.buyValue <= 0 || this.buyValue == null) this.buyValue = 1;
		mp.trigger("farmerBuy5", item, this.buyValue);
	},
	sell(item) {
		this.sellValue = parseInt(this.sellValue)
		if(this.sellValue <= 0 || this.sellValue == null) this.sellValue = 1;
		mp.trigger("farmerSell5", item, this.sellValue);
	},
    closeMenu() {
		this.active = false
		this.page = 0
		// mp.trigger("closeMarketMenu")
		let main = document.getElementById("mainblock");
		main.style.top="-120vh";
		main.style.opacity="0";
		main.style.transition="all 0.50s";
		this.timeout = setTimeout( () => {
                this.active = false
				this.page = 0
				mp.trigger("closeMarketMenu5");
		}, 300);
    }
  }
})
