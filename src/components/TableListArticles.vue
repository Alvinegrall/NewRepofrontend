<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";

import CotisationInfos from "@/components/CotisationInfos.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";

// import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import TableSampleFondCaisse from "@/components/TableSampleFondCaisse.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";

import ShareLinkSocialNetwork from "@/components/ShareLinkSocialNetwork.vue";
import FormFileCropPicker from "@/components/common/FormFileCropPicker.vue";

import { useSnackbar } from "vue3-snackbar";
import { computed, onMounted, reactive, ref } from "vue";
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
const isUpdateModalActive = ref(false);

const onDelete = (value) => {
  isModalDangerActive.value = true;
  current_item.value = value;
};
const fields = reactive({
  name: "",
  stock_alerte: "",
  stock_securite: "",
  cat_id: "",
  magasin_id: "",
});
const searchText = computed(() => store.getters["searchQuery"]);
console.log(searchText.value);

onMounted(() => {
  filterData();
});

const searchQuery = computed(() => filterData());

const filterData = () => {
  // If searchQuery is empty, show all data
  if (searchText.value == "") {
    return props.details;
  }

  // If searchQuery is not empty, filter data based on the query
  const searchTerm = searchText.value.toLowerCase();
  return props.details.filter((item) => {
    // Customize the fields you want to search for here
    const searchableFields = [
      item?.name.toString(),
      item?.category?.name.toString(),
      item?.qte.toString(),
      item?.stock_alerte.toString(),
      item?.stock_securite.toString(),
    ];
    return searchableFields.some((field) =>
      field.toLowerCase().includes(searchTerm)
    );
  });
};
const magasins = computed(() => store.getters["magasins/magasin"]);
const cats = computed(() => store.getters["category/cat"]);
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

const updateClick = (value) => {
  console.log(value);
  isUpdateModalActive.value = true;
  current_item.value = value;
  fields.name = value.name;
  fields.stock_alerte = value.stock_alerte;
  fields.stock_securite = value.stock_securite;
  fields.cat_id = value.category_id;
  fields.magasin_id = value.magasin_id;
};

const handleUpdateArticles = async () => {
  await store
    .dispatch("articles/updateArticle", {
      id: current_item.value.id,
      data: fields,
    })
    .then(async (response) => {
      if (!response.data.error) {
        await store.dispatch("articles/getAllArticles");
        snackbar.add({
          text: "Modifié avec success",
          type: "success",
        });
        isUpdateModalActive.value = false;
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

    <CardBoxModal
      v-model="isUpdateModalActive"
      hasCostomWith
      width="xl:w-5/12"
      hasCancel
      title="✍️ Créer un article"
      @confirm="handleUpdateArticles"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3">
        <FormField label="Nom de l'article">
          <FormControl
            v-model="fields.name"
            icon="edit-3"
            placeholder="Entrez le nom"
          />
        </FormField>
        <FormField label="Stock de sécurité">
          <FormControl
            v-model="fields.stock_securite"
            icon="edit-3"
            placeholder="Entrez la valeur "
          />
        </FormField>
        <FormField label="Stock d'alerte">
          <FormControl
            v-model="fields.stock_alerte"
            icon="bell"
            placeholder="Entrez la valeur"
          />
        </FormField>
        <FormField label="Choisir le magasin" help="Optionnel">
          <FormControl
            v-model="fields.magasin_id"
            :options="magasins"
            icon="check-circle"
            placeholder="choisir"
          />
        </FormField>
        <FormField label="Choisir la catégorie" help="Optionnel">
          <FormControl
            v-model="fields.cat_id"
            :options="cats"
            icon="check-circle"
            placeholder="choisir"
          />
        </FormField>
      </div>
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
              <tr v-for="(item, index) in searchQuery" :key="index">
                <td  data-label="Nom" class="whitespace-nowrap text-sm font-normal text-gray-900">
                  {{ item.name }}
                </td>
                <!-- <td class="whitespace-nowrap text-sm font-normal text-gray-500">
                  Apr 23 ,2021
                </td> -->

                <!-- <BaseAmountWithArrow isColorText isTable amount="3000" /> -->
                <td  data-label="Magasins">{{ item?.magasin?.name }}</td>

                <td   data-label="Catégories" class="whitespace-nowrap text-sm font-normal text-gray-900">
                  <div class="flex items-center gap-3">
                    {{ item?.category?.name }}
                    <!-- <BaseStatusButton
                      icon="check-circle"
                      label="Success"
                      success
                    /> -->
                  </div>
                </td>
                <td  data-label="Quantité">
                  <div class="flex items-center gap-3">
                    <div
                      class="font-semibold"
                      :class="item.is_alert ? 'text-red-500' : ''"
                    >
                      {{ item.qte }}
                    </div>
                    <vue-feather
                      v-if="item.is_alert"
                      type="info"
                      class="text-red-500 h-5"
                    ></vue-feather>
                  </div>
                </td>

                <td  data-label="Stock d'alerte">{{ item.stock_alerte }}</td>
                <td  data-label="Stock securité">{{ item.stock_securite }}</td>

                <td  data-label="">
                  <BaseButtons type="justify-start" class="flex gap-2" no-wrap>
                    <BaseButton
                      color="info"
                      :icon="'edit'"
                      small
                      @click="updateClick(item)"
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
