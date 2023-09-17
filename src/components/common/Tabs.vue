<script setup>
import { computed, reactive, ref } from "vue";

import CommonShareLink from "@/components/common/CommonShareLink.vue";
import ShareLinkSocialNetwork from "@/components/ShareLinkSocialNetwork.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  hasShareLink: Boolean,
});

const activeTab = ref("");
const isModalDangerActive = ref(false);

const tabsVal = computed(() => {
  if (props.tabs.length) {
    activeTab.value = props.tabs[0];
    return props.tabs;
  }
});
const showShareLinkModal = () => {
  isModalDangerActive.value = true;
};
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isModalDangerActive"
      title=" Partager le lien de paiement "
      button="info"
      has-cancel
    >
      <ShareLinkSocialNetwork />
    </CardBoxModal>

    <div
      class="flex items-center justify-between pb-0 border-b-2 rounded-l-lg border-blue-500 overflow-hidden"
    >
      <div class="space-x-4">
        <button
          v-for="(tab, index) in tabsVal || []"
          :key="index"
          @click="activeTab = tab"
          :class="{
            'bg-blue-500 text-white': activeTab.id === tab.id,
            'text-gray-500 bg-gray-500 bg-opacity-10': activeTab.id !== tab.id,
          }"
          class="px-4 py-2 rounded-t-lg cursor-pointer font-[500] focus:outline-none"
        >
          {{ tab.name }}
        </button>
      </div>
      <div v-if="hasShareLink">
        <CommonShareLink @open-social-network="showShareLinkModal" />
      </div>
    </div>

    <!-- Contenu de l'onglet actif -->
    <div class="mt-4">
      <slot :name="activeTab.id"></slot>
    </div>
  </div>
</template>

<style scoped>
/* Styles Tailwind ici, si nécessaire */
</style>
