<script setup>
import { ref } from 'vue';

// Estado reativo para controlar se os dados estão carregando ou não

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
  churchData: {
    type: Object,
    required: true,
  },
});

</script>

<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <table class="w-full text-sm text-left">
        <thead class="text-xs text-gray-700 uppercase bg-primary">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nome da Igreja
            </th>
            <th scope="col" class="px-6 py-3">
              Código Denominação
            </th>
            <th scope="col" class="px-6 py-3">
              Código Local
            </th>
            <th scope="col" class="px-6 py-3">
              Email da Igreja
            </th>
          </tr>
        </thead>
        <tbody v-if="isLoading" class="animate-pulse mt-6">
          <tr class="bg-white border-b">
            <td class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded-full w-24"></div>
            </td>
            <td class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded-full w-24"></div>
            </td>
            <td class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded-full w-24"></div>
            </td>
            <td class="px-6 py-4">
              <div class="h-4 bg-gray-200 rounded-full w-24"></div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="bg-white border-b hover:bg-gray-50">
            <th class="px-6 py-4 text-gray-900 whitespace-nowrap">
              {{ churchData.name }}
            </th>
            <td class="px-6 py-4">
              {{ churchData.subgroup_id }}
            </td>
            <td class="px-6 py-4">
              {{ churchData.id }}
            </td>
            <td class="px-6 py-4">
              {{ churchData.email }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
