<script setup>
import { ref } from 'vue';
import { CircleArrowLeft, CircleArrowRight, CircleCheckBig } from 'lucide-vue-next';
import { checkPageValidation } from '../../composables/checkIsValid';

const selectedIndex = ref(0);

const props = defineProps({
  rows: {
    type: Number,
    required: true,
  },
  names: {
    type: Array,
    required: true,
  },
  formData:{
    type: Object,
    required: true
  },
});

function jumpTo(page) {
  if (!checkPageValidation(page, props.formData)){
    alert("Por favor preencha todos os campos!")
    return
  }
  selectedIndex.value = page;
}

</script>

<template>
  <div>
    <ol class="flex items-center w-full space-y-4 lg:space-x-8 lg:space-y-0">
      <!-- <li
        v-for="index in rows"
        :key="index"
        class="flex-1"
      >
        <button
          @click="jumpTo(index - 1)"
          :class="{
            'w-full border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid font-medium lg:pt-4 lg:border-t-2 lg:border-l-0 lg:pl-0': true,
            'border-gray-300 text-gray-700': selectedIndex !== index - 1,
            'border-primary text-primary': selectedIndex === index - 1,
          }"
        >
          <span class="text-sm lg:text-base">{{ names[index - 1] || 'Default Step Name' }}</span>
        </button>
      </li> -->
    </ol>

    <div v-for="(page, index) in rows" :key="index">
      <slot :ref="index" v-if="selectedIndex === index"></slot>
    </div>

    <div class="grid grid-cols-10 gap-4 mt-8">
      <button
        v-if="selectedIndex > 0"
        id="back"
        class="col-start-9 col-end-10 px-2 py-2.5 flex items-center justify-center leading-5 text-white transition-colors transform bg-gray-500 rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
        @click="jumpTo(selectedIndex - 1)"
      >
        <CircleArrowLeft :size="24" class="md:hidden"/>
        <p class="hidden md:flex" >Voltar</p>
      </button>

      <button
        v-if="selectedIndex < rows - 1"
        id="next"
        class="col-end-11 col-span-1 px-2 py-2.5 flex items-center justify-center leading-5 text-white transition-colors transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
        @click="jumpTo(selectedIndex + 1)"
      >
        <CircleArrowRight :size="24" class="md:hidden"/>
        <p class="hidden md:flex" >Avançar</p>
      </button>

      <button
        v-if="selectedIndex + 1 == rows" 
        id="next"
        class="col-end-11 col-span-1 px-2 py-2.5 flex items-center justify-center leading-5 text-white transition-colors transform bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-secondary"
        @click="jumpTo(selectedIndex + 1)"
      >
        <CircleCheckBig class="md:hidden":size="24"></CircleCheckBig>
        <h1 class="hidden md:flex">Finalizar</h1>
      </button>
    </div>
  </div>
</template>

