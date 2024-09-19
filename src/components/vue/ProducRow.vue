<script setup>
import { ref } from 'vue';
import Dropdown from './input/Dropdown.vue'
import {Pencil, Save} from 'lucide-vue-next';
import { rangeOptions, moduleOptions, videosOptions } from '../../constants/products';

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

</script>

<template>
    <tr :id="'church-row-' + id" :class="['border-b', { 'bg-gray-50': id % 2 === 0, 'bg-white': id % 2 !== 0 }]">
        <td id="index-td" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap self-center">
            {{ id }}
        </td>
        <td class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
            <input type="text" name="church-name" id="church-name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5" placeholder="Nome da Igreja" />
        </td>
        <td class="px-2 py-4">
            <Dropdown :id="'planRange'" :options=rangeOptions></Dropdown>
        </td>
        <td class="px-2 py-4">
            <div class="flex items-center justify-center h-full">
                <input id="app" type="checkbox" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2">
                <input type="text" style="display:none" name="edit-app" id="edit-app" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"/>
            </div>
        </td>
        <td class="px-2 py-4">
            <div class="flex items-center justify-center h-full">
                <input id="site" type="checkbox" class="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2">
                <input type="text" style="display:none" name="edit-site" id="edit-site" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"/>
            </div>
        </td>
        <td class="px-2 py-4">
            <Dropdown :id="'journey'" :options=moduleOptions></Dropdown>
            <input type="text" style="display:none" name="edit-journey" id="edit-journey" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"/>
        </td>
        <td class="px-2 py-4">
            <Dropdown :id="'kids'" :options=moduleOptions></Dropdown>
            <input type="text" style="display:none" name="edit-kids" id="edit-kids" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"/>
        </td>
        <td class="px-2 py-4">
            <Dropdown :id="'videos'" :options=videosOptions></Dropdown>
            <input type="text" style="display:none" name="edit-videos" id="edit-videos" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"/>
        </td>
        <td class="px-2 py-4">
            <span id="final-value" class="flex items-center text-base font-bold text-black hover:text-primary">R$0,00</span>
        </td>
        <td class="w-4 p-4">
            <div class="flex items-center">
                <button onclick="editMode(this)" id="edit-btn" class="px-2 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary">
                    <Pencil id='pencil' size="1rem"/>
                    <Save style="display:none" id='save' size="1rem"/>
                </button>
            </div>
        </td>
    </tr>
</template>