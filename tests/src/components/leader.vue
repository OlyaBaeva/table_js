<template>
  <div>
    <h1>Опросник на коммуникативные и организаторские способности</h1>
    <p>Инструкция: Пожалуйста, отвечайте на вопросы, выбирая один из предложенных вариантов. "+" - Да, "-" - Нет.</p>

    <form @submit.prevent="submitAnswers">
      <div v-for="(question, index) in questions" :key="index">
        <h3>{{ question.text }}</h3>
        <div>
    <input type="radio" :id="'q' + index + 'a1'" :value="1" v-model="answers[index]">
    <label :for="'q' + index + 'a1'">'+'</label>
    <input type="radio" :id="'q' + index + 'a2'" :value="-1" v-model="answers[index]">
    <label :for="'q' + index + 'a2'">' - '</label><br>
  </div>
      </div>
      <button type="submit" class="purple-button">Отправить ответы</button>
    </form>

    <div v-if="showResults">
      <h2>Результаты:</h2>
      <h3>Коммуникативные способности: {{ communicationCoefficient }}</h3>
      <h3>Организаторские способности: {{ organizationalCoefficient }}</h3>
      <p>Описание результатов:</p>
      <p v-if="communicationCoefficient >= 0.5">Высокий уровень коммуникативных способностей</p>
      <p v-else-if="communicationCoefficient >= 0.3">Средний уровень коммуникативных способностей</p>
      <p v-else>Низкий уровень коммуникативных способностей</p>

      <p v-if="organizationalCoefficient >= 0.5">Высокий уровень организаторских способностей</p>
      <p v-else-if="organizationalCoefficient >= 0.3">Средний уровень организаторских способностей</p>
      <p v-else>Низкий уровень организаторских способностей</p>
      <ul>
        <li v-for="(answer, index) in answers" :key="index">Вопрос {{ index + 1 }}: {{ answer > 0 ? '+' : '-' }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const questions = ref([
  { text: '1. Много ли у Вас друзей, с которыми Вы постоянно общаетесь?', type: 'communication' },
  { text: '2. Часто ли Вам удается склонить большинство своих товарищей к принятию ими Вашего мнения?', type: 'organizational' },
  { text: '3. Долго ли Вас беспокоит чувство обиды, причиненное Вам кем-то из Ваших товарищей?', type: 'communication' },
  { text: '4. Всегда ли Вам трудно ориентироваться в создавшейся критической ситуации?', type: 'organizational' },
  { text: '5. Есть ли у Вас стремление к установлению новых знакомств с разными людьми?', type: 'communication' },
  { text: '6. Нравится ли Вам заниматься общественной работой?', type: 'organizational' },
  { text: '7. Верно ли, что Вам приятнее и проще проводить время с книгами или за каким-либо другим занятием, чем с людьми?', type: 'communication' },
  { text: '8. Если возникли какие-либо помехи в осуществлении Ваших намерений, то легко ли Вы отступаете от них?', type: 'organizational' },
  { text: '9. Легко ли Вы устанавливаете контакты с людьми, которые значительно старше Вас по возрасту?', type: 'communication' },
  { text: '10. Любите ли Вы придумывать и организовывать со своими товарищами различные игры и развлечения?', type: 'organizational' },
  { text: '11. Трудно ли Вы включаетесь в новую для Вас компанию?', type: 'communication' },
  { text: '12. Часто ли Вы откладываете на другие дни те дела, которые нужно было бы выполнить сегодня?', type: 'organizational' },
  { text: '13. Легко ли Вам удается устанавливать контакты с незнакомыми людьми?', type: 'communication' },
  { text: '14. Стремитесь ли Вы добиваться, чтобы Ваши товарищи действовали в соответствии с Вашим мнением?', type: 'organizational' },
  { text: '15. Трудно ли Вы осваиваетесь в новом коллективе?', type: 'communication' },
  { text: '16. Верно ли, что у Вас не бывает конфликтов с товарищами из-за невыполнения ими своих обязанностей, обязательств?', type: 'organizational' },
  { text: '17. Стремитесь ли Вы при удобном случае познакомиться и побеседовать с новым человеком?', type: 'communication' },
  { text: '18. Часто ли в решении важных дел Вы принимаете инициативу на себя?', type: 'organizational' },
  { text: '19. Раздражают ли Вас окружающие люди и хочется ли Вам побыть одному?', type: 'communication' },
  { text: '20. Правда ли, что Вы обычно плохо ориентируетесь в незнакомой для Вас обстановке?', type: 'organizational' },
  { text: '21. Нравится ли Вам постоянно находиться среди людей?', type: 'communication' },
  { text: '22. Возникает ли у Вас раздражение, если Вам не удается закончить начатое дело?', type: 'organizational' },
  { text: '23. Испытываете ли Вы чувство затруднения, неудобства или стеснения, если приходится проявить инициативу, чтобы познакомиться с новым человеком?', type: 'communication' },
  { text: '24. Правда ли, что Вы утомляетесь от частого общения с товарищами?', type: 'organizational' },
  { text: '25. Любите ли Вы участвовать в коллективных играх?', type: 'communication' },
  { text: '26. Часто ли Вы проявляете инициативу при решении вопросов, затрагивающих интересы Ваших товарищей?', type: 'organizational' },
  { text: '27. Правда ли, что Вы чувствуете себя неуверенно среди малознакомых Вам людей?', type: 'communication' },
  { text: '28. Верно ли, что Вы редко стремитесь к доказательству своей правоты?', type: 'organizational' },
  { text: '29. Полагаете ли Вы, что Вам не доставляет особого труда внести оживление в малознакомую Вам компанию?', type: 'communication' },
  { text: '30. Принимаете ли Вы участие в общественной работе в школе?', type: 'organizational' },
  { text: '31. Стремитесь ли Вы ограничить круг своих знакомых небольшим количеством людей?', type: 'communication' },
  { text: '32. Верно ли, что Вы не стремитесь отстаивать свое мнение или решение, если оно не было сразу принято Вашими товарищами?', type: 'organizational' },
  { text: '33. Чувствуете ли Вы себя непринужденно, попав в незнакомую Вам компанию?', type: 'communication' },
  { text: '34. Охотно ли Вы приступаете к организации различных мероприятий для своих товарищей?', type: 'organizational' },
  { text: '35. Правда ли, что Вы не чувствуете себя достаточно уверенным и спокойным, когда приходится говорить что-либо большой группе людей?', type: 'communication' },
  { text: '36. Часто ли Вы опаздываете на деловые встречи, свидания?', type: 'organizational' },
  { text: '37. Верно ли, что у Вас много друзей?', type: 'communication' },
  { text: '38. Часто ли Вы смущаетесь, чувствуете неловкость при общении с малознакомыми людьми?', type: 'organizational' },
  { text: '39. Правда ли, что Вас пугает перспектива оказаться в новом коллективе?', type: 'communication' },
  { text: '40. Правда ли, что Вы не очень уверенно чувствуете себя в окружении большой группы своих товарищей?', type: 'organizational' },
]);

    const answers = ref([]);
    const showResults = ref(false);

    const communicationQuestions = [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39];
    const organizationalQuestions = [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

    const communicationCoefficient = computed(() => calculateCoefficient(communicationQuestions));
    const organizationalCoefficient = computed(() => calculateCoefficient(organizationalQuestions));
    const totalScore = computed(() => communicationCoefficient.value + organizationalCoefficient.value);

    const submitAnswers = () => {
      showResults.value = true;
    };

    const calculateCoefficient = (questions) => {
      let count = 0;
      questions.forEach((questionNumber, index) => {
        const questionIndex = questionNumber -1;
        const expectedAnswer = (index < 10) ? 1 : -1;
        if(answers.value[questionIndex] === expectedAnswer){
          count++;
        }
      });
      return 0.05 * count;
    };

    return { questions, answers, showResults, submitAnswers, communicationCoefficient, organizationalCoefficient, totalScore };
  },
};
</script>
