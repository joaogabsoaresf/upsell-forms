<script setup>
import { computed, watch } from 'vue';

const props = defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue', 'update:validity']);

const email = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const isEmailValid = computed(() => {
  const emailPattern = /^[^\s@]+@inchurch\.com\.br$/;
  return emailPattern.test(email.value);
});

// Emitir o estado de validade do e-mail sempre que mudar
watch(isEmailValid, (newVal) => {
  emit('update:validity', newVal);
});
</script>

<template>
  <div>
    <label for="email" class="block text-sm text-gray-500">Digite seu e-mail inChurch</label>
    <div class="relative flex items-center mt-2">
      <span class="absolute">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-3 text-gray-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </span>
      <input
        type="email"
        name="email"
        v-model="email"
        placeholder="nome.sobrenome@inchurch.com.br"
        class="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 focus:outline-none focus:ring-2 focus:border-primary focus:ring-primary"
        :class="{
          'border-gray-200 focus:border-primary focus:ring-primary': isEmailValid,
          'border-red-500 focus:border-red-500 focus:ring-red-500': !isEmailValid && email,
        }"
      >
    </div>
  </div>
</template>
