<template>
  <OrderDetailsView />

  <div class="page-container-wrapper">
    <div class="mb-3 flex justify-between items-center flex-wrap gap-4">
      <!-- <div class="space-y-1">
      <h5 class="font-bold text-2xl">Liste des transactions</h5>
      <p>
        Vous pouvez ici consulter et gérer toutes les transactions (commandes,
        achats) effectuées sur votre Business Page.
      </p>
    </div> -->

      <div class="space-y-1">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link
                :to="{ name: 'common.home' }"
                class="inline-flex items-center text-2xl font-semibold text-gray-900 hover:text-gray-600"
              >
                {{ $t("common.breadcrumb.dashboard") }}
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span
                  href="#"
                  class="ml-1 text-2xl font-semibold text-gray-900 hover:text-gray-900 md:ml-2"
                  >{{ $t("orders_page.title") }}</span
                >
              </div>
            </li>
          </ol>
        </nav>
        <p>
          {{ $t("orders_page.description") }}
        </p>
      </div>

      <div id="les-actions" class="flex gap-2 md:gap-4 p-3">
        <BaseButton
          class="flex items-center justify-center space-x-2 text-[14px] bg-primary px-3 py-2 rounded"
          @click="$router.push({ name: 'products.manage' })"
        >
          <vue-feather class="scale-50 md:scale-75" type="eye"></vue-feather>
          <span>{{ $t("common.breadcrumb.buttons.manage-products") }}</span>
        </BaseButton>
        <!-- <router-link
          to="/manage-products"
        >
        </router-link> -->
      </div>
    </div>

    <div class="row">
      <LastOrdersSection :loading="loading" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "orders_page": {
      "title": "Recent orders",
      "description": "Here you can view and manage all orders placed on your Business Page."
    }
  },
  "fr": {
    "orders_page": {
      "title": "Commandes récentes",
      "description": "Vous pouvez ici consulter et gérer toutes les commandes effectuées sur votre Business Page."
    }
  }
}
</i18n>

<script>
import { mapGetters } from "vuex";
import BaseButton from "../../components/common/BaseButton.vue";
import LastOrdersSection from "../../components/orders/LastOrdersSection.vue";
import OrderDetailsView from "./OrderDetailsView.vue";

export default {
  components: { LastOrdersSection, BaseButton, OrderDetailsView },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("partners", ["current_partner"]),
  },
  async mounted() {
    const orders_page = await this.$store.dispatch("partners/listpageorders");

    if (this.$route.query?.action === "view" && this.$route.query?.ref) {
      const order = orders_page.find(
        (l) => l.reference === this.$route.query?.ref
      );

      if (order) {
        this.$store.dispatch("partners/setCurrentOrder", order);

        setTimeout(() => {
          window.$("#orderDetailsView").modal("toggle");
        }, 200);
      }
    }

    await this.$store.dispatch("partners/listpageorders");
    this.loading = false;
  },
};
</script>

<style scoped>

</style>
