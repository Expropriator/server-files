let images = {
    "Фонарик": "1",
    "Молоток": "2",
    "Гаечный ключ": "3",
    "Канистра бензина": "4",
    "Чипсы": "5",
    "Пицца": "6",
    "Сим-карта": "7",
    "Связка ключей": "8",
    "Рем. Комплект": "9",
    "Балончик": "10",
    "eCola": "11",
    "Sprunk": "12",
}

var SHOP = new Vue({
    el: ".shop24",
    data: {
        active: false,
        page: 0,

        cart: [ ],

        data: [
            ["Шоколадка", 200],
            ["Бургер", 350],
            ["Картошка фри", 200],
        ],

        sub: images,

        json: "",

        pages: [
            "Продукты питания",
            "Разное",
            "Алкоголь",
        ],

        display: [
            [ 0, 1 ],
            [ 2 ],
            [ ]
        ],

    },
    methods: {
        gopage: function(index) {
            this.page = index;
        },

        open: function(data) {
            this.active = true;

            this.json = data;

            let time = data;

            this.page = 0;
            this.cart = [];

            this.data = this.json[1];
            this.display = this.json[2];
            this.pages = this.json[0];

            
        },

        exit: function() {
            this.active = false;

            this.cart = [];

            this.data = [];
            this.display = [];
            this.pages = [];

            mp.trigger("shop.close");
        },

        getprice: function() {
            let total = 0;
            for(let i = 0; i < this.cart.length; i++)
                total += this.data[ this.cart[i][0] ][1] * this.cart[i][1];
            return total; 
        },
       
        carthave: function(index) {
            for(let i = 0; i < this.cart.length; i++)
                if(this.cart[i][0] == index)
                    return i;
            return -1;
        },

        cartchange: function(index, to) {
            if (this.cart[index] == null) return;

            this.cart[index][1] += to;

            if (this.cart[index][1] <= 0)
                this.cart.splice(index, 1);

            this.$forceUpdate();
        },

        cartremove: function(index) {
            if (this.cart[index] == null) return;
            this.cart.splice(index, 1);
        },

        remove: function(index) {
            for(let i = 0; i < this.cart.length; i++)
                if(this.cart[i][0] == index)
                {
                    this.cart.splice(i, 1);
                    this.$forceUpdate();
                    return;
                }
        },

        cartadd: function(index) {
            console.log("add: " + index);
            let find = this.carthave(index);
            if (find == -1)
                this.cart.push([index, 1]);
            else {
                this.cart[find][1] += 1;
                this.$forceUpdate();
            }
        },
        
        buy: function(card) {
            if (this.cart.length <= 0) return;
            mp.trigger("shop.buy", card, JSON.stringify(this.cart));
        },

    }
})
