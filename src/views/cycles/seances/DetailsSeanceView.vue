<template>
  <div class="container min-h-screen">
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
                    :to="{ name: 'cyles.seances' }"
                    class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                  >
                    Séances
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
                    >Détaille de la seances</span
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
            v-if="currentSeance?.status"
            @click="closeSeance(currentSeance.seance_code)"
            class="flex items-center gap-2 text-sm bg-red-200 text-red-500 font-[500] shadow-sm hover:scale-x-[1.1] transition-all duration-100 ease-linear p-3 rounded-lg"
          >
            <vue-feather class="h-5" type="x-circle"></vue-feather>
            <div>Clôturer</div>
          </button>
        </div>
      </div>
    </div>

    <div class="mb-10">
      <div class="flex flex-col s901:flex-row gap-10 mb-10">
        <!-- Right Content -->
        <div
          class="w-full s901:w-2/3 flex flex-wrap gap-5 old-desktop:gap-5 justify-between flex-col h-fit"
        >
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full p-6"
          >
            <div>
              <h3 class="text-lg font-[700] mb-3">Informations générale</h3>
              <div>
                <div
                  v-if="currentSeance?.status"
                  class="absolute top-6 right-6 bg-green-500 text-green-500 bg-opacity-20 rounded-lg h-[70px] w-[100px] text-xl flex justify-center items-center"
                >
                  Encour
                </div>
                <div
                  v-else
                  class="absolute top-6 right-6 bg-red-500 text-red-500 bg-opacity-20 rounded-lg h-[70px] w-[100px] text-xl flex justify-center items-center"
                >
                  Terminé
                </div>
              </div>
            </div>
            <div class="my-10">
           

              <!-- <div
                class="flex flex-wrap justify-between gap-5 s901:gap-0 items-center py-3"
              >
                <div class="flex gap-3 items-center">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="star"
                    ></vue-feather>
                  </div>
                  <div class="">
                    <h6 class="text-gray-400 font-semibold text-sm">Code:</h6>
                    <div class="text-sm font-bold">
                      {{ currentSeance?.matricule }}
                    </div>
                  </div>
                </div>
                <div class="flex gap-3 items-center">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="user"
                    ></vue-feather>
                  </div>
                  <div class="">
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Membre récepteur:
                    </h6>
                    <div class="text-lg font-bold">
                      {{ currentSeance?.membre?.first_name }}
                    </div>
                  </div>
                </div>
                <div class="flex gap-3 items-center">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="clock"
                    ></vue-feather>
                  </div>
                  <div class="">
                    <h6 class="text-gray-400 font-semibold text-sm">Date:</h6>
                    <div class="text-lg font-bold">
                      {{ formateDate(currentSeance?.date_seance) }}
                    </div>
                  </div>
                </div>
                <div class="flex gap-3 items-center">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="map-pin"
                    ></vue-feather>
                  </div>
                  <div class="">
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Localisation:
                    </h6>
                    <div class="text-lg font-bold">
                      {{ currentSeance?.localisation }}
                    </div>
                  </div>
                </div>
              </div> -->
              

              <div
                class="flex w-full justify-between items-center  mb-5 border rounded-lg py-3 mt-16"
              >
             
                <div class="flex flex-col gap-3 w-fit mx-auto items-center text-sm">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="star"
                    ></vue-feather>
                  </div>
                  <div class="flex flex-col items-center">
                    <h6 class="text-gray-400 font-semibold text-sm">Code</h6>
                    <div class="text-sm font-bold">
                      {{ currentSeance?.matricule }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3 w-fit mx-auto items-center text-sm">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="user"
                    ></vue-feather>
                  </div>
                  <div class="flex flex-col items-center">
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Membre récepteur
                    </h6>
                    <div class="text-sm font-bold">
                      {{ currentSeance?.membre?.first_name }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3 w-fit mx-auto items-center text-sm">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="clock"
                    ></vue-feather>
                  </div>
                  <div class="flex flex-col items-center">
                    <h6 class="text-gray-400 font-semibold text-sm">Date</h6>
                    <div class="text-sm font-bold">
                      {{ formateDate(currentSeance?.date_seance) }}
                    </div>
                  </div>
                </div>
                <div class="flex flex-col gap-3 w-fit mx-auto items-center text-sm">
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="map-pin"
                    ></vue-feather>
                  </div>
                  <div class="flex flex-col items-center">
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Localisation
                    </h6>
                    <div class="text-sm font-bold">
                      {{ currentSeance?.localisation }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center gap-8 mt-6">
              <div
                v-for="(item, index) in datas"
                :key="index"
                class="flex flex-col justify-center items-center shadow-md border-b-2 border-primary rounded-lg p-1"
              >
                <vue-feather class="h-5" :type="item.icon"></vue-feather>
                <div class="">
                  <div class="text-2xl font-semibold text-center">
                    {{ item.value }}
                  </div>
                  <div class="text-sm font-medium text-center">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full s901:w-1/3 sticky top-[10%]">
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape border-t-4 border-secondary bg-white w-full p-6"
          >
            <div class="">
              <h3 class="text-lg font-[700] mb-3">Action sur la seance</h3>
            </div>
            <div class="">
              <button
                @click="createCotisation()"
                class="flex items-center creatwbtn gap-2 text-sm text-white font-[500] shadow-sm hover:scale-x-[1.05] transition-all duration-100 ease-linear mt-6 p-3 rounded-lg"
              >
                <vue-feather class="h-5" type="plus-circle"></vue-feather>
                <div>Creér une cotisation</div>
              </button>
              <button
                @click="createCotisation()"
                class="flex items-center bg-yellow-500  gap-2 text-sm text-white font-[500] shadow-sm hover:scale-x-[1.05] transition-all duration-100 ease-linear mt-6 p-3 rounded-lg"
              >
                <vue-feather class="h-5" type="plus-circle"></vue-feather>
                <div>Creér une sanction</div>
              </button>

              <button
               v-if="currentSeance.is_attendance_list"
                @click="attendanceList()"
                class="flex items-center creatwbtn  gap-2 text-sm text-white font-[500] shadow-sm hover:scale-x-[1.05] transition-all duration-100 ease-linear mt-6 p-3 rounded-lg"
              >
                <vue-feather class="h-5" type="eye"></vue-feather>
                <div>Liste de présence</div>
              </button>
              <button
               v-else
                @click="attendanceList()"
                class="flex items-center creatwbtn  gap-2 text-sm text-white font-[500] shadow-sm hover:scale-x-[1.05] transition-all duration-100 ease-linear mt-6 p-3 rounded-lg"
              >
                <vue-feather class="h-5" type="plus-circle"></vue-feather>
                <div>Créer une liste de péesence</div>
              </button>
            </div>
            <!-- <div
              class="absolute top-6 right-6 bg-green-500 text-green-500 bg-opacity-20 rounded-lg h-[70px] w-[100px] text-xl flex justify-center items-center"
            >
              JJ- 320
            </div> -->
          </div>
        </div>
      </div>
      <div
        class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full h-auto p-6"
      >
        <h3 class="text-lg font-[700] mb-3">Infos supplementaires</h3>
        <div>
          <h3 class="text-lg font-[500] mb-3 border-b">Cotisations</h3>
          <template v-if="currentSeance?.cotisation?.length">
            <div
              v-for="(item, index) in currentSeance?.cotisation || []"
              :key="index"
              class="flex flex-wrap gap-3 justify-between items-center py-3 border-b"
              @click="showDetails(item)"
            >
              <div class="flex gap-3 items-center">
                <div
                  class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                >
                  <vue-feather
                    class="text-secondary h-6"
                    type="star"
                  ></vue-feather>
                </div>
                <div class="min-w-[70%]">
                  <h6 class="text-gray-400 font-semibold text-sm">Code:</h6>
                  {{ item.cotisation_code }}
                </div>
              </div>
              <div class="flex gap-3 items-center">
                <div class="min-w-[70%]">
                  <h6 class="text-gray-400 font-semibold text-sm">
                    Nom de la cotisation:
                  </h6>
                  {{ item.name }}
                </div>
              </div>

              <div>
                <h6 class="text-gray-400 font-semibold text-sm">Date:</h6>
                {{ formateDate(item.start_date) }}
              </div>
              <div>
                <h6 class="text-gray-400 font-semibold text-sm">Montant:</h6>
                {{ item.amount }}
              </div>
              <!-- <div>
                <h6 class="text-gray-400 font-semibold text-sm">Membre:</h6>
                {{ item.membre.first_name }}
              </div> -->
              <div>
                <h6 class="text-gray-400 font-semibold text-sm">Action:</h6>
                <vue-feather type="trash-2" class="text-red-500"></vue-feather>
              </div>
            </div>
          </template>

          <div v-else class="flex flex-col justify-center items-center">
            <div
              class="flex justify-center items-center text-gray-400 text-lg font-semibold gap-2 mt-5"
            >
              <vue-feather type="search"></vue-feather>
              <div>Aucune cotisation</div>
            </div>

            <div class="">
              <button
                @click="createCotisation()"
                class="flex items-center creatwbtn gap-2 text-sm text-white font-[500] shadow-sm hover:scale-x-[1.05] transition-all duration-100 ease-linear mt-6 p-3 rounded-lg"
              >
                <vue-feather class="h-5" type="plus-circle"></vue-feather>
                <div>Creér une cotisation</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PlanetChart from '@/components/PlanetChart.vue'
import AssociationService from "@/services/AssociationService";

export default {
  data() {
    return {
      loading: false,
      currentSeance: {},
      datas: [
        {
          id: 1,
          name: "Sanctions",
          value: 2,
          icon: "slash",
        },
        {
          id: 2,
          name: "Transactions",
          value: 60,
          icon: "bar-chart-2",
        },
        {
          id: 3,
          name: "Total cotisation",
          value: 2,
          icon: "arrow-up",
        },
        {
          id: 4,
          name: "Total Dépots",
          value: 50,
          icon: "arrow-down",
        },
      ],
    };
  },

  async mounted() {
   await this.getCurrentSeance();
  },

  computed: {
    // wacth the currentSeance.status and return the right color
    statusSeance() {
      if (this.currentSeance.status) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    closeSeance(code) {
      AssociationService.closeSeance(code)
        .then(async(response) => {
          console.log("response", response);
          if (!response.data.error) {
            // this.currentSeance = response.data.data;
           await this.getCurrentSeance();
            this.$snackbar.add({
              text: "Effectué succès",
              type: "success",
            });
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text: "Erreur lors de la clôture",
            type: "error",
          });
          console.log("error", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showDetails(item) {
      // console.log(item);
      this.$router.push({
        name: "finance.cotisations-details",
        params: { code: item.cotisation_code },
      });
    },
    createCotisation() {
      if(!this.currentSeance.status){
        this.$snackbar.add({
            text: "Vous ne pouvez pas créer une cotisation pour une séance clôturée",
            type: "error",
          });
          return;
      }
      this.$router.push({
        name: "cyles.seances-new-cotisation",
        params: { code: this.currentSeance.seance_code },
      });
    },

    attendanceList() {
      this.$router.push({
        name: "cycles.attendance",
        params: { code: this.currentSeance.seance_code },
      });
    },

    formateDate(date) {
      const newdate = new Date(date);
      const readableDate = newdate.toLocaleString();
      return readableDate.split(" ")[0];
    },

    async getCurrentSeance() {
      await this.$store
        .dispatch("association/getSingleSeance", this.$route.params.code)
        .then((response) => {
          console.log("response", response);
          if (!response.data.error) {
            this.currentSeance = response.data.data;
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text: "Error" + error,
            type: "error",
          });

          console.log("error", error);
        });
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
.status {
  font-size: 30px;
  margin: 2px 2px 0 0;
  display: inline-block;
  vertical-align: middle;
  line-height: 10px;
}
.text-success {
  color: #10c469;
}
.text-danger {
  color: #ff5b5b;
}
</style>
