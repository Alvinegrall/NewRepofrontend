<script setup>
import BaseButton from "@/components/common/BaseButton.vue";
import { getButtonColor } from "@/colors.js";
import BaseIcon from "@/components/common/BaseIcon.vue";

import { computed, ref } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: () => [],
  },
  icon: {
    type: String,
    default: null,
  },
  iconSize: {
    type: [String, Number],
    default: null,
  },
  color: {
    type: String,
    default: "white",
  },
  small: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean,
  roundedFull: Boolean,
});

const labelClass = computed(() =>
  props.small && props.icon ? "px-1 font-[500]" : "px-2 font-[500]"
);

const componentClass = computed(() => {
  const base = [
    "inline-flex",
    "justify-center",
    "items-center",
    "whitespace-nowrap",
    "focus:outline-none",
    "transition-colors",
    "focus:ring",
    "duration-150",
    "border",
    props.disabled ? "cursor-not-allowed" : "cursor-pointer",
    props.roundedFull ? "rounded-full" : "rounded-lg",
    getButtonColor(props.color, props.outline, !props.disabled, props.active),
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

const dropdownOpen = ref(false);

const showDropdownMenu = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <div class="relative">
    <button
      :class="componentClass"
      type="button"
      :disabled="disabled"
      @click="showDropdownMenu"
    >
      <span v-if="label" :class="labelClass">{{ label }}</span>
      <BaseIcon
        v-if="icon"
        :name="icon"
        :size="iconSize"
        :class="
          dropdownOpen
            ? 'transform rotate-180 duration-200 ease-in'
            : 'transform rotate-0 duration-200 ease-in'
        "
      />
    </button>
    <div
      v-show="dropdownOpen"
      @click="dropdownOpen = false"
      class="fixed inset-0 z-10 w-full h-full"
    ></div>

    <transition
      enter-active-class="transition duration-150 ease-out transform"
      enter-from-class="scale-95 opacity-0"
      enter-to-class="scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="absolute bottom-8 z-50 mt-2 w-60 py-2 bg-white rounded-lg shadow-xl border"
      >
        <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
          >Transfère vers un compte</a
        >
        <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
          >Lient de payment</a
        >
        <!-- <router-link
                to="/"
                class="block px-4 py-2 text-sm hover:bg-gray-200"
                >Log out</router-link
              > -->
      </div>
    </transition>
  </div>
</template>
