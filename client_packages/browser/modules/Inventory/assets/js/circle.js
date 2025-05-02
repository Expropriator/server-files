var circleDesc = {
    "handshake": "🤝 Пожать руку",
    "licenses": "📄 Показать лицензии",
    "carinv":"📦 Посмотреть багажник",
    "carpetrol":"🚘 Заправить транспорт",
    "trunks":"🚘 Залезть в багажник",
    "doors":"🔐 Двери",
    "fraction":"🔫 Фракция",
    "offer":"🖐 Предложить обмен",
    "givemoney":"💰 Передать деньги",
    "heal":"💊 Вылечить",
    "hood":"🚙 Капот",
    "leadaway":"👉 Вести за собой",
    "offerheal":"💉 Предложить лечение",
    "passport":"💳 Показать паспорт",
    "search":"😒 Обыскать",
    "sellkit":"💊 Продать аптечку",
    "takegun":"🔫 Изъять оружие",
    "takeillegal":"💣 Изъять нелегал",
    "trunk":"🚙 Багажник",
    "pocket": "🛍 Мешок",
    "takemask": "🎭 Сорвать маску",
    "rob": "🤬 Ограбить",
    "house": "🏡 Дом",
    "ticket": "💵 Выписать штраф",

    "sellcar": "🚘 Продать машину",
    "sellhouse": "🏠 Продать дом",
    "roommate": "👋 Заселить в дом",
    "invitehouse": "🤝 Пригласить в дом",
	
	"givelicgun": "✉️ Выдать лицензию на оружие",
	"givemedlic": "✉️ Выдать медицинскую карту",
    "givearmylic": "✉️ Выдать военный билет",
	"sendkpz" : "👮 Посадить в КПЗ",
	"socialnoe" : "🤝Социальное",
	"kiss" : "💋Поцеловать",
	"saveposauto" : "🚙 Припарковать авто",
	"carry": "👨‍👦 Взять на руки",
	"changenum": "🚗 Снять номер",
}
var circleData = {
    "Игрок":
    [
        ["givemoney", "offer", "fraction", "passport", "licenses", "heal", "house", "socialnoe"],
    ],
    "Машина":
    [
        ["hood", "trunk", "doors", "carinv", "carpetrol", "trunks", "changenum"],
    ],
    "Дом":
    [
        ["sellcar", "sellhouse", "roommate", "invitehouse"],
    ],
	"Социальное":
    [
        ["handshake", "kiss", "carry"],
    ],
    "Фракция":
    [
        [],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["rob", "robguns", "pocket"],
        ["leadaway"],
        ["leadaway", "search", "takegun", "takeillegal", "takemask", "ticket", "givelicgun", "sendkpz"],
        ["sellkit", "offerheal", "givemedlic"],
        ["leadaway", "search", "takegun", "takeillegal", "takemask"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway", "pocket", "rob", "robguns"],
        ["leadaway"],
        ["leadaway"],
        ["leadaway"],
        ["leadaway", "search", "takegun", "takeillegal", "takemask", "givearmylic"],
        ["leadaway", "search", "takegun", "takeillegal", "takemask", "ticket"],
    ],
    "Категории":
    [
        ["acat1", "acat2", "acat3", "acat4", "acat5", "acat6", "acat7", "acancel"],
    ],
    "Анимации":
    [
        ["seat1", "seat2", "seat3", "seat4", "seat5", "seat6", "seat7", "seat8"],
        ["social1", "social2", "social3", "social4", "social5", "social6", "social7", "socialnext1"],
        ["phis1", "phis2", "phis3", "phis4", "phis5"],
        ["indecent1", "indecent2", "indecent3", "indecent4", "indecent5"],
        ["stay1", "stay2", "stay3", "stay4", "stay5", "stay6", "stay7", "staynext1"],
        ["dance1", "dance2", "dance3", "dance4", "dance5", "dance6", "dance7", "dancenext1"],
		["mood0", "mood1", "mood2", "mood3", "mood4", "mood5", "mood6", "moodnext1"],
		["dance8", "dance9", "dance10", "dance11", "dance12", "dance13", "dance14", "dancenext2"],
		["dance15", "dance16", "dance17", "dance18", "dance19", "dance20", "dance21", "dancenext3"],
		["dance22", "dance23"],
		["social8", "social9", "social10", "social11", "social12", "social13", "social14", "socialnext2"],
		["social15", "social16", "social17", "social18", "social19", "social20", "social21"],
		["ws0", "ws1", "ws2", "ws3", "ws4", "ws5", "ws6", "ws7"],
		["stay8", "stay9", "stay10", "stay11"],
    ],
}

var circle = new Vue({
    el: '.cricle',
    data: {
        active: false,
        icons: [null,null,null,null,null,null,null,null],
        description: null,
        title: "title",
		items: ["Вести за собой", "Обыскать", "Изъять оружие", "Изъять нелегал", "Сорвать маску", "Выписать штраф", "Выдать лицензию на оружие", "Посадить в КПЗ"],
    },
    methods:{
        set: function(t,id){
            this.icons = circleData[t][id]
            this.description = t
            this.title = t
			this.items = [];
			for (let idx in this.icons) {
                this.items.push(circleDesc[this.icons[idx]])
            }
        },
        over: function(e){
            let id = e.target.id
            if(id == 8){
                this.description = "Закрыть"
                return;
            }
            let iname = this.icons[id]
            //console.log(id, iname)
            if(iname == null){
                this.description = this.title
                return;
            }
            this.description = circleDesc[iname]
        },
        out: function(e){
            this.description = this.title
            //console.log('out')
        },
        btn: function(e){
            let id = e.target.id
            if(id == 8){
                mp.trigger("circleCallback", -1);
                this.hide();
                return;
            }
            mp.trigger("circleCallback", Number(e.target.id));
            this.hide();
        },
        show: function(t,id){
            this.active=true
            this.set(t,id)
            setTimeout(()=>{move('.circle').set('width', '480px').set('height', '480px').set('opacity', 1).set('display', 'block').end()}, 50);
        },
        hide: function(){
            //move('.circle').set('width', '80px').set('height', '80px').set('opacity', 0).end(()=>{circle.active=false})
            circle.active = false;
        }
    }
})