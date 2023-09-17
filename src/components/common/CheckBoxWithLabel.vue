<script setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const computedValue = computed({
  get: () => props.modelValue,
  set: async (value) => {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <label :for="id" class="checkbox">
    <input :id="id" v-model="computedValue" type="checkbox" />
    <span class="check" />
    <div class="ml-2">{{ label }}</div>
  </label>
</template>
