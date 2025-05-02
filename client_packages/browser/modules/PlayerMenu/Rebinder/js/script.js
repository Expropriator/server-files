var rebind = new Vue({
  el: "#wrapper",
  data:{
    active: false,
    wrapperClass: 'mainWrapper',
    binds:[
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
    ],
    rebindMenu: false,
    rebindMenuTitle: '',
    gg: "",
    keys: [
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
  ]

  },
  methods:{
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
      if(event.keyCode = 8 || 9){ // Проверка на Backspase и Tab
        rebind.rebindMenu = false
      }else if(event.keyCode = 27){ // Проверка на ESC
        rebind.rebindMenu = false
      }else if(event.keyCode >= 122 && event.keyCode <= 123){ // Проверка на F клавиши
        rebind.rebindMenu = false
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
  }
});