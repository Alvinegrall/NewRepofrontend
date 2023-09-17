<template>
  <component
    :is="!isMenu ? 'router-link' : 'div'"
    :to="{ name: link }"
    class=""
  >
    <button
      type="button"
      class="flex items-center w-full p-2 text-base transition duration-75 rounded-lg group"
      aria-controls="dropdown-example"
      data-collapse-toggle="dropdown-example"
      @click="toggleSubmenu()"
    >
      <vue-feather
        class="flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75 group-hover:text-gray-600"
        :type="icon ? icon : 'info'"
      ></vue-feather>

      <!-- <DocumentationIcon />
      <ToolingIcon />
      <EcosystemIcon />
      <CommunityIcon /> -->



      <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ title }}</span>
      <svg
        v-if="isMenu"
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
    <ul
      v-if="showSubmenu && isMenu"
      id="dropdown-example"
      class="py-2 space-y-2"
    >
      <li v-for="(memu, index) in memus" :key="index">
        <router-link
          :to="{ name: memu.link }"
          class="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 group dark:hover:bg-gray-100"
          >{{ memu.title }}</router-link
        >
      </li>
    </ul>
  </component>
</template>

<script setup>
// import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
// import ToolingIcon from '@/components/icons/IconTooling.vue'
// import EcosystemIcon from '@/components/icons/IconEcosystem.vue'
// import CommunityIcon from '@/components/icons/IconCommunity.vue'
// import SupportIcon from '@/components/icons/IconSupport.vue'

import { ref } from 'vue';


defineProps ({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
    default: 'info',
  },
  isMenu: Boolean,
  link: {
    type: String,
    default: '/',
  },
  memus: {
    type: Array,
    default: ()=>[],
  },
});

const showSubmenu = ref(false);

function toggleSubmenu() {
  showSubmenu.value = !showSubmenu.value;
}

// export default {
//   props: {
//     title: {
//       type: String,
//       default: "",
//     },
//     icon: {
//       type: String,
//       default: "info",
//       required: true,
//     },
//     isMenu: {
//       type: Boolean,
//       default: false,
//     },
//     link: {
//       type: String,
//       default: "/",
//     },
//     memus: {
//       type: Array,
//       default: () => [],
//     },
//   },
//   data() {
//     return {
//       showSubmenu: false,
//     };
//   },
//   methods: {
//     toggleSubmenu() {
//       this.showSubmenu = !this.showSubmenu;
//     },
//   },
// };
</script>

<style></style>
