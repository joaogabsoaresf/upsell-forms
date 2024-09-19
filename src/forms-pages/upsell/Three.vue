<script setup>
import { watch, ref, computed } from 'vue';
import ProgressBar from '../../components/vue/ProgressBar.vue';
import FormsBase from '../../components/vue/FormsBase.vue';
import HasSetup from '../../components/vue/HasSetup.vue';
import Currency from '../../components/vue/input/Currency.vue';
import Radio from '../../components/vue/input/Radio.vue';
import Number from '../../components/vue/input/Number.vue';

const pageTitle = 'Setup';

const props = defineProps({
  formData: Object,
  progress: Number
});

const emit = defineEmits(['update:formData']);

const downPaymentOptions = [
  { value: 'false', label: 'Não possui entrada' },
  { value: 'true', label: 'Possui entrada' },
];

// Função para emitir atualizações ao pai
const updateFormData = (key, value) => {
  emit('update:formData', { ...props.formData, [key]: value });
};

// Watchers para monitorar mudanças nos campos
watch(() => props.formData.hasSetup, (newValue) => {
  updateFormData('hasSetup', newValue);
});

watch(() => props.formData.setupValue, (newValue) => {
  updateFormData('setupValue', newValue);
});

watch(() => props.formData.hasDownPayment, (newValue) => {
  updateFormData('hasDownPayment', newValue);
});

watch(() => props.formData.downPaymentValue, (newValue) => {
  updateFormData('downPaymentValue', newValue);
});

watch(() => props.formData.setupInstallments, (newValue) => {
  updateFormData('setupInstallments', newValue);
});
</script>

<template>
  <ProgressBar :progress="progress" ></ProgressBar>
  <h2 class="text-lg font-semibold text-gray-700 capitalize mt-4">{{ pageTitle }}</h2>
  <div class="pt-4">
    <FormsBase>
        <HasSetup v-model="formData.hasSetup"/>
        <div v-if="formData.hasSetup">
          <Currency v-model="formData.setupValue" :title="'Digite o valor total do setup (Valor deve possuir vírgula)'" :currencyID="'setup-value'"></Currency>
          <Radio v-model="formData.hasDownPayment" :options="downPaymentOptions" :defaultSelected="'false'" :inputLabel="'Selecione se possui valor de entrada'"></Radio>
          <Currency v-if="formData.hasDownPayment == 'true'" v-model="formData.downPaymentValue" :title="'Digite o valor total da entrada (Valor deve possuir vírgula)'" :currencyID="'down-payment-value'"></Currency>
          <Number :id="'setup-installments'" :title="'Digite o número de parcelas (1 se for à vista)'" :placeholderText="'Número de parcelas do setup'" v-model="formData.setupInstallments" :defaultValue="1"></Number>
        </div>
    </FormsBase>
  </div>
</template>
