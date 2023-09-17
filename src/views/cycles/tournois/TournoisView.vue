<template>
  <div>
    <CardBoxModal
      v-model="isCreateTournoisModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Créer un tournois"
    >
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal lorem*10</p>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Liste des tournois" />
    <HeaderWithOptions
      :btnLabel="['Créer', 'Options']"
      :icons="['plus-circle', 'info']"
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createTournois"
    />

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
      <CardBox is-hoverable>
        <!-- <CardBoxHeader title="12/12/20323" btnlabel="12/32/3432" /> -->
        <CircleProgress />

        <div class="text-center mt-10">
          <BaseButton color="success" label="En cour" />
          <!-- <BaseButton color="danger" type="submit" label="Submit" /> -->
        </div>
      </CardBox> 
    </div>
  </div>
</template>

<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import CircleProgress from "@/components/common/CircleProgress.vue";
// import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

const router = useRouter()
const breadcrumbItems = reactive([
  {
    title: "Tournois",
    link: "cycles.tournois",
  },
]);
const isCreateTournoisModalActive = ref(false);

const searchTournois = (event) => {
  console.log("datahdks++", event);
};
const createTournois = () => {
  router.push({
    name: "cycles.createtournois",
  });
  // isCreateTournoisModalActive.value = true;

  
};
</script>

<style></style>
