<script setup>
import { ref, watch } from 'vue';
import UpsellProductRow from './UpsellProductRow.vue';
import { videosOptions, moduleOptions } from '../../constants/products';

// Definição das props
// const props = defineProps({
//   itemData: {
//     type: Array,
//     default: () => []
//   },
//   items: {
//     type: Array,
//     default: () => []
//   }
// });

// Emissão de eventos
// const emit = defineEmits(['update:itemData']);

// // Watch para observar mudanças em itemData
// watch(() => props.itemData, (newValue) => {
//   console.log('itemData changed:', newValue);
//   emit('update:itemData', newValue);
// }, { deep: true });
</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-2 py-3">
                        #
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Produto
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Opções de Pagamento
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Valor
                    </th>
                    <th scope="col" class="p-4">
                    </th>
                </tr>
            </thead>
            <tbody id="table">
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>
