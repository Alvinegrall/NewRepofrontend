<template>
  <div id="createCotisation">
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
                      :to="{ name: 'finance.cotisations' }"
                      class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                    >
                      Cotisation
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
                      >
                    </path>
                    </svg>
                    <span
                      href="#"
                      class="ml-1 text-lg font-semibold text-gray-900 hover:text-gray-900 md:ml-2"
                      >Nouvelle cotisation</span
                    >
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div class="flex items-center gap-5">
            <router-link
              :to="{ name: 'finance.cotisations' }"
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
                    name="Nom"
                    :modelvalue="fields.name"
                    required="true"
                    @update:modelvalue="fields.name = $event"
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
                  for="des-info-date-input"
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <div class="flex gap-0.5">
                    <span class="">Date de fin</span
                    ><span class="text-red-500">*</span>
                  </div>
                  <div
                    class="text-darkblue flex shrink-0 w-full rounded-lg main-transition-colors"
                  >
                    <FlatPickr
                      id="des-info-date-input"
                      v-model="fields.end_date"
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
                    <span class="w-full">Montant de la cotisation</span>
                  </div>
                  <div class="text-darkblue flex shrink-0 w-full rounded-lg">
                    <select
                      name="type"
                      id="type"
                      v-model="fields.type"
                      class="basis-full min-w-0 py-2.5 px-4 focus:border-blue border rounded-l-lg rounded-r-lg bg-white"
                    >
                      <option value="" disabled selected>
                        Choisir le type
                      </option>
                      <option value="0" selected>Volontaire</option>
                      <option value="1">Fixe</option>
                    </select>
                  </div>
                </label>
                <label
                  v-if="fields.type == '1'"
                  for=""
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <div class="flex gap-0.5 pb-1">
                    <span class="">Montant</span
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
                    name="Bénéficiaire"
                    :items="membresList"
                    :modelvalue="fields.membre_code"
                    @update:modelvalue="fields.membre_code = $event"
                  />
                </label>

                <label for="" class="w-full sm:basis-1/3">
                  <BaseDynamicListItem
                    name="Choisir le compte"
                    :items="comptes"
                    :modelvalue="fields.public_ref"
                    @update:modelvalue="fields.public_ref = $event"
                  />
                </label>

                <!-- <label
                  for=""
                  class="text-sm font-medium flex items-center gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <input
                    class="basis-full min-w-0 py-2.5 px-4 h-4 focus:border-blue focus:outline-none placeholder:text-gray-300/70 border-gray/30 disabled:bg-gray-200/40 border rounded-l-lg rounded-r-lg"
                    type="checkbox"
                    spellcheck="false"
                  />
                  <span class=""> I accept the terms and use</span>
                </label> -->

                <label
                  class="checkbox-container text-sm font-medium gap-1 w-full sm:basis-1/3 lg:pl-5 ml-5 h-fit"
                  >Générer une sanction automatique a la fin de cette cotisation
                  ?
                  <input type="checkbox" v-model="fields.is_auto_sanction" />
                  <span class="checkmark"></span>
                </label>
              </div>

              <div
                v-if="fields.is_auto_sanction"
                class="lg:col-span-2 rounded-lg bg-gray-200 flex flex-col gap-5 p-5 mb-10"
              >
                <h3 class="flex items-center gap-3 text-sm text-gray-500">
                  <vue-feather type="alert-circle"></vue-feather
                  ><span>
                    Cette sanction sera appliquée a tout ceux qui n'ont pas
                    participer à la fin de cotisation</span
                  >
                </h3>
                <div
                  class="w-full flex flex-wrap py-5 flex-col lg:flex-row lg:-ml-5 gap-y-5 lg:w-[calc(100%+20px)]"
                >
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
                        v-model="fields.amount_sanction"
                        spellcheck="false"
                      />
                    </div>
                  </label>
                  <label
                    for=""
                    class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                  >
                    <BaseInput1
                      name="Motif de la sanction"
                      :modelvalue="fields.motif_sanction"
                      required="true"
                      @update:modelvalue="fields.motif_sanction = $event"
                    />
                  </label>
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
      autoSanction: "",

      reciever: {},
      fields: {
        name: "",
        start_date: "",
        end_date: "",
        amount: "",
        membre_code: "",
        public_ref: "",
        type: "",
        is_auto_sanction: false,
        amount_sanction: "",
        motif_sanction: "",
      },
      errors: [],
      imgDataUrl: "",
    };
  },
  computed: {
    // ...mapGetters("products", ["categories"]),
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
      if (this.fields.type == "0") {
        this.fields.amount = 100;
      }

      if (this.errors.length) {
        this.errors = [];
      }

      if (this.fields.name === "") {
        this.errors.push("Le reference est obligatoire");
      }
      if (this.fields.amount === "") {
        this.errors.push("Le montant est obligatoire");
      }
      if (this.fields.type === "") {
        this.errors.push("Le type est obligatoire");
      }

      if (this.fields.start_date === "") {
        this.errors.push("La date de début est obligatoire");
      }
      if (this.fields.is_auto_sanction) {
        if (this.fields.motif_sanction === "") {
          this.errors.push("Ajouter un motif pour la sanction");
        }
        if (this.fields.amount_sanction === "") {
          this.errors.push("Ajouter un montant de la sanction");
        }
      }
      if (this.fields.end_date === "") {
        this.errors.push("La date de fin est obligatoire");
      }

      if (new Date(this.fields.end_date).getTime() < new Date(this.fields.start_date).getTime()) {
        this.errors.push(
          "La date de fin doit être supérieur à la date de début"
        );
      }

      if (this.fields.public_ref === "") {
        this.errors.push("Choisir le compte");
      }
      
      if (this.fields.membre_code === "") {
        this.errors.push("Choisir un membre");
      }

      if (this.errors.length > 0) {
        return;
      }

      // const data = {
      //   name: this.fields.name,
      //   start_date: this.changeDateFormat(this.fields.start_date),
      //   end_date: this.changeDateFormat(this.fields.end_date),
      //   amount: this.fields.amount,
      //   membre_code: this.fields.membre_code,
      //   public_ref: this.fields.public_ref,
      //   type: this.fields.type,
      // };
      
      this.fields.start_date = this.changeDateFormat(this.fields.start_date);
      this.fields.end_date = this.changeDateFormat(this.fields.end_date);

      // this.fields.is_auto_sanction ? this.fields.is_auto_sanction = "1" : this.fields.is_auto_sanction = "0";

      // console.log("fields", this.fields);
      // console.log("end_date",this.fields.end_date);
      // console.log("sartd _ date",this.fields.start_date);

      await this.$store
        .dispatch("cotisations/createCotisation", this.fields)
        .then(async (response) => {
          console.log("response add ", response);
          if (!response.data.error) {
            await this.$store.dispatch("cotisations/getAllCotisations");
            this.$snackbar.add({
              text: "Cotisation crée avec succès",
              type: "success",
            });
            this.$router.push({
              name: "finance.cotisations",
            });
            this.fields = {
              name: "",
              start_date: "",
              end_date: "",
              amount: "",
              membre_code: "",
              public_ref: "",
              type: "",
              is_auto_sanction: false,
              amount_sanction: "",
              motif_sanction: "",
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

.checkbox-container {
  display: inline-block;
  position: relative;
  padding-left: 30px; /* Adjust this value to control the size of the checkbox */
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
}

/* Hide the default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Style the custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px; /* Adjust this value to control the size of the checkbox */
  width: 20px; /* Adjust this value to control the size of the checkbox */
  /* background-color: #ccc; */
  border: 2px solid #ccc;
}

/* Style the checked custom checkbox */
.checkbox-container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Style the checkmark inside the custom checkbox */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
