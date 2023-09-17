<template>
  <div >
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
                      :to="{ name: 'cycles.tournois' }"
                      class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                    >
                      Tournois
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
                      >Nouveau tournois</span
                    >
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <button
            @click="handleSubmit"
            class="flex items-center gap-2 text-sm creatwbtn  p-3 rounded-lg text-white"
          >
            <vue-feather class="h-5" type="plus-circle"></vue-feather>
            <div>Enregistrer</div>
          </button>
        </div>
        <section>
          <div
            class="lg:col-span-2 rounded-lg bg-white flex flex-col gap-5 p-5 mb-10"
          >
            <form
              id="create-form"
              class="theme-form theme-form-2 mega-form"
              @submit.prevent="handleSubmit($target)"
            >
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
                  for="none"
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <div class="flex gap-0.5">
                    <span class="">Référence</span>
                  </div>
                  <div
                    class="text-darkblue flex shrink-0 w-full rounded-lg main-transition-colors"
                  >
                    <input
                      class="basis-full min-w-0 py-2.5 px-4 focus:border-blue focus:outline-none placeholder:text-gray-300/70 border-gray/30 disabled:bg-gray-200/40 border rounded-l-lg rounded-r-lg"
                      type="text"
                      placeholder="Référence"
                      spellcheck="false"
                      v-model="fields.reference"
                    />
                  </div>
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
                      v-model="fields.date_debut"
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
                      v-model="fields.date_fin"
                      :config="dateTimeConfig"
                      class="basis-full min-w-0 py-2.5 px-4 focus:border-blue focus:outline-none bg-white placeholder:text-gray-300/70 border-gray/30 disabled:bg-gray-200/40 border rounded-l-lg rounded-r-lg"
                    ></FlatPickr>
                  </div>
                </label>
              </div>
              <div
                class="flex items-center justify-end p-4 border-t border-gray-200 rounded-b-md mt-10 text-white"
              >
                <button
                type="submit"
                  class="flex items-center gap-2 text-sm creatwbtn p-3 rounded-lg"
                >
                  <vue-feather class="h-5" type="plus-circle"></vue-feather>
                  <div>Enregistrer</div>
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import BaseAutocompleteInput from "@/components/common/BaseAutocompleteInput.vue";
import ProductAutocompleteInput from "@/components/products/forms/ProductAutocompleteInput.vue";
// import ProductsService from "@/services/ProductsService";
import store from "@/store";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";


export default {
  components: { ProductAutocompleteInput, FlatPickr: flatPickr },
  data() {
    return {
      show_picture: false,
      dateTimeConfig: {
        dateFormat: "d/m/Y",
        minDate: "today",
      },
      // dateTimeConfigEndDate: {
      //    dateFormat: "d/m/Y",
      //   minDate: "today" + this.fields.date_debut, 
      // },
      fields: {
        reference: "",
        date_debut: "",
        date_fin: "",
        partner_urlcode: "",
      },
      errors: [],
    };
  },
  // computed: {
  //   ...mapGetters("products", ["categories"]),
  // },
  methods: {
    // handleBeforeUploadPicture(file) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = (e) => {
    //     this.cropSuccessPicture(e.target.result);
    //     this.show_picture = false;
    //   };

    //   return true;
    // },
    // cropSuccessPicture(imgDataUrl) {
    //   this.imgDataUrl = imgDataUrl;
    //   this.fields.logo_string = imgDataUrl.split("base64,")[1];
    // },
    async handleSubmit() {
      // await store.dispatch("setGlobalLoading", true);
      const urlcode = store.getters["partners/urlcode"];

      if (this.errors.length) {
        this.errors = [];
      }

      if (this.fields.reference === "") {
        this.errors.push("Le reference est obligatoire");
      } 

      if (this.fields.date_debut === "") {
        this.errors.push("La date de début est obligatoire");
      } 
      if (this.fields.date_fin === "") {
        this.errors.push("La date de fin est obligatoire");
      }

      if(this.fields.date_fin < this.fields.date_debut){
        this.errors.push("La date de fin doit être supérieur à la date de début");
      }

      if (this.errors.length > 0) {
        return;
      }

      this.fields.partner_urlcode = urlcode;

      console.log("fields add ", this.fields);
      this.fields.date_debut = this.changeDateFormat(this.fields.date_debut);
      this.fields.date_fin = this.changeDateFormat(this.fields.date_fin);

      await this.$store
        .dispatch("association/saveTournois", this.fields)
        .then(async(response) => {
          console.log("response add ", response);
          if (!response.data.error) {
            await this.$store.dispatch("association/getAllTournois");
            this.$snackbar.add({
              text: "Le tournois a été crée avec succès",
              type: "success",
            });
            this.$router.push({
              name: "cycles.tournois",
            });
            this.fields = {
              reference: "",
              date_debut: "",
              date_fin: "",
            };
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text:  error.response.data.message,
            type: "error",
          });
          console.log("error add ", error);
        });


      // setTimeout(() => {
      //   document.getElementById("close-modal").click();
      // }, 500);
    },
    changeDateFormat(date){
      // transform date from 12/04/2023 to 2023-04-12
      const dateArry = date.split("/")
      return dateArry[2].split(" ")[0]+ "-" +dateArry[1] + "-" + dateArry[0];
    }
    // handleChange(e) {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     this.imgDataUrl = reader.result;
    //     this.fields.logo_string = reader.result.split("base64,")[1];
    //   };
    //   reader.readAsDataURL(file);
    // },
  },
};
</script>

<style scoped>


.creatwbtn {
  background-color: #00a0ff !important;
}
.form-control {
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  background-color: white !important;
}
</style>
