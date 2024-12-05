<template>
  <div :style="cardStyle">
    <h1>Конвертер валют</h1>
    <div>
      <label for="amount">Сумма:</label>
      <input type="number" id="amount" v-model="amount" :min="0">
    </div>
    <div>
      <label :style="selectStyle" for="from" >Из:</label>
      <select id="from" v-model="fromCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
      </select>
    </div>
    <div>
      <label :style="selectStyle" for="to">В:</label>
      <select id="to" v-model="toCurrency">
        <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
      </select>
    </div>
    <button @click="convert" :style="buttonStyle">Перевод</button>
    <div v-if="result">{{ result }}</div>
    <div v-else-if="error" :style="errorStyle">{{ error }}</div>
    <div v-else>Введите сумму и выберите валюты.</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      amount: 1,
      fromCurrency: 'EUR',
      toCurrency: 'USD',
      result: null,
      error: null,
      currencies: ['EUR', 'USD', 'GBP', 'JPY', 'CAD', 'AUD'], 
      apiKey: '9f8984fca2d94fab2a4a0d6a',
    };
  },
  methods: {
    async convert() {
      this.result = null;
      this.error = null;
      try {
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${this.fromCurrency}/${this.toCurrency}/${this.amount}`);
        this.result = `Результат: ${response.data.conversion_result} ${this.toCurrency} по ставке ${response.data.conversion_rate}`;
      } catch (error) {
        this.error = `Ошибка: ${error.message}`;
      }
    },
  },
  computed: {
    cardStyle() {
      return {
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: '0 auto',
        fontFamily: 'sans-serif', 
      };
    },
    selectStyle() {
      return {
        width: '100%',
        marginBottom: '10px',
      };
    },
    buttonStyle() {
      return {
        backgroundColor: 'gray',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      };
    },
    resultStyle() {
      return {
        fontWeight: 'bold',
        fontSize: '16px',
      };
    },
    errorStyle() {
      return {
        color: 'red',
        fontWeight: 'bold',
      };
    },

  },
};
</script>


