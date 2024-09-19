<script setup>
import { reactive, ref } from 'vue';
import Stepper from '../../components/vue/Stepper.vue';
import One from './One.vue';
import Two from './Two.vue';
import Three from './Three.vue';
import Four from './Four.vue';
import Five from './Five.vue';
import Six from './Six.vue';

const names = [
    'Dados do Vendedor',
    'Dados da Igreja',
    'Setup',
    'Produtos do Upsell',
    'Condiguração dos Produtos',
    'Resumo',
]

const rows = names.length

const formData = reactive({
    page1: {},
    page2: {},
    page3: {},
    page4: {},
    page5: {},
});

</script>

<template>
    <div class="pt-4">
        <Stepper :rows="rows" :names="names" :formData="formData">
            <template #default="{ ref }">
                <One v-if="ref === 0" :formData="formData.page1" :progress="20"></One>
                <Two v-if="ref === 1" :formData="formData.page2" :progress="40"></Two>
                <Three v-if="ref === 2" :formData="formData.page3" :progress="60"></Three>
                <Four v-if="ref === 3" :formData="formData.page4" :progress="80"></Four>
                <Five v-if="ref === 4" :formData="formData.page5" :products="formData.page4.products" :productType="formData.page4.productType" :membersRange="formData.page4.membersRange" :progress="100"></Five>
                <Six v-if="ref === 5"
                :formData1="formData.page1"
                :formData2="formData.page2"
                :formData3="formData.page3"
                :formData4="formData.page4"
                :formData5="formData.page5"
                :progress="100">
                </Six>
            </template>
        </Stepper>
    </div>
</template>
