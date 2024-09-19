<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Object],
    default: ''
  },
  id: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Select uma opção'
  },
});

const emit = defineEmits(['update:modelValue'])

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const optionsWithPlaceholder = computed(() => [
  { value: '', name: props.placeholder, disabled: true },
  ...props.options
]);

</script>

<template>
  <div>
    <select 
      :id="id" 
      v-model="selectedValue"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3"
    >
      <option 
        v-for="option in optionsWithPlaceholder" 
        :key="option.value" 
        :value="option.value" 
        :disabled="option.disabled"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
