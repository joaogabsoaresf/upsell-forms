<script setup>
import { ref, computed } from 'vue';
import { Search } from 'lucide-vue-next';
import Number from './input/Number.vue';
import ChurchTable from './ChurchTable.vue';
import { getChurch } from '../../services/church'

const isLoading = ref(null)
const churchData = ref({})

const props = defineProps({
  modelValue: Number
});

const emit = defineEmits(['update:modelValue', 'update:validity']);

const tertiarygroupId = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

async function searchChurch() {
    isLoading.value = true
    const data = await getChurch(tertiarygroupId.value)
    churchData.value = data
    isLoading.value = false
}

</script>

<template>
    <div class="flex flex-row items-end gap-4">
        <div class="basis-11/12">
            <Number :id="'teriarygroup-input'" :title="'Digite o código da igreja local'" :placeholderText="'Código da Igreja Local'" v-model="tertiarygroupId"></Number>
        </div>
        <div class="flex justify-center basis-1/12 py-2.5">
            <button type="button" @click="searchChurch" class="px-2 py-2.5 w-full flex items-center justify-center leading-5 text-white transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary" >
                <Search :size="20" class="md:hidden"></Search>
                <h1 class="hidden md:flex" >Buscar igreja</h1>
            </button>
        </div>
    </div>
    <ChurchTable :isLoading="isLoading" :churchData="churchData"></ChurchTable>
</template>


<!-- <div class="flex flex-row items-end gap-4">
    <div class="basis-11/12">
        <NumberInput inputId="airtable-id" title="Digite o código do cliente no Airtable"/>
    </div>
    <div class="flex justify-center basis-1/12 py-2.5">
        <button type="button" onclick="fetchData()" class="px-2 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary" >
            <Search size={"1.2rem"}/>
        </button>
    </div>
</div> -->