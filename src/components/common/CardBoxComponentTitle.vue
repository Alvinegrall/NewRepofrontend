<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
});
// const labelClass = computed(() =>
//   props.icon ? "px-1 font-[500]" : "px-2 font-[500]"
// );
</script>

<template>
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-2xl">
      {{ title }}
    </h2>
    <slot />
  </div>
</template>
