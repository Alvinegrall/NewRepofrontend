<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
// import { useMainStore } from "@/stores/main";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import TableCheckboxCell from "@/components/common/TableCheckboxCell.vue";
import BaseLevel from "@/components/common/BaseLevel.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import FormateDate from "@/helpers/FormateDate";

import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import FormControlId from "@/components/common/FormControlId.vue";
import getFormattedAmount from "@/helpers/getFormattedAmount";

import ArticlesService from "@/services/ArticlesService";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({
  details: {
    type: Array,
    default: () => [],
  },
  checkable: Boolean,
});

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
  entres: [],
  search_value: "",
  search_key: "",
  limit_date: "all",
  category: null,
  nominee: null,
  start: null,
  end: null,
  end_date: "",
  start_date: "",
  source_name: "",
  source_ref: "",
  mode: "all",
  type: "all",
  article_id: "",
  fournisseur_id: "",
});

const fields = reactive({
  id_article: "",
  fournisseur_id: "",
  start_date: "",
  end_date: "",
  title: "",
});
const store = useStore();
const router = useRouter();

const isModalActive = ref(false);
const canShowReport = ref(false);

const isModalDangerActive = ref(false);
const isShowTitleModalActive = ref(false);

const searchText = computed(() => store.getters["searchQuery"]);

const reload = computed(() => store.state["reload"]);

watch(reload, (ret, sfs) => {
  handleGetSortie();
});

watch(searchText, (newTxs, oldTxs) => {
  handleGetSortie();
});

const checkedRows = ref([]);
const loading = ref(false);
const beneficiaire = computed(() => store.getters["beneficiaire/benefi"]);
const fournisseur = computed(() => store.getters["fournisseur/fournisseur"]);
const articles = computed(() => store.getters["articles/article"]);

const numPages = computed(() =>
  Math.ceil(props.details.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

onMounted(async () => {
  await handleGetSortie();
});
const handleGetSortie = async () => {
  loading.value = true;
  await ArticlesService.handleGetAllEntre({
    page: paginationState.page ?? 1,
    per_page: paginationState.per_page ?? 5,
    start: paginationState.start,
    category: paginationState.category?.id ?? null,
    limit_date: paginationState.limit_date,
    type: paginationState.type ?? "",
    start_date: paginationState.start_date,
    end_date: paginationState.end_date,
    fournisseur_id: paginationState.fournisseur_id?.id ?? null,
    article_id: paginationState.article_id?.id ?? null,
    show_report: canShowReport.value,
    // source_ref: props.source_ref ?? "",
    search_value: searchText.value,
    mode: paginationState.mode ?? "",
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
        paginationState.entres = data.entres;
      }
    })
    .finally(() => {
      loading.value = false;
      // setTimeout(() => {
      // }, 2000);
    });
};
const onPerPage = () => {
  handleGetSortie();
};

const onLimitDate = () => {
  handleGetSortie();
};

const rowDatas = computed(() => {
  return paginationState.entres.length ? paginationState.entres : [];
});

const onBtFirst = () => {
  paginationState.page = 1;
  handleGetSortie();
};

const onBtLast = () => {
  paginationState.page = paginationState.last_page;
  handleGetSortie();
};
const onBtNext = () => {
  paginationState.page++;
  handleGetSortie();
};
const onBtPrevious = () => {
  paginationState.page--;
  handleGetSortie();
};
const onFilterSubmit = () => {
  paginationState.page = 1;
  handleGetSortie();
};

const makeResearch = () => {
  paginationState.start_date = fields.start_date;
  paginationState.end_date = fields.end_date;
  paginationState.fournisseur_id = fields.fournisseur_id;
  paginationState.article_id = fields.article_id;
  handleGetSortie();
  fields.start_date = "";
  fields.end_date = "";
  fields.fournisseur_id = "";
  fields.article_id = "";
};

const getcorrespondedPdf = async () => {
  canShowReport.value = true;
  isShowTitleModalActive.value = false;
  loading.value = true;
  await ArticlesService.handleGetAllEntrePdf({
    page: paginationState.page ?? 1,
    per_page: paginationState.per_page ?? 5,
    start: paginationState.start,
    category: paginationState.category?.id ?? null,
    limit_date: paginationState.limit_date,
    type: paginationState.type ?? "",
    start_date: paginationState.start_date,
    end_date: paginationState.end_date,
    fournisseur_id: paginationState.fournisseur_id?.id ?? null,
    article_id: paginationState.article_id?.id ?? null,
    show_report: canShowReport.value,
    title: fields.title,
    // source_ref: props.source_ref ?? "",
    search_value: searchText.value,
    mode: paginationState.mode ?? "",
    end: paginationState.end,
  })
    .then(async (res) => {
      if (!res.data.error) {
        // const data = res.data.data;
        // paginationState.page = data.current_page;
        // paginationState.total = data.total;
        // paginationState.first_page = data.first_page;
        // paginationState.last_page = data.last_page;
        // paginationState.current_page = data.current_page;
        // paginationState.has_more_pages = data.has_more_pages;
        // paginationState.is_empty = data.is_empty;
        // paginationState.entres = data.entres;

        fields.title = "";

        const link = document.createElement("a");
        link.href = res.data.fileName;
        link.target = "_blank";
        link.click();
        // store.dispatch("setLoadingSpinner", false);
      }
    })
    .finally(() => {
      loading.value = false;
      isShowTitleModalActive.value = false;
      // setTimeout(() => {
      // }, 2000);
    });
};

const showTitleModal = () => {
  isShowTitleModalActive.value = true;
};
</script>

<template>
  <div>
    <CardBoxModal v-model="isModalActive" title="Sample modal">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal
      v-model="isShowTitleModalActive"
      title="Entrez le titre a afficher"
      button="info"
      has-cancel
      @confirm="getcorrespondedPdf"
    >
      <FormField label="Titre">
        <FormControlId
          v-model="fields.title"
          icon="edit-3"
          placeholder="Entrez le titre"
        />
      </FormField>
    </CardBoxModal>

    <div>
      <div class="grid grid-cols-4 gap-4 mb-10">
        <FormField label="Date min">
          <FormDatePikerControl
            @getDate="fields.start_date = $event"
            placeholder="Date min"
          />
        </FormField>
        <FormField label="Date max">
          <FormDatePikerControl
            @getDate="fields.end_date = $event"
            placeholder="Date max"
          />
        </FormField>
        <FormField label="Choisir le fournisseur">
          <FormControl
            v-model="fields.fournisseur_id"
            :options="fournisseur"
            icon="check-circle"
            placeholder="choisir"
          />
        </FormField>
        <FormField label="Choisir l'article">
          <FormControlId
            v-model="fields.article_id"
            :options="articles"
            icon="check-circle"
            placeholder="choisir"
          />
        </FormField>

        <BaseButton
          color="info"
          :icon="'search'"
          label="rechercher"
          small
          @click="makeResearch()"
        />
      </div>
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
        </div>

        <div>
          <BaseButtons type="justify-start" class="flex gap-2" no-wrap>
            <BaseButton
              color="info"
              icon="file-text"
              label="Générer le pdf"
              small
              @click="showTitleModal()"
            />
          </BaseButtons>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th v-if="checkable" />
            <th>No</th>
            <th>Date</th>
            <th>Article</th>
            <th>Marque</th>
            <th>Quantité</th>
            <th>PU</th>
            <th>PT</th>
            <th>Fournisseur</th>
            <!-- <th>Conforme</th> -->
            <!-- <th /> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in rowDatas" :key="client.id">
            <TableCheckboxCell
              v-if="checkable"
              @checked="checked($event, client)"
            />

            <td data-label="No">
              {{ index + 1 }}
            </td>
            <td data-label="Date">
              {{ FormateDate(client.date) }}
            </td>
            <td data-label="Article">
              {{ client?.article?.name }}
            </td>
            <td data-label="Marque">
              {{ client.marque }}
            </td>
            <td data-label="Quantité" class="lg:w-32">
              {{ client.qte }}
            </td>
            <td data-label="PU" class="lg:w-32">
              {{ getFormattedAmount(client.prix_u) }}
            </td>
            <td data-label="PT" class="lg:w-32">
              {{ getFormattedAmount(client.prix_t) }}
            </td>

            <td data-label="Fournisseur">
              {{ client?.fournisseur?.name }}
            </td>

            <!-- <td data-label="Conforme">
           <div :class="{
             'text-red-500':!client?.is_conforme,
             'text-green-500':client?.is_conforme
           }">
            {{ client?.is_conforme ? "Conforme" : "Non conforme" }}
           </div>
          </td> -->
            <!-- <td class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <BaseButton
                color="danger"
                icon="trash-2"
                small
                @click="isModalDangerActive = true"
              />
            </BaseButtons>
          </td> -->
          </tr>
        </tbody>
      </table>
      <div
        class="h-16 border-b border-gray-500 flex justify-end items-center gap-[70px] text-[13px] pr-0 sm:pr-8"
      >
        <div class="text-xs min-w-max">
          <b>{{ (paginationState.page - 1) * paginationState.per_page + 1 }}</b
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
</template>
