<script setup>
import { ref } from 'vue';
import ProgressBar from '../../components/vue/ProgressBar.vue';
import ResumeTable from '../../components/vue/ResumeTable.vue';
import { createItems, createSetupItems } from '../../services/creation';
import { accessRelease } from '../../services/church';
import { saveAirtable } from '../../services/creation';

const pageTitle = 'Resumo'

const props = defineProps({
  formData1: Object,
  formData2: Object,
  formData3: Object,
  formData4: Object,
  formData5: Object,
  progress: Number
});

const emit = defineEmits(['update:formData1']);

function formatValue(value) {
  if (!value){
    return 0
  }
  const formattedValue = value
  .replace('R$', '')
  .replace(/\./g, '')
  .replace(',', '.')
  .trim(); 
  return parseFloat(formattedValue)
}

const items = {
    ownerSR:props.formData1.email,
    ownerSDR:props.formData1.sdr,
    channel:props.formData1.channel,

    tertiarygroupID:props.formData2.tertiarygroupID,

    hasSetup:props.formData3.hasSetup,
    hasDownPayment:props.formData3.hasDownPayment,
    setupInstallments:props.formData3.setupInstallments,
    setupValue:formatValue(props.formData3.setupValue),
    downPaymentValue:formatValue(props.formData3.downPaymentValue),
    setupDueDate:'09/20/2024',

    membersRange:props.formData4.membersRange,
    productType:props.formData4.productType,
    products:props.formData4.products,

    productInfo:props.formData5.config
};

const setupLoading = ref(true)
const itensLoading = ref(true)
const accessLoading = ref(true)

async function callCreateSetup(){
  // setupLoading.value = false
  if (!items.hasSetup){
    return
  }
  try {
    const data = await createSetupItems(items)
    return data
  } catch (error) {
    console.error('POST error:', error);
  } finally {
    setupLoading.value = false
  }
}

async function callCreateItems(){
  // itensLoading.value = false
  try {
    const data = await createItems(items)
    return data
  } catch (error) {
    console.error('POST error:', error);
  } finally {
    itensLoading.value = false
  }
}

async function callAccessRelease(){
  // accessLoading.value = false
  try {
    const data = await accessRelease(items)
    return data
  } catch (error) {
    console.error('POST error:', error);
  } finally {
    accessLoading.value = false
  }
}

const steps = {
  setup:{
    name:'Criação de Setup',
    function:callCreateSetup,
    loader:setupLoading,
    disable:false,
  },
  itens:{
    name:'Criação de Itens',
    function:callCreateItems,
    loader:itensLoading,
    disable:false,
  },
  access:{
    name:'Liberação de Acessos',
    function:callAccessRelease,
    loader:accessLoading,
    disable:false,
  }
}

if (!items.hasSetup){
  steps.setup.disable = true
}

for (let step in steps){
  steps[step].function()
}

saveAirtable(items)

</script>

<template>
  <ProgressBar :progress="progress" ></ProgressBar>
  <h2 class="text-lg font-semibold text-gray-700 capitalize mt-4">{{ pageTitle }}</h2>
  <div class="pt-4">
    <div class="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6">
      <ResumeTable v-for="step in steps" :itemName="step.name" :isLoading="step.loader.value" :isDisable="step.disable"></ResumeTable>
    </div>
  </div>
</template>
