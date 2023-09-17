<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import EmptyContain from "@/components/common/EmptyContain.vue";
import TransactionHistoryInfo from "@/components/TransactionHistoryInfo.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import CheckBoxWithLabel from "@/components/common/CheckBoxWithLabel.vue";

import CompteHeader from "@/components/common/CompteHeader.vue";
import BaseDropdownButton from "@/components/common/BaseDropdownButton.vue";
import CompteAmountAndLabel from "@/components/common/CompteAmountAndLabel.vue";

import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import PlanetChart from "@/components/PlanetChart.vue";

const store = useStore();

const router = useRouter();

const breadcrumbItems = reactive([
  {
    title: "Comptes",
    link: "finance.solde-du-compte",
  },
  {
    title: "Détails du comptes",
    link: "finance.detail-compte",
  },
]);
const fields = reactive({
  date_seance: "",
  localisation: "",
  reciever_code: "",
  partner_urlcode: "",
  is_attendance_list: false,
});
const isCreateTournoisModalActive = ref(false);
const isCashoutModalActive = ref(false);

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

const goBack = () => {
  router.push({ name: "finance.solde-du-compte" });
};
const cashoutModal = () => {
  isCashoutModalActive.value = true;
}
</script>

<template>
  <div class="mb-10">
    <CardBoxModal
      v-model="isCashoutModalActive"
      hasCostomWith
      width="xl:w-4/12"
      hasCancel
      title="💸 Demander un retrait"
      buttonLabel="Suivant"
      @confirm="submitProfile"
    >
      <CardBox hasComponentLayout is-form>
        <div class="grid grid-cols-1 gap-6">
       
          <FormField label="Numéro de téléphone" help="Required">
            <FormControl
              icon="phone"
              v-model="fields.localisation"
              name="Numéro"
              placeholder="Entrer la Localisation"
              required
            />
          </FormField>
          <FormField label="Montant " help="Required">
            <FormControl
              icon="credit-card"
              v-model="fields.localisation"
              name="Montant"
              placeholder="Entrer le montant"
              required
            />
          </FormField>
        </div>
      </CardBox>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Détails du compte" />

    <!-- <HeaderWithOptions
      :btnLabel="['Créer']"
      :icons="['plus-circle', 'info']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createTournois"
    /> -->

    <div class="flex justify-end mb-5">
      <BaseButton
        color="info"
        label="Retour"
        outline
        icon="arrow-left"
        @click="goBack()"
      />
    </div>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <CardBox>
          <div class="relative">
            <CompteHeader title="compte Epargne" publicRef="123313A" noicon />
            <div>
              <CompteAmountAndLabel
                isColorText
                amountSize="text-4xl"
                amount="10000"
                label="Solde principale"
                labelColor="text-gray-500"
                amountColor=""
                class="mb-5"
              />

              <CompteAmountAndLabel
                isColorText
                amountSize="text-3xl"
                amount="0"
                label="Solde Faroty"
                labelColor="text-gray-500"
                amountColor="info"
                class="mb-5"
              />
            </div>

            <div
              class="mt-5 flex flex-col md:flex-row items-center justify-between gap-5"
            >
              <BaseButton color="info" label="Retrait" icon="arrow-up-circle" @click="cashoutModal" />

              <img src="/wallet.png" class="w-8" alt="" />
            </div>
          </div>
        </CardBox>
        <div class="flex flex-col gap-5">
          <CardBox class="flex-1"> </CardBox>
          <CardBox class="flex-1"> </CardBox>
        </div>
      </div>
      <CardBox>
        <CardBoxHeader title="Historique des transactions" btnlabel="teste" />
        <TransactionHistoryInfo />

        <!-- <EmptyContain /> -->
      </CardBox>
    </div>
  </div>
</template>

<style></style>
