<script>
import axios from 'axios'
import data from './data.json';

export default {
    data() {
        return {
            selectedCountry: null,
            averageTemp: null,
            loading: false,
            errors: [],
            countryData: data.countries,
            cityTemps: [], // Массив температур для каждого города
        }
    },
    methods: {
        getAverageTemperature() {
            this.loading = true;
            this.errors = [];
            this.averageTemp = null;
            this.cityTemps = [];
            if (!this.selectedCountry || !this.selectedCountry.cities || this.selectedCountry.cities.length === 0) {
                this.errors.push("Выберите страну с городами.");
                this.loading = false;
                return;
            }

            const apiKey = '5b23f5217e6a1746d4a8728dbb48655e';

            let cityIndex = 0;
            const getTemps = () => {
                if (cityIndex >= this.selectedCountry.cities.length) {
                    this.calculateAverage();
                    return;
                }

                const city = this.selectedCountry.cities[cityIndex];
                axios.get(`https://web.postman.co/workspace/61bd1636-c355-4485-8733-413817735630/request/create?requestId=afc97230-564d-4b90-9fa2-15ef23a67a1e`)
                    .then(response => {
                        this.cityTemps.push(response.data.main.temp);
                        cityIndex++;
                        getTemps();
                        console.log(response.data.main.temp);
                    })
                    .catch(error => {
                        this.errors.push(`Ошибка для города ${city}: ${error.message}`);
                        cityIndex++;
                        getTemps();
                    });
            };

            getTemps();
        },
        calculateAverage() {
            if (this.cityTemps.length > 0) {
                this.averageTemp = this.cityTemps.reduce((sum, temp) => sum + temp, 0) / this.cityTemps.length;
            }
            this.loading = false;
        }
    }
};
</script>

<template>
    <div class="wrapper">
        <h1>Средняя температура по стране</h1>
        <select v-model="selectedCountry">
            <option value="" disabled>Выберите страну</option>
            <option v-for="country in countryData" :key="country.name" :value="country">
                {{ country.name }}
            </option>
        </select>
        <button @click="getAverageTemperature" :disabled="!selectedCountry || loading">
            {{ loading ? 'Загрузка...' : 'Получить среднюю температуру' }}
        </button>
        <div v-if="errors.length > 0">
            <p v-for="error in errors" :key="error" class="error">{{ error }}</p>
        </div>
        <div v-if="averageTemp !== null">
            <h2>Средняя температура: {{ averageTemp.toFixed(1) }} °C</h2>
            <ul>
              <li v-for="city in cityData" :key="city.name">
                {{ city.name }}: {{ city.temp }} °C
              </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.error {
    color: #d03939;
}

.wrapper {
    width: 900px;
    height: 500px;
    border-radius: 50px;
    padding: 20px;
    background: #1f0f24;
    text-align: center;
    color: #fff;
}

.wrapper h1 {
    margin-top: 50px;
}

.wrapper p {
    margin-top: 20px;
}

.wrapper input {
    margin-top: 30px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #110813;
    color: #fcfcfc;
    font-size: 14px;
    padding: 5px 8px;
    outline: none;
}
.country-select {
    width: 30%;
    padding: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 16px;
    border: 1px solid white;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.2); /* Полупрозрачный фон */
}
.wrapper input:focus {
    border-bottom-color: #6e2d7d;
}

.wrapper button:disabled {
    background: #746027;
    cursor: not-allowed;
}

.wrapper button {
    background: #e3bc4b;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin-left: 20px;
    cursor: pointer;
    transition: transform 500ms ease;
}

.wrapper button:hover {
    transform: scale(1.1) translateY(-5px);
}
</style>
