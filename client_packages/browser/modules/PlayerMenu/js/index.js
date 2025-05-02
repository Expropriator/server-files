var playermenu = new Vue({
    el: ".playermenu",
    data: {
	active: false,
	menu: 0,
	style: 0,
	promocode: "FRM-656",
	stats: ["15", "30", "777 777", "ADMINISTRATOR", "2", "A B C D", "01.05.1980", "Строитель", "Merumond Family", "17", "Ilya", "Merrumond", "333666", "4276 7700", "AOAO", "90", "30", "2500000", "10000", "660030", true, "120", "2"],
    workLevels: [],
    properties: 0,
	modal: 0,
	wrapperClass: 'mainWrapper',
    binds:[
      "I",
      "U",
      "F2",
      "L",
	  "A",
      "ALT",
      "J",
      "A",
    ],
    rebindMenu: false,
    rebindMenuTitle: '',
    gg: "",
    keys: [
	  {id: 18, key: "ALT"},
      {id: 48, key: "0"},
      {id: 49, key: "1"},
      {id: 50, key: "2"},
      {id: 51, key: "3"},
      {id: 52, key: "4"},
      {id: 53, key: "5"},
      {id: 54, key: "6"},
      {id: 55, key: "7"},
      {id: 56, key: "8"},
      {id: 57, key: "9"},

      {id: 65, key: "A"},
      {id: 66, key: "B"},
      {id: 67, key: "C"},
      {id: 68, key: "D"},
      {id: 69, key: "E"},
      {id: 70, key: "F"},
      {id: 71, key: "G"},
      {id: 72, key: "H"},
      {id: 73, key: "I"},
      {id: 74, key: "J"},
      {id: 75, key: "K"},

      {id: 76, key: "L"},
      {id: 77, key: "M"},
      {id: 78, key: "N"},
      {id: 79, key: "O"},

      {id: 80, key: "P"},
      {id: 81, key: "Q"},
      {id: 82, key: "R"},
      {id: 83, key: "S"},

      {id: 84, key: "T"},
      {id: 85, key: "U"},
      {id: 86, key: "V"},
      {id: 87, key: "W"},

      {id: 88, key: "X"},
      {id: 89, key: "Y"},
      {id: 90, key: "Z"},
      {id: 91, key: "S"},
      {id: 189, key: "-"},
      {id: 187, key: "="}
	],
	
	money: 10,
        caseAction: [
            {
                caseId: 1,
                title: 'Кейс',
                subtitle: 'DEFCASE',
                cost: 8000000,
                icon: '',
                background: 'cases4.png'
            }
        ],
        caseData: {
            selected: {},
            items: [],
            contain: [],
            active: false,
            minItems: 80,
            animation: {
                seconds: 8,
                type: 'ease'
            },
            itemSetWin: 6, // From end
            winId: 1,
            winItem: {
                id: null,
                rarity: null,
                chance: null,
                title: null,
                cost: null,
                background: null
            }
        },
		carsdonate: [
		{
			name: "Mercedes-Benz Sprinter",
			background: "msprinter",
			casebuy: 30,
			desc: "Хороший автомобиль для дальнобойщиков. Нельзя продать данное авто",
			money: "2000",
		},
		{
			name: "Polestar One",
			background: "starone",
			casebuy: 31,
			desc: "Не очень популярная марка авто, но она производит очень хорошие и быстрые авто",
			money: "2500",
		},
		{
			name: "Mercedes-Benz EQG",
			background: "eqg",
			casebuy: 32,
			desc: "Уникальный внедорожник на электричесве. Даже в реальной жизни он еще не продается",
			money: "3000",
		},
		{
			name: "Bentley Continental GT",
			background: "bentley20",
			casebuy: 33,
			desc: "Изысканный и элегантный кабриолет класса Gran Turismo с инновационным четырехслойным складным верхом",
			money: "4000",
		},
		{
			name: "Porsche Taycan Litvin Edition",
			background: "taycan21",
			casebuy: 34,
			desc: "Автомоболь знаменитого видеоблогера Михаила Литвина в его раскарске. Санечек снимаешь?",
			money: "4000",
		},
		{
			name: "BMW X6M 2021",
			background: "x6m2",
			casebuy: 35,
			desc: "Отличается уникальным внешним видом и спортивной динамичностью благодаря мощному двигателю, точно настроенной подвеске и широкой комплектации",
			money: "4000",
		},
		{
			name: "Porsche Panamera Turbo",
			background: "panamera17turbo",
			casebuy: 36,
			desc: "Cпортивный автомобиль без компромиссов. Подойдет для каждого человека",
			money: "4000",
		},
		{
			name: "Audi RS7",
			background: "rs72",
			casebuy: 37,
			desc: "Очень быстрый, стильный и мощный автомобиль от Audi. Любая красотка не устоит перед этим авто",
			money: "4500",
		},
		{
			name: "Rolls-Royce Ghost",
			background: "ghost",
			casebuy: 38,
			desc: "Это роскошный представительский седан. У седана есть традиционные для машин марки задние двери, открывающиеся против хода.",
			money: "5000",
		},
		{
			name: "Rolls-Royce Cullinan",
			background: "cullinan",
			casebuy: 39,
			desc: "Внедорожник обеспечивает комфорт на любой дороге и даже бездорожье – везде, куда захочет отправиться владелец «Роллс-Ройса».",
			money: "6000",
		},
		{
			name: "Bugatti Chiron",
			background: "chiron19",
			casebuy: 40,
			desc: "Его изысканный дизайн, инновационные технологии и культовая, ориентированная на производительность форма делают его уникальным шедевром искусства, формы и техники, выходящим за рамки воображения.",
			money: "7000",
		}
		],
		moneyconvert: [
		{
			name: "Красная карточка",
			background: "money1",
			casebuy: 20,
			desc: "Можно обменять на $250.000",
			money: "100",
		},
		{
			name: "Синяя карточка",
			background: "money2",
			casebuy: 21,
			desc: "Можно обменять на $1.500.000",
			money: "500",
		},
		{
			name: "Черная карточка",
			background: "money3",
			casebuy: 22,
			desc: "Можно обменять на $5.000.000",
			money: "1500",
		},
		],
        prizes: [
			// {
					// rarity: 3,
					// background: "money1.png",
					// title: "Деньги"
					// },
					// {
					// rarity: 1,
					// background: "money1.png",
					// title: "Деньги"
					// },
					// {
					// rarity: 3,
					// background: "money1.png",
					// title: "Деньги"
					// },
		],
        buttonBackLock: false
    },
    methods:{
        gostyle: function(index) {
            if(this.buttonBackLock) return;
			this.style = index;
        },
		open: function(id){
            this.menu = id;
            this.style = 0;
        },
		copy: function() {
			var copyText = document.getElementById("promocode");
			/* Select the text field */
			copyText.select();
			/* Copy the text inside the text field */
			document.execCommand("copy");

		},
		buydonate: function(id) {
			mp.trigger("client::buydonate", id);
		},
		exitmodal: function() {
			this.modal = 0;
		},
		setmodal: function(id) {
			if(this.buttonBackLock) return;
			this.modal = id;
		},
		addKeysInList: function(OpenCarDoor, OpenInventory, OpenAnimMenu, OpenPhone, HandCuff, CruiseControl, StartEngineVehicle, safetyBelt){
		  this.binds[0] = OpenInventory
		  this.binds[1] = OpenAnimMenu
		  this.binds[2] = OpenPhone
		  this.binds[3] = OpenCarDoor
		  this.binds[4] = CruiseControl
		  this.binds[5] = StartEngineVehicle
		  this.binds[6] = safetyBelt
		  this.binds[7] = HandCuff
		},
		saveBinds: function(){
		  mp.trigger('saveRebindKeys', this.keys.find(v => v.key === this.binds[0]).id, this.keys.find(v => v.key === this.binds[1]).id, this.keys.find(v => v.key === this.binds[2]).id, this.keys.find(v => v.key === this.binds[3]).id,this.keys.find(v => v.key === this.binds[4]).id,this.keys.find(v => v.key === this.binds[5]).id,this.keys.find(v => v.key === this.binds[6]).id,this.keys.find(v => v.key === this.binds[7]).id)
		},
		exit: function(){
			mp.trigger('closeRebindMenu')
		},
		rebindMenuOpen: function(a){
		  this.rebindMenu = true
		  this.rmTitle = a
		},
		rebind: function(i,event){
		  if(event.keyCode = 8){ // Проверка на Backspase и Tab
			this.rebindMenu = false
		  }else if(event.keyCode = 27){ // Проверка на ESC
			this.rebindMenu = false
		  }else if(event.keyCode >= 122 && event.keyCode <= 123){ // Проверка на F клавиши
			this.rebindMenu = false
		  }
		  if(event.keyCode >= 48 && event.keyCode <= 91 || event.keyCode == 187 || event.keyCode == 189){
			this.gg = this.binds[i]
			this.binds[i] = this.keys.find(v => v.id === event.keyCode).key;
			console.log(this.binds[i])
			for (var index in this.binds) {
			  if(index != i){
				if(this.binds[index] == this.binds[i]){
				  this.binds[index] = this.gg
				}
			  }
			}
		  }
		},
		scrollContainInner() {
            document.querySelector('.roulette-content__shop-case__item-wrapper__contain-inner').scrollTop = 0;
        },
        caseInit(data) {
            this.caseData.selected = 1;
            try {
                mp.trigger('r:getCase', 1);
            } catch (e) {
                // stackMessage('Failed to get case', 3);
            }
        },
        setCase(e) {
            this.caseData.items = e;
            this.caseData.contain = [...this.caseData.items].sort((a, b) => a.rarity - b.rarity);
            this.caseData.items = this.chanceCalculate(this.caseData.items);
        },
        openCase(type) {            
            if (this.caseData.active) {
                return stackMessage('Roulette was be started', 3);
            }
            // stackMessage('Start roulette!', 1);
            // stackMessage(`Roulette param:`, 2);
            // stackMessage(`- active status ${this.caseData.active}`, 2);
            // stackMessage(`- speen animation time ${this.caseData.animation.seconds}`, 2);
            // stackMessage(`- speen animation type ${this.caseData.animation.type}`, 2);
            // Get winId
            try {
                mp.trigger('r:getWinId', type);
            } catch (e) {
                stackMessage('Failed to get winId', 3);
            }
        },
        getWinIdCallback(e, type) {
            this.caseData.winId = e;
            this.caseData.winItem = this.caseData.contain.find((item) => item.id === e);
            this.caseData.active = true;
            this.buttonBackLock = true;
            if (type === 'quick') {
                // stackMessage('Roulette stop!', 3);
                // stackMessage(`Win id ${this.caseData.winId}`, 1);
                this.caseData.active = false;
                this.buttonBackLock = false;
                this.modal = 10;
                return;
            }
            let items = document.querySelectorAll('.roulette-content__shop-case__item-wrapper__drum-item');
            for (let i = 0; i < items.length; i++) {
                items[i].style.transition = 'unset';
                items[i].style.transform = 'unset';
            }
            let calc = Math.floor(items[this.caseData.items.length - this.caseData.itemSetWin].offsetLeft - (document.querySelector('.roulette-content__shop-case__item-wrapper__drum').offsetWidth / 2) + items[0].offsetWidth / 2);
            for (let i = 0; i < this.caseData.items.length; i++) {
                this.caseData.items.splice(this.caseData.items.length - this.caseData.itemSetWin, 1, this.caseData.contain.find((item) => item.id === this.caseData.winId));
                items[i].style.transition = `transform ${this.caseData.animation.seconds}s ${this.caseData.animation.type}`;
                items[i].style.transform = `translateX(-${this.toVwConverter(calc)}vw)`;
            }
            setTimeout(() => {
                // stackMessage('Roulette stop!', 3);
                // stackMessage(`Win id ${this.caseData.winId}`, 1);
                this.caseData.active = false;
                this.buttonBackLock = false;
                for (let i = 0; i < items.length; i++) {
                    items[i].style.transition = 'unset';
                }
                this.modal = 10;
            }, this.caseData.animation.seconds * 1000);
        },
        chanceCalculate(data) {
            let itemsMaxChance = 0,
                itemsMinChance,
                newItems = [];

            for (let i = 0; i < data.length; i++) {
                if (data[i].chance > itemsMaxChance) {
                    itemsMaxChance = data[i].chance;
                }
            }
            itemsMinChance = itemsMaxChance;
            for (let i = 0; i < data.length; i++) {
                if (data[i].chance < itemsMinChance) {
                    itemsMinChance = data[i].chance;
                }
            }

            for (let i = 0; i < this.caseData.minItems; i++) {
                for (let r = 0; r < data.length; r++) {
                    if (newItems.length === this.caseData.minItems) continue;
                    if (data[r].chance >= this.getRandom(itemsMinChance, itemsMaxChance)) {
                        newItems.push(data[r]);
                    }
                }
            }
            return newItems;
        },
        getRandom(min, max) {
            return Number((Math.random() * (max - min) + min).toFixed(1));
        },
        toVwConverter(param) {
            return (param / window.innerWidth * 100).toFixed(2);
        },
        getPrize(type, index) {
            let id = arguments.length === 2 ? index : this.caseData.winItem.id;
            let items = document.querySelectorAll('.roulette-content__shop-case__item-wrapper__drum-item');
            mp.trigger('r:getprize', type, id);
            // Generate new items in drum
            this.caseData.items = this.chanceCalculate(this.caseData.contain);
            for (let i = 0; i < items.length; i++) {
                items[i].style.transform = 'unset';
            }
			if (type == 'get') {
				this.modal = 0;
			}
        },
        // getWorkName(id) {
        //     const names = {
        //     1, "Электрик" ,
        //     2, "Почтальон" ,
        //     3, "Таксист" ,
        //     4, "Водитель автобуса" ,
        //     5, "Газонокосильщик" ,
        //     6, "Дальнобойщик" ,
        //     7, "Инкассатор" ,
        //     8, "Автомеханик" ,
        //     9, "Сборщик апельсинов" ,
        //     10, "Лесоруб" ,
        //     };
        //     return names[id] || `Работа ${id}`;
        // }
    }
});