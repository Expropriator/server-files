var rentcars = new Vue({
  el: "#app",
  data: {
    active: true,
    header: null,
    vehicle: null,
	vehicles: {"faggio":120,"faggio2":100,"faggio3":50,"manchez":500,"manchez1":500,"manchez2":500,"manchez3":500,"manchez33":500,"manchez4":500,"manchez5":500,"manchez6":500},
    rentMinutes: 10,
    isModalOpen: false,
    money: 0,
    maxSpeed: 0,
    maxPassengers: 0,
  },
  methods: {
    openMenu(json) {
      this.active = true;
      this.header = json.header;
      this.money = json.money;
      this.vehicles = json.vehicles;
    },
    selectModel(vehicle) {
      this.vehicle = vehicle;
      this.isModalOpen = true;
      mp.trigger("CLIENT:::RENT::GET_VEHICLE_INFORMATION", vehicle);
    },
    //Подгрузка данных машины
    loadVehicleInfo(speed, number) {
      this.maxSpeed = speed;
      this.maxPassengers = number;
    },
    changeRentTimeMinutes(action) {
      if(action == "add") {
        this.rentMinutes + 5 > 180 ? 0 : this.rentMinutes += 5
      } else {
        this.rentMinutes - 5 < 5 ? 5 : this.rentMinutes -= 5
      }
    },
    rentVehicle: function() {
      if(this.needMoney) return;
      if(this.vehicle != null) {
        mp.trigger("CLIENT:::RENT::BUY_RENT_CAR", this.vehicle, this.rentMinutes);
      }
    },
    modalClose() {
      this.isModalOpen = false;
      this.vehicle = null;
      this.rentMinutes = 10;
      this.maxSpeed = 0;
      this.maxPassengers = 0;
    },
    reset() {
      this.modalClose();
      this.active = false;
    },
    closePanel: function() {
      this.reset();
      mp.trigger("RENT::CLOSE_RENT_MENU");
    },
  },
  computed: {
    needMoney: function() {
      if(this.money >= (this.vehicles[this.vehicle] * (this.rentMinutes/10))) return false;
      else return true;
    },
  }
})
