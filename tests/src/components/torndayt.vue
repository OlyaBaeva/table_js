<template>
  <div>
    <h1>Тест на избирательность внимания</h1>
    <div v-if="started && !finished">
      <p>Найдите следующие числа: {{ targetNumbers.join(', ') }}</p>
      <div class="number-grid">
        <div v-for="(number, index) in numbers" :key="index"
             :class="{ found: foundNumbers.includes(number) }"
             @click="checkNumber(number)">
          {{ number }}
        </div>
      </div>
      <p>Время: {{ formatTime(elapsedTime) }} / 5 мин</p> </div>
    <div v-else-if="finished">
      <h2>Тест завершен!</h2>
      <p>Время: {{ formatTime(elapsedTime) }}</p>
      <p>Найденные числа: {{ foundNumbers.join(', ') }}</p>
      <p v-if="elapsedTime < 190">Отличный результат!</p>
      <p v-else-if="elapsedTime > 190 && elapsedTime < 210">Средний показатель</p>
      <p v-else-if="elapsedTime > 210 && elapsedTime < 300">Потренериуйте внимательность</p>
      <p v-else>Рекомендуется обратиться к врачу.</p>
      <p >Ваш результат: {{elapsedTime}} сек.</p>
      <button @click="resetTest">Пройти тест ещё раз</button>
    </div>
    <div v-else>
      <p>Нажмите "Начать", чтобы начать тест.</p>
    </div>
    <button class="purple-button" v-if="!started" @click="startTest">Начать тест</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const numbers = ref([]);
    const targetNumbers = ref([]);
    const foundNumbers = ref([]);
    const started = ref(false);
    const finished = ref(false);
    let timerId = null; 
    const startTime = ref(null);
    const elapsedTime = ref(0); 
    const maxTime = 300;
    
    const generateNumbers = () => {
      const uniqueNumbers = new Set();
      while (uniqueNumbers.size < 100) {
        uniqueNumbers.add(Math.floor(Math.random() * 900) + 100);
      }
      return Array.from(uniqueNumbers);
    };

    const generateTargetNumbers = (count = 10) => { 
      const uniqueTargets = new Set();
      while (uniqueTargets.size < count) {
        const randomIndex = Math.floor(Math.random() * numbers.value.length);
        uniqueTargets.add(numbers.value[randomIndex]);
      }
      return Array.from(uniqueTargets);
    };

    const startTest = () => {
      numbers.value = generateNumbers();
      targetNumbers.value = generateTargetNumbers();
      startTime.value = Date.now();
      started.value = true;
      finished.value = false;
      elapsedTime.value = 0;

      timerId = setInterval(() => {
        elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000);
        if (elapsedTime.value >= maxTime) {
          clearInterval(timerId);
          finished.value = true;
        }
      }, 1000); 
    };

    const checkNumber = (number) => {
      if (!foundNumbers.value.includes(number) && targetNumbers.value.includes(number)) {
        foundNumbers.value.push(number);
      }
      if (foundNumbers.value.length === targetNumbers.value.length) {
        clearInterval(timerId); 
        finished.value = true;
      }
    };

    const resetTest = () => {
      numbers.value = [];
      targetNumbers.value = [];
      foundNumbers.value = [];
      started.value = false;
      finished.value = false;
      clearInterval(timerId); 
      elapsedTime.value = 0;
      startTime.value = null;
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return {
      numbers,
      targetNumbers,
      foundNumbers,
      started,
      finished,
      elapsedTime,
      maxTime,
      startTest,
      checkNumber,
      resetTest,
      formatTime,
    };
  },
};
</script>

<style>
.number-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 5px;
}

.number-grid div {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
  cursor: pointer;
}

.number-grid div.found {
  background-color: lightgreen;
} 
</style>