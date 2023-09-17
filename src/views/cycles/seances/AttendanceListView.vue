<template>
  <div>
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
                      :to="{ name: 'cyles.seances' }"
                      class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                    >
                      Séance
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

                    <router-link
                      :to="{
                        name: 'cycles.single-seance',
                        params: { code: this.$route.params.code },
                      }"
                      class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                    >
                      Détails Séance
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
                      >Liste de présence</span
                    >
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div class="flex items-center gap-5">
            <router-link
              :to="{
                name: 'cycles.single-seance',
                params: { code: this.$route.params.code },
              }"
              class="flex items-center gap-2 text-sm bg-gray-500 p-3 text-white rounded-lg hover:scale-x-[1.1] transition-all duration-100 ease-linear"
            >
              <vue-feather class="h-5" type="arrow-left"></vue-feather>
              <div>Retour</div>
            </router-link>
            <BaseButton
            v-if="currentSeance?.status"
              @click="handleSubmit"
              class="flex items-center gap-2 text-sm bg-secondary p-3 rounded-lg"
            >
              <vue-feather class="h-5" type="plus-circle"></vue-feather>
              <div>Enregistrer</div>
            </BaseButton>
          </div>
        </div>
        <section>
          <div>
            <b-card no-body>
              <b-tabs pills card>
                <b-tab title="Présents" active
                  ><b-card-text>
                    <!-- start here -->
                    <template v-if="!presents.length">
                      <div
                        class="flex justify-center items-center text-gray-400 text-lg font-semibold"
                      >
                        <vue-feather type="search"></vue-feather>
                        <div>Aucun Membre</div>
                      </div>
                    </template>
                    <template v-else>
                      <CommonCheckBoxMember
                        :items="presents"
                        @selected="selectedPresent($event)"
                      />
                    </template> </b-card-text
                ></b-tab>
                <b-tab title="Absent"
                  ><b-card-text>
                    <template v-if="!abs.length">
                      <div
                        class="flex justify-center items-center text-gray-400 text-lg font-semibold"
                      >
                        <vue-feather type="search"></vue-feather>
                        <div>Aucun Membre</div>
                      </div>
                    </template>
                    <template v-else>
                      <CommonCheckBoxMember
                        :items="abs"
                        @selected="selectedAbsent($event)"
                      />
                    </template> </b-card-text
                ></b-tab>
              </b-tabs>
            </b-card>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import CommonCheckBoxMember from "@/components/common/CommonCheckBoxMember.vue";

export default {
  components: {
    CommonCheckBoxMember,
  },
  data() {
    return {
      flavours: ["Orange", "Grape", "Apple", "Lime", "Very Berry"],
      // selected: [],
      allSelected: false,
      indeterminate: false,
      membresList: [],
      abs: [],
      presents: [],
      newVal: [],
      newPresents: [],
      currentSeance:{}
    };
  },

  mounted() {
    this.getCurrentInfos();
  },

  methods: {
    // toggleAll(checked) {
    //   this.selected = checked ? this.flavours.slice() : [];
    // },
    selectedPresent(event) {
      // this.newVal = event;
    },
    selectedAbsent(event) {
      this.newVal = event;
    },

    async getCurrentInfos() {
      await this.$store
        .dispatch("association/attendanceList", this.$route.params.code)
        .then((response) => {
          if (!response.data.error) {
            this.abs = response.data.data.abs;
            this.presents = response.data.data.presents;
            this.currentSeance = response.data.data.seance;
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

    async handleSubmit() {
      if(this.newVal.length === 0) {
        this.$snackbar.add({
          text: "Veuillez sélectionner au moins un membre",
          type: "error",
        });
        return;
      }
      const datas = {
        membre_codes: this.newVal,
        seance_code: this.$route.params.code,
      };
      await this.$store
        .dispatch("association/saveAttendance", datas)
        .then(async (response) => {
          if (!response.data.error) {
            this.$snackbar.add({
              text: response.data.message,
              type: "success",
            });
            await this.getCurrentInfos();
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text: "Error" + error,
            type: "error",
          });
        });
    },
  },
  // watch: {
  //   selected(newValue, oldValue) {
  //     // Handle changes in individual flavour checkboxes
  //     if (newValue.length === 0) {
  //       this.indeterminate = false;
  //       this.allSelected = false;
  //     } else if (newValue.length === this.flavours.length) {
  //       this.indeterminate = false;
  //       this.allSelected = true;
  //     } else {
  //       this.indeterminate = true;
  //       this.allSelected = false;
  //     }
  //   },
  // },
};
</script>

<style scoped>

</style>
