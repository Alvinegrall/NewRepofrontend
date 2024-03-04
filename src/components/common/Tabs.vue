<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";

import CommonShareLink from "@/components/common/CommonShareLink.vue";
import ShareLinkSocialNetwork from "@/components/ShareLinkSocialNetwork.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  paylink: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
  isState: Boolean,
  hasShareLink: Boolean,
});

const store = useStore();

const addIndexOnTabs = computed(() => {
  return props.tabs.map((tab, index) => ({ ...tab, index }));
});
const activeTab = ref("");
const isModalDangerActive = ref(false);

const tabsVal = computed(() => {
  if (props.tabs.length) {
    if (props.isState) {
      activeTab.value = addIndexOnTabs.value[props.index];
    } else {
      activeTab.value = addIndexOnTabs.value[0];
    }
    return addIndexOnTabs.value;
  }
});
// console.log("tabsVal", tabsVal.value);
const showShareLinkModal = () => {
  isModalDangerActive.value = true;
};

const setCurrentIndex = (tab, index) => {
  if (props.isState) {
    store.dispatch("setTabIndex", index);
  }
  activeTab.value = tab;
};
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isModalDangerActive"
      title="details_cotisation.share_paylink"
      button="info"
      has-cancel
    >
      <ShareLinkSocialNetwork :paylink="paylink ?? {}" />
    </CardBoxModal>

    <div
      class="flex items-center justify-between pb-0 border-b-2 rounded-l-lg border-blue-500 overflow-hidden"
    >
      <div class="space-x-1 flex items-center overflow-x-auto">
        <button
          v-for="(tab, index) in tabsVal || []"
          :key="index"
          @click="setCurrentIndex(tab, index)"
          :class="{
            'bg-blue-500 text-white': activeTab.id === tab.id,
            'text-gray-500 bg-gray-500 bg-opacity-10': activeTab.id !== tab.id,
          }"
          class="px-4 py-2 rounded-t-lg cursor-pointer font-[500] focus:outline-none min-w-max text-xs md:text-sm"
        >
          {{ $t(tab.name) || tab.libele }}
          <span v-if="tab.tontine_code">( {{ tab.amount }} XAF )</span>
        </button>
      </div>
      <div v-if="hasShareLink">
        <CommonShareLink
          @open-social-network="showShareLinkModal"
          :paylink="paylink"
        />
      </div>
    </div>

    <!-- Contenu de l'onglet actif -->
    <div class="mt-4">
      <slot :name="activeTab.index + 1"></slot>
    </div>
  </div>
</template>

<style scoped>
/* Styles Tailwind ici, si nécessaire */
</style>
