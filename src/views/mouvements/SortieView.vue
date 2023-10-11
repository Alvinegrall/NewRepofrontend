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

import TableSortie from "@/components/TableSortie.vue";

import { useSnackbar } from "vue3-snackbar";

const snackbar = useSnackbar();

import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import PlanetChart from "@/components/PlanetChart.vue";

const router = useRouter();
const store = useStore();

const breadcrumbItems = reactive([
  {
    title: "Toutes les sorties",
    link: "create-article",
  },
]);

const fields = reactive({
  code_article: "",
  beneficiaire_id: "",
  qte: "",
  date: "",
});
const articles = computed(() => store.getters["articles/article"]);
const beneficiaire = computed(() => store.getters["beneficiaire/benefi"]);
const sortie = computed(() => store.getters["sortie/sortie"]);

const isCreateTournoisModalActive = ref(false);

const createMembre = () => {
  isCreateTournoisModalActive.value = true;
};

const goBack = () => {
  console.log("ttoto");
};

const createSortie = () => {
  const datas = {
    code_article: fields.code_article,
    beneficiaire_id: fields.beneficiaire_id.id,
    qte: fields.qte,
    date: fields.date,
  };
  store
    .dispatch("sortie/createSortie", datas)
    .then(async (response) => {
      //   console.log("response", response);f
      if (!response.data.error) {
        await store.dispatch("sortie/getAllSortie");
        snackbar.add({
          type: "success",
          text: "Effectué avec success",
        });

        (fields.beneficiaire_id = ""),
          (fields.code_article = ""),
          (fields.date = ""),
          (fields.qte = "");
      }
    })
    .catch((error) => {
      snackbar.add({
        type: "error",
        text: error.response.data.message,
      });
    });
};
const current_datas = ref(null);
const checkQte = () => {
  current_datas.value = articles.value.find(
    (elt) => elt.code == fields.code_article
  );
};
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isCreateTournoisModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Créer une sortie"
      @confirm="createSortie"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        <FormField label="Choisir l'article" help="Required">
          <FormControl
            v-model="fields.code_article"
            :options="articles"
            icon="check-circle"
            placeholder="Article"
            @change="checkQte"
          />
        </FormField>
        <FormField label="Bénéficiaire">
          <FormControl
            v-model="fields.beneficiaire_id"
            :options="beneficiaire"
            icon="check-circle"
            placeholder="Article"
          />
        </FormField>
        <FormField
          v-if="current_datas?.qte <= 0"
          label="Vous n'avez pas cette article en stock"
        >
          <div class="text-red-500">Effectuez une recharge</div>
        </FormField>

        <FormField
          v-else
          :label="
            current_datas?.qte
              ? 'Quantité ( ' + current_datas?.qte + '  ) '
              : 'Quantité'
          "
          help="required"
        >
          <FormControl
            v-model="fields.qte"
            icon="phone"
            placeholder="Entrez la quantité"
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
    </CardBoxModal>

    <HeaderBreadcrumbs
      :links="breadcrumbItems"
      title="Historique des sorties"
    />

    <HeaderWithOptions
      :btnLabel="['Créer une sortie']"
      :icons="['plus-circle', 'success']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createMembre"
    />
    <CardBox class="mb-6" has-table>
      <TableSortie :details="sortie" />
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
