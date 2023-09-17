<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  w: {
    type: String,
    default: "w-6",
  },
  h: {
    type: String,
    default: "h-6",
  },
  size: {
    type: [String, Number],
    default: null,
  },
});

const spanClass = computed(
  () => `inline-flex justify-center items-center ${props.w} ${props.h}`
);

const iconSize = computed(() => props.size ?? "14");
</script>

<template>
  <span :class="spanClass">
    <vue-feather
      :style="' height:' + iconSize + 'px; '"
      :type="name"
    ></vue-feather>
    <slot />
  </span>
</template>
