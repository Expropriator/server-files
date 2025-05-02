var container = new Vue({
    el: '#boom',
    data: {
        active: false,
        contNumber: 0,
        type: "",
        contClass: "",
        bet: "",
        minBet: "",
        betPlayerName: "",
        info: "ПОСТАВИТЬ",
        put: false,
        putInput: "0",

        win: false,
        gain: "",
        winCost: 1750000
    },
    methods: {
        addInfoContainer: function(contID, Type, Name, Price, MinBet, betPlayerName){
            this.contNumber = contID;
            this.type = Type;
            this.contClass = Name;
            this.bet = Price;
            this.minBet = MinBet;
            if(betPlayerName == "null") return;
            this.betPlayerName = betPlayerName;
        },
        addWin: function(prizName, sellPrice){
            this.gain = prizName;
            this.winCost = sellPrice;
            this.info = "ВЫИГРЫШ"
        },
        addInfoWinner: function(contID, Type, Name, Price, MinBet, betPlayerName){
            this.contNumber = contID;
            this.type = Type;
            this.contClass = Name;
            this.bet = Price;
            this.minBet = MinBet;
            this.betPlayerName = betPlayerName;
            this.info = "ОТКРЫТЬ"
        },
        setBet: function(){
            if(this.info == "ВЫИГРЫШ"){
                this.win = true
                return;
            }
            else if(this.info == "ОТКРЫТЬ"){
                mp.trigger('OpenContainer')
                this.closeContMenu();
                return;
            }
            this.put = true
            mp.trigger("ReadBet")
        },
        setNewBet: function(){
            mp.trigger('setNewBet', this.putInput)
            this.closeContMenu();
        },
        closeContMenu: function(){
            this.resetMenu();
            mp.trigger("closeContainer");
        },
        setInput: function(data){
            this.putInput = data
        },
        GetPriz: function(){
            mp.trigger('GetPriz')
            this.closeContMenu();
        },
        SellPriz: function(){
            mp.trigger('SellPriz')
            this.closeContMenu();
        },
        resetMenu: function(){
            this.contNumber = 0;
            this.type = "";
            this.contClass = "";
            this.bet = "";
            this.minBet = "";
            this.betPlayerName = "";
            this.put = false;
            this.putInput = "";
            this.win = false;
            this.gain = "";
            this.winCost = "";
            this.info = "ПОСТАВИТЬ"
        }
    }
});