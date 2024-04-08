<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import CotisationInfos from "@/components/CotisationInfos.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import CheckBoxWithLabel from "@/components/common/CheckBoxWithLabel.vue";

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
import getFormattedAmount from "@/helpers/getFormattedAmount";

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
    title: "Toutes les entrées",
    link: "create-article",
  },
]);

const fields = reactive({
  marque: "",
  code_article: "",
  fournisseur_id: "",
  qte: "",
  is_conforme: false,
  date: "",
  prix_t: "",
  prix_u: "",
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

const searchTournois = (event) => {
  store.dispatch("searchQuery", event);
};
const createEntre = async () => {
  store.dispatch("setLoadingSpinner", true);
  const datas = {
    marque: fields.marque,
    code_article: fields.code_article,
    fournisseur_id: fields.fournisseur_id.id,
    qte: fields.qte,
    prix_u: fields.prix_u,
    prix_t: fields.prix_t,
    is_conforme: true,
    date: fields.date,
  };

  // check fields
  if (
    fields.marque == "" ||
    fields.code_article == "" ||
    fields.fournisseur_id == "" ||
    fields.qte == "" ||
    fields.prix_t == ""
  ) {
    isCreateTournoisModalActive.value = true;
    store.dispatch("setLoadingSpinner", false);
    snackbar.add({
      type: "error",
      text: "Veuillez remplir tous les champs",
    });
    return;
  }

  await store
    .dispatch("entre/createEntre", datas)
    .then(async (response) => {
      //   console.log("response", response);f
      if (!response.data.error) {
        await store.dispatch("entre/getAllEntre");
        isCreateTournoisModalActive.value = false;
        store.dispatch("setLoadingSpinner", false);
        snackbar.add({
          type: "success",
          text: "Effectué avec success",
        });
      }
    })
    .catch((error) => {
      store.dispatch("setLoadingSpinner", false);
      isCreateTournoisModalActive.value = true;
      snackbar.add({
        type: "error",
        text: "Une erreur s'est produite",
      });
    });

  // console.log(datas);
};

const calculatePrixTotal = () => {
  if (fields.qte == "" || fields.prix_u == "") {
    fields.prix_t = 0;
  } else {
    fields.prix_t = Number(fields.qte) * Number(fields.prix_u);
  }
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
            type="number"
            icon="edit-3"
            placeholder="Quantité"
            @input="calculatePrixTotal()"
          />
        </FormField>
        <FormField label="Prix unitaire">
          <FormControl
            v-model="fields.prix_u"
            type="number"
            icon="edit-3"
            placeholder="Prix unitaire"
            @input="calculatePrixTotal()"
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

        <FormField label="Date" help="required">
          <FormDatePikerControl
            @getDate="fields.date = $event"
            showHour
            placeholder="Date de l'opération"
          />
        </FormField>
      </div>

      <CardBox class="w-full p-1 mt-10 flex items-center" has-table>
        <div
          class="flex items-center gap-4 justify-center border pr-3-t px-2 bg-gray-200 border-opacity-10 text-black"
        >
          <div class="text-base font-semibold">
            {{ $t("loans.resume.total_to_back") }}:
          </div>
          <div class="text-lg text-primary font-bold border-4">
            {{ getFormattedAmount(fields.prix_t) }} F
          </div>
        </div>
      </CardBox>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Toutes vos livraisons" />

    <HeaderWithOptions
      :btnLabel="['Créer une entrée']"
      :icons="['plus-circle', 'success']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createMembre"
    />
    <CardBox class="mb-6">
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
