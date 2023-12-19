<script setup lang="ts">
import { ref } from "vue";
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

interface ITodo {
  id: string | number;
  title: string;
  isDone: boolean;
}

const initialTodos: ITodo[] = [
  {
    id: 1,
    title: "First todo",
    isDone: true,
  },
  {
    id: 2,
    title: "Second todo",
    isDone: false,
  },
];

const valueTodo = ref<string>("");

const todos = ref<ITodo[]>(initialTodos);
// const isLoading = ref<boolean>(false);
// const errorMessage = ref<string>("");

function addTodoHandler(): void {
  console.log("addTodoHandler", valueTodo.value);

  valueTodo.value = "";
}

function checkedHandler(value: boolean, id: string | number): void {
  console.log("Checked", value, id);
}

// async function fetchTodos() {
//   try {
//     isLoading.value = true;
//   } catch (error) {
//     errorMessage.value = (error as Error)?.message || "Error";
//   } finally {
//     isLoading.value = false;
//   }
// }

// await fetchTodos();
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
        <div vertical size="large" v-for="todo in todos">
          <n-card content-class="todo-item" :key="todo.id" size="small">
            <n-checkbox
              :checked="todo.isDone"
              :on-update-checked="(value) => checkedHandler(value, todo.id)"
            >
              <n-text :delete="todo.isDone">{{ todo.title }}</n-text>
            </n-checkbox>
            <n-button tertiary type="error" size="small">×</n-button>
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
