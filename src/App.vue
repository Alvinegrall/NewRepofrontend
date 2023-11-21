<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
// import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
// import GlobalSkeleton from "@/components/loader/GlobalSkeleton.vue";

import { useStore } from "vuex";

const defaultLayout = "default";

const store = useStore();

const { currentRoute } = useRouter();

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);

const globalLoading = computed(() => store.state["globalLoading"]);
const loadingSpinner = computed(() => store.state["loadingSpinner"]);
</script>

<template>
  <div>
    <vue3-snackbar top right :duration="10000"></vue3-snackbar>

    <div
      v-if="loadingSpinner"
      class="z-[999] w-full h-full absolute top-0 bg-slate-900 bg-opacity-50"
    >
      <div class="relative w-full h-screen flex items-center justify-center">
        <span class="loader z-50"></span>
      </div>
    </div>
    <router-view></router-view>
  </div>

  <!-- <BaseSkeleton :shadow="'none'" :width="'50px'" :height="'50px'" radius="50%" /> -->
</template>

<style scoped>
.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 32px 0 #fff, -32px 0 #fff;
  position: relative;
  animation: flash 0.3s ease-in infinite alternate;
}
.loader::before,
.loader::after {
  content: "";
  position: absolute;
  left: -64px;
  top: 0;
  background: #fff;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform-origin: 35px -35px;
  transform: rotate(45deg);
  animation: hitL 0.3s ease-in infinite alternate;
}

.loader::after {
  left: 64px;
  transform: rotate(-45deg);
  transform-origin: -35px -35px;
  animation: hitR 0.3s ease-out infinite alternate;
}

@keyframes flash {
  0%,
  100% {
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 32px 0 rgba(255, 255, 255, 0.25),
      -32px 0 rgba(255, 255, 255, 0.25);
  }
  25% {
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 32px 0 rgba(255, 255, 255, 0.25), -32px 0 rgba(255, 255, 255, 1);
  }
  50% {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 32px 0 rgba(255, 255, 255, 0.25),
      -32px 0 rgba(255, 255, 255, 0.25);
  }
  75% {
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: 32px 0 rgba(255, 255, 255, 1), -32px 0 rgba(255, 255, 255, 0.25);
  }
}

@keyframes hitL {
  0% {
    transform: rotate(45deg);
    background-color: rgba(255, 255, 255, 1);
  }
  25%,
  100% {
    transform: rotate(0deg);
    background-color: rgba(255, 255, 255, 0.25);
  }
}

@keyframes hitR {
  0%,
  75% {
    transform: rotate(0deg);
    background-color: rgba(255, 255, 255, 0.25);
  }
  100% {
    transform: rotate(-45deg);
    background-color: rgba(255, 255, 255, 1);
  }
}
</style>
