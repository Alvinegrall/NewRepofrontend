<template>
    <div
      id="cotisationInfos"
      class="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      tabindex="-1"
      aria-labelledby="cotisationInfos"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <div class="flex items-center">
              <h5
                id="defaultMembreLabel"
                class="modal-title text-xl font-semibold"
              >
                Infos sur les cotisations de :
                <span class="text-secondary">{{ info_cotisation.first_name }}</span>
              </h5>
              <button
                type="button"
                class="btn-close box-content w-8 h-8 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <vue-feather type="x"></vue-feather>
              </button>
            </div>
  
            <div class="modal-body">
              <h5
                id="defaultMembreLabel"
                class="modal-title text-sm mb-3 font-semibold"
              >
                Statu des cotisations
              </h5>
              <div class="flex w-full justify-between mb-5 border rounded-lg">
                <div
                  class="text-gray-500 text-sm border-r text-center p-1 rounded-tl-lg rounded-bl-lg w-full"
                >
                  <div>Cotisation</div>
                  <div class="font-semibold">{{ info_cotisation?.source_amount }} XAF</div>
                </div>
                <div
                  class="text-green-500 p-1 text-sm border-r text-center w-full"
                >
                  <div>Versé</div>
                  <div class="font-semibold">{{ info_cotisation?.balance_after }} XAF</div>
                </div>
                <div
                  class="text-red-500 p-1 text-sm text-center rounded-tr-lg rounded-br-lg w-full"
                >
                  <div>Restant</div>
                  <div class="font-semibold">
                    {{ info_cotisation?.balance_remaining }} XAF
                  </div>
                </div>
              </div>
              <h5
                id="defaultMembreLabel"
                class="modal-title text-sm mb-3 font-semibold"
              >
                Détails
              </h5>
  
              <!-- <table class="w-full">
                <tr v-for="(item, index) in 3" :key="index" class="py-10">
                  <td>
                    <div
                      class="p-1 bg-green-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
                    >
                      <vue-feather
                        class="text-green-500"
                        type="arrow-down-left"
                      ></vue-feather>
                    </div>
                  </td>
                  <td>5000 XAF</td>
                  <td>12/01/2023 11:00</td>
                </tr>
              </table> -->
              <div
                v-for="(item, index) in info_cotisation?.transanctions"
                :key="index"
                class="flex justify-between text-sm items-center py-1 border-t"
              >
                <div class="flex items-center gap-2">
                  <div
                    class="p-1 bg-green-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-green-500"
                      type="arrow-down-left"
                    ></vue-feather>
                  </div>
  
                  <div>
                    <h6 class="text-gray-400 font-semibold text-sm">Montant:</h6>
                    {{ item.amount }} XAF
                  </div>
                </div>
                <div>
                  <h6 class="text-gray-400 font-semibold text-sm">Date:</h6>
                  {{ item.created_at }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import flatPickr from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import BaseButton from "/@/components/common/BaseButton.vue";
  import ListItemSkeleton from "/@/components/common/ListItemSkeleton.vue";
  import ProductCreate from "/@/views/products/manage/ProductCreate.vue";
  import BaseInputSelection from "/@/components/common/BaseInputSelection.vue";
  import BaseInput1 from "/@/components/common/BaseInput1.vue";
  import BeneficiaireCreate from "/@/components/beneficiaires/BeneficiaireCreate.vue";
  import BeneficiairaCreate1 from "/@/components/beneficiaires/BeneficiairaCreate1.vue";
  
  export default {
    components: {
      ProductCreate,
  
      BaseButton,
      ListItemSkeleton,
      BaseInputSelection,
      BaseInput1,
      BeneficiaireCreate,
      BeneficiairaCreate1,
      FlatPickr: flatPickr,
    },
    // props: {
    //   info_cotisation: {
    //     type: Object,
    //     default: () => {},
    //   },
    // },
    data() {
      return {
        dateTimeConfig: {
          // enableTime: true,
          dateFormat: "d/m/Y H:i",
          minDate: "today",
        },
        fields: {
          amount: "",
        },
      };
    },
    computed: {
      ...mapGetters("cotisations",["info_cotisation"]),
    },
  
    methods: {
      handleSubmit() {
        //   console.log(this.fields.amount);
        if (this.fields.amount > 100) {
          document.getElementById("close-modal").click();
          this.$emit("submit", this.fields.amount);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  .page_cart {
    background: #ffffff;
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.1));
    border-radius: 5px;
    box-shadow: 0 10px 20px #0000001a;
    border-radius: 5px;
  }
  .creatwbtn {
    background-color: #00a0ff !important;
  }
  
  #the-form::before {
    position: absolute;
    content: "";
    height: 100%;
    top: -20px;
    left: -20px;
    width: 100%;
  }
  </style>
  