<script setup>
import { ref, computed, watch } from 'vue';
import { Check, X } from 'lucide-vue-next';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'update:validity']);

const hasSetup = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// Watch para observar mudanças em `modelValue` e emitir um evento de validade
watch(hasSetup, (newValue) => {
  emit('update:validity', newValue);
});
</script>

<template>
    <h3 class="mb-5 text-lg font-medium text-gray-700">Seu fechamento possui Setup?</h3>
    <ul class="grid w-full gap-6 md:grid-cols-2">
      <li>
        <input 
          type="radio" 
          id="has-setup-true" 
          name="has-setup" 
          :value="true" 
          v-model="hasSetup" 
          class="hidden peer"
        />
        <label for="has-setup-true" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:text-primary hover:text-gray-600 hover:bg-gray-100">
          <div class="block">
            <div class="w-full text-lg font-semibold">Sim!</div>
            <div class="w-full">Meu fechamento possui um valor de setup</div>
          </div>
          <Check color='green' :size="'2rem'"/>
        </label>
      </li>
      <li>
        <input 
          type="radio" 
          id="has-setup-false" 
          name="has-setup" 
          :value="false" 
          v-model="hasSetup" 
          class="hidden peer"
        />
        <label for="has-setup-false" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100">
          <div class="block">
            <div class="w-full text-lg font-semibold">Não...</div>
            <div class="w-full">Meu fechamento não tem valor de setup</div>
          </div>
          <X color='red' :size="'2rem'"/>
        </label>
      </li>
    </ul>
  </template>
  