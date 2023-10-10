<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useSnackbar } from "vue3-snackbar";

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
const isModalDangerActive = ref(false);
const current_item = ref("");
const onDelete = (value) => {
  isModalDangerActive.value = true;
  current_item.value = value;
};

const handleDelete = async () => {
  console.log(current_item.value);
  await store
    .dispatch("magasins/deleteMagasin", current_item.value)
    .then(async (response) => {
      if (!response.data.error) {
        await store.dispatch("magasins/getAllMagasins");
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
                  Status
                </th> -->
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

                <td class="flex justify-center items-center">
                  <BaseButtons type="justify-start" no-wrap class="flex gap-3">
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
