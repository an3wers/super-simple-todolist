<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  NSpace,
  NLayout,
  NLayoutContent,
  NInput,
  NButton,
  NCard,
  NCheckbox,
  NText,
} from "naive-ui";
import {
  fetchTodos,
  createTodo,
  removeTodo,
  updateTodo,
} from "@/api/todos.api";

interface ITodo {
  id: string | number;
  title: string;
  isDone: boolean;
}

const valueTodo = ref<string>("");

const todos = ref<ITodo[]>([]);
const isLoading = ref<boolean>(false);
const errorMessage = ref<string>("");

const sortedTodos = computed(() => {
  return [...todos.value].sort((a: any, b: any) => a.id - b.id);
});

async function addTodoHandler() {
  try {
    const response = await createTodo(valueTodo.value);
    await getTodos();
    valueTodo.value = "";
  } catch (error) {
    errorMessage.value = (error as Error)?.message || "Error";
  }
}

async function checkedHandler(value: boolean, id: string | number) {
  try {
    const response = await updateTodo(id, value);
    await getTodos();
  } catch (error) {
    errorMessage.value = (error as Error)?.message || "Error";
  }
}

async function getTodos() {
  try {
    isLoading.value = true;
    const response = await fetchTodos();
    todos.value = response.data;
  } catch (error) {
    errorMessage.value = (error as Error)?.message || "Error";
  } finally {
    isLoading.value = false;
  }
}

async function removeHandler(id: string | number) {
  try {
    const response = await removeTodo(id);
    await getTodos();
  } catch (error) {
    errorMessage.value = (error as Error)?.message || "Error";
  }
}

onMounted(async () => {
  await getTodos();
});
</script>

<template>
  <n-layout class="container">
    <n-layout-content>
      <n-space vertical size="large">
        <form @submit.prevent="addTodoHandler">
          <div class="row">
            <n-input
              style="flex-grow: 1"
              v-model:value="valueTodo"
              type="text"
              placeholder="Add todo..."
            />
            <n-button type="primary" attr-type="submit">+</n-button>
          </div>
        </form>
        <div vertical size="large" v-for="todo in sortedTodos">
          <n-card content-class="todo-item" :key="todo.id" size="small">
            <n-checkbox
              :checked="todo.isDone"
              :on-update-checked="(value) => checkedHandler(value, todo.id)"
            >
              <n-text :delete="todo.isDone">{{ todo.title }}</n-text>
            </n-checkbox>
            <n-button
              @click="removeHandler(todo.id)"
              tertiary
              type="error"
              size="small"
              >×</n-button
            >
          </n-card>
        </div>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<style>
.container {
  max-width: 640px;
  margin: 0 auto;
  padding: 48px;
}
.row {
  display: flex;
  gap: 8px;
}

.todo-item {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
}
</style>
