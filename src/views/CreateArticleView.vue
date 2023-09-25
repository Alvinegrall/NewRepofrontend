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

import TableListArticles from "@/components/TableListArticles.vue";

import { computed, reactive, ref } from "vue";
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
  stock_alerte: "",
  stock_securite: "",
  cat_id: "",
  magasin_id: "",
});
const isCreateTournoisModalActive = ref(false);
const articles = computed(() => store.getters["articles/article"]);

const magasins = computed(() => store.getters["magasins/magasin"]);
const cats = computed(() => store.getters["category/cat"]);

const createMembre = () => {
  isCreateTournoisModalActive.value = true;
};

const createArticles = () => {
  const datas = {
    name: fields.name,
    stock_alerte: fields.stock_alerte,
    stock_securite: fields.stock_securite,
    cat_id: fields.cat_id.id,
    magasin_id: fields.magasin_id.id,
  };

  store
    .dispatch("articles/createArticle", datas)
    .then(async (response) => {
      //   console.log("response", response);
      if (!response.data.error) {
        await store.dispatch("articles/getAllArticles");
      }
    })
    .catch((error) => {
      // this.$snackbar.add({
      //   text: "Error" + error,
      //   type: "error",
      // });

      console.log("error", error);
    });

  // console.log(datas);
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
      width="xl:w-5/12"
      hasCancel
      title="✍️ Créer un article"
      @confirm="createArticles"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-3">
        <FormField label="Nom de l'article" help="Required">
          <FormControl
            v-model="fields.name"
            icon="edit-3"
            placeholder="Entrez le nom"
          />
        </FormField>
        <FormField label="Stock de sécurité">
          <FormControl
            v-model="fields.stock_securite"
            icon="edit-3"
            placeholder="Entrez la valeur "
          />
        </FormField>
        <FormField label="Stock d'alerte" help="required">
          <FormControl
            v-model="fields.stock_alerte"
            icon="bell"
            placeholder="Entrez la valeur"
          />
        </FormField>
        <FormField label="Choisir le magasin">
          <FormControl
            v-model="fields.magasin_id"
            :options="magasins"
            icon="check-circle"
            placeholder="choisir"
          />
        </FormField>
        <FormField label="Choisir la catégorie">
          <FormControl
            v-model="fields.cat_id"
            :options="cats"
            icon="check-circle"
            placeholder="choisir"
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
      <TableListArticles :details="articles" />
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
