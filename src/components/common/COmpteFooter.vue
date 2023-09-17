<script setup>
import BaseButton from "@/components/common/BaseButton.vue";
import { ref } from "vue";

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

// const isMoreOptionsOpen = ref(false);
const emit = defineEmits(["more-options"]);

const moreOptions = () => {
  emit("more-options");
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">{{ title }}</h3>
      <span class="text-base font-normal text-gray-500">{{ subtitle }}</span>
    </div>
    <div class="flex-shrink-0">
      <!-- <BaseIcon name="more-vertical" size="20" /> -->
      <BaseButton icon="more-vertical" iconSize="20" @click="moreOptions()" />
    </div>
  </div>
</template>
