<template>
    <ul class="task-list">
        <li v-for="(task, index) in tasks" :key="index" class="task-item" :class="{ done: task.done }">
            <input type="checkbox" v-model="task.done" @change="$emit('saveTasks')">
            <span v-if="editingTaskIndex !== index" class="task-text" :class="{ done: task.done }">{{ task.text
                }}</span>
            <input v-else type="text" :value="editingTaskText"
                @input="$emit('update:editingTaskText', $event.target.value)" class="task-text"
                :class="{ done: task.done }">
            <div class="button-box">
                <button v-if="editingTaskIndex !== index" @click="$emit('editTask', index)">Редактировать</button>
                <button v-else @click="$emit('saveEdit', index)">Сохранить</button>
                <button v-if="editingTaskIndex !== index" @click="$emit('archiveTask', index)">Архивировать</button>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        tasks: {
            type: Array,
            required: true
        },
        editingTaskIndex: {
            type: Number,
            default: null
        },
        editingTaskText: {
            type: String,
            default: ''
        }
    }
};
</script>
