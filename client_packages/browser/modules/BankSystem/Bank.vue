<template>
  <div v-if="visible" class="bank-ui">
    <h2>Центральный банк</h2>
    <p>Баланс: {{ balance }}$</p>
    <input type="number" v-model.number="amount" placeholder="Сумма" />
    <button @click="withdraw">Снять</button>
    <button @click="deposit">Положить</button>
    <button @click="close">Закрыть</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      amount: 100,
      balance: 1000 // можно потом получить с сервера
    };
  },
  methods: {
    withdraw() {
      mp.trigger("bank:withdraw", this.amount);
    },
    deposit() {
      mp.trigger("bank:deposit", this.amount);
    },
    close() {
      this.visible = false;
    }
  },
  mounted() {
    mp.events.add("showBankMenu", () => {
      this.visible = true;
    });
  }
};
</script>

<style scoped>
.bank-ui {
  position: absolute;
  top: 20%;
  left: 40%;
  background: #222;
  color: white;
  padding: 20px;
  border-radius: 12px;
}
button {
  margin: 5px;
}
</style>
