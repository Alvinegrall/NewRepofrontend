<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import EmptyContain from "@/components/common/EmptyContain.vue";
// import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import CheckBoxWithLabel from "@/components/common/CheckBoxWithLabel.vue";
import Tabs from "@/components/common/Tabs.vue"; // Importez le composant Tabs
import TablesSampleSanction from "@/components/TablesSampleSanction.vue";
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import CotisationInfos from "@/components/CotisationInfos.vue";


import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

const store = useStore();
const router = useRouter();

const breadcrumbItems = reactive([
  {
    title: "Membres",
    link: "administration.membres",
  },
  {
    title: "Détails du Membres",
    link: "finance.single-member",
  },
]);
const tabs = reactive([
  {
    id: 1,
    name: "Sanctions",
  },
  {
    id: 2,
    name: "Cotisations",
  },
]);
const tabsAutre = reactive([
  {
    id: 1,
    name: "Bénéficiaire",
  },
  {
    id: 2,
    name: "Plus",
  },
]);
const tabsGeneralInfo = reactive([
  {
    id: 1,
    name: "Fond de caise",
  },
  {
    id: 2,
    name: "Autre",
  },
]);
const fields = reactive({
  date_seance: "",
  localisation: "",
  reciever_code: "",
  partner_urlcode: "",
  is_attendance_list: false,
});
const isFondCaiseInfoModalActive = ref(false);
const isPayFondCaiseModalActive = ref(false);

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
  router.push({ name: "administration.membres" });

};
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isPayFondCaiseModalActive"
      hasCostomWith
      width="xl:w-4/12"
      hasCancel
      title="💸 Effectuer un versement"
      buttonLabel="Suivant"
      @confirm="submitProfile"
    >
      <CardBox hasComponentLayout is-form>
        <div class="grid grid-cols-1 gap-6">
          <!-- <FormField label="Numéro de téléphone" help="Required">
            <FormControl
              icon="phone"
              v-model="fields.localisation"
              name="Numéro"
              placeholder="Entrer la Localisation"
              required
            />
          </FormField> -->
          <FormField label="Montant " help="Required">
            <FormControl
              icon="credit-card"
              v-model="fields.localisation"
              name="Montant"
              placeholder="Entrer le montant"
              required
            />
          </FormField>
        </div>
      </CardBox>
    </CardBoxModal>
    <CardBoxModal
      v-model="isFondCaiseInfoModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Détails des versements"
      buttonLabel="Enregistrer"
      @confirm="submitProfile"
    >
     <CotisationInfos />
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Profile du membre" />

    <div class="flex justify-end mb-5">
      <BaseButton
        color="info"
        label="Retour"
        outline
        icon="arrow-left"
        @click="goBack()"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="col-span-1 flex flex-col gap-4">
        <CardBox>
          <!-- <CardBoxHeader title="Vos Séances"  />  -->

          <!-- <EmptyContain /> -->
          <div class="">
            <img class="h-32 rounded-lg" src="/profile.png" alt="" />
            <div class="mt-3">
              Mr/Mme
              <h2 class="text-lg font-[700] mb-3">
                Tsague Yves thibaut cambel
              </h2>
              <ul class="flex flex-col gap-3">
                <li class="flex items-center gap-2">
                  <vue-feather class="h-4" type="briefcase"></vue-feather>
                  Fondateur
                </li>
                <li class="flex items-center gap-2">
                  <vue-feather class="h-4" type="map-pin"></vue-feather>
                  Douala,Mbangué
                </li>
              </ul>
            </div>
          </div>
        </CardBox>
        <CardBox>
          <CardBoxHeader title="information personnelle" />

          <div>
            <div class="">
              <div
                class="flex gap-2 items-center text-sm font-[400] text-gray-400"
              >
                <vue-feather class="h-4" type="mail"></vue-feather>
                Adresse Email
              </div>
              <div class="font-[500]">tsague@gmail.com</div>
            </div>
            <div class="mt-4">
              <div
                class="flex gap-2 items-center text-sm font-[400] text-gray-400"
              >
                <vue-feather class="h-4" type="phone"></vue-feather>
                Téléphone
              </div>
              <div class="font-[500]">677438521 / 6974292842</div>
            </div>
            <div class="mt-4">
              <div
                class="flex gap-2 items-center text-sm font-[400] text-gray-400"
              >
                <vue-feather class="h-4" type="gift"></vue-feather>
                date de naissance
              </div>
              <div class="font-[500]">12/12/1990 , 30 ans</div>
            </div>
          </div>
        </CardBox>

        <CardBox>
          <CardBoxHeader title="Autres" btnlabel="Créer " />

          <!-- <EmptyContain /> -->
          <div class="">
            <Tabs :tabs="tabsAutre">
              <template v-slot:1>
                <!-- Contenu de l'onglet 1 -->
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Tel</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="Nom">Annivv Lorem ipsum dolor</td>
                        <td data-label="Tel">6774385321</td>
                        <td data-label="Type">Enfant</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>

              <template v-slot:2>
                <!-- Contenu de l'onglet 2 -->
                <div>
                  <h1 class="text-2xl font-semibold">Contenu de l'onglet 2</h1>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Asperiores dicta esse ipsa tempora harum iusto labore
                  temporibus sed recusandae error inventore aliquipad explicabo
                  saepe, officia rerum dolorem. Obcaecati, maiores
                  exercitationem.
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
      <div class="col-span-2 flex flex-col gap-4">
        <CardBox>
          <CardBoxHeader title="Informations générale" btnlabel="more" />

          <!-- <EmptyContain /> -->
          <div class="">
            <Tabs :tabs="tabsGeneralInfo" hasShareLink>
              <template v-slot:1>
                <!-- Contenu de l'onglet 1 -->
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th>Total</th>
                        <th>Montant versé</th>
                        <th>Montant restant</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td data-label="Total">5000 XAF</td>
                        <td data-label="Montant versé">
                          <BaseAmountWithArrow
                            isColorText
                            isTable
                            amount="2000"
                          />
                        </td>
                        <td data-label="Montant restant">
                          <span class="text-red-500">3000 XAF</span>
                        </td>
                        <td data-label="Status">
                          <BaseStatusButton
                            icon="check-circle"
                            roundedFull
                            success
                          />
                        </td>
                        <td>
                          <BaseButtons
                            type="justify-start lg:justify-end"
                            no-wrap
                          >
                            <BaseButton
                              color="info"
                              :icon="'info'"
                              small
                              @click="isFondCaiseInfoModalActive = true"
                            />
                            <BaseButton
                              color="warning"
                              label="Payer"
                              small
                              @click="isPayFondCaiseModalActive = true"
                            />
                          </BaseButtons>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>

              <template v-slot:2>
                <!-- Contenu de l'onglet 2 -->
                <div>
                  <h1 class="text-2xl font-semibold">Contenu de l'onglet 2</h1>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Asperiores dicta esse ipsa tempora harum iusto labore
                  temporibus sed recusandae error inventore aliquid explicabo
                  saepe, officia rerum dolorem. Obcaecati, maiores
                  exercitationem.
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
        <CardBox>
          <CardBoxHeader title="Infos supplementaires " />

          <div class="">
            <Tabs :tabs="tabs">
              <template v-slot:1>
                <!-- Contenu de l'onglet 1 -->
                <div>
                  <!-- <h1 class="text-2xl font-semibold">Contenu de l'onglet 1</h1> -->
                  <TablesSampleSanction />
                  <!-- Ajoutez votre contenu ici -->
                </div>
              </template>

              <template v-slot:2>
                <!-- Contenu de l'onglet 2 -->
                <div>
                  <h1 class="text-2xl font-semibold">Contenu de l'onglet 2</h1>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Asperiores dicta esse ipsa tempora harum iusto labore
                  temporibus sed recusandae error inventore aliquid explicabo
                  saepe, officia rerum dolorem. Obcaecati, maiores
                  exercitationem.
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

        <CardBox>
          <CardBoxHeader title="Infos supplementaires " />

          <div class="">
            <Tabs :tabs="tabs">
              <template v-slot:1>
                <!-- Contenu de l'onglet 1 -->
                <div>
                  <!-- <h1 class="text-2xl font-semibold">Contenu de l'onglet 1</h1> -->
                  <TablesSampleSanction />
                  <!-- Ajoutez votre contenu ici -->
                </div>
              </template>

              <template v-slot:2>
                <!-- Contenu de l'onglet 2 -->
                <div>
                  <h1 class="text-2xl font-semibold">Contenu de l'onglet 2</h1>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Asperiores dicta esse ipsa tempora harum iusto labore
                  temporibus sed recusandae error inventore aliquid explicabo
                  saepe, officia rerum dolorem. Obcaecati, maiores
                  exercitationem.
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
  </div>
</template>

<style></style>
