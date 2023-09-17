<template>
  <div>
    <!-- new tab -->

    <div class="">
      <div class="min-h-screen container">
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
                      :to="{ name: 'cyles.seances' }"
                      class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                    >
                      Seances
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
                      >Nouvelle seance</span
                    >
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div class="flex items-center gap-5">
            <router-link
              :to="{ name: 'cyles.seances' }"
              class="flex items-center gap-2 text-sm bg-gray-500 p-3 text-white rounded-lg hover:scale-x-[1.1] transition-all duration-100 ease-linear"
            >
              <vue-feather class="h-5" type="arrow-left"></vue-feather>
              <div>Retour</div>
            </router-link>
            <button
              @click.prevent="handleSubmit"
              class="flex items-center gap-2 text-sm creatwbtn p-3 rounded-lg text-white hover:scale-x-[1.1] transition-all duration-100 ease-linear"
            >
              <vue-feather class="h-5" type="plus-circle"></vue-feather>
              <div>Créer</div>
            </button>
          </div>
        </div>
        <section>
          <div
            class="lg:col-span-2 rounded-lg bg-white flex flex-col gap-5 p-5 mb-10"
          >
            <form id="create-form">
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
                      v-model="fields.date_seance"
                      :config="dateTimeConfig"
                      class="basis-full min-w-0 py-2.5 px-4 focus:border-blue focus:outline-none bg-white placeholder:text-gray-300/70 border-gray/30 disabled:bg-gray-200/40 border rounded-l-lg rounded-r-lg"
                    ></FlatPickr>
                  </div>
                </label>
                <label
                  for=""
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <BaseInput1
                    name="Localisation"
                    :modelvalue="fields.localisation"
                    required="true"
                    @update:modelvalue="fields.localisation = $event"
                  />
                </label>
                <label
                  for="des-info-date-input"
                  class="text-sm font-medium flex flex-col gap-1 w-full sm:basis-1/3 lg:pl-5"
                >
                  <BaseMemberSelection
                    name="Membre Recepeteur"
                    :items="membresList"
                    :modelvalue="fields.reciever_code"
                    @update:modelvalue="fields.reciever_code = $event"
                  />
                </label>

                <!-- <BaseDynamicListItem
                  name="Choisir le tournois"
                  :items="comptes"
                  :modelvalue="fields.public_ref"
                  @update:modelvalue="fields.public_ref = $event"
                /> -->
                <!-- <label
                  class="checkbox-container text-sm font-medium gap-1 w-full sm:basis-1/3 lg:pl-5 ml-5 h-fit"
                  >Générer une cotisation automatique pour cette seance?
                  
                  <input type="checkbox"  v-model="fields.is_auto_sanction" />
                  <span class="checkmark"></span>
                </label> -->
                <label
                  class="checkbox-container text-sm font-medium gap-1 w-full sm:basis-1/3 lg:pl-5 ml-5 h-fit"
                  >Générer une liste de présence pour cette seance?

                  <input type="checkbox" v-model="fields.is_attendance_list" />
                  <span class="checkmark"></span>
                </label>
              </div>
         
              <div
                class="flex items-center justify-end p-4 border-t border-gray-200 rounded-b-md mt-10"
              >
                <button
                  @click.prevent="handleSubmit"
                  class="flex items-center gap-2 text-sm creatwbtn p-3 rounded-lg text-white hover:scale-x-[1.1] transition-all duration-100 ease-linear"
                >
                  <vue-feather class="h-5" type="plus-circle"></vue-feather>
                  <div>Créer</div>
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
import { mapGetters } from "vuex";
// import BaseAutocompleteInput from "@/components/common/BaseAutocompleteInput.vue";
// import ProductsService from "@/services/ProductsService";
import store from "@/store";

import ProductAutocompleteInput from "@/components/products/forms/ProductAutocompleteInput.vue";
import BaseInputSelection from "@/components/common/BaseInputSelection.vue";
import BaseInput1 from "@/components/common/BaseInput1.vue";
import BaseMemberSelection from "@/components/common/BaseMemberSelection.vue";
import BaseDynamicListItem from "@/components/common/BaseDynamicListItem.vue";
import AssociationService from "@/services/AssociationService";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import BaseButton from "@/components/common/BaseButton.vue";
import ListItemSkeleton from "@/components/common/ListItemSkeleton.vue";
import BeneficiaireCreate from "@/components/beneficiaires/BeneficiaireCreate.vue";
import BeneficiairaCreate1 from "@/components/beneficiaires/BeneficiairaCreate1.vue";

export default {
  components: {
    ProductAutocompleteInput,
    FlatPickr: flatPickr,
    ProductAutocompleteInput,
    BaseInput1,
    BaseInputSelection,
    BaseMemberSelection,
    BaseButton,
    ListItemSkeleton,
    BeneficiaireCreate,
    BeneficiairaCreate1,
    BaseDynamicListItem,
  },
  data() {
    return {
      show_picture: false,
      dateTimeConfig: {
        enableTime: true,
        dateFormat: "d/m/Y H:i",
        minDate: "today",
      },
      // fields: {
      //   reference: "",
      //   date_debut: "",
      //   date_fin: "",
      //   partner_urlcode: "",
      // },
      fields: {
        date_seance: "",
        localisation: "",
        reciever_code: "",
        partner_urlcode: "",
        is_attendance_list: false,
      },
      errors: [],
    };
  },
  computed: {
    ...mapGetters("membres", ["membresList"]),
  },
  methods: {
    handleBeforeUploadPicture(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.cropSuccessPicture(e.target.result);
        this.show_picture = false;
      };

      return true;
    },
    cropSuccessPicture(imgDataUrl) {
      this.imgDataUrl = imgDataUrl;
      this.fields.logo_string = imgDataUrl.split("base64,")[1];
    },
    async handleSubmit() {
      // await store.dispatch("setGlobalLoading", true);
      const urlcode = store.getters["partners/urlcode"];

      if (this.errors.length) {
        this.errors = [];
      }
      if (this.fields.date_seance === "") {
        this.errors.push("La date de la seance est obligatoire");
      }
      if (this.fields.reciever_code === "") {
        this.errors.push("Le reference est obligatoire");
      }

      if (this.fields.localisation === "") {
        this.errors.push("La date de fin est obligatoire");
      }

      if (this.errors.length > 0) {
        return;
      }

      this.fields.partner_urlcode = urlcode;
      this.fields.date_seance = this.changeDateFormat(this.fields.date_seance);

      await AssociationService.saveSeance(this.fields)
        .then(async (response) => {
          console.log("response add ", response);
          if (!response.data.error) {
            await this.$store.dispatch("association/getAllSeances");
            this.$snackbar.add({
              text: "La seance a été crée avec succès",
              type: "success",
            });
            this.$router.push({
              name: "cyles.seances",
            });
            this.fields = {
              localisation: "",
              reciever_code: "",
              partner_urlcode: "",
              is_attendance_list: false,
            };
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text: error.response.data.message,
            type: "error",
          });
        });

      // setTimeout(() => {
      //   document.getElementById("close-modal").click();
      // }, 500);
    },
    changeDateFormat(date) {
      // transform date from 12/04/2023 to 2023-04-12
      const dateArry = date.split("/");
      return (
        dateArry[2].split(" ")[0] +
        "-" +
        dateArry[1] +
        "-" +
        dateArry[0] +
        " " +
        dateArry[2].split(" ")[1]
      );
    },
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
