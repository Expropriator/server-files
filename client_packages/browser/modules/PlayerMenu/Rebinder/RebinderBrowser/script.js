var rebindBrowser = new Vue({
    el: "#rebindBrowser",
    data:{
        active: false
    },
    methods:{
      rebind: function(event){
        mp.trigger("CheckKeyses", event.keyCode)
      },
    }
});