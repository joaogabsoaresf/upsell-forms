<script setup>
import ProgressBar from '../../components/vue/ProgressBar.vue';
import FormsBase from '../../components/vue/FormsBase.vue';
import UpsellProductTable from '../../components/vue/UpsellProductTable.vue';
import UpsellProductRow from '../../components/vue/UpsellProductRow.vue';
import { videosOptions, moduleOptions } from '../../constants/products';
import ProductTable from '../../components/vue/ProductTable.vue';
import { watch } from 'vue';

const pageTitle = 'Selecione os Produtos'

const props = defineProps({
  formData: Object,
  products: Array,
  progress: Number,
  productType: String,
  membersRange: String,
});

const itemOptions = props.products.map(item => {
    let options = [];
    if (item === 'app') {
        options = [];
    } else if (item === 'kids' || item === 'journey') {
        options = moduleOptions.filter((option) => option.name != 'Sem módulo');
    } else if (item === 'videos') {
        options = videosOptions.filter((option) => option.name != 'Sem módulo');
    }
    return {
        name: item,
        options: options
    };
});

// console.log(props.formData)

const emit = defineEmits(['update:formData']);

// watch(props.formData.config, () => {
//   console.log(props.formData.config)
// })

</script>

<template>
  <ProgressBar :progress="progress" ></ProgressBar>
  <h2 class="text-lg font-semibold text-gray-700 capitalize mt-4">{{ pageTitle }}</h2>
  <div class="pt-4">
    <FormsBase>
        <UpsellProductTable>
            <template #default>
                <UpsellProductRow v-for="(product, key) in itemOptions" 
                v-model="formData.config"
                :products="itemOptions[key]"
                :key="key"
                :id="key+1"
                :productName="product.name"
                :productOptions="product.options"
                :placeholder="'Selecione uma opção'"
                :membersRange="'1-100'"
                :productType="'pro'"
                />
            </template>
        </UpsellProductTable>
    </FormsBase>
  </div>
</template>
