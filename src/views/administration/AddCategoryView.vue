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

import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import PlanetChart from "@/components/PlanetChart.vue";

const router = useRouter();
const store = useStore();

const breadcrumbItems = reactive([
  {
    title: "Créer un article",
    link: "create-article",
  },
]);

const fields = reactive({
  name: "",
});
const isCreateTournoisModalActive = ref(false);
const error = ref(false);

const createMembre = () => {
  isCreateTournoisModalActive.value = true;
};
// createCat

const goBack = () => {
  console.log("ttoto");
};

onMounted(async()=>{
  // await store.dispatch("category/getAllCat")
  
})

const cats = computed(()=>store.getters["category/cat"]);

const createCat = async () => {
  if (fields.name === "") {
    error.value = true;
    isCreateTournoisModalActive.value = true;
  }
   store
    .dispatch("category/createCat", { name: fields.name })
    .then(async (response) => {
    //   console.log("response", response);
      if (!response.data.error) {
        await store.dispatch("category/getAllCat");
      }
    })
    .catch((error) => {
      // this.$snackbar.add({
      //   text: "Error" + error,
      //   type: "error",
      // });

      console.log("error", error);
    });
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
      @confirm="createCat"
    >
      <div v-if="error" class="p-2 bg-red-200 text-red-500 rounded-lg my-4">
        Veuillez remplir tous les champs
      </div>
      <div class="grid grid-cols-1 gap-x-6 gap-y-3">
        <!-- <FormField label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField> -->

        <FormField label="Nom" help="Nom du membre">
          <FormControl v-model="fields.name" icon="edit-3" placeholder="Nom" />
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
      <TableAdministration :details="cats" />
    </CardBox>
  </div>
</template>

<style></style>
