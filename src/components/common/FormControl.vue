<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
// import { useMainStore } from "@/stores/main";
import FormControlIcon from "@/components/common/FormControlIcon.vue";
import { useStore } from "vuex";

const props = defineProps({
  name: {
    type: String,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: null,
  },
  selection: {
    type: String,
    default: "",
  },
  inputmode: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: "",
  },
  required: Boolean,
  borderless: Boolean,
  isCountySelection: Boolean,
  transparent: Boolean,
  ctrlKFocus: Boolean,
});
const store = useStore();
const emit = defineEmits(["update:modelValue", "setRef"]);

const computedValue = computed({
  get: () => props.modelValue,
  set: async (value) => {
    if (props.selection == "Pays") {
      console.log("FSfs");
      await store.dispatch("partners/getStateByCountry", value);
    } else if (props.selection == "Région") {
      console.log("vsvsvvvsvs");
      await store.dispatch("partners/getCitiesByStates", value);
    }
    emit("update:modelValue", value);
  },
});

const inputElClass = computed(() => {
  const base = [
    "border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-visible:border-none  focus:ring-cyan-600 focus:border-cyan-600   block w-full p-2.5",
    "placeholder-gray-400",
    computedType.value === "textarea" ? "h-24" : "",
    props.borderless ? "border-0" : "border",
    props.transparent ? "bg-transparent" : "bg-gray-50",
  ];

  if (props.icon) {
    base.push("pl-10");
  }

  return base;
});

const computedType = computed(() => (props.options ? "select" : props.type));

const controlIconH = computed(() => (props.type === "textarea" ? "20" : "18"));

// const mainStore = useMainStore();

const selectEl = ref(null);

const textareaEl = ref(null);

const inputEl = ref(null);

onMounted(() => {
  if (selectEl.value) {
    emit("setRef", selectEl.value);
  } else if (textareaEl.value) {
    emit("setRef", textareaEl.value);
  } else {
    emit("setRef", inputEl.value);
  }
});

// if (props.ctrlKFocus) {
//   const fieldFocusHook = (e) => {
//     if (e.ctrlKey && e.key === "k") {
//       e.preventDefault();
//       inputEl.value.focus();
//     } else if (e.key === "Escape") {
//       inputEl.value.blur();
//     }
//   };

// onMounted(() => {
//   if (!mainStore.isFieldFocusRegistered) {
//     window.addEventListener("keydown", fieldFocusHook);
//     mainStore.isFieldFocusRegistered = true;
//   } else {
//     // console.error('Duplicate field focus event')
//   }
// });

// onBeforeUnmount(() => {
//   window.removeEventListener("keydown", fieldFocusHook);
//   mainStore.isFieldFocusRegistered = false;
// });
// }
</script>

<template>
  <div class="relative flex items-center">
    <select
      v-if="computedType === 'select'"
      :id="id"
      v-model="computedValue"
      :name="name"
      :class="inputElClass"
    >
  
        <option
          v-for="option in options"
          :key="option.id ?? option"
          :value="option.label ?? option.public_ref ?? option.membre_code ?? option"
        >
          {{  option.name ?? option.label ?? option.first_name ?? option  }}
        </option>

      <!-- <template v-if="isMemberSelection">
        <option
          v-for="option in options"
          :key="option.id ?? option"
          :value="option.membre_code"
        >
          {{  }}
        </option>
      </template> -->
  
    </select>
    <textarea
      v-else-if="computedType === 'textarea'"
      :id="id"
      v-model="computedValue"
      :class="inputElClass"
      :name="name"
      :placeholder="placeholder"
      :required="required"
    />
    <input
      v-else
      :id="id"
      ref="inputEl"
      v-model="computedValue"
      :name="name"
      :inputmode="inputmode"
      :autocomplete="autocomplete"
      :required="required"
      :placeholder="placeholder"
      :type="computedType"
      :class="inputElClass"
    />
    <FormControlIcon v-if="icon" :icon="icon" :h="controlIconH" />
  </div>
</template>
