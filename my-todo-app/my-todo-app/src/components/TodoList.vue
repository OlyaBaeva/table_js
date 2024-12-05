<template>
  <div>
    <h1>Список задач</h1>

    <div class="task-controls">
      <input type="text" v-model="newTask" placeholder="Добавить задачу">
      <div class="button-box">
        <button @click="addTask">Добавить</button>
        <button @click="showArchive = !showArchive" :class="{ active: showArchive }">Архив</button>
      </div>
    </div>

    <component :is="showArchive ? 'Archive' : 'TaskList'" :tasks="showArchive ? archivedTasks : tasks"
      :editingTaskIndex="editingTaskIndex" :editingTaskText="editingTaskText" @saveTasks="saveTasks"
      @deleteTask="deleteTask" @archiveTask="archiveTask" @editTask="editTask" @saveEdit="saveEdit"
      @update:editingTaskText="updateEditingTaskText" />
  </div>
</template>

<script>
import TaskList from './TaskList.vue';
import Archive from './Archive.vue';

export default {
  components: {
    TaskList,
    Archive
  },
  data() {
    return {
      newTask: '',
      tasks: this.loadTasks() || [],
      archivedTasks: this.loadArchivedTasks() || [],
      showArchive: false,
      editingTaskIndex: null,
      editingTaskText: ''
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, done: false });
        this.newTask = '';
        this.saveTasks();
      }
    },

    deleteTask(index) {
      this.archivedTasks.splice(index, 1);
      this.saveArchivedTasks();
    },

    archiveTask(index) {
      const archivedTask = this.tasks.splice(index, 1)[0];
      this.archivedTasks.push(archivedTask);
      this.saveTasks();
      this.saveArchivedTasks();
    },

    editTask(index) {
      this.editingTaskIndex = index;
      this.editingTaskText = this.tasks[index].text;
    },

    saveEdit(index) {
      this.tasks[index].text = this.editingTaskText;
      this.editingTaskIndex = null;
      this.editingTaskText = '';
      this.saveTasks();
    },

    updateEditingTaskText(newText) {
      this.editingTaskText = newText;
    },

    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    loadTasks() {
      const tasks = localStorage.getItem('tasks');
      if (tasks) {
        return JSON.parse(tasks);
      }
      return null;
    },

    saveArchivedTasks() {
      localStorage.setItem('archivedTasks', JSON.stringify(this.archivedTasks));
    },

    loadArchivedTasks() {
      const tasks = localStorage.getItem('archivedTasks');
      if (tasks) {
        console.log(tasks);
        return JSON.parse(tasks);
      }
      return null;
    }
  }
};
</script>

<style>
.active {
  background-color: #969696;
  border: 1px solid #ccc;
  cursor: pointer;
}

input[type='text'] {
  width: 70%;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.task-controls {
  min-width: 35rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.task-list {
  list-style-type: none;
  padding: 0;

}

.button-box {
  display: flex;
  gap: 10px;
}

.task-item {
  min-width: 35rem;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.task-text.done {
  text-decoration: line-through;
  color: gray;
}
</style>
