<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
// import { useMainStore } from "@/stores/main";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import TableCheckboxCell from "@/components/common/TableCheckboxCell.vue";
import BaseLevel from "@/components/common/BaseLevel.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import UserProfile from "@/components/common/UserProfile.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import FormControlId from "@/components/common/FormControlId.vue";

import FormateDate from "@/helpers/FormateDate";
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


const store = useStore();
const router = useRouter();

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
  sorties: [],
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
  article_id:"",
  beneficiaire_id:""
});

const fields = reactive({
  id_article: "",
  beneficiaire_id: "",
  start_date: "",
  end_date: "",
  title:""
});

const reload = computed(() => store.state["reload"]);

watch(reload, (ret, sfs) => {
  handleGetSortie();
});

const searchText = computed(() => store.getters["searchQuery"]);

watch(searchText, (newTxs, oldTxs) => {
  handleGetSortie();
});

const isModalActive = ref(false);

const isModalDangerActive = ref(false);
const isShowTitleModalActive = ref(false);

const perPage = ref(10);

const currentPage = ref(0);

const checkedRows = ref([]);
const loading = ref(false);
const beneficiaire = computed(() => store.getters["beneficiaire/benefi"]);
const articles = computed(() => store.getters["articles/article"]);

// new design

const itemsPaginated = computed(() =>
  props.details.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

// const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

// new mun pages

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
    name: "finance.single-member",
    params: { matricule: "1234AS" },
  });
};
const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};
onMounted(async () => {
  await handleGetSortie();
});
const handleGetSortie = async () => {
  loading.value = true;
  await ArticlesService.handleGetAllSortie({
    page: paginationState.page ?? 1,
    per_page: paginationState.per_page ?? 5,
    start: paginationState.start,
    category: paginationState.category?.id ?? null,
    limit_date: paginationState.limit_date,
    type: paginationState.type ?? "",
    start_date: paginationState.start_date,
    end_date: paginationState.end_date,
    beneficiaire_id: paginationState.beneficiaire_id?.id ?? null,
    article_id: paginationState.article_id?.id ?? null,
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
        paginationState.sorties = data.sorties;
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
  return paginationState.sorties.length
    ? paginationState.sorties
    : props.details;
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
  paginationState.beneficiaire_id = fields.beneficiaire_id;
  paginationState.article_id = fields.article_id;
  handleGetSortie();
  fields.start_date = "";
  fields.end_date = "";
  fields.beneficiaire_id = "";
  fields.article_id = "";
}
const showTitleModal = () => {
  isShowTitleModalActive.value = true;
};


const getcorrespondedPdf = async () => {
  isShowTitleModalActive.value = false;
  loading.value = true;
  await ArticlesService.handleGetAllSortiPdf({
    page: paginationState.page ?? 1,
    per_page: paginationState.per_page ?? 5,
    start: paginationState.start,
    category: paginationState.category?.id ?? null,
    limit_date: paginationState.limit_date,
    type: paginationState.type ?? "",
    start_date: paginationState.start_date,
    end_date: paginationState.end_date,
    beneficiaire_id: paginationState.beneficiaire_id?.id ?? null,
    article_id: paginationState.article_id?.id ?? null,
    title: fields.title ?? "",
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


// const details = computed(() => props.details);
</script>

<template>
  <div>
    <CardBoxModal v-model="isModalActive" title="Sample modal">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal
      v-model="isModalDangerActive"
      title="Please confirm"
      button="danger"
      has-cancel
    >
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
        <FormField label="Date de début">
          <FormDatePikerControl
            @getDate="fields.start_date = $event"
            showHour
            placeholder="Date de début"
          />
        </FormField>
        <FormField label="Date de fin">
          <FormDatePikerControl
            @getDate="fields.end_date = $event"
            showHour
            placeholder="Date de fin"
          />
        </FormField>
        <FormField label="Choisir le beneficiaire">
          <FormControl
            v-model="fields.beneficiaire_id"
            :options="beneficiaire"
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

        <!-- <div>
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
        </div> -->
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
            <th>Date</th>
            <th>Article</th>
            <th>Marque</th>
            <th>Quantité</th>
            <th>Bénéficiaire</th>
            <!-- <th /> -->
          </tr>
        </thead>
        <tbody>
          <template v-if="!loading">
            <tr v-for="client in rowDatas" :key="client.id">
              <TableCheckboxCell
                v-if="checkable"
                @checked="checked($event, client)"
              />

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

              <td data-label="Bénéficiaire">
                {{ client?.beneficiaire?.name }}
              </td>
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
