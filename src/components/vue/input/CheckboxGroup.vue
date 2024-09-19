<script setup>
import { computed, watch, onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: Array,
  defaultSelected: {
    type: Array,
    default: () => [],
  },
  inputLabel: String,
});

const emit = defineEmits(['update:modelValue', 'update:validity']);

const selectedValues = computed({
  get: () => props.modelValue || [],
  set: (newValues) => emit('update:modelValue', newValues)
});

onMounted(() => {
  if (props.defaultSelected && props.defaultSelected.length > 0) {
    emit('update:modelValue', props.defaultSelected);
  }
});

watch(selectedValues, (newVal) => {
  emit('update:validity', newVal);
});

const handleCheckboxChange = (value) => {
  const currentValues = [...selectedValues.value];
  const index = currentValues.indexOf(value);

  if (index === -1) {
    currentValues.push(value);
  } else {
    currentValues.splice(index, 1);
  }
  
  selectedValues.value = currentValues;
};
</script>

<template>
<div class="relative flex flex-col rounded-xl bg-white shadow">
  <nav class="flex min-w-[240px] flex-col gap-1 p-2">
    <div
      v-for="option in options"
      :key="option.value"
      role="button"
      class="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
    >
      <label
        :for="'check-' + option.value"
        class="flex w-full cursor-pointer items-center px-3 py-2"
      >
        <div class="inline-flex items-center">
          <label class="flex items-center cursor-pointer relative" :for="'check-' + option.value">
            <input type="checkbox"
              class="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary"
              :id="'check-' + option.value"
              :value="option.value"
              @change="handleCheckboxChange(option.value)"
              :checked="selectedValues.includes(option.value)"
              />
            <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                stroke="currentColor" stroke-width="1">
                <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"></path>
              </svg>
            </span>
          </label>
          <label class="cursor-pointer ml-2 text-slate-600 text-sm" :for="'check-' + option.value">
            {{ option.name }}
          </label>
        </div>
      </label>
    </div>
  </nav>
</div>
</template>
