import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";

import authGuard from "@/guards/authGuard";
import EmptyLayout from "@/components/layouts/EmptyLayout.vue";

import HomeView1 from "@/views/HomeView1.vue";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import axios from "@/config/axios";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      meta: {
        title: "Hydrac",
        authRequired: true,
      },
      children: [
        {
          path: "/",
          name: "common.home",
          component: HomeView1,
        },
      ],
    },

    {
      path: "/login",
      component: EmptyLayout,
      children: [
        {
          path: "",
          name: "create-page",
          // component: CreatePageViewVue,
          component: () => import("@/views/CreatePageView.vue"),
          meta: { redirectPage: true },
          // async beforeEnter(to, from, next) {
          //   await store.dispatch("setGlobalLoading", true);
          //   next();
          // },
        },
      ],
    },
  ],
});

router.beforeEach(async (routeTo, routeFrom, next) => {
  await store.dispatch("setGlobalLoading", true);
  await store.dispatch("setContainLoading", true);

  console.log("dataa");

  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

  // eslint-disable-next-line no-unreachable
  if (!authRequired) return next();

  await axios.get("http://localhost:3333/api/v1/auth/me", {
    headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
  })
    .then(({ data }) => {
      console.log(data);
      // localStorage.setItem("userdata", JSON.stringify(data.data.user));
      // localStorage.setItem("userid", data.data.user.id);
      // localStorage.setItem("user", JSON.stringify(data.data.user));
    })
    .catch((e) => {
      console.log(e);
      next({ name: "login" });
    });
  // }

  return next();
});

router.afterEach(async () => {
  store.dispatch("setContainLoading", false);
  store.dispatch("setGlobalLoading", false);
});

export default router;
