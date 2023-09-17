<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },

  btnlabel: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <!-- <div class="flex items-center justify-between mb-3">
    <h2 class="text-2xl">
      {{ title }}
    </h2>
    <slot />
  </div> -->

  <div class="mb-4 flex items-center justify-between">
    <div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>
      <span class="text-base font-normal text-gray-500">{{ subtitle }}</span>
    </div>
    <div class="flex-shrink-0">
      <a
        href="#"
        class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
        >{{ btnlabel }}</a
      >
    </div>
  </div>
</template>
