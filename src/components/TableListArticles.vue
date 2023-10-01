<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";

import CardBoxModal from "@/components/common/CardBoxModal.vue";

import { useSnackbar } from "vue3-snackbar";
import { ref } from "vue";
import { useStore } from "vuex";

const snackbar = useSnackbar();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },

  details: {
    type: Array,
    default: () => [],
  },
});

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
    .dispatch("articles/deleteArticle", current_item.value)
    .then(async (response) => {
      if (!response.data.error) {
        await store.dispatch("articles/getAllArticles");
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
                  Nom
                </th>

                <!-- <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Marque
                </th> -->
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Magasins
                </th>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Catégories
                </th>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantité
                </th>

                <th
                  scope="col"
                  class="flex items-center flex-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock d'alerte
                </th>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock securité
                </th>

                <th />
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in details" :key="index">
                <td class="whitespace-nowrap text-sm font-normal text-gray-900">
                  {{ item.name }}
                </td>
                <!-- <td class="whitespace-nowrap text-sm font-normal text-gray-500">
                  Apr 23 ,2021
                </td> -->

                <!-- <BaseAmountWithArrow isColorText isTable amount="3000" /> -->
                <td>{{ item?.magasin?.name }}</td>

                <td class="whitespace-nowrap text-sm font-normal text-gray-900">
                  <div class="flex items-center gap-3">
                    {{ item?.category?.name }}
                    <!-- <BaseStatusButton
                      icon="check-circle"
                      label="Success"
                      success
                    /> -->
                  </div>
                </td>
                <td>
                  <div class="flex items-center gap-3">
                    <div>
                      {{ item.qte }}
                    </div>
                    <vue-feather
                      v-if="item.is_alert"
                      type="info"
                      class="text-red-500 h-5"
                    ></vue-feather>
                  </div>
                </td>

                <td>{{ item.stock_alerte }}</td>
                <td>{{ item.stock_securite }}</td>

                <td>
                  <BaseButtons type="justify-start" class="flex gap-2" no-wrap>
                    <BaseButton
                      color="info"
                      :icon="'edit'"
                      small
                      @click="isModalActive = true"
                    />

                    <BaseButton
                      color="danger"
                      icon="trash-2"
                      small
                      @click="onDelete(item.id)"

                    />
                  </BaseButtons>
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
