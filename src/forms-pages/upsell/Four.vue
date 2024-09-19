<script setup>
import ProgressBar from '../../components/vue/ProgressBar.vue';
import FormsBase from '../../components/vue/FormsBase.vue';
import Dropdown from '../../components/vue/input/Dropdown.vue';
import ProductsCheckbox from '../../components/vue/input/CheckboxGroup.vue';
import { productTypeOptions } from '../../constants/productType';
import { membersRangeOptions } from '../../constants/membersRange';
import { liteProProductsList, starterProductsList } from '../../constants/products';

const pageTitle = 'Produtos'

const props = defineProps({
  formData: Object,
  progress: Number
});

const emit = defineEmits(['update:formData']);

function resetItens() {
  props.formData.products = []
}

</script>

<template>
  <ProgressBar :progress="progress" ></ProgressBar>
  <h2 class="text-lg font-semibold text-gray-700 mt-4">{{ pageTitle }}</h2>
  <div class="pt-4">
    <FormsBase>
        <Dropdown v-model="formData.membersRange" :id="'membersRange'" :options="membersRangeOptions" placeholder="Selecione a faixa de membros do cliente"></Dropdown>
        <Dropdown @change="resetItens()" v-model="formData.productType" :id="'productType'" :options="productTypeOptions" placeholder="Selecione o plano atual do cliente"></Dropdown>
        <ProductsCheckbox v-if="formData.productType === 'starter'" v-model="formData.products" :options="starterProductsList" inputLabel="Selecione os produtos"></ProductsCheckbox>
        <ProductsCheckbox v-else v-model="formData.products" :options="liteProProductsList" inputLabel="Selecione os produtos"></ProductsCheckbox>
    </FormsBase>
  </div>
</template>
