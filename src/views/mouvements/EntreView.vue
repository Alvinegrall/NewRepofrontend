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

import TableEntree from "@/components/TableEntree.vue";

import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import PlanetChart from "@/components/PlanetChart.vue";
import { useSnackbar } from "vue3-snackbar";

const snackbar = useSnackbar();

const router = useRouter();
const store = useStore();
const breadcrumbItems = reactive([
  {
    title: "Nouvelle livraison",
    link: "create-article",
  },
]);

const fields = reactive({
  marque: "",
  code_article: "",
  fournisseur_id: "",
  qte: "",
});
const isCreateTournoisModalActive = ref(false);

const createMembre = () => {
  isCreateTournoisModalActive.value = true;
};

const goBack = () => {
  console.log("ttoto");
};

const articles = computed(() => store.getters["articles/article"]);
const fournisseur = computed(() => store.getters["fournisseur/fournisseur"]);
const entre = computed(() => store.getters["entre/entre"]);

const magasins = computed(() => store.getters["magasins/magasin"]);
const cats = computed(() => store.getters["category/cat"]);

const createEntre = () => {
  const datas = {
    marque: fields.marque,
    code_article: fields.code_article,
    fournisseur_id: fields.fournisseur_id.id,
    qte: fields.qte,
  };

  store
    .dispatch("entre/createEntre", datas)
    .then(async (response) => {
      //   console.log("response", response);f
      if (!response.data.error) {
        await store.dispatch("entre/getAllEntre");
        snackbar.add({
          type: "success",
          text: "Effectué avec success",
        });
      }
    })
    .catch((error) => {
      // this.$snackbar.add({
      //   text: "Error" + error,
      //   type: "error",
      // });
      snackbar.add({
          type: "error",
          text: "Une erreur s'est produite",
        });

      console.log("error", error);
    });

  // console.log(datas);
};
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isCreateTournoisModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Créer une entrée"
      @confirm="createEntre"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        <!-- <FormField label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField> -->
        <FormField label="Choisir l'article">
          <FormControl
            v-model="fields.code_article"
            :options="articles"
            icon="check-circle"
            placeholder="choisir"
          />
        </FormField>

        <FormField label="Marque" help="Optionel">
          <FormControl
            v-model="fields.marque"
            icon="edit-3"
            placeholder="Marque du produit"
          />
        </FormField>
        <FormField label="Quantité">
          <FormControl
            v-model="fields.qte"
            icon="edit-3"
            placeholder="Quantité"
          />
        </FormField>

        <FormField label="Choisir le fornisseur">
          <FormControl
            v-model="fields.fournisseur_id"
            :options="fournisseur"
            icon="check-circle"
            placeholder="Type"
          />
        </FormField>
      </div>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Toutes vos livraisons" />

    <HeaderWithOptions
      :btnLabel="['Créer une entrée']"
      :icons="['plus-circle', 'success']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createMembre"
    />
    <CardBox class="mb-6" has-table>
      <TableEntree :details="entre" />
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
