<template>
  <div class="task-list">
    <div v-for="(task, index) in tasks" :key="index" class="task-item">
      <!-- Editable Task Name -->
      <input
        v-model="task.name"
        class="editable-input"
        @dblclick="editing = { index, key: 'name' }"
        @blur="updateTask({ index, key: 'name', value: task.name || '' })"
        v-if="editing.index === index && editing.key === 'name'"
        type="text"
        placeholder="Edit task name"
      />
      <span
        v-else
        class="task-name"
        @dblclick="editing = { index, key: 'name' }"
      >
        {{ task.name || 'untitled' }}
      </span>

      <!-- Editable Task Time -->
      <input
        v-model="task.time"
        class="editable-input"
        @dblclick="editing = { index, key: 'time' }"
        @blur="updateTask({ index, key: 'time', value: task.time || '' })"
        v-if="editing.index === index && editing.key === 'time'"
        type="time"
        placeholder="Edit time"
      />
      <span
        v-else
        class="task-time"
        @dblclick="editing = { index, key: 'time' }"
      >
        {{ task.time ? formatTime(task.time) : 'No time set' }}
      </span>

      <button @click="$emit('delete-task', index)" class="delete-button">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  tasks: Array,
});

defineEmits(['delete-task', 'update-task']);

const editing = ref({});

// Function to format time into AM/PM
function formatTime(time) {
  if (!time) return ''; // Return empty string for empty time
  const [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12; // Convert 0 or 24 to 12
  return `${formattedHour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

function updateTask({ index, key, value }) {
  editing.value = {}; // Reset editing state
  emit('update-task', { index, key, value });
}
</script>

<style scoped>
.task-list {
  max-width: 600px;
  margin: 0 auto;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #101010;
  padding: 10px 15px;
  border: 1px solid #303030;
  border-radius: 4px;
  margin-bottom: 10px;
}

.task-name {
  color: #FFFFFF;
  cursor: pointer;
}

.task-time {
  color: #AAAAAA;
  margin-left: 10px;
  cursor: pointer;
}

.editable-input {
  padding: 8px 12px;
  border: 1px solid #404040;
  background-color: #101010;
  color: #FFFFFF;
  border-radius: 4px;
  width: 150px;
  transition: border-color 0.3s;
}

.editable-input[type="time"] {
  color: #FFFFFF;
  appearance: none;
  position: relative;
}

.editable-input[type="time"]::-webkit-calendar-picker-indicator {
  color: #FFFFFF;
  filter: invert(1); /* Makes clock icon white */
  cursor: pointer;
}

.editable-input::placeholder {
  color: #AAAAAA;
}

.editable-input:focus {
  border-color: #FFFFFF;
  outline: none;
}

.delete-button {
  padding: 5px 10px;
  background-color: #e74c3c;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>