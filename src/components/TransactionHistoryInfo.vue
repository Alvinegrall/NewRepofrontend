<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import ArticlesService from "@/services/ArticlesService.js";

import CardBoxModal from "@/components/common/CardBoxModal.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useSnackbar } from "vue3-snackbar";

const snackbar = useSnackbar();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  totalAmount: {
    type: String,
    default: "3000",
  },
  paidAmount: {
    type: String,
    default: "1000",
  },
  remainingAmount: {
    type: String,
    default: "2000",
  },
  currency: {
    type: String,
    default: "XAF",
  },
  details: {
    type: Array,
    default: () => [],
  },
});
const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};

const store = useStore();

const current_item = ref("");
const isModalDangerActive = ref(false);

const onDelete = (value) => {
  isModalDangerActive.value = true;
  current_item.value = value;
};

const handleDelete = async () => {
  console.log(current_item.value);
  await store
    .dispatch("articles/deleteLogs", current_item.value)
    .then(async (response) => {
      console.log("response add ", response);
      if (!response.data.error) {
        await store.dispatch("articles/getAllLogs");
        snackbar.add({
          text: "Supprimé avec success",
          type: "success",
        });
        isModalDangerActive.value = false;
      }
    })
    .catch((error) => {
      snackbar.add({
        text: "Erreur lors de la creation",
        type: "error",
      });
    });
};
</script>

<template>
  <div>
    <!-- <h5 id="defaultMembreLabel" class="modal-title text-sm mb-3 font-semibold">
      Détails
    </h5> -->

    <CardBoxModal
      v-model="isModalDangerActive"
      title="Confirmer la suppression"
      button="danger"
      buttonLabel="Supprimer"
      has-cancel
      @confirm="handleDelete"
    >
      <p>Voulez-vous vraiment effectuer cette action?</p>
    </CardBoxModal>

    <div class="overflow-x-auto rounded-lg">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Opération
                </th>

                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date &amp; Time
                </th>

                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th />
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in details" :key="index">
                <td
                  data-label="Opération"
                  class="whitespace-nowrap text-sm font-normal text-gray-900"
                >
                  <div v-html="item.description"></div>
                </td>
                <td class="whitespace-nowrap text-sm font-normal text-gray-500">
                  {{ formateDate(item.created_at) }}
                </td>

                <td
                  data-label=" Date &amp; Time"
                  class="whitespace-nowrap text-sm font-normal text-gray-900"
                >
                  <div class="flex items-center gap-3">
                    <BaseStatusButton
                      icon="check-circle"
                      label="Success"
                      success
                    />
                    <!-- <div class="underline text-blue-600">Détails</div> -->
                  </div>
                </td>
                <td data-label="Status">
                  <BaseButton
                    color="danger"
                    :icon="'trash-2'"
                    outline
                    small
                    @click="onDelete(item.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
tr:nth-child(even) {
  background-color: #fff;
}
</style>
