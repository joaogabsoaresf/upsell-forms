<script setup>
import { watch, ref, computed } from 'vue';
import Email from '../../components/vue/input/Email.vue';
import Dropdown from '../../components/vue/input/Dropdown.vue';
import FormsBase from '../../components/vue/FormsBase.vue';
import ProgressBar from '../../components/vue/ProgressBar.vue';
import { channelOptions } from '../../constants/channels';
import { sdrOptions } from '../../constants/sdr';

const pageTitle = 'Dados do Vendedor'

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
      <Email v-model="formData.email" @update:validity="handleEmailValidityChange" />
      <label for="channel">Selecione o canal de fechamento</label>
      <Dropdown v-model="formData.channel" :id="'channel'" :options="channelOptions" placeholder="Selecione o canal" />
      <label for="sdr-owner">Selecione o SDR</label>
      <Dropdown v-model="formData.sdr" :id="'sdr-owner'" :options="sdrOptions" placeholder="Selecione o SDR" />
    </FormsBase>
  </div>
</template>
