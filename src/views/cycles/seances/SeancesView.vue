<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import EmptyContain from "@/components/common/EmptyContain.vue";
// import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
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
    title: "Séance",
    link: "cyles.seances",
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
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isCreateTournoisModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Créer une seance"
      buttonLabel="Enregistrer"
      @confirm="submitProfile"
    >
      <CardBox hasComponentLayout is-form>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <FormField label="Date de début" help="required">
            <FormDatePikerControl
              @getDate="fields.date_seance = $event"
              showHour
              placeholder="Date de début"
            />
          </FormField>
          <FormField label="Localisation" help="Required">
            <FormControl
              icon="map-pin"
              v-model="fields.localisation"
              name="location"
              placeholder="Entrer la Localisation"
              required
            />
          </FormField>
          <FormField label="Membre Recepeteur" help="Required">
            <FormControl
              v-model="fields.reciever_code"
              :options="membresList"
              icon="user"
              placeholder="Choisir le membre"
            />
          </FormField>

          <CheckBoxWithLabel
            id="presence"
            label="Générer une liste de présence?"
            v-model="fields.is_attendance_list"
          />
    
          <!-- <div class="flex items-center gap-7 mt-3">
            <TableCheckboxCell type="div" />
           
          </div> -->
        </div>
      </CardBox>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Liste des seances" />
    <HeaderWithOptions
      :btnLabel="['Créer']"
      :icons="['plus-circle', 'info']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createTournois"
    />

    <div>
      <CardBox>
        <!-- <CardBoxHeader title="Vos Séances" btnlabel="teste" /> -->

        <EmptyContain />
      </CardBox>
    </div>
  </div>
</template>

<style></style>
