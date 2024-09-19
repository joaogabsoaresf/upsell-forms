<script setup>
import { ref } from 'vue';
import {Plus, Minus} from 'lucide-vue-next';
import ProductRow from '../vue/ProducRow.vue'

const rows = ref(1)

function addRow() {
    rows.value++
}

function removeRow() {
    if (rows.value > 1) {
        rows.value--
    }
}

</script>

<template>
    <div class="text-lg font-bold text-white p-2 mb-2 mt-4 rounded-md w-full mx-auto" >
    <div class="flex justify-end items-center gap-2">
        <h1 class="text-black">Número total de igrejas:</h1>
        <h1 id="totalNValue" class="block px-8 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg focus:ring-primary focus:border-primary focus:outline-none">{{ rows }}</h1>
        <button type="button" id="minusBtn" class="px-2 py-2.5 leading-5 text-white transition-colors transform bg-gray-500 rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary" @click=removeRow()>
            <Minus size="1rem"/>
        </button>
        <button type="button" id="plusBtn" class="px-2 py-2.5 leading-5 text-white transition-colors transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary" @click=addRow()>
            <Plus size="1rem"/>
        </button>
    </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="px-2 py-3">
                        #
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Nome da Igreja
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Tamanho da Igreja
                    </th>
                    <th scope="col" class="px-2 py-3">
                        APP
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Site
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Jornadas
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Kids
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Vídeos
                    </th>
                    <th scope="col" class="px-2 py-3">
                        Total
                    </th>
                    <th scope="col" class="p-4">
                    </th>
                </tr>
            </thead>
            <tbody id="table">
                <ProductRow v-for="index in rows" :key="index" :id="index"></ProductRow>
            </tbody>
        </table>
    </div>
</template>