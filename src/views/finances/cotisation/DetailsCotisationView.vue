<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import EmptyContain from "@/components/common/EmptyContain.vue";
import TableCotisationDetails from "@/components/TableCotisationDetails.vue";
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
import BaseDropdownButton from "@/components/common/BaseDropdownButton.vue";
import CompteAmountAndLabel from "@/components/common/CompteAmountAndLabel.vue";

import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

const store = useStore();
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
    title: "Cotisations",
    link: "finance.cotisations",
  },
  {
    title: "Détails de la cotisation",
    link: "finance.cotisations-details",
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

const membresList = computed(() => store.getters["membres/membresList"]);

const goBack = () => {
  router.push({name:"finance.cotisations"})
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

    <HeaderBreadcrumbs
      :links="breadcrumbItems"
      title="Détails de la cotisation"
    />
    <div class="flex justify-end mb-5">
      <BaseButton
        color="info"
        label="Retour"
        outline
        icon="arrow-left"
        @click="goBack()"
      />
    </div>

    <div class="flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardBox>
          <div class="relative">
            <CompteHeader title="Détails sur le solde" noicon />
            <div class="flex flex-col md:flex-row items-center gap-4">
              <div class="flex-1">
                <CompteAmountAndLabel
                  isColorText
                  amountSize="text-4xl"
                  amount="10000"
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
          <CardBox class="">
            <CompteHeader title="Détails de la cotisation" noicon />
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Montant</th>
                  <th>Type</th>
                  <th>Date de fin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    data-label="Nom"
                    class="md:max-w-[300px] max-h-[50px] overflow-hidden"
                  >
                    Annivv Lorem ipsum dolor
                  </td>
                  <td data-label="Montant"><span class="font-[500]">1000000 XAF</span></td>
                  <td data-label="Type">
                    <div
                      class="bg-blue-500 bg-opacity-10 text-blue-500 p-1 rounded-lg"
                    >
                      <div class="text-sm">
                        <!-- {{
                          currentCotisation?.data?.type == 1
                            ? "Fixe"
                            : "Volontaire"
                        }} -->
                        <span class="font-semibold">Volontaire</span>
                      </div>
                    </div>
                  </td>
                  <td data-label="Date de fin">12/23/2034</td>
                </tr>
              </tbody>
            </table>
          </CardBox>
          <CardBox has-table class="">
            <div class="bg-orange-200 p-1 rounded-lg">
              <div class="text-sm flex items-center gap-1">
                <span class="font-semibold text-orange-500"
                  ><vue-feather class="h-4" type="alert-circle"></vue-feather
                ></span>
                <span class="font-[400] text-orange-500"
                  >Une sanction de
                  <span class="font-bold underline"
                    >500 XAF</span
                  >
                  sera appliquée à la fin de la cotisation</span
                >
              </div>
            </div>
          </CardBox>
        </div>
      </div>
      <CardBox>
        <div class="">
          <Tabs :tabs="tabs" hasShareLink>
            <template v-slot:1>
              <!-- Contenu de l'onglet 1 -->
              <div>
                <!-- <h1 class="text-2xl font-semibold">Contenu de l'onglet 1</h1> -->
                <TableCotisationDetails />
                <!-- Ajoutez votre contenu ici -->
              </div>
            </template>

            <template v-slot:2>
              <!-- Contenu de l'onglet 2 -->
              <div>
                <h1 class="text-2xl font-semibold">Contenu de l'onglet 2</h1>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores dicta esse ipsa tempora harum iusto labore temporibus
                sed recusandae error inventore aliquid explicabo saepe, officia
                rerum dolorem. Obcaecati, maiores exercitationem.
                <!-- Ajoutez votre contenu ici -->
              </div>
            </template>

            <template v-slot:3>
              <!-- Contenu de l'onglet 3 -->
              <div>
                <h1 class="text-2xl font-semibold">Contenu de l'onglet 3</h1>
                <!-- Ajoutez votre contenu ici -->
              </div>
            </template>
          </Tabs>
        </div>
      </CardBox>
    </div>
  </div>
</template>

<style></style>
