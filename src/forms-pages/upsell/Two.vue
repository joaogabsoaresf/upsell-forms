<script setup>
import { watch, ref, computed } from 'vue';
import FormsBase from '../../components/vue/FormsBase.vue';
import FindChurch from '../../components/vue/FindChurch.vue';
import ProgressBar from '../../components/vue/ProgressBar.vue';

const pageTitle = 'Dados do Cliente'

const props = defineProps({
  formData: Object,
  progress: Number
});

const emit = defineEmits(['update:formData']);

const isEmailValid = ref(false);
const isChannelValid = ref(false);
const isSdrValid = ref(false);

const isPageOneValid = computed(() => isEmailValid.value && isChannelValid.value && isSdrValid.value);

watch(isPageOneValid, (newVal) => {
  emit('update:formData', { ...props.formData, isPageValid: newVal });
});

watch(
  () => props.formData,
  () => {
    isChannelValid.value = !!props.formData.channel;
    isSdrValid.value = !!props.formData.sdr;
  },
  { deep: true }
);

function handleEmailValidityChange(valid) {
  isEmailValid.value = valid;
}

</script>

<template>
  <ProgressBar :progress="progress" ></ProgressBar>
  <h2 class="text-lg font-semibold text-gray-700 capitalize mt-4">{{ pageTitle }}</h2>
  <div class="pt-4">
    <FormsBase>
        <FindChurch v-model="formData.tertiarygroupID" ></FindChurch>
    </FormsBase>
  </div>
</template>
