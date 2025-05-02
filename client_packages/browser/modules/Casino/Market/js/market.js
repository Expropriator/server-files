var casinoMarket = new Vue({
  el: '#app',
  data: {
	active: false,
    header: "Freeodm",
    page: 0,
    onWork: false,
    buyitems: [1],
    sellitems: [1],
	buyValue: 1,
	sellValue: 1,
  },
  methods: {
    setinfo(json) {
      this.curs = json[0]
      this.hays = json[1]
      this.seedcount = json[2]
    },
    changePage(value) {
      this.page = value
      mp.trigger("changePage2", value);
    },
	buy(item) {
		this.buyValue = 100;
		mp.trigger("farmerBuy2", item, this.buyValue);
	},
	buy1(item) {
		this.buyValue = 100;
		mp.trigger("farmerBuy2", item, this.buyValue);
	},
	buy2(item) {
		this.buyValue = 1000;
		mp.trigger("farmerBuy2", item, this.buyValue);
	},
	buy3(item) {
		this.buyValue = 10000;
		mp.trigger("farmerBuy2", item, this.buyValue);
	},
	buy4(item) {
		this.buyValue = 100000;
		mp.trigger("farmerBuy2", item, this.buyValue);
	},
	sell(item) {
		this.sellValue = parseInt(this.sellValue)
		if(this.sellValue <= 0 || this.sellValue == null) this.sellValue = 1;
		mp.trigger("farmerSell2", item, this.sellValue);
	},
    closeMenu() {
      this.active = false
	  this.page = 0
      mp.trigger("closeMarketMenu2")
    }
  }
})
