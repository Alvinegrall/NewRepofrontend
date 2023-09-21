<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import GlobalSkeleton from "@/components/loader/GlobalSkeleton.vue";

import { useStore } from "vuex";

const defaultLayout = "default";

const store = useStore();

const { currentRoute } = useRouter();

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);

const globalLoading = computed(() => store.state["globalLoading"]);
</script>

<template>
  <router-view></router-view>

  <!-- <BaseSkeleton :shadow="'none'" :width="'50px'" :height="'50px'" radius="50%" /> -->
</template>
