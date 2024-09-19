<script setup>
const props = defineProps({
  progress: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="w-full bg-gray-200 rounded-full h-2.5">
    <div
      class="bg-primary h-2.5 rounded-full"
      :style="{ width: progress + '%' }"
    ></div>
  </div>
</template>