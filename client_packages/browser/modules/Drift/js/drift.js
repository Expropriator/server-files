var DRIFT = new Vue({
  el: '#app',
  data: {
    active: false,
    params: {

      Break: 1.00,
      Wheels: 1.00,

      Steering: 0.75,
      Skid: 2.00,

      Height: 0.10,
      Rotate: 1.00,

    },
    defalutprm: {
      Break: 1.00,
      Wheels: 1.00,

      Steering: 0.75,
      Skid: 2.00,

      Height: 0.10,
      Rotate: 1.00,
    }
  },
  methods: {
    justify: function(float) {
      return float.length == 1 ? (float + ".00") : float.length == 3 ? (float + "0") : float;
    },
    close: function() {
      mp.trigger("handling.hide");
    },
    send: function() {
      mp.trigger("handling.send", this.params.Break, this.params.Wheels, this.params.Steering, this.params.Skid, this.params.Height, this.params.Rotate);
    },
    open: function(json, todefault) {
      this.params = JSON.parse(json);
      this.defalutprm = JSON.parse(todefault);
      this.active = true;
    },
    defaultparams: function() {
      this.params = this.defalutprm;
    },
    hide: function() {
      this.active = false;
      this.params = {};
    }

  },
})
