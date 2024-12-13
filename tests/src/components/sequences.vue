<template>
  <div>
    <h1>Тест на нахождение неправильной последовательности</h1>
    <div v-if="!started">
      <button class="purple-button" @click="startTest">Начать тест</button>
    </div>
    <div v-else-if="currentRound <= 8">
      <div v-if="timeLeft > 0">
        <h2>Раунд {{ currentRound }}</h2>
        <p>Найдите ошибку в последовательности:</p>
        <div class="sequences-container">
          <div
            v-for="(sequence, index) in sequences"
            :key="index"
            class="sequence-item"
            :class="{ correct: index === incorrectIndex && answered, selected: index === selectedIndex }"
            @click="checkAnswer(index)">
            {{ sequence }}
          </div>
        </div>
        <p>Осталось времени: {{ timeLeft }} сек</p>
      </div>
      <div v-else>
        <p>Правильный ответ: <span class="correct">{{ correctSequence }}</span></p>
        <button class="purple-button" @click="nextRound">Далее</button>
      </div>
    </div>
    <div v-else>
      <h2>Тест завершен!</h2>
      <p>Количество правильных ответов: {{ rightAnswers }}</p>
      <button class="purple-button" @click="resetTest">Начать заново</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
export default {
  setup() {
    const started = ref(false);
    const currentRound = ref(0);
    const timeLeft = ref(30);
    const correctSequence = ref('');
    const sequences = ref([]);
    const incorrectIndex = ref(0);
    const rightAnswers = ref(0);
    const selectedIndex = ref(-1); // Добавлено
    const answered = ref(false);
    const isCorrect = ref(false);
    let timerId;
    
   const generateSequence = (num) => {
      const numStr = num.toString().padStart(4, '0');
      if (isAllDigitsEqual(numStr)) {
        return generateSequence(Math.floor(Math.random() * 9000)); 
      }
      return numStr.repeat(8);
    };

    const isAllDigitsEqual = (str) => {
      if (str.length === 0) return false;
      return str.split('').every((digit) => digit === str[0]);
    };

    const swapDigits = (str) => {
      const arr = str.split('');
      let index1, index2;
      do {
        index1 = Math.floor(Math.random() * arr.length);
        index2 = Math.floor(Math.random() * arr.length);
      } while (index1 === index2 || arr[index1] === arr[index2]);
      [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
      return arr.join('');
    };

    const generateSequences = () => {
      const numbers = [];
      while (numbers.length < 5) {
        let num = Math.floor(Math.random() * 9999); 
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }
      incorrectIndex.value = Math.floor(Math.random() * 5);
      sequences.value = numbers.map((num, index) => {
        if (index === incorrectIndex.value) {
          const seq = generateSequence(num);
          correctSequence.value = swapDigits(seq);
          return correctSequence.value;
        } else {
          return generateSequence(num);
        }
      });
    };

    const startTest = () => {
      started.value = true;
      resetRound(); 
    };

    const resetRound = () => {
      currentRound.value = 1;
      timeLeft.value = 30;
      generateSequences();
      startTimer();
    };

    const nextRound = () => {
      currentRound.value++;
      if (currentRound.value <= 8) {
        timeLeft.value = 30;
        answered.value = false;
        generateSequences();
        startTimer();
      }
    };

    const startTimer = () => {
      clearInterval(timerId);
      timerId = setInterval(() => {
        timeLeft.value--;
        if (timeLeft.value <= 0) {
          clearInterval(timerId);
          timeLeft.value = 0; 
        }
      }, 1000);
    };


    const checkAnswer = (index) => {
      clearInterval(timerId);
      selectedIndex.value = index;
      answered.value = true; // Устанавливаем флаг answered после ответа
      if (index === incorrectIndex.value) {
        alert('Правильно!');
        rightAnswers.value++;
        nextRound();
      } else {
        alert(`Неправильно! Правильный ответ - ${correctSequence.value + 1}`);
        nextRound();
      }
    };

    const resetTest = () => {
      started.value = false;
      currentRound.value = 0;
      rightAnswers.value = 0;
      clearInterval(timerId);
    };

    return {
      started,
      currentRound,
      timeLeft,
      sequences,
      correctSequence,
      rightAnswers,
      startTest,
      selectedIndex,
      incorrectIndex,
      nextRound,
      checkAnswer,
      resetTest,
      answered,
    };
  },
};
</script>

<style scoped>
.sequences-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sequence-item {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  color: black;
  min-width: 150px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.sequence-item.correct {
  background-color: lightgreen;
  font-weight: bold;
}

.sequence-item.selected {
  background-color: #e0e0e0;
}

.correct {
  font-weight: bold;
  color: green;
}
</style>