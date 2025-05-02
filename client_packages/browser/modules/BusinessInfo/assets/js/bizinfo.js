var bizinfo = new Vue({
    el: ".bizinfo",
    data: {
        active: true,
        bizid: 1488,
        nameBiz: "Магазин одежды",
        owner: "Государство",
        price: "330 000$",
        mafia: "La Costra Nostra"
    },
    methods: {
        closebizinfomenu: function() {
            mp.trigger("closebizinfo");
        },
        show: function (level, currentjob,data) {
            this.level = level;
            this.jobid = currentjob;
            this.active = true;
            this.datajobs = data;
        },
        hide: function () {
            this.active = false;
        },
        showbizinfo: function(data){
            this.active = true;
        },
        hidebizinfo: function(){
            this.active = false;
            mp.trigger("closebizinfo");
        },
        buy: function(){
            mp.trigger("buybiz");
        },
    }
})
// mp.keys.bind(Keys.VK_ESCAPE, false, function () { // ESC
    // this.active = false;
	// mp.trigger("closebizinfo");
// });