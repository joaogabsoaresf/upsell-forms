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
    <div class="pt-6">
      <label :for="currencyID" class="block text-sm text-gray-500">{{ title }}</label>
      <div class="relative flex items-center my-2">
        <input v-model="value"
          :id="currencyID"
          name="valueInput"
          type="text"
          placeholder="R$"
          class="block pl-2 w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pr-5 focus:ring-primary focus:border-primary focus:outline-none"
          ref="inputRef"
        />
      </div>
    </div>
</template>
  