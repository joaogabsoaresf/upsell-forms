<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const props = defineProps({
    modelValue: String,
    title: String,
    currencyID: String
});

const emit = defineEmits(['update:modelValue', 'update:validity']);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

watch(value, (newVal) => {
  emit('update:validity', newVal);
});

const inputRef = ref(null);

onMounted(() => {
if (inputRef.value) {
    new Cleave(inputRef.value, {
    numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    prefix: 'R$ ',
    noImmediatePrefix: true,
    rawValueTrimPrefix: true,
    delimiter: '.',
    numeralDecimalMark: ','
    });
}
});
</script>

<template>
  <input v-model="value"
         :id="currencyID"
         name="valueInput"
         type="text"
         placeholder="R$"
         class="flex items-center pl-2 py-2 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg focus:ring-primary focus:border-primary focus:outline-none w-full"
         ref="inputRef"
  />
</template>
  