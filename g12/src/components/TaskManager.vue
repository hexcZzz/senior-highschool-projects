<template>
  <div class="container">
    <h1 class="title">Task Manager</h1>
    <div class="main">
      <input
        v-model="newTaskName"
        :class="['input', { 'input-error': !newTaskName && showError }]"
        type="text"
        placeholder="Name of task"
      />
      <input
        v-model="newTaskTime"
        :class="['input', { 'input-error': !newTaskTime && showError }]"
        type="time"
      />
    </div>
    <div class="button-div">
      <button @click="addTask" class="add-button">Add Task</button>
    </div>
    <div class="task-container">
      <div v-if="tasks.length === 0" class="no-tasks-message">
        No tasks available.
      </div>
      <div v-else>
        <TaskList :tasks="tasks" @delete-task="deleteTask" @update-task="updateTask" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TaskList from './TaskList.vue';

const tasks = ref([]);
const newTaskName = ref('');
const newTaskTime = ref('');
const showError = ref(false);

function addTask() {
  if (newTaskName.value && newTaskTime.value) {
    tasks.value.push({
      name: newTaskName.value,
      time: newTaskTime.value,
    });
    newTaskName.value = '';
    newTaskTime.value = '';
    showError.value = false;
  } else {
    showError.value = true;
  }
}

function deleteTask(index) {
  tasks.value.splice(index, 1);
}

function updateTask({ index, key, value }) {
  tasks.value[index][key] = value;
}
</script>

<style scoped>
.container {
  background-color: #000000;
  color: #FFFFFF;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.input {
  padding: 10px 12px;
  border: 1px solid #303030;
  border-radius: 4px;
  background-color: #101010;
  color: #FFFFFF;
}

.input::placeholder {
  color: #AAAAAA;
}

.input-error {
  border-color: #e74c3c;
}

.button-div {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.add-button {
  padding: 10px 20px;
  background-color: #404040;
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #202020;
}

.no-tasks-message {
  text-align: center;
  color: #AAAAAA;
  font-size: 18px;
  margin-top: 20px;
}
</style>
Here's the rest of the code:



Also, update TaskManager.vue:


TaskManager.vue

<template>
<!-- ... -->
</template>

<script setup>
// ...

function addTask() {
if (newTaskName.value && newTaskTime.value) {
tasks.value.push({
name: newTaskName.value,
time: newTaskTime.value,
prevName: newTaskName.value,
});
newTaskName.value = '';
newTaskTime.value = '';
showError.value = false;
} else {
showError.value = true;
}
}

// ...
</script>