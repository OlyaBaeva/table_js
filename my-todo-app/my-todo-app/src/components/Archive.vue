<template>
  <ul class="task-list" v-if="tasks && tasks.length">
    <li v-for="(task, index) in tasks" :key="index" class="task-item" :class="{ done: task.done }">
      <input type="checkbox" v-model="task.done" disabled>
      <span class="task-text" :class="{ done: task.done }">{{ task.text }}</span>
      <div class="button-box">
        <button @click="$emit('deleteTask', index)">Удалить</button>
      </div>
    </li>
  </ul>
  <p v-else>Архив пуст</p>
</template>



<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  }
};
</script>
