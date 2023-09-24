<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
// import CotisationInfos from "@/components/CotisationInfos.vue";
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
      width="xl:w-4/12"
      hasCancel
      title="✍️ Créer une catégorie"
    >
      <div class="grid grid-cols-1  gap-x-6 gap-y-3">
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
        
      </div>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Liste des Catégories" />

    <HeaderWithOptions
      :btnLabel="['Créer une catégorie']"
      :icons="['plus-circle', 'success']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createMembre"
    />
    <CardBox class="mb-6" has-table>
      <TableAdministration details="currentCompte?.payments " />
    </CardBox>
  </div>
</template>

<style></style>
