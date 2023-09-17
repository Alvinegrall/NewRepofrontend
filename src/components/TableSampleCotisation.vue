<script setup>
import { computed, ref } from "vue";
// import { useMainStore } from "@/stores/main";
import CotisationInfos from "@/components/CotisationInfos.vue";

import CardBoxModal from "@/components/common/CardBoxModal.vue";
import TableCheckboxCell from "@/components/common/TableCheckboxCell.vue";
import BaseLevel from "@/components/common/BaseLevel.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import ShareLinkSocialNetwork from "@/components/ShareLinkSocialNetwork.vue";

import BaseStatus from "@/components/common/BaseStatus.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  checkable: Boolean,
});

const store = useStore();
const router = useRouter();

const cotisations = computed(() => store.getters["cotisations/cotisations"]);

const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate.split(" ")[0];
};
const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);

const checkedRows = ref([]);

// new design

const itemsPaginated = computed(() =>
  cotisations.value?.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

// const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

// new mun pages

const numPages = computed(() =>
  Math.ceil(cotisations.value?.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

const remove = (arr, cb) => {
  const newArr = [];

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item);
    }
  });

  return newArr;
};

const checked = (isChecked, membre) => {
  if (isChecked) {
    checkedRows.value.push(membre);
  } else {
    checkedRows.value = remove(
      checkedRows.value,
      (row) => row.id === membre.id
    );
  }
};

const showDetails = () => {
  router.push({
    name: "finance.cotisations-details",
    params: { code: "12313A" },
  });
};
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isModalActive"
      has-cancel
      hasCostomWith
      buttonLabel="Ok"
      width="xl:w-6/12"
      title="Détails des cotisations"
    >
      <CotisationInfos />
    </CardBoxModal>

    <CardBoxModal
      v-model="isModalDangerActive"
      title="Partager le lien de paiement "
      button="info"
      has-cancel
    >
      <ShareLinkSocialNetwork />
    </CardBoxModal>

    <div v-if="checkedRows.length" class="p-3 bg-gray-100/50 dark:bg-slate-300">
      <!-- <span
        v-for="checkedRow in checkedRows"
        :key="checkedRow.id"
        class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
      >
        {{ checkedRow.first_name }}
      </span> -->
      <span
        v-for="(checkedRow, index) in checkedRows"
        :key="checkedRow.id"
        class="relative inline-block px-2 py-1 text-white mr-2 text-sm bg-gray-100 rounded-lg dark:bg-blue-500"
      >
        {{ checkedRow.first_name }}
        <span
          class="absolute bottom-5 right-[-5px] p-1 flex justify-center items-center bg-secondary bg-opacity-75 rounded-full w-4 h-4"
        >
          {{ index + 1 }}
        </span>
      </span>
    </div>

    <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th />
          <th>Récepteur</th>
          <th>Nom</th>
          <th>Type</th>
          <th>Montant</th>
          <th>Compte</th>
          <th>Date de fin</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="client in itemsPaginated"
          :key="client.id"
          class="cursor-pointer"
          @click="showDetails"
        >
          <TableCheckboxCell
            v-if="checkable"
            @checked="checked($event, client)"
          />
          <td class="border-b-0 lg:w-6 before:hidden">
            <div v-if="client?.seance == null">
              <UserProfile
                :username="client.name"
                class="w-24 h-24 mx-auto lg:w-6 lg:h-6"
              />
            </div>
          </td>
          <td data-label="Récepteur">
            <div>
              <div v-if="client?.membre?.first_name == null">
                Séance
                <div class="text-gray-400 font-[500]">
                  ( {{ client?.seance?.matricule }} )
                </div>
              </div>

              <div v-if="client?.seance == null" class="flex items-center">
                {{ client?.membre?.first_name }}
                <div class="text-gray-400 font-[500]">
                  ( {{ client?.membre?.matricule }} )
                </div>
              </div>
            </div>
          </td>
          <td data-label="Name">
            {{ client.name }}
          </td>
          <td data-label="Type">
            {{ client?.type == 1 ? "Fixe" : "Volontaire" }}
          </td>
          <td data-label="Montant">{{ client.amount }} XAF</td>
          <td data-label="Date de fin">
            <div class="flex items-center">
              {{ client?.compte.name }}

              <div class="text-gray-400 font-[500] ml-1">
                {{ client?.compte.public_ref }}
              </div>
            </div>
          </td>

          <td data-label="Date de fin">
            {{ formateDate(client?.end_date) }}
            <!-- <BaseStatus label="pending" color="success" /> -->
          </td>

          <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="info"
                :icon="'info'"
                small
                @click="isModalActive = true"
              />
              <BaseButton
                color="warning"
                icon="share-2"
                small
                @click="isModalDangerActive = true"
              />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-3 lg:px-6 border-t border-gray-100">
      <BaseLevel>
        <BaseButtons>
          <BaseButton
            v-for="page in pagesList"
            :key="page"
            :active="page === currentPage"
            :label="page + 1"
            :color="page === currentPage ? 'info' : 'primary'"
            small
            class="text-white"
            @click="currentPage = page"
          />
        </BaseButtons>
        <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
      </BaseLevel>
    </div>
  </div>
</template>
