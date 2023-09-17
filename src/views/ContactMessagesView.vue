<template>
  <div class="page-container-wrapper">
    <div class="mb-4 flex justify-between items-center flex-wrap gap-4">
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
                  >{{ $t("contacts_page.title") }}</span
                >
              </div>
            </li>
          </ol>
        </nav>
        <p>
          {{ $t("contacts_page.description") }}
        </p>
      </div>

      <div id="les-actions" class="flex gap-2 md:gap-4 p-3">
        <BaseButton
          class="flex items-center justify-center space-x-2 text-[14px] bg-primary px-3 py-2 rounded"
          @click="$router.push({ name: 'clients.list' })"
        >
          <vue-feather class="scale-50 md:scale-75" type="eye"></vue-feather>
          <span>{{ $t("common.breadcrumb.buttons.list-clients") }}</span>
        </BaseButton>
        <BaseButton
          class="flex items-center justify-center space-x-2 text-[14px] bg-primary px-3 py-2 rounded"
          @click="$router.push({ name: 'products.manage' })"
        >
          <vue-feather class="scale-50 md:scale-75" type="eye"></vue-feather>
          <span>{{ $t("common.breadcrumb.buttons.manage-products") }}</span>
        </BaseButton>
      </div>
    </div>

    <div class="row">
      <ClientMessagesSection :loading="loading" />
    </div>
  </div>
</template>

<script>
import ClientMessagesSection from "../components/clients/ClientMessagesSection.vue";
import BaseButton from "../components/common/BaseButton.vue";

export default {
  components: { ClientMessagesSection, BaseButton },
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    await this.$store.dispatch("contacts/listcontacts");
    this.loading = false;
  },
};
</script>

<style scoped>

</style>
