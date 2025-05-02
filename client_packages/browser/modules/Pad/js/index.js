var fmenu = new Vue({
    el: ".pad",
    data: {
		active: false,
		menu: 0,
		name: "La Cosa Nostra",
		submenu: false,
        members: [10],
        input: "1",
        rank: "1",
        btntext: ["", "","", "Принять", "Выгнать", "Изменить"],
        header: ["", "","", "ПРИГЛАСИТЬ", "ВЫГНАТЬ", "ИЗМЕНИТЬ", "","","Редактирование рангов"],
		ranks: ["Рядовой", "Прапорщик", "Сержант", "Ефрейтор", "Лейтенант"],
		newranks: ["Рядовой", "Прапорщик", "Сержант", "Ефрейтор", "Лейтенант"],
        btnactive: [false, false, false, false, false, false, false, false, false, false],
		
        oncounter: 0,
        ofcounter: 0,
        counter: 0,
		logs: [],
		
		style: 2,
		money: 0,
		
		mats: 0,
		drug: 0,
		med: 0,
		moneys: 0,
    },
    methods:{
        gostyle: function(index) {
            this.style = index;
        },
		set: function (json, count, on, off) {
            this.members = JSON.parse(json);
            this.oncounter = on;
            this.ofcounter = off;
            this.counter = count;
        },
		setranks: function(json){
			this.ranks = json;
			this.newranks = json;
		},
		save: function(){
			mp.trigger("fmenu", 5, JSON.stringify(this.newranks), false);
		},
		setlogs: function(logs) {
			this.logs = logs;
		},
        btn: function (id, event) {
            console.log(id)
            var ind = this.btnactive.indexOf(true);
            if (ind > -1) this.btnactive[ind] = false;
            if (id == 0) {
                this.reset();
                this.active = false;
                mp.trigger('closefm');
                return;
            } else {
                this.submenu = true;
                this.style = id;
                this.btnactive[id] = true;
                console.log(this.style)
            }
        },
		yvol: function (owner)
		{
			this.reset();
                this.active = false;
                mp.trigger('closefm');
				mp.trigger("fmenu", 3, owner, this.rank);
		},
        submit: function () {
            //console.log('submit:' + this.menu + ':' + this.input + ':' + this.rank);
            mp.trigger("fmenu", this.style, this.input, this.rank);
            this.active = false;
            this.reset();
        },
		submit2: function () {
            //console.log('submit:' + this.menu + ':' + this.input + ':' + this.rank);
            mp.trigger("fmenu::takemoney", this.money);
            this.active = false;
            this.reset();
			mp.trigger('closefm');
        },
		submit3: function () {
            //console.log('submit:' + this.menu + ':' + this.input + ':' + this.rank);
            mp.trigger("fmenu::putmoney", this.money);
            this.active = false;
            this.reset();
			mp.trigger('closefm');
        },
        reset: function () {
            this.btnactive = [false, false, false, false, false];
            this.submenu = false;
            this.members = [];
            this.input = "";
            this.rank = "";
            this.style = 2;
            this.money = 0;
        }
    }
});
function closemenu() {
    mp.trigger("CloseAutosale")
}