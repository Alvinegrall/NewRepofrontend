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
          async beforeEnter(to, from, next) {
            await store.dispatch("cycles/getActiveCycle");
            await store.dispatch("articles/getHomepageData");
            await store.dispatch("articles/getAllLogs");
            next();
          },
        },
        {
          path: "/create-article",
          name: "create-article",
          // component: SettingsViewVue,
          component: () => import("@/views/CreateArticleView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("category/getAllCat");
            store.dispatch("magasins/getAllMagasins");
            store.dispatch("articles/getAllArticles");


            next();
          },
        },
        {
          path: "/create-entre",
          name: "mvt.entree",
          // component: SettingsViewVue,
          component: () => import("@/views/mouvements/EntreView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("fournisseur/getAllFournisseurs");
            store.dispatch("articles/getAllArticles");
            //  store.dispatch("sortie/getAllSortie");
            store.dispatch("entre/getAllEntre");

            next();
          },
        },
        {
          path: "/create-sortie",
          name: "mvt.sortie",
          // component: SettingsViewVue,
          component: () => import("@/views/mouvements/SortieView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("articles/getAllArticles");
            store.dispatch("sortie/getAllSortie");
            store.dispatch("beneficiaire/getAllBenefi");

            next();
          },
        },
        {
          path: "/add-category",
          name: "admin.addcategory",
          // component: SettingsViewVue,
          component: () => import("@/views/administration/AddCategoryView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("category/getAllCat");

            next();
          },
        },
        {
          path: "/add-beneficiary",
          name: "admin.addbeneficiary",
          // component: SettingsViewVue,
          component: () =>
            import("@/views/administration/AddBeneficiaireView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("beneficiaire/getAllBenefi");
            next();
          },
        },
        {
          path: "/add-fournisseur",
          name: "admin.addfournisseur",
          // component: SettingsViewVue,
          component: () =>
            import("@/views/administration/AddFournisseurView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("fournisseur/getAllFournisseurs");
            next();
          },
        },

        {
          path: "/add-magasin",
          name: "admin.addmagasin",
          // component: SettingsViewVue,
          component: () => import("@/views/administration/AddMagasinView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("magasins/getAllMagasins");

            next();
          },
        },

        {
          path: "/settings",
          name: "settings",
          // component: SettingsViewVue,
          component: () => import("@/views/settings/SettingsView.vue"),
          beforeEnter(to, from, next) {
            store.dispatch("articles/getHomepageData");
            store.dispatch("articles/getAllLogs");
            next();
          },
        },
        {
          path: "/statistiques",
          name: "statistiques",
          // component: TransactionsViewVue,
          component: () => import("@/views/StatistiquesView.vue"),
          async beforeEnter(to, from, next) {
            store.dispatch("articles/getAllStatique");
            await store.dispatch("articles/getArchives");

            next();
          },
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
          component: () => import("@/views/LoginView.vue"),
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
  await store.dispatch("cycles/getAllCycle");
  await store.dispatch("cycles/getActiveCycle");
  await store.dispatch("setGlobalLoading", true);
  await store.dispatch("setContainLoading", true);

  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);

  // eslint-disable-next-line no-unreachable
  if (!authRequired) return next();
  if (authRequired) {
    authGuard(routeTo, routeFrom, next);
  }



  // await store.dispatch("fournisseur/getAllFournisseurs");
  // await store.dispatch("category/getAllCat");
  // await store.dispatch("magasins/getAllMagasins");
  // await store.dispatch("beneficiaire/getAllBenefi");
  // await store.dispatch("articles/getAllLogs");
  // await store.dispatch("entre/getAllEntre");
  // await store.dispatch("sortie/getAllSortie");
  // await store.dispatch("articles/getHomepageData");

  // else return next({ name: "create-page" });

  // await axios
  //   .post("http://localhost:3333/api/v1/login", {
  //     headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
  //   })
  //   .then(({ data }) => {
  //     console.log(data);

  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     next({ name: "login" });
  //   });
  // }
  // if (routeTo.meta.requireAuth)   authGuard(to, from, next);

  return next();
});

router.afterEach(async () => {
  store.dispatch("setContainLoading", false);
  store.dispatch("setGlobalLoading", false);
});

export default router;
