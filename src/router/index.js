import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";

import authGuard from "@/guards/authGuard";

import HomeView1 from "@/views/HomeView1.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "common.home",
      component: HomeView1,
    },
 
   
  ],
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("setGlobalLoading", true);
  await store.dispatch("setContainLoading", true);
  next();
});

router.afterEach(async () => {
  store.dispatch("setContainLoading", false);
  store.dispatch("setGlobalLoading", false);
});

export default router;
