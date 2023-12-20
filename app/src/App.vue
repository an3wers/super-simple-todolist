<script setup lang="ts">
import { Suspense } from 'vue'
import Todos from '@/components/Todos.vue'

</script>

<template>
  <Suspense>
    <Todos />
  </Suspense>
</template>
