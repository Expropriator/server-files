var hmBuy = new Vue({
    el: ".housebuy",
    data: {
        active: false,
        header: "Информация о доме",
		menu: 0,
        id: 0,
        owner: "Государство",
        type: "Premium+",
        locked: ["Открыты","Закрыты"],
        price: 960000,
        adress: "Спениш-авеню",
        garage: 5,
        roommates: 0,
		housetype: 0,
    },
    methods: {
        set: function (id, Owner, Type, Locked, Price, Garage, Roommates, housetype) {
            this.id = id;
            this.owner = Owner;
            this.type = Type;
            this.locked = Locked;
            this.price = Price;
            this.garage = Garage;
            this.roommates = Roommates;
			this.menu = id;
			this.housetype = housetype;
        },
        exit: function () {
            mp.trigger('CloseHouseMenuBuy');
			this.menu = 0;
        },
        buy: function (id) {
            mp.trigger("buyHouseMenu", id);
			this.menu = 0;
        },
        int: function (id) {
            mp.trigger("Interior", id);
			this.menu = 0;
        },
        open: function(id){
            this.menu = id;
        }
    }
});

var hm = new Vue({
    el: ".houseinfo",
    data: {
        active: false,
        header: "Информация о доме",
        id: 0,
        menu: 0,
        owner: "Ilya Merumond",
        type: "Premium",
        locked: false,
        price: 150000000,
        adress: "Спениш-авеню",
        garage: 5,
        roommates: 0,
        style: 0,
		housetype: 0,
    },
    methods: {
        set: function (id, Owner, Type, Locked, Price, Garage, Roommates, housetype) {
            this.id = id;
            this.owner = Owner;
            this.type = Type;
            this.locked = Locked;
            this.price = Price;
            this.garage = Garage;
            this.roommates = Roommates;
            this.housetype = housetype;
            this.menu = id;
        },
        exit: function () {
            mp.trigger('CloseHouseMenu');
        },
        select: function (id) {
            mp.trigger("selectSchool", id);
        },
        enter: function (id) {
            mp.trigger("GoHouseMenu", id);
        },
        open: function(id){
            this.menu = id;
        },
        gostyle: function(index) {
            this.style = index;
        },
        lock: function (id) {
            mp.trigger("LockedHouse", id);
        },
        sell: function (id) {
            mp.trigger("SellHome", id);
        },
        warn: function (id) {
            mp.trigger("WarnHouse", id);
        }, 
		reset: function(){
            this.locked= 0
            this.locked=["Открыты","Закрыты"]
        }
    }
});
var hm2 = new Vue({
    el: ".houseinfo2",
    data: {
        active: false,
        header: "Информация о доме",
        id: 0,
        menu: 0,
        owner: "Ilya Merumond",
        type: "Premium",
        locked: "Закрыты",
        price: 150000000,
        adress: "Спениш-авеню",
        garage: 5,
        roommates: 0,
        style: 0,
		housetype: 0,
    },
    methods: {
		set: function (id, Owner, Type, Locked, Price, Garage, Roommates, housetype) {
            this.id = id;
            this.owner = Owner;
            this.type = Type;
            this.locked = Locked;
            this.price = Price;
            this.garage = Garage;
            this.roommates = Roommates;
            this.housetype = housetype;
            this.menu = id;
        },
        exit: function () {
            mp.trigger('CloseHouseMenu1');
        },
        select: function (id) {
            mp.trigger("selectSchool", id);
        },
        enter: function (id) {
            mp.trigger("GoHouseMenu1", id);
        },
        open: function(id){
            this.menu = id;
        },
        gostyle: function(index) {
            this.style = index;
        },
        lock: function (id) {
            mp.trigger("LockedHouse", id);
        },
        sell: function (id) {
            mp.trigger("SellHome", id);
        },
        warn: function (id) {
            mp.trigger("WarnHouse", id);
        }, 
		reset: function(){
            this.locked= 0
            this.locked=["Открыты","Закрыты"]
        }
    }
});