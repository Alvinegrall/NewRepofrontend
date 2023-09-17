<template>
  <div id="createSanction">
    <!-- new tab -->

    <div class="min-h-screen container">
      <div class="">
        <div class="mb-3 flex justify-between items-center flex-wrap gap-4">
          <div class="space-y-1">
            <nav class="flex" aria-label="Breadcrumb">
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <router-link
                    :to="{ name: 'common.home' }"
                    class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                  >
                    {{ $t("common.breadcrumb.dashboard") }}
                  </router-link>
                </li>
                <li>
                  <div class="flex items-center">
                    <svg
                      class="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <router-link
                      :to="{ name: 'finance.sanctions' }"
                      class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                    >
                      Sanction
                    </router-link>
                  </div>
                </li>

                <li>
                  <div class="flex items-center">
                    <svg
                      class="w-6 h-6 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span
                      href="#"
                      class="ml-1 text-lg font-semibold text-gray-900 hover:text-gray-900 md:ml-2"
                      >Nouvelle sanction</span
                    >
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div class="flex items-center gap-5">
            <router-link
              :to="{ name: 'finance.sanctions' }"
              class="flex items-center gap-2 text-sm bg-gray-500 p-3 text-white rounded-lg hover:scale-x-[1.1] transition-all duration-100 ease-linear"
            >
              <vue-feather class="h-5" type="arrow-left"></vue-feather>
              <div>Retour</div>
            </router-link>

            <BaseButton
              @click="handleSubmit"
              class="flex items-center gap-2 text-sm creatwbtn p-3 rounded-lg"
            >
              <vue-feather class="h-5" type="plus-circle"></vue-feather>
              <div>Enregistrer</div>
            </BaseButton>
          </div>
        </div>
        <section>
          <div
            class="lg:col-span-2 rounded-lg bg-white flex flex-col gap-5 p-5 mb-10"
          >
            <!-- first form -->

            <form id="create-form" @submit.prevent="handleSubmit($target)">
              <div v-if="errors.length > 0">
                <div
                  class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 my-3 rounded relative"
                  role="alert"
                >
                  <p class="text-red-700 text-sm mb-1 font-[500]">
                    Les erreurs suivantes se sont produites :
                  </p>
                  <ul class="list-disc pl-8">
                    <li
                      v-for="(error, index) in errors"
                      :key="index"
                      class="text-sm"
                    >
                      {{ error }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="w-full flex flex-wrap flex-col lg:flex-row lg:-ml-5 gap-y-5 lg:w-[calc(100%+20px)]"
              >
                <label
                  for=""
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <BaseInput1
                    name="Motif"
                    :modelvalue="fields.motif"
                    required="true"
                    @update:modelvalue="fields.motif = $event"
                  />
                </label>
                <label
                  for="des-info-date-input"
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <div class="flex gap-0.5">
                    <span class="">Date de début</span
                    ><span class="text-red-500">*</span>
                  </div>
                  <div
                    class="text-darkblue flex shrink-0 w-full rounded-lg main-transition-colors"
                  >
                    <FlatPickr
                      id="des-info-date-input"
                      v-model="fields.start_date"
                      :config="dateTimeConfig"
                      class="basis-full min-w-0 py-2.5 px-4 focus:border-blue focus:outline-none bg-white placeholder:text-gray-300/70 border-gray/30 disabled:bg-gray-200/40 border rounded-l-lg rounded-r-lg"
                    ></FlatPickr>
                  </div>
                </label>
                <label
                  for=""
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <div class="flex gap-0.5 pb-1">
                    <span class="">Montant de la sanction</span
                    ><span class="text-red-500">*</span>
                  </div>
                  <div
                    class="text-darkblue flex shrink-0 w-full rounded-lg main-transition-colors"
                  >
                    <input
                      class="basis-full min-w-0 py-2.5 px-4 focus:border-blue focus:outline-none placeholder:text-gray-300/70 border-gray/30 disabled:bg-gray-200/40 border rounded-l-lg rounded-r-lg"
                      type="number"
                      required="required"
                      placeholder="montant"
                      v-model="fields.amount"
                      spellcheck="false"
                    />
                  </div>
                </label>

                <label for="" class="w-full sm:basis-1/3">
                  <BaseMemberSelection
                    name="Memebre concerné"
                    :items="membresList"
                    :modelvalue="fields.membre_code"
                    @update:modelvalue="fields.membre_code = $event"
                  />
                </label>
                <div class="h-full flex flex-col items-center justify-center mt-10 lg:pl-5">
                 
                  <div class="">
                    <input
                      type="checkbox"
                      id="music"
                      class="w-5 h-5 mr-1"
                      name="interest"
                      v-model="fields.is_payed"
                    />
                    <label for="music">Marquer comme payé</label>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-end p-4 border-t border-gray-200 rounded-b-md mt-10"
              >
                <BaseButton
                  @click="handleSubmit"
                  class="flex items-center gap-2 text-sm creatwbtn p-3 rounded-lg"
                >
                  <vue-feather class="h-5" type="plus-circle"></vue-feather>
                  <div>Enregistrer</div>
                </BaseButton>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import BaseAutocompleteInput from "@/components/common/BaseAutocompleteInput.vue";
import ProductAutocompleteInput from "@/components/products/forms/ProductAutocompleteInput.vue";
import BaseInputSelection from "@/components/common/BaseInputSelection.vue";
import BaseInput1 from "@/components/common/BaseInput1.vue";
import BaseMemberSelection from "@/components/common/BaseMemberSelection.vue";
import BaseDynamicListItem from "@/components/common/BaseDynamicListItem.vue";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import BaseButton from "@/components/common/BaseButton.vue";
import ListItemSkeleton from "@/components/common/ListItemSkeleton.vue";
import BeneficiaireCreate from "@/components/beneficiaires/BeneficiaireCreate.vue";
import BeneficiairaCreate1 from "@/components/beneficiaires/BeneficiairaCreate1.vue";

export default {
  components: {
    ProductAutocompleteInput,
    BaseInput1,
    BaseInputSelection,
    BaseMemberSelection,
    BaseButton,
    ListItemSkeleton,
    BeneficiaireCreate,
    BeneficiairaCreate1,
    FlatPickr: flatPickr,
    BaseDynamicListItem,
  },
  data() {
    return {
      dateTimeConfig: {
        enableTime: true,
        dateFormat: "d/m/Y H:i",
        minDate: "today",
      },
      selectedTarget: "",

      reciever: {},
      fields: {
        motif: "",
        start_date: "",
        amount: "",
        membre_code: "",
        is_payed: "",
        admin_id: ""

      },
      errors: [],
      imgDataUrl: "",
    };
  },
  computed: {
    // ...mapGetters("products", ["categories"]),
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("membres", ["membresList"]),
    ...mapGetters("comptes", ["comptes"]),
  },
  methods: {
    // getToday() {
    //   const today = new Date().toISOString().substr(0, 10);
    //   return today;
    // },
    setReceiver(item) {
      this.reciever = item;
    },

    async handleSubmit() {
      console.log("datass", this.fields);

      // validate forms

      if (this.errors.length) {
        this.errors = [];
      }
      if (this.fields.motif === "") {
        this.errors.push("Le Motif est obligatoire");
      }
      if (this.fields.start_date === "") {
        this.errors.push("La date est obligatoire");
      }
   
      if (this.fields.membre_code === "") {
        this.errors.push("Choisir un membre");
      }

      if (this.errors.length > 0) {
        return;
      }

      // const data = {
      //   name: this.fields.name,
      //   start_date: this.fields.start_date,
      //   end_date: this.fields.end_date,
      //   amount: this.fields.amount,
      //   membre_code: this.fields.membre_code,
      //   public_ref: this.fields.public_ref,
      //   type: this.fields.type,
      // };
      
      this.fields.start_date = this.changeDateFormat(this.fields.start_date);
      this.fields.admin_id = this.currentUser.hash_id,

      await this.$store
        .dispatch("sanctions/createSanction", this.fields)
        .then(async (response) => {
          console.log("response add ", response);
          if (!response.data.error) {
            await this.$store.dispatch("sanctions/getAllSanctions");
            this.$snackbar.add({
              text: "Sanction crée avec succès",
              type: "success",
            });
            // this.$router.push({
            //   name: "finance.cotisations",
            // });
            this.fields = {
              motif: "",
              start_date: "",
              amount: "",
              membre_code: "",
              is_payed: "",
            };
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text: "Erreur lors de la creation",
            type: "error",
          });
          console.log("error add ", error);
        });

      // console.log("this.fields", this.fields);
    },
    changeDateFormat(date) {
      // transform date from 12/04/2023 to 2023-04-12
      const dateArry = date.split("/");
      return dateArry[2].split(" ")[0] + "-" + dateArry[1] + "-" + dateArry[0] + " " + dateArry[2].split(" ")[1];
    },
  },
};
</script>

<style scoped>


.form-control {
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white !important;
}
</style>
