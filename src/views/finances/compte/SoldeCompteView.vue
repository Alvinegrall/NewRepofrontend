<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import EmptyContain from "@/components/common/EmptyContain.vue";
import AccountComponent from "@/components/AccountComponent.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import CheckBoxWithLabel from "@/components/common/CheckBoxWithLabel.vue";

import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
// import PlanetChart from "@/components/PlanetChart.vue";

const store = useStore();

const breadcrumbItems = reactive([
  {
    title: "Comptes",
    link: "finance.solde-du-compte",
  },
]);
const fields = reactive({
  name: "",
});
const isCreateTournoisModalActive = ref(false);

const comptes = computed(() => store.getters["comptes/comptes"]);

// const btnDropdownOpen = ref(false);

const searchTournois = (event) => {
  console.log("datahdks++", event);
};
const createTournois = () => {
  isCreateTournoisModalActive.value = true;
};
const submitProfile = () => {
  console.log("data", fields);
  isCreateTournoisModalActive.value = true;
};

const membresList = computed(() => store.getters["membres/membresList"]);

const showDetails = () => {
  console.log("teste");
};
</script>

<template>
  <div class="mb-10">
    <CardBoxModal
      v-model="isCreateTournoisModalActive"
      hasCostomWith
      width="xl:w-3/12"
      hasCancel
      title="✍️ Créer un Compte"
      buttonLabel="Enregistrer"
      @confirm="submitProfile"
    >
      <CardBox hasComponentLayout is-form>
        <div class="grid grid-cols-1">
          <FormField label="Nom du compte" help="Required">
            <FormControl
              icon="edit-3"
              v-model="fields.name"
              name="nom"
              placeholder="Entrer le nom du compte"
              required
            />
          </FormField>
        </div>
      </CardBox>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Vos comptes" />
    <HeaderWithOptions
      :btnLabel="['Créer']"
      :icons="['plus-circle', 'info']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createTournois"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <!-- <CardBox>
        <EmptyContain />
      </CardBox> -->
      <CardBox
        v-for="(item, index) in comptes"
        :key="index"
      >
        <!-- <CardBoxHeader title="Compte Project" btnlabel="teste" /> -->
        <AccountComponent :details="item" />
      </CardBox>
    </div>
  </div>
</template>

<style></style>
