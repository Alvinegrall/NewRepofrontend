<script setup>
import { computed } from "vue";
import { getButtonColor } from "@/colors.js";
import BaseIcon from "@/components/common/BaseIcon.vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },

  color: {
    type: String,
    default: "",
  },

  icon: {
    type: String,
    default: null,
  },
  iconSize: {
    type: [String, Number],
    default: null,
  },

  small: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean,
  roundedFull: Boolean,
  isColorText: Boolean,
  danger: Boolean,
  success: Boolean,
  secondary: Boolean,
});

// const componentClass = computed(() => {
//   const base = [
//     "h-2.5 w-2.5 rounded-full mr-2",
//     getButtonColor(props.color, props.outline, !props.disabled, props.active),
//   ];
//   return base;
// });

const labelClass = computed(() =>
  props.small && props.icon ? "px-1 font-[500]" : "px-2 font-[500]"
);

const componentClass = computed(() => {
  const base = [
    "flex items-center",
    props.disabled ? "cursor-not-allowed" : "cursor-pointer",
    props.roundedFull ? "rounded-full" : "rounded-lg",
    props.danger ? "text-red-500 bg-red-200 border-[1px] border-red-500" : "",
    props.success
      ? "text-[#006908] bg-green-500 bg-opacity-50 border-[1px] border-[#d7f7c2]"
      : "",
    props.secondary ? "text-gray-700 bg-gay-300" : "",
    // getButtonColor(props.color, props.isColorText),
  ];

  if (!props.label && props.icon) {
    base.push("p-1");
  } else if (props.small) {
    base.push("text-sm", props.roundedFull ? "px-3 py-1" : "p-1");
  } else {
    base.push(props.roundedFull ? "px-6" : "px-3");
  }

  if (props.disabled) {
    base.push(props.outline ? "opacity-50" : "opacity-70");
  }

  return base;
});
</script>

<template>
  <div>
    <button :class="componentClass" type="button" :disabled="disabled">
      <BaseIcon v-if="icon" :name="icon" :size="iconSize" />
      <span v-if="label" :class="labelClass">{{ label }}</span>
    </button>
  </div>
</template>
