<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  modelValue: Number,
  id: {
    type: String,
    required: true,
  },
  defaultValue: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  placeholderText: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value === '' ? null : value);
  }
});

onMounted(() => {
  if (props.modelValue === undefined && props.defaultValue !== undefined) {
    emit('update:modelValue', props.defaultValue);
  }
});

</script>

<template>
<div class="pt-6">
    <label class="block text-sm text-gray-500">{{title}}</label>
    <div class="relative flex items-center my-2">
        <input v-model="value" type="number" min="1" :id="id" class="block pl-2 w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pr-5 focus:ring-primary focus:border-primary focus:outline-none" :placeholder="placeholderText" required />    
    </div>
</div>
</template>