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

    <HeaderBreadcrumbs :links="breadcrumbItems" title="✍️ Créer un tournois" />
    <!-- <HeaderWithOptions
      :btnLabel="['Créer', 'Options']"
      :icons="['plus-circle', 'info']"
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createTournois"
    /> -->
    <div class="flex justify-end mb-10">
      <BaseButtons>
        <BaseButton
          color="info"
          label="Enregistrer"
          icon="save"
          @click="handleSubmit()"
        />
        <BaseButton
          color="info"
          label="Retour"
          outline
          icon="arrow-left"
          @click="goBack()"
        />
      </BaseButtons>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-6">
      <CardBox is-hoverable>
        <!-- <CardBoxHeader title="12/12/20323" btnlabel="12/32/3432" /> -->
        <!-- <CircleProgress /> -->

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

const router = useRouter();
const breadcrumbItems = reactive([
  {
    title: "Tournois",
    link: "cycles.tournois",
  },
  {
    title: "Nouveau tournois",
    link: "cycles.createtournois",
  },
]);
const isCreateTournoisModalActive = ref(false);

const goBack = () => {
  router.push({ name: "cycles.tournois" });
};
const handleSubmit = () => {
  // isCreateTournoisModalActive.value = true;
};
</script>

<style></style>
