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
import TableSampleCotisation from "@/components/TableSampleCotisation.vue";

import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
// import PlanetChart from "@/components/PlanetChart.vue";

const store = useStore();

const breadcrumbItems = reactive([
  {
    title: "Cotisations",
    link: "finance.cotisations",
  },
]);
const fields = reactive({
  name: "",
  start_date: "",
  end_date: "",
  amount: "100",
  membre_code: "",
  public_ref: "",
  type: "",
  is_auto_sanction: false,
  amount_sanction: "",
  motif_sanction: "",
});

const typeCotisation = reactive([
  {
    id: 1,
    name: "Volontaire",
  },
  {
    id: 2,
    name: "Fixe",
  },
]);

const isCreateCotisationModalActive = ref(false);

const searchTournois = (event) => {
  console.log("datahdks++", event);
};
const createTournois = () => {
  isCreateCotisationModalActive.value = true;
};
const submitProfile = () => {
  console.log("data", fields);
  isCreateCotisationModalActive.value = true;
};

const membresList = computed(() => store.getters["membres/membresList"]);
const compteList = computed(() => store.getters["comptes/comptes"]);
</script>

<template>
  <div>
    <CardBoxModal
      v-model="isCreateCotisationModalActive"
      hasCostomWith
      width="xl:w-7/12"
      hasCancel
      title="✍️ Créer une cotisation"
      buttonLabel="Enregistrer"
      @confirm="submitProfile"
    >
      <CardBox hasComponentLayout is-form>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 mb-5">
          <FormField label="Nom" help="Required">
            <FormControl
              icon="edit-3"
              v-model="fields.name"
              name="name"
              placeholder="Entrer le Nom"
              required
            />
          </FormField>

          <FormField label="Date de fin" help="required">
            <FormDatePikerControl
              @getDate="fields.end_date = $event"
              showHour
              placeholder="Date de début"
            />
          </FormField>

          <FormField label="Type" help="Required">
            <FormControl
              v-model="fields.type"
              :options="typeCotisation"
              icon="user"
              placeholder="Choisir le type"
            />
          </FormField>
          <FormField label="Montant" help="Required" v-if="fields.type.id == 2">
            <FormControl
              icon="edit-3"
              v-model="fields.amount"
              name="location"
              placeholder="Entrer le Montant"
              required
            />
          </FormField>
          <FormField label="Compte" help="Required">
            <FormControl
              v-model="fields.public_ref"
              :options="compteList"
              icon="user"
              placeholder="Choisir le membre"
            />
          </FormField>
          <FormField label="Membre Recepeteur" help="Required">
            <FormControl
              v-model="fields.membre_code"
              :options="membresList"
              icon="user"
              placeholder="Choisir le membre"
            />
          </FormField>

          <!-- <div class="flex items-center gap-7 mt-3">
            <TableCheckboxCell type="div" />
           
          </div> -->
        </div>
        <CheckBoxWithLabel
          id="presence"
          label="Générer une Une sanction pour ceux qui n'aurrons pas cotisé?"
          v-model="fields.is_auto_sanction"
        />
        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-if="fields.is_auto_sanction"
            class="bg-gray-200 rounded-lg p-3 mt-5"
          >
            <h3 class="flex items-center gap-3 text-sm text-gray-500">
              <vue-feather class="h-4" type="alert-circle"></vue-feather
              ><span>
                Cette sanction sera appliquée a tout ceux qui n'ont pas
                participer à la fin de cotisation</span
              >
            </h3>
            <div class="grid grid-cols-2 gap-x-6 gap-y-3 mt-5">
              <FormField label="Montant" help="Required">
                <FormControl
                  icon="edit-3"
                  v-model="fields.amount_sanction"
                  name="location"
                  placeholder="Entrer le Nom"
                  required
                />
              </FormField>
              <FormField label="Motifs" help="Required">
                <FormControl
                  icon="edit-3"
                  v-model="fields.motif_sanction"
                  name="location"
                  placeholder="Entrer le Nom"
                  required
                />
              </FormField>
            </div>
          </div>
        </transition>
      </CardBox>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" title="Liste des cotisations" />
    <HeaderWithOptions
      :btnLabel="['Créer']"
      :icons="['plus-circle', 'info']"
      hasOneBtn
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createTournois"
    />

    <div>
      <!-- <CardBoxHeader title="Vos Séances" btnlabel="teste" /> -->
      <!-- <CardBox>

        <EmptyContain />
      </CardBox> -->

      <CardBox class="mb-6" has-table>
        <TableSampleCotisation />
      </CardBox>
    </div>
  </div>
</template>

<style></style>
