<script setup lang="ts">
defineProps<{
  heading: string
}>()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold uppercase" v-text="heading" />
  </div>
</template>
