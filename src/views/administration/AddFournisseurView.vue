<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import CotisationInfos from "@/components/CotisationInfos.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";

// import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import TableSampleFondCaisse from "@/components/TableSampleFondCaisse.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import ShareLinkSocialNetwork from "@/components/ShareLinkSocialNetwork.vue";
import FormFileCropPicker from "@/components/common/FormFileCropPicker.vue";

import TableAdministration from "@/components/TableAdministration.vue";

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

const router = useRouter();

const breadcrumbItems = reactive([
  {
    title: "Créer un article",
    link: "create-article",
  },
]);

const fields = reactive({
  first_name: "",
  last_name: "",
  first_phone: "",
  second_phone: "",
  email: "",
  country: "",
  region: "",
  city: "",
  type: "",
  marital_status: "",
  residence: "",
  photo_profil: "",
  date_adhesion: "",
  beneficiaire: [],
});
const isCreateTournoisModalActive = ref(false);

const createMembre = () => {
  isCreateTournoisModalActive.value = true;
};

const goBack = () => {
  console.log("ttoto");
};
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isCreateTournoisModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Créer un article"
    >
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
        <!-- <FormField label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField> -->

        <FormField label="Nom" help="Nom du membre">
          <FormControl
            v-model="fields.first_name"
            icon="edit-3"
            placeholder="Nom"
          />
        </FormField>
        <FormField label="Prénom">
          <FormControl
            v-model="fields.last_name"
            icon="edit-3"
            placeholder="Prénom"
          />
        </FormField>
        <FormField label="Téléphone" help="required">
          <FormControl
            v-model="fields.first_phone"
            icon="phone"
            placeholder="Téléphone"
          />
        </FormField>

        <FormField label="Autre téléphone" help="required">
          <FormControl
            v-model="fields.second_phone"
            icon="phone"
            placeholder="Téléphone"
          />
        </FormField>
        <FormField label="Type">
          <FormControl
            v-model="fields.type"
            :options="['Founder', 'Member']"
            icon="check-circle"
            placeholder="Type"
          />
        </FormField>

        <FormField label="Email" help="Optionel">
          <FormControl
            v-model="fields.email"
            icon="mail"
            placeholder="exemple@gmail.com"
          />
        </FormField>

        <!-- <VueDatePicker v-model="fields.date_adhesion" /> -->
        <!-- dhskhs -->

        <FormField label="Situation matrimoniale">
          <FormControl
            v-model="fields.marital_status"
            :options="['Célibataire', 'mariée', 'Divorcée', 'Veuf']"
            icon="check-circle"
            help="Your full name"
            placeholder="Situation matrimoniale"
          />
        </FormField>
        <FormField label="Lieu de résidence" help="Optionel">
          <FormControl
            v-model="fields.residence"
            icon="map-pin"
            placeholder="Lieu de résidence"
          />
        </FormField>

        <FormField label="Date d'hadésion" help="required">
          <FormDatePikerControl
            @getDate="fields.date_adhesion = $event"
            showHour
            placeholder="Date d'hadésion"
          />
        </FormField>
      </div>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Liste des articles" />

    <HeaderWithOptions
      :btnLabel="['Créer un articles']"
      :icons="['plus-circle', 'success']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createMembre"
    />
    <CardBox class="mb-6" has-table>
      <TableAdministration details="currentCompte?.payments " />
    </CardBox>

    <!-- <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
      <CardBox>
        <CircleProgress />

        <div class="text-center mt-10">
          <BaseButton color="success" label="En cour" />
        </div>
      </CardBox>
    </div> -->
  </div>
</template>

<style></style>
