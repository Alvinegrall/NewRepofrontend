<template>
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
                  >{{ $t("transactions_pending_page.title") }}</span
                >
              </div>
            </li>
          </ol>
        </nav>
        <p>
          {{ $t("transactions_pending_page.description") }}
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
      <div class="flex flex-wrap justify-between items-center mb-6">
        <div
          id="partner-balance"
          class="w-full sm:w-[300px] md:w-[500px] h-full p-2 custome-2-bg"
        >
          <div
            class="media static-top-widget bg-white shadow-md border border-1 border-gray-200 rounded-2xl p-4 pb-8 gap-6 h-full flex items-center"
          >
            <div class="media-body space-y-6 w-1/2">
              <div class="text-2xl font-semibold tracking-widest">
                {{ $t("home_page.account.blocked-balance") }}
              </div>
              <div v-if="!loading" class="text-4xl font-bold">
                {{ $formatAmount(current_partner.balance_blocked) }} XAF
              </div>

              <BaseSkeleton
                v-else
                class="text-4xl font-bold"
                :height="'40px'"
                :width="'160px'"
              />
            </div>
            <div class="align-self-center text-center">
              <vue-feather type="shopping-bag"></vue-feather>
            </div>
          </div>
        </div>
        <div class="hidden sm:block">
          <div class="w-full flex justify-end">
            <router-link
              :to="{ name: 'transactions.list' }"
              class="text-base md:text-base hover:opacity-50 text-[#40b75f]"
            >
              <span>{{ $t("home_page.account.balance-movements") }}</span>
            </router-link>
          </div>
          <!-- <div
            class="w-full min-w-[200px] flex flex-wrap justify-between space-y-4"
          >
            <BaseButton
              type="button"
              class="text-base md:text-lg tracking-wider bg-primary px-8 py-2 rounded-md"
              data-bs-toggle="modal"
              data-bs-target="#cashOut"
            >
              <span>{{ $t("home_page.account.cash-out") }}</span>
            </BaseButton>
          </div> -->
        </div>
      </div>

      <LastTransactionsSection :loading="loading" :type="'blocked'" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseButton from "../components/common/BaseButton.vue";
import BaseSkeleton from "../components/common/BaseSkeleton.vue";
import LastTransactionsSection from "../components/home/LastTransactionsSection.vue";

export default {
  components: { LastTransactionsSection, BaseSkeleton, BaseButton },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("partners", ["current_partner"]),
    kpi() {
      const data = {};

      for (const item of this.current_partner.kpi) {
        let icon = "trending-up";

        if (item.growth < 0) {
          icon = "trending-down";
        }
        if (item.growth == 0) {
          icon = "activity";
        }

        let growth = item.growth > 0 ? "+" + item.growth : item.growth;

        data[item.name] = { ...item, icon, growth };
      }

      return data;
    },
  },
  async mounted() {
    await this.$store.dispatch("partners/listpagestransactions");
    this.loading = false;
  },
};
</script>

<style scoped>

</style>
