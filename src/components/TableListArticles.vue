<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";

import CotisationInfos from "@/components/CotisationInfos.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";

import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import TableSampleFondCaisse from "@/components/TableSampleFondCaisse.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import ArticlesService from "@/services/ArticlesService";
import ShareLinkSocialNetwork from "@/components/ShareLinkSocialNetwork.vue";
import FormFileCropPicker from "@/components/common/FormFileCropPicker.vue";

import { useSnackbar } from "vue3-snackbar";
import { computed, onMounted, reactive, ref, watch } from "vue";
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
const loading = ref(false);

const searchQuerry = computed(() => store.getters["searchQuerry"]);


const paginationState = reactive({
  dataFetched: true,
  per_page: 10,
  page: 1,
  total: 0,
  first_page: 1,
  last_page: 1,
  current_page: 1,
  has_more_pages: false,
  is_empty: false,
  articles: [],
  search_value: "",
  search_key: "",
  limit_date: "all",
  category: null,
  nominee: null,
  start: null,
  end: null,
  source_name: "",
  source_ref: "",
  mode: "all",
  type: "all",
});

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

const reload = computed(() => store.state["reload"]);

watch(reload, (ret, sfs) => {
  handleGetArticles();
});
const searchText = computed(() => store.getters["searchQuery"]);

watch(searchText, (newTxs, oldTxs) => {
  handleGetArticles();
});

onMounted(async () => {
  await handleGetArticles();
});

const handleGetArticles = async () => {
  loading.value = true;
  await ArticlesService.getAllArticles_pagination({
    page: paginationState.page ?? 1,
    per_page: paginationState.per_page ?? 5,
    start: paginationState.start,
    category: paginationState.category?.id ?? null,
    limit_date: paginationState.limit_date,
    type: paginationState.type ?? "",
    search_value: searchText.value,
    // source_ref: props.source_ref ?? "",
    mode: paginationState.mode ?? "",
    // search_key: searchQuerry.value.search_key ?? "",
    end: paginationState.end,
  })
    .then((res) => {
      if (!res.data.error) {
        const data = res.data.data;
        paginationState.page = data.current_page;
        paginationState.total = data.total;
        paginationState.first_page = data.first_page;
        paginationState.last_page = data.last_page;
        paginationState.current_page = data.current_page;
        paginationState.has_more_pages = data.has_more_pages;
        paginationState.is_empty = data.is_empty;
        paginationState.articles = data.articles;
      }
    })
    .finally(() => {
      loading.value = false;
      // setTimeout(() => {
      // }, 2000);
    });
};
const onPerPage = () => {
  handleGetArticles();
};

const onLimitDate = () => {
  handleGetArticles();
};

const rowDatas = computed(() => {
  return paginationState.articles.length
    ? paginationState.articles
    : props.details;
});

const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};

const onBtFirst = () => {
  paginationState.page = 1;
  handleGetArticles();
};

const onBtLast = () => {
  paginationState.page = paginationState.last_page;
  handleGetArticles();
};
const onBtNext = () => {
  paginationState.page++;
  handleGetArticles();
};
const onBtPrevious = () => {
  paginationState.page--;
  handleGetArticles();
};
const onFilterSubmit = () => {
  paginationState.page = 1;
  handleGetArticles();
};
const details = computed(() => props.details);

// const getDetailsPayment = async (item) => {
//   selectedPayment.value = item;
//   isdetailTransactionActive.value = true;
//   pending_loading.value = true;
//   // store.dispatch("setLoadingSpinner", true);
//   await CompteService.getDetailsPayment({ ref: item.reference })
//     .then(async (response) => {
//       if (!response.data.error) {
//         currentInfo.value = response.data.data;
//         show_detail_btn.value = true;
//         pending_loading.value = false;
//       }
//     })
//     .catch((error) => {
//       isdetailTransactionActive.value = true;
//       show_detail_btn.value = false;
//       pending_loading.value = false;
//       // store.dispatch("setLoadingSpinner", false);
//       // console.log("erros", error);
//     });
// };
// const searchQuery = computed(() => filterData());

// const filterData = () => {
//   // If searchQuery is empty, show all data
//   if (searchText.value == "") {
//     return props.details;
//   }

//   // If searchQuery is not empty, filter data based on the query
//   const searchTerm = searchText.value.toLowerCase();
//   return props.details.filter((item) => {
//     // Customize the fields you want to search for here
//     const searchableFields = [
//       item?.name.toString(),
//       item?.category?.name.toString(),
//       item?.qte.toString(),
//       item?.stock_alerte.toString(),
//       item?.stock_securite.toString(),
//     ];
//     return searchableFields.some((field) =>
//       field.toLowerCase().includes(searchTerm)
//     );
//   });
// };
const magasins = computed(() => store.getters["magasins/magasin"]);
const cats = computed(() => store.getters["category/cat"]);
const handleDelete = async () => {
  store.dispatch("setLoadingSpinner", true);
  await store
    .dispatch("articles/deleteArticle", current_item.value)
    .then(async (response) => {
      if (!response.data.error) {
        // await store.dispatch("articles/getAllArticles");
        store.dispatch("setLoadingSpinner", false);
      await  handleGetArticles()
        snackbar.add({
          text: "Supprimé avec success",
          type: "success",
        });
        isModalDangerActive.value = false;
      }
    })
    .catch((error) => {
      store.dispatch("setLoadingSpinner", false);
      // isModalDangerActive.value = true;
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
  store.dispatch("setLoadingSpinner", true);
  await store
    .dispatch("articles/updateArticle", {
      id: current_item.value.id,
      data: fields,
    })
    .then(async (response) => {
      if (!response.data.error) {
        // await store.dispatch("articles/getAllArticles");
        await  handleGetArticles()
        store.dispatch("setLoadingSpinner", false);
        snackbar.add({
          text: "Modifié avec success",
          type: "success",
        });
        isUpdateModalActive.value = false;
      }
    })
    .catch((error) => {
      store.dispatch("setLoadingSpinner", false);
      isUpdateModalActive.value = true;
      snackbar.add({
        text: "Erreur est survenue",
        type: "error",
      });
    });
};

const showPdfFile = async (item) => {
  await ArticlesService.genaratePdf(item).then((response) => {
    if (!response.data.error) {
      const link = document.createElement("a");
      link.href = response.data.data.fileName;
      link.target = "_blank";
      link.click();
    }
  });
  // const link = document.createElement("a");
  // link.href = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
  // link.target = "_blank";
  // link.click();
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
            type="number"
            icon="edit-3"
            placeholder="Entrez la valeur "
          />
        </FormField>
        <FormField label="Stock d'alerte">
          <FormControl
            v-model="fields.stock_alerte"
            type="number"
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
          <div class="flex justify-between">
            <div
              class="border-b pb-5 flex flex-col md:flex-row items-start md:items-center gap-2 sm:gap-5"
            >
              <div>
                <label for="per_page" class="text-xs sm:text-sm">
                  Afficher :
                  <select
                    name="per_page"
                    id="per_page"
                    v-model="paginationState.per_page"
                    class="w-20 p-0 sm:p-1 bg-gray-100 border"
                    @change="onPerPage"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </label>
              </div>
              <div>
                <label for="per_page" class="text-xs sm:text-sm">
                  <span class="text-xs sm:text-sm">Filtrer : </span>
                  <select
                    name="per_page"
                    id="per_page"
                    v-model="paginationState.type"
                    class="p-0 sm:p-1 bg-gray-100 border"
                    @change="onLimitDate"
                  >
                    <option value="all" selected>
                      Toutes les transactions
                    </option>
                    <option value="1">Alerte</option>
                    <option value="0">Non alerte</option>
                  </select>
                </label>
              </div>
            </div>

            <div>
              <BaseButtons type="justify-start" class="flex gap-2" no-wrap>
                <BaseButton
                  color="danger"
                  :icon="'file-text'"
                  label="Liste des articles en alerte"
                  small
                  @click="showPdfFile(1)"
                />
                <BaseButton
                  color="info"
                  icon="file-text"
                  label="Touts les articles"
                  small
                  @click="showPdfFile(3)"
                />
              </BaseButtons>
            </div>
          </div>

          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>

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
                  <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Non Conforme
                </th>

                <th />
              </tr>
            </thead>
            <tbody class="bg-white">
              <template v-if="!loading">
                <tr v-for="(item, index) in rowDatas" :key="index">
                  <td
                    data-label="Nom"
                    class="whitespace-nowrap text-sm font-normal text-gray-900"
                  >
                    {{ index + 1 }}
                  </td>
                  <td
                    data-label="Nom"
                    class="whitespace-nowrap text-sm font-normal text-gray-900"
                  >
                    {{ item.name }}
                  </td>
                  <!-- <td class="whitespace-nowrap text-sm font-normal text-gray-500">
                  Apr 23 ,2021
                </td> -->

                  <!-- <BaseAmountWithArrow isColorText isTable amount="3000" /> -->
                  <td data-label="Magasins">{{ item?.magasin?.name }}</td>

                  <td
                    data-label="Catégories"
                    class="whitespace-nowrap text-sm font-normal text-gray-900"
                  >
                    <div class="flex items-center gap-3">
                      {{ item?.category?.name }}
                      <!-- <BaseStatusButton
                      icon="check-circle"
                      label="Success"
                      success
                    /> -->
                    </div>
                  </td>
                  <td data-label="Quantité">
                    <div
                      v-if="item.is_alert"
                      class="flex items-center gap-3 bg-red-500 bg-opacity-25 p-2"
                    >
                      <div
                        class="font-semibold"
                        :class="item.is_alert ? 'text-red-500' : ''"
                      >
                        {{ item.qte }}
                      </div>
                      <vue-feather
                        type="info"
                        class="text-red-500 h-5"
                      ></vue-feather>
                    </div>
                    <div v-else class="flex items-center gap-3 p-2">
                      <div class="font-semibold">
                        {{ item.qte }}
                      </div>
                    </div>
                  </td>

                  <td data-label="Stock d'alerte">{{ item.stock_alerte }}</td>
                  
                  <td data-label="Stock securité">{{ item.stock_securite }}</td>
                  <td data-label="Non Conforme" class="text-yellow-600">{{ item.stock_non_conforme }}</td>
                  <td data-label="">
                    <BaseButtons
                      type="justify-start"
                      class="flex gap-2"
                      no-wrap
                    >
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
              </template>
              <template v-if="loading">
                <tr v-for="(item, index) in 4" :key="index">
                  <td colspan="2">
                    <BaseSkeleton :shadow="'none'" :height="'40px'" />
                  </td>

                  <td>
                    <BaseSkeleton :shadow="'none'" :height="'40px'" />
                  </td>
                  <td>
                    <BaseSkeleton :shadow="'none'" :height="'40px'" />
                  </td>
                  <td colspan="2">
                    <BaseSkeleton :shadow="'none'" :height="'40px'" />
                  </td>

                  <td colspan="2">
                    <BaseSkeleton :shadow="'none'" :height="'40px'" />
                  </td>
                  <td>
                    <BaseSkeleton :shadow="'none'" :height="'40px'" />
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <div
            class="h-16 border-b border-gray-500 flex justify-end items-center gap-[70px] text-[13px] pr-0 sm:pr-8"
          >
            <div class="text-xs min-w-max">
              <b>{{
                (paginationState.page - 1) * paginationState.per_page + 1
              }}</b
              >&nbsp;<small class="text-[13px]">to</small>&nbsp;<b>{{
                paginationState.page * paginationState.per_page >
                paginationState.total
                  ? paginationState.total
                  : paginationState.page * paginationState.per_page
              }}</b
              >&nbsp;<small class="text-[13px]">of</small>&nbsp;
              <b>{{ paginationState.total }}</b>
            </div>
            <div class="flex items-center justify-center gap-[26px]">
              <div class="flex gap-6">
                <vue-feather
                  class="h-4 w-4"
                  :class="{
                    'cursor-pointer text-gray-800':
                      paginationState.current_page > 1,
                    'cursor-not-allowed text-gray-400':
                      paginationState.current_page <= 1,
                  }"
                  type="skip-back"
                  @click="onBtFirst"
                ></vue-feather>
                <vue-feather
                  class="h-4 w-4"
                  type="chevron-left"
                  :class="{
                    'cursor-pointer text-gray-800':
                      paginationState.current_page > 1,
                    'cursor-not-allowed text-gray-400':
                      paginationState.current_page <= 1,
                  }"
                  @click="onBtPrevious"
                ></vue-feather>
              </div>
              <div class="text-xs min-w-max">
                Page <b>{{ paginationState.current_page }}</b> &nbsp;<small
                  class="text-xs"
                  >of</small
                >&nbsp;
                <b>{{ paginationState.last_page }}</b>
              </div>
              <div class="flex gap-6">
                <vue-feather
                  class="h-4 w-4"
                  type="chevron-right"
                  :class="{
                    'cursor-pointer text-gray-800':
                      paginationState.current_page < paginationState.last_page,
                    'cursor-not-allowed text-gray-400':
                      paginationState.current_page >= paginationState.last_page,
                  }"
                  @click="onBtNext"
                ></vue-feather>
                <vue-feather
                  class="h-4 w-4"
                  type="skip-forward"
                  :class="{
                    'cursor-pointer text-gray-800':
                      paginationState.current_page < paginationState.last_page,
                    'cursor-not-allowed text-gray-400':
                      paginationState.current_page >= paginationState.last_page,
                  }"
                  @click="onBtLast"
                ></vue-feather>
              </div>
            </div>
          </div>
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
