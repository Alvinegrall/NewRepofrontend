<script setup>
import { computed } from "vue";
import { getButtonColor } from "@/colors.js";

const props = defineProps({
  amount: {
    type: String,
    default: "",
  },
  currency: {
    type: String,
    default: "XAF",
  },
  color: {
    type: String,
    default: "success",
  },
  isUp: Boolean, 
  isTable: Boolean,
  isColorText:Boolean
});

const componentClass = computed(() => {
  const base = [
    props.isTable
      ? " whitespace-nowrap flex items-center text-sm font-semibold text-gray-900"
      : "ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold",
  ];
  return base;
});
const arrowClass = computed(() => {
  const base = [
    getButtonColor(props.color,props.isColorText),
  ];

  if (!props.isUp) {
    base.push("rotate-180");
  }
  return base;
});
</script>
<template>
  <component :is="isTable ? 'td' : 'div'" scope="col" :class="componentClass">
    <div class="flex items-center gap-2">
      {{ currency }} {{ amount }}
      <span :class="arrowClass" >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>

    </div>
  </component>
</template>
