<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import EmptyContain from "@/components/common/EmptyContain.vue";
// import TableDetailCotisation from "@/components/TableDetailCotisation.vue";
import TransactionHistoryInfo from "@/components/TransactionHistoryInfo.vue";

import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import CheckBoxWithLabel from "@/components/common/CheckBoxWithLabel.vue";
import Tabs from "@/components/common/Tabs.vue"; // Importez le composant Tabs
import CompteHeader from "@/components/common/CompteHeader.vue";
// import TableDetailNonCotisation from "@/components/TableDetailNonCotisation.vue";
import CompteAmountAndLabel from "@/components/common/CompteAmountAndLabel.vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

ChartJS.register(ArcElement, Tooltip, Legend, PointElement, LineElement);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const store = useStore();
const route = useRoute();
const tabs = reactive([
  {
    id: 1,
    name: "Cotisé",
  },
  {
    id: 2,
    name: "Non cotisé",
  },
]);

const router = useRouter();

onMounted(async () => {
  // await store.dispatch("articles/getHomepageData");
  // await store.dispatch("category/getAllCat")
  // await store.dispatch("fournisseur/getAllFournisseurs");
  // await store.dispatch("beneficiaire/getAllBenefi");
  // await store.dispatch("magasins/getAllMagasins");
  // await store.dispatch("articles/getAllLogs");
  // await store.dispatch("articles/getAllArticles");
  // await store.dispatch("entre/getAllEntre");
  // await store.dispatch("sortie/getAllSortie");
  // await store.dispatch("articles/getHomepageData");
});
const entre = computed(() => store.getters["cycles/entres"]);
const sortie = computed(() => store.getters["cycles/sortie"]);

const breadcrumbItems = reactive([
  {
    title: "",
    link: "common.home",
  },
]);
const fields = reactive({
  date_seance: "",
  localisation: "",
  reciever_code: "",
  partner_urlcode: "",
  is_attendance_list: false,
});
const isCreateTournoisModalActive = ref(false);
const currentCotisation = ref({});

const searchTournois = (event) => {
  console.log("datahdks++", event);
};
const createTournois = () => {
  isCreateTournoisModalActive.value = true;
};
const submitProfile = () => {
  console.log("data", fields);
  isCreateTournoisModalActive.value = true;
};

// const membresList = computed(() => store.getters["membres/membresList"]);
const logs = computed(() => store.getters["articles/logs"]);
const homePageData = computed(() => store.getters["articles/homePageData"]);

const goBack = () => {
  router.push({ name: "finance.cotisations" });
};

const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};

const dataBand = reactive({
  labels: null,
  datasets: [
    {
      label: "Quatité",
      backgroundColor: "#f87979",
      data: null,
    },
  ],
});

dataBand.labels = homePageData?.value.article_name;
dataBand.datasets[0].data = homePageData?.value.article_qte;
const options = reactive({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<template>
  <div>
    <!-- <CardBoxModal
      v-model="isCreateTournoisModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Créer une seance"
      buttonLabel="Enregistrer"
      @confirm="submitProfile"
    >
      <CardBox hasComponentLayout is-form>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <FormField label="Date de début" help="required">
            <FormDatePikerControl
              @getDate="fields.date_seance = $event"
              showHour
              placeholder="Date de début"
            />
          </FormField>
          <FormField label="Localisation" help="Required">
            <FormControl
              icon="map-pin"
              v-model="fields.localisation"
              name="location"
              placeholder="Entrer la Localisation"
              required
            />
          </FormField>
          <FormField label="Membre Recepeteur" help="Required">
            <FormControl
              v-model="fields.reciever_code"
              :options="membresList"
              icon="user"
              placeholder="Choisir le membre"
            />
          </FormField>

          <CheckBoxWithLabel
            id="presence"
            label="Générer une liste de présence?"
            v-model="fields.is_attendance_list"
          />
        </div>
      </CardBox>
    </CardBoxModal> -->

    <!-- <HeaderBreadcrumbs
      :links="breadcrumbItems"
      title="Détails de la cotisation"
    /> -->
    <!-- <div class="flex justify-end mb-5">
      <BaseButton
        color="info"
        label="Retour"
        outline
        icon="arrow-left"
        @click="goBack()"
      />
    </div> -->

    <div class="flex flex-col gap-6">
      <div class="grid grid-cols-1 gap-4">
        <div class=" flex flex-col md:grid md:grid-cols-2  gap-4">
          <CardBox class="flex-1">
            <CompteHeader title="Informations sur le cycle courant" noicon />
            <table>
              <thead>
                <tr>
                  <th>Livraisons</th>
                  <th>Sortie</th>
                  <th>Type</th>
                  <!-- <th>Dernière</th> -->
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    data-label="Nom"
                    class="md:max-w-[300px] max-h-[50px] overflow-hidden"
                  >
                    {{ entre.length }}
                  </td>
                  <td data-label="Montant">
                    <span class="font-[500]"> {{ sortie.length }}</span>
                  </td>
                  <td data-label="Type">
                    <div
                      class="bg-emerald-500 bg-opacity-10 text-emerald-500 flex justify-center p-1 rounded-lg"
                    >
                      <div class="text-sm">
                        <!-- {{
                          currentCotisation?.data?.type == 1
                            ? "Fixe"
                            : "Volontaire"
                        }} -->
                        <span class="font-semibold">Tout type</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBox>
          <div class="grid grid-cols-4 gap-4">
            <div>
              <CardBox>
                <div class="flex flex-col items-center justify-center">
                  <div class="flex items-center gap-2">
                    <img src="/box_close.png" class="w-5" alt="" />
                    <div class="font-semibold text-lg">
                      {{ homePageData.total_article }}
                    </div>
                  </div>
                  <div>Articles</div>
                </div>
              </CardBox>
            </div>
            <div>
              <CardBox>
                <div class="flex flex-col items-center justify-center">
                  <div class="flex items-center gap-2">
                    <img src="/livraison.png" class="w-5" alt="" />

                    <div class="font-semibold text-lg">
                      {{ homePageData.total_entre }}
                    </div>
                  </div>
                  <div>Livraisons</div>
                </div>
              </CardBox>
            </div>
            <div>
              <CardBox>
                <div class="flex flex-col items-center justify-center">
                  <div class="flex items-center gap-2">
                    <img src="/earning.png" class="w-5" alt="" />

                    <div class="font-semibold text-lg">
                      {{ homePageData.total_sortie }}
                    </div>
                  </div>
                  <div>Sortie</div>
                </div>
              </CardBox>
            </div>
            <div>
              <CardBox>
                <div
                  class="flex flex-col items-center justify-center cursor-pointer"
                  @click="$router.push({ name: 'create-article' })"
                >
                  <div class="flex items-center gap-2">
                    <img src="/alert.png" class="w-5" alt="" />

                    <div class="font-semibold text-lg text-red-500">
                      {{ homePageData.total_alerte }}
                    </div>
                  </div>
                  <div class="underline">Alertes</div>
                </div>
              </CardBox>
            </div>
          </div>
       
        </div>
        <CardBox>
          <div class="relative">
            <CompteHeader title="Etats articles" noicon />

            <div class="h-52">
              <Bar :data="dataBand" :options="options" />
            </div>

            <!-- graph here -->
          </div>
        </CardBox>
      
      </div>
      <CardBox>
        <CompteHeader title="Transactions récentes" noicon />
        <TransactionHistoryInfo :details="logs" />
      </CardBox>
    </div>
  </div>
</template>

<style></style>
