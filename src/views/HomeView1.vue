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

import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

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

const goBack = () => {
  router.push({ name: "finance.cotisations" });
};

const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};
</script>

<template>
  <div>
    <CardBoxModal
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
    </CardBoxModal>

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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardBox>
          <div class="relative">
            <CompteHeader title="Etats articles" noicon />
            <div class="flex flex-col md:flex-row items-center gap-4">
              <div class="flex-1">
                <CompteAmountAndLabel
                  isColorText
                  amountSize="text-4xl"
                  amount="3000"
                  label="Montant versé"
                  labelColor="text-gray-500"
                  amountColor=""
                  class="mb-5"
                />

                <CompteAmountAndLabel
                  isColorText
                  amountSize="text-3xl"
                  amount="0"
                  label="Solde Faroty"
                  labelColor="text-gray-500"
                  amountColor="info"
                  class="mb-5"
                />
              </div>
              <div class="flex-1 border bg-opacity-60 p-3 rounded-lg mt-5">
                <img src="/earning.png" class="w-8" alt="" />

                <div>
                  <div>
                    Les fonds sont transmis dans le compte
                    <span class="font-bold text-blue-500 underline"
                      >Épargne</span
                    >
                  </div>
                  <button
                    class="mt-5 flex items-center gap-1 hover:gap-3 transition-all duration-200 ease-out underline text-blue-500 font-[500]"
                  >
                    Voir le compte
                    <vue-feather class="h-4" type="arrow-right"></vue-feather>
                  </button>
                </div>
              </div>
            </div>
            <div class="absolute top-0 right-0 bg-red-200 p-2 rounded-lg">
              <div class="text-sm flex items-center gap-1">
                <span class="font-semibold text-red-500"
                  ><vue-feather class="h-4" type="alert-circle"></vue-feather
                ></span>
                <span class="font-semibold text-red-500"
                  >Cotisation Expiré</span
                >
              </div>
            </div>

            <!-- <div
              class="mt-5 flex flex-col md:flex-row items-center justify-end gap-5"
            >
              <BaseButton
                color="info"
                label="Retrait"
                icon="arrow-up-circle"
                @click="cashoutModal"
              />

            
            </div> -->
          </div>
        </CardBox>
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-4 gap-4">
            <div v-for="(item, index) in 4" :key="index">
              <CardBox>
                <div class="flex flex-col items-center justify-center">
                  <div class="flex items-center gap-2">
                    <img src="/earning.png" class="w-5" alt="" />

                    <div>12501</div>
                  </div>
                  <div>Livraisons</div>
                </div>
              </CardBox>
            </div>
          </div>
          <CardBox class="flex-1">
            <CompteHeader title="Département avec le plus le demandes" noicon />
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Nombre</th>
                  <th>Type</th>
                  <th>Dernière</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    data-label="Nom"
                    class="md:max-w-[300px] max-h-[50px] overflow-hidden"
                  >
                    tsague
                  </td>
                  <td data-label="Montant">
                    <span class="font-[500]"> 1000</span>
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
                  <td data-label="Date de fin">
                    Hier
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBox>
        </div>
      </div>
      <CardBox>
        <CompteHeader title="Historique des transactions" noicon />
        <TransactionHistoryInfo details="currentCompte?.payments " />
      </CardBox>
    </div>
  </div>
</template>

<style></style>
