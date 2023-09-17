<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import CotisationInfos from "@/components/CotisationInfos.vue";
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

const router = useRouter();

const breadcrumbItems = reactive([
  {
    title: "Fond de caisse",
    link: "finance.fond-caisse",
  },
]);
const isCreateTournoisModalActive = ref(false);

const searchTournois = (event) => {
  console.log("datahdks++", event);
};
const createMembre = () => {
  router.push({
    name: "administration.newmembres",
  });
  // isCreateTournoisModalActive.value = true;
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
      title="✍️ Créer un tournois"
    >
    <CotisationInfos />
      <!-- <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal lorem*10</p> -->
    </CardBoxModal>

    <HeaderBreadcrumbs
      :links="breadcrumbItems"
      title="Détaille du Fond de caisse"
    />
    <HeaderWithOptions
      :btnLabel="['Retour']"
      :icons="['arrow-left']"
      hasOneBtn
      outline
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="goBack()"
    />
    <CardBox class="mb-6" has-table>
      <TableSampleFondCaisse />
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
