var hudis = new Vue({
	el: ".hud_gun",
    data: {
		hud: false,
		kills: 0,
		time: "15",
		deaths: 0,
		time2: 600,
		localmap: "Cayo Perico",
    }
})
var gangarena = new Vue({
    el: ".gangarena",
    data: {
        active: false,
		adm: false,
		page: 0,
		style: 0,
		inlobby: false,
		weapon: 0,
		map: 0,
		lobby: [ ],
		lobbies: null,
		players: [ ],
		winners: [ ],
		arena: "Cayo Perico",
		arenas: ["Cayo Perico", "Kortz Center", "Airport", "Camp", "Sawmill", "Port"],
		modal: false,
    },
    methods: {
		hide: function () {
				mp.trigger('client::closemenu');
        },
        hides: function () {
            this.active = false;
			this.style = 0;
			if (this.inlobby)
			{
				this.adm = false;
				mp.trigger('client::disconnectlobby');
			}
        },
		hidesno: function () {
            this.active = false;
			this.style = 0;
        },
		show: function() {
			this.active = true;
			this.style = 0;
			this.inlobby = false;
			this.adm = false;
			this.weapon = 0;
			this.map = 0;
			this.lobby = [];
		},
		gostyle: function(index) {
			this.style = index;
			if (index == 1)
			{
				mp.trigger("client::getlobbylist");
			}
		},
		set: function(index) {
			this.weapon = index;
		},
		plweap: function() {
			this.weapon++
			if (this.weapon == 4)
			{
				this.weapon = 0;
			}
		},
		statemodal: function(state) {
			this.modal = state
		},
		minweap: function() {
			this.weapon--
			if (this.weapon == -1)
			{
				this.weapon = 3;
			}
		},
		setarena: function(index) {
			this.map = index;
			this.modal = false;
			if (this.map == 0) {
				this.arena = "Cayo Perico"
			}
			else if (this.map == 1) {
				this.arena = "Kortz Center"
			}
			else if (this.map == 2) {
				this.arena = "Airport"
			}
			else if (this.map == 3) {
				this.arena = "Camp"
			}
			else if (this.map == 4) {
				this.arena = "Sawmill"
			}
			else if (this.map == 5) {
				this.arena = "Port"
			}
		},
		sendlobby: function() {
			mp.trigger('client::sendlobby', JSON.stringify([this.lobby[0],this.lobby[1],this.lobby[2],this.weapon,this.map]));
		},
		kick: function(nick){
			mp.trigger('client::kickplayer', nick);
		},
		connectlobby: function(index) {
			mp.trigger('client::connectlobby', index);
		},
		start: function() {
			mp.trigger('client::startmatch', );
		},
		
		
		// Called server
		sendwinners: function(listwinners) {
			this.inlobby = false;
			this.active = true;
			this.style = 3;
			this.winners = listwinners;
		},
		refreshlobby: function(listplayers) {
			this.players = listplayers;
			this.lobby[0] = this.players.length;
		},
		setlobbylist: function(listlobby){
			this.lobbies = listlobby;
		},
		createlobby: function(listplayers, lobbyinfo){
			this.style = 2;
			this.players = listplayers;
			this.adm = true;
			this.inlobby = true;
			this.lobby = lobbyinfo;
		},
		setlobby: function(listplayers, lobbyinfo) {
			this.style = 2;
			this.players = listplayers;
			this.inlobby = true;
			this.lobby = lobbyinfo;
		},
    }
})