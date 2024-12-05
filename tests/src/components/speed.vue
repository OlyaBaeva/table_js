<template>
  <div class="container">
    <h1>Измерение скорости печати</h1>
    <div class="input-area">
      <textarea
        ref="textInput"
        v-model="typedText"
        @input="handleInput"
        @focus="handleFocus"
        :style="inputStyle"
      />
      <div id="typing-area" ref="typingArea" :style="textAreaStyle">
        <span v-for="(char, index) in textToType" :key="index" :style="getCharStyle(index)">
          {{ char }}
        </span>
      </div>
    </div>
    <div v-if="showResult" class="result">
      <h2>Ваша скорость печати: {{ wpm }} символов в минуту</h2>
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <button @click="reset" class="reset-button">Сбросить</button>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from 'vue';
export default {
 props: ['2'],
  setup() {
    const textToType = "Медуз, гидр и кораллы относят к группе кишечнополостных животных. Эти животные многоклеточные. Тело кишечнополостных животных похоже на мешок, который называют кишечной полостью. В него попадает пища — отсюда и название. Животных с таким строением называют кишечнополостными.";
    const typedText = ref('');
    const startTime = ref(null);
    const endTime = ref(null);
    const correctChars = ref(0);
    const wpm = ref(0);
    const showResult = ref(false);
    const error = ref(null);
    const typingArea = ref(null);
    const textInput = ref(null);
    const currentCharIndex = ref(0);

    const getCharStyle = (index) => {
      if (index < typedText.value.length) {
        if (typedText.value[index] === textToType[index]) {
          return { color: 'green' };
        } else {
          return { color: 'red' };
        }
      } else {
        return { color: 'gray' };
      }
    };

    const handleInput = () => {
      if (!startTime.value) {
        startTime.value = new Date();
      }

      correctChars.value = 0;
      let correct = true;
      for (let i = 0; i < typedText.value.length; i++) {
        if (typedText.value[i] === textToType[i]) {
          correctChars.value++;
        } else {
          correct = false;
          error.value = 'Ошибка! Исправьте опечатку.';
          break;
        }
      }
      if(correct && typedText.value.length > 0 && typedText.value.length <= textToType.length){
          error.value = null;
      }
      if (typedText.value === textToType && !showResult.value) {
          checkCompletion();
      }
    };

    const checkCompletion = () => {
      endTime.value = new Date();
      const timeTaken = (endTime.value - startTime.value) / 60000;
      wpm.value = Math.round(correctChars.value / timeTaken);
      showResult.value = true;
    };

    const reset = () => {
      typedText.value = '';
      startTime.value = null;
      endTime.value = null;
      correctChars.value = 0;
      wpm.value = 0;
      showResult.value = false;
      error.value = null;
      currentCharIndex.value = 0;
      textInput.value.focus();
    };
    const handleFocus = () => {
      textInput.value.focus();
    };

    onMounted(() => {
      textInput.value.focus();
    });
    const minHeight = 30; // Минимальная высота поля ввода
    const maxHeight = 200; // Максимальная высота поля ввода

    const inputStyle = computed(() => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '16px',
  fontFamily: 'monospace',
  marginBottom: '10px',
  minHeight: '30px',
  maxHeight: '200px',
  resize: 'vertical' // Разрешить изменение размера по вертикали
}));

    const textAreaStyle = computed(() => ({
      fontFamily: 'monospace',
      whiteSpace: 'pre-wrap',
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '16px',
      lineHeight: '1.5',
      overflowY: 'auto',
      maxHeight: '200px',
    }));

    return {
      textToType,
      typedText,
      startTime,
      endTime,
      correctChars,
      wpm,
      showResult,
      error,
      getCharStyle,
      handleInput,
      checkCompletion,
      reset,
      typingArea,
      textInput,
      inputStyle,
      textAreaStyle,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 20px auto;
  color: white
}
.input-area {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.result {
  margin-top: 20px;
  color: green;
}
.error {
  margin-top: 20px;
  color: red;
}
.reset-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

</style>