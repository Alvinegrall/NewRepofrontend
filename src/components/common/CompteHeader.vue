<script setup>
import BaseButton from "@/components/common/BaseButton.vue";
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  publicRef: {
    type: String,
    default: "",
  },

  btnlabel: {
    type: String,
    default: "",
  },
  noicon: Boolean,
});

// const isMoreOptionsOpen = ref(false);
const emit = defineEmits(["more-options"]);

const moreOptions = () => {
  emit("more-options");
};
</script>

<template>
  <!-- <div class="flex items-center justify-between mb-3">
    <h2 class="text-2xl">
      {{ title }}
    </h2>
    <slot />
  </div> -->

  <div class="flex items-center justify-between">
    <div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">
        {{ title }}
        <span v-if="publicRef" class="text-base font-normal text-gray-500"
          >({{ publicRef }})</span
        >
      </h3>
    </div>
    <div v-if="!noicon" class="flex-shrink-0">
      <!-- <BaseIcon name="more-vertical" size="20" /> -->
      <BaseButton
        icon="more-vertical"
        iconSize="20"
        @click.prevent="moreOptions()"
      />
    </div>
  </div>
</template>
