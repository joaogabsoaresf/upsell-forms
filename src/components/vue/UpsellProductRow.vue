<script setup>
import { ref, computed, reactive, watch } from 'vue';
import Dropdown from './input/Dropdown.vue';
import { Pencil, Save } from 'lucide-vue-next';
import CurrencyCell from './input/CurrencyCell.vue';
import { getProductValue } from '../../composables/productValue';
import { productLabels } from '../../constants/products';

const props = defineProps({
    modelValue: {
        type: Object,
        default: {},
    },
    products: {
        type: Object,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        default: '',
    },
    membersRange: {
        type: String,
    },
    productType: {
        type: String,
    },
    productOptions: {
        type: Array,
        default: () => []
    },
    placeholder: String
});

const emit = defineEmits(['update:modelValue']);
const editMode = ref(false);

// Configura o estado inicial baseado no productName
const state = reactive({
    selectedOption: props.modelValue[props.productName]?.selectedOption || props.products.selectedOption,
    productValue: props.modelValue[props.productName]?.productValue || props.products.productValue,
    customValue: props.modelValue[props.productName]?.customValue || props.products.productValue,
});

// Watch para sincronizar mudanças de modelValue para state (inclui a inicialização)
watch(
  () => props.modelValue[props.productName],
  (newValue) => {
    if (newValue) {
      state.selectedOption = newValue.selectedOption || state.selectedOption;
      state.productValue = newValue.productValue || state.productValue;
      state.customValue = newValue.customValue || state.productValue;
    }
  },
  { deep: true, immediate: true }
);

// Watch para sincronizar mudanças de state para modelValue
watch(
  state,
  (newState) => {
    emit('update:modelValue', { 
        ...props.modelValue,
        [props.productName]: { ...newState } 
    });
  },
  { deep: true }
);

// Função para atualizar o item selecionado e o valor do produto
function updateSelectedItem() {
  if (state.selectedOption !== 'free') {
    const newValue = getProductValue(props.membersRange, props.productType, props.productName, state.selectedOption);
    state.productValue = newValue;
  } else {
    state.productValue = 0;
  }
}

// Computed para formatar o valor final exibido
const finalValue = computed(() => {
  if (state.customValue !== state.productValue) {
    return `R$ ${parseFloat(state.productValue).toFixed(2)}`.replace('.', ',');
  } else if (state.selectedOption && state.productValue !== null) {
    return `R$ ${parseFloat(state.productValue).toFixed(2)}`.replace('.', ',');
  } else if (props.productOptions.length < 1) {
    state.productValue = getProductValue(props.membersRange, props.productType, props.productName, state.selectedOption);
    return `R$ ${parseFloat(state.productValue).toFixed(2)}`.replace('.', ',');
  }
  return 'R$ 0,00';
});

function toggleEditMode(){
    if (typeof(state.customValue) === 'number'){
        state.customValue = `R$ ${parseFloat(state.customValue).toFixed(2)}`.replace('.', ',');
    }
    editMode.value = !editMode.value;
}

function saveValue(){
    if (!state.customValue){
        state.productValue = getProductValue(props.membersRange, props.productType, props.productName, state.selectedOption);
        state.customValue = null;
        toggleEditMode();
        return;
    }
    if (Number.isInteger(state.customValue)){
        state.productValue = getProductValue(props.membersRange, props.productType, props.productName, state.selectedOption);
        state.customValue = null;
        toggleEditMode();
        return;
    }
    let value = parseFloat(state.customValue.replace('R$ ', '').replace(',', '.'));
    if (!value){
        state.productValue = getProductValue(props.membersRange, props.productType, props.productName, state.selectedOption);
        state.customValue = null;
        toggleEditMode();
        return;
    }
    state.productValue = value;
    toggleEditMode();
}

</script>

<template>
    <tr :id="'church-row-' + id" :class="['border-b', { 'bg-gray-50': id % 2 === 0, 'bg-white': id % 2 !== 0 }]">
        <td id="index-td" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap self-center">
            {{ id }}
        </td>
        <td class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap">
            <p class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                {{ productLabels[productName] }}
            </p>
        </td>
        <td class="px-2 py-4">
            <!-- Verifica se o array não está vazio -->
            <Dropdown
                v-if="productOptions.length > 0"
                :id="'planRange'"
                :options="productOptions"
                :placeholder="placeholder"
                v-model="state.selectedOption"
                @change="updateSelectedItem()"
            ></Dropdown>
            <p v-else class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5">
                ‎
            </p>
        </td>
        <td class="px-2 py-4">
            <span v-if="!editMode" id="final-value" class="flex items-center text-base font-bold pl-2 text-black hover:text-primary min-w-[100px] max-w-[100px]">
                {{ finalValue }}
            </span>
            <CurrencyCell 
                v-else 
                v-model="state.customValue"
                :class="'flex items-center text-base font-bold text-black min-w-[100px] max-w-[100px]'" 
            />
        </td>
        <td class="w-4 p-4">
            <div class="flex items-center">
                <button v-if="!editMode" @click="toggleEditMode" type="button" id="edit-btn" class="px-2 py-2.5 text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-primary">
                    <Pencil id="pencil" size="1rem" />
                </button>
                <button v-else @click="saveValue" type="button" id="edit-btn" class="px-2 py-2.5 text-white bg-primary rounded-md hover:bg-secondary focus:outline-none focus:bg-primary">
                    <Save id="save" size="1rem" />
                </button>
            </div>
        </td>
    </tr>
</template>
