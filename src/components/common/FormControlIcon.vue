<script setup>
import BaseIcon from "@/components/common/BaseIcon.vue";

defineProps({
  icon: {
    type: String,
    default: null,
  },
  h: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <!-- <BaseIcon :path="icon" class="mr-3" /> -->
  <BaseIcon
    :name="icon"
    :size="h"
    class="absolute top-2 ml-2 left-0 z-10 pointer-events-none text-gray-500"
  />

  <!-- <BaseIcon
    :path="icon"
    w="w-10"
    :h="h"
    class=" dark:text-slate-400"
  /> -->
</template>
