<script setup>
import { ref } from 'vue';
import { Check, Minus } from 'lucide-vue-next';

// Estado reativo para controlar se os dados estão carregando ou não

const props = defineProps({
    isDisable:{
        type:Boolean,
        default:false
    },
    isLoading: {
        type: Boolean,
    },
    itemName: {
        type: String,
        required: true,
    },
});

</script>

<template>
<div class="space-y-2">
    <dl class="flex items-center justify-between gap-4">
        <dt :class="[
            'text-base', 'font-normal', 
            {'text-gray-500':props.isDisable === false, 'text-gray-300':props.isDisable === true}
            ]">{{ itemName }}</dt>
        <div v-if="props.isDisable" class="w-8 h-8 flex items-center justify-center">
            <Minus class="w-6 h-6 bg-gray-200" color="#1f1f1f"></Minus>
        </div>
        <div v-else>
        <div v-if="props.isLoading" class="w-8 h-8 flex items-center justify-center">
            <img class="w-8 h-8" src="/src/assets/loading.svg" alt="Loading">
        </div>
        <div v-else class="w-8 h-8 flex items-center justify-center">
            <Check class="w-6 h-6 bg-primary" color="#ffffff"></Check>
        </div>
        </div>
    </dl>
</div>
</template>
