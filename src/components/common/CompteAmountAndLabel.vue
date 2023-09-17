<script setup>
import { computed } from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
import { getButtonColor } from "@/colors.js";
import BaseIcon from "@/components/common/BaseIcon.vue";

const props = defineProps({
  amount: {
    type: String,
    default: "",
  },
  amountColor: {
    type: String,
    default: "",
  },
  amountSize: {
    type: String,
    default: "20",
  },
  labelSize: {
    type: String,
    default: "16",
  },

  labelColor: {
    type: String,
    default: "",
  },

  currency: {
    type: String,
    default: "XAF",
  },
  label: {
    type: String,
    default: "",
  },
  isColorText: Boolean,
});

const amountClass = computed(() => {
  const base = [
    "block mb-[2px] font-[200]",
    getButtonColor(props.amountColor, props.isColorText),
    props.amountSize,
  ];

  return base;
});

const labelClass = computed(() => {
  const base = [
    getButtonColor(props.labelColor),
    props.labelSize,
    "font-[500]",
  ];

  return base;
});
</script>

<template>
  <div class="last:mb-0">
    <div :class="amountClass">{{ amount }} {{ currency }}</div>
    <div v-if="label" :class="labelClass">
      {{ label }}
    </div>
  </div>
</template>
