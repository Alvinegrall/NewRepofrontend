<script setup>
import { computed, ref, onMounted, onBeforeUnmount, reactive } from "vue";
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

  placeholder: {
    type: String,
    default: null,
  },

  icon: {
    type: String,
    default: null,
  },

  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: "",
  },
  required: Boolean,
  borderless: Boolean,
  transparent: Boolean,
  showHour: Boolean,
});
const emit = defineEmits(["update:modelValue", "setRef"]);

const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});

const inputElClass = computed(() => {
  const base = [
    "border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus-visible:border-none  focus:ring-cyan-600 focus:border-cyan-600   block w-full p-2.5",
    "placeholder-gray-400",
    props.borderless ? "border-0" : "border",
    props.transparent ? "bg-transparent" : "bg-gray-50",
  ];

  if (props.icon) {
    base.push("pl-10");
  }

  return base;
});

const controlIconH = computed(() => "18");

const inputEl = ref(null);

onMounted(() => {
  emit("setRef", inputEl.value);
});

// const dateTimeConfig = reactive({
//   dateFormat: "d/m/Y H:i",
//   minDate: "today",
// });

const dateTimeConfig = computed(() => {
  let base = {
    dateFormat: "d/m/Y",
  };
  if (props.showHour) {
    base = {
      dateFormat: "d/m/Y H:i",
      enableTime: true,
    };
  }
  return base;
});
</script>

<template>
  <div class="relative flex items-center">
    <flatPickr
      id="des-info-date-input"
      v-model="computedValue"
      :class="inputElClass"
      ref="inputEl"
      :name="name"
      :config="dateTimeConfig"
      :placeholder="placeholder"
    ></flatPickr>
    <FormControlIcon v-if="icon" :icon="icon" :h="controlIconH" />
  </div>
</template>
