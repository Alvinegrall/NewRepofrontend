<script setup>
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import FormDatePikerControl from "@/components/common/FormDatePikerControl.vue";
import FormFileCropPicker from "@/components/common/FormFileCropPicker.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import HeaderWithOptions from "@/components/common/HeaderWithOptions.vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import { reactive, ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
// import VueDatePicker from '@mathieustan/vue-datepicker';
// import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
// import PlanetChart from "@/components/PlanetChart.vue";

const router = useRouter();
const store = useStore();

const breadcrumbItems = reactive([
  {
    title: "Créer un article",
    link: "create-article",
  },
]);

onMounted(async () => {
  await store.dispatch("setContainLoading", true);
  await store.dispatch("magasins/getAllMagasins");
  await store.dispatch("articles/getAllArticles");
  await store.dispatch("articles/getAllArticles");
  await store.dispatch("setContainLoading", false);
});
const typeBeneficiary = reactive([
  { value: "child", label: "Enfant" },
  { value: "woman", label: "Femme" },
  { value: "Man", label: "Homme" },
]);

// const current_partner = store.getters["partners/current_partner"];
const fields = reactive({
  first_name: "",
  last_name: "",
  first_phone: "",
  second_phone: "",
  email: "",
  country: "",
  region: "",
  city: "",
  type: "",
  marital_status: "",
  residence: "",
  photo_profil: "",
  date_adhesion: "",
  beneficiaire: [],
});
const beneficiaire = reactive({
  first_name: "",
  last_name: "",
  first_phone: "",
  type: "",
});

const isCreateTournoisModalActive = ref(false);

const searchTournois = (event) => {
  console.log("datahdks++", event);
};
const createTournois = () => {
  isCreateTournoisModalActive.value = true;
};
const formStatusSubmit = () => {
  console.log("submit btn");
};

const goBack = () => {
  router.push({ name: "administration.membres" });
};

const fileUpload = (event) => {
  fields.photo_profil = event.url;
  // fields.photo_profil.data = event.split("base64,")[1];
  console.log("sdatas", fields.photo_profil);
};

const handleSubmit = async () => {
  fields.country = fields.country.name;
  fields.city = fields.city.name;
  fields.region = fields.region.name;
  const datas = {
    ...fields,
    partner_urlcode: current_partner.urlcode,
    beneficiary: JSON.stringify([beneficiaire]),
  };

  await store
    .dispatch("membres/createMembre", datas)
    .then(async (response) => {
      console.log("response", response);
      if (!response.data.error) {
        await store.dispatch("membres/getAllMembres");
        console.log("ok ok");
        // this.$snackbar.add({
        //   text: "Membre ajouté avec succès",
        //   type: "success",
        // });
      }
    })
    .catch((error) => {
      // this.$snackbar.add({
      //   text: "Erreur lors de l'ajout du membre",
      //   type: "error" + error,
      // });
      console.log("error", error);
    });
  console.log("datas", datas);
};

const countries = computed(() => store.getters["partners/countries"]);

const currentStates = computed(() => store.getters["partners/currentStates"]);

const currentCities = computed(() => store.getters["partners/currentCities"]);
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
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal lorem*10</p>
    </CardBoxModal>

    <HeaderBreadcrumbs :links="breadcrumbItems" />

    <!-- <HeaderWithOptions
      :btnLabel="['Enregistrer', 'Retour']"
      :icons="['plus-circle', 'arrow-left']"
      @makeResearch="searchTournois($event.target.value)"
      @btnClick="createTournois"
    /> -->

    <div class="flex justify-end mb-5">
      <BaseButtons>
        <BaseButton
          color="success"
          label="Enregistrer"
          icon="save"
          @click="handleSubmit()"
        />
        <BaseButton
          color="success"
          label="Retour"
          outline
          icon="arrow-left"
          @click="goBack()"
        />
      </BaseButtons>
    </div>

    <div class="flex flex-col gap-6 mb-10">
      <CardBox>
        <CardBoxHeader title="Informations sur l'article" btnlabel="See all" />
        <!-- <CircleProgress /> -->
        <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
          <!-- <FormField label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField> -->

          <FormField label="Nom" help="Nom du membre">
            <FormControl
              v-model="fields.first_name"
              icon="edit-3"
              placeholder="Nom"
            />
          </FormField>
          <FormField label="Prénom">
            <FormControl
              v-model="fields.last_name"
              icon="edit-3"
              placeholder="Prénom"
            />
          </FormField>
          <FormField label="Téléphone" help="required">
            <FormControl
              v-model="fields.first_phone"
              icon="phone"
              placeholder="Téléphone"
            />
          </FormField>

          <FormField label="Autre téléphone" help="required">
            <FormControl
              v-model="fields.second_phone"
              icon="phone"
              placeholder="Téléphone"
            />
          </FormField>
          <FormField label="Type">
            <FormControl
              v-model="fields.type"
              :options="['Founder', 'Member']"
              icon="check-circle"
              placeholder="Type"
            />
          </FormField>

          <FormField label="Email" help="Optionel">
            <FormControl
              v-model="fields.email"
              icon="mail"
              placeholder="exemple@gmail.com"
            />
          </FormField>

          <!-- <VueDatePicker v-model="fields.date_adhesion" /> -->
          <!-- dhskhs -->

          <FormField label="Situation matrimoniale">
            <FormControl
              v-model="fields.marital_status"
              :options="['Célibataire', 'mariée', 'Divorcée', 'Veuf']"
              icon="check-circle"
              help="Your full name"
              placeholder="Situation matrimoniale"
            />
          </FormField>
          <FormField label="Lieu de résidence" help="Optionel">
            <FormControl
              v-model="fields.residence"
              icon="map-pin"
              placeholder="Lieu de résidence"
            />
          </FormField>

          <FormField label="Date d'hadésion" help="required">
            <FormDatePikerControl
              @getDate="fields.date_adhesion = $event"
              showHour
              placeholder="Date d'hadésion"
            />
          </FormField>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-3">
          <div class="flex flex-col gap-y-4">
            <FormField label="Pays">
              <FormControl
                v-model="fields.country"
                :options="countries"
                icon="check-circle"
                placeholder="pay"
                selection="Pays"
                isCountySelection
              />
            </FormField>
            <FormField label="Ville">
              <FormControl
                v-model="fields.city"
                :options="currentCities ?? []"
                icon="check-circle"
                placeholder="Ville"
                isCountySelection
              />
            </FormField>
          </div>
          <div class="flex flex-col gap-y-4">
            <FormField label="Région">
              <FormControl
                v-model="fields.region"
                :options="currentStates ?? []"
                icon="check-circle"
                placeholder="Région"
                selection="Région"
                isCountySelection
              />
            </FormField>
            <FormField label="Email" help="Optionel">
              <FormControl
                v-model="fields.email"
                icon="mail"
                placeholder="exemple@gmail.com"
              />
            </FormField>
          </div>
          <div class="">
            <div for="profile" class="mb-2 font-[500] text-[.875rem]">
              Profile
            </div>
            <FormField
              class="border-2 p-2 border-dashed rounded-lg flex justify-center"
            >
              <FormFileCropPicker
                label="Upload"
                @img-data="fileUpload($event)"
              />
            </FormField>
          </div>
        </div>
      </CardBox>
    </div>

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
