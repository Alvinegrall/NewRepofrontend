<template>
  <PayInscription :name="members?.first_name" @submit="payRequest($event)" />
  <div class="container min-h-screen">
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
                  :to="{ name: 'administration.membres' }"
                  class="inline-flex items-center text-lg font-semibold text-gray-600 hover:text-gray-600"
                >
                  Membres
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
                  >Profils</span
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div class="">
        <router-link
          :to="{ name: 'administration.membres' }"
          class="flex items-center gap-2 text-sm bg-gray-500 p-3 text-white rounded-lg"
        >
          <vue-feather class="h-5" type="arrow-left"></vue-feather>
          <div>Retour</div>
        </router-link>
      </div>

      <!-- <BaseButton
           
            class="flex items-center gap-2 text-sm creatwbtn text-white font-semibold mt-6 p-3 rounded-lg"
          >
            <vue-feather class="h-5" type="plus-circle"></vue-feather>
            <div>Créer</div>
          </BaseButton> -->
    </div>

    <div class="mb-10">
      <div class="flex flex-col s901:flex-row gap-10">
        <!-- Right Content -->
        <div
          class="w-full s901:w-1/3 flex flex-wrap gap-5 old-desktop:gap-5 justify-between flex-col h-fit"
        >
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full h-[300px] p-6"
          >
            <div class="">
              <img
                class="h-32 rounded-lg"
                :src="members?.photo_profil?.url || '/assets/images/search.png'"
                alt=""
              />
              <div class="mt-3">
                <h2 class="text-lg font-[700] mb-3">
                  Mr/Mme {{ members?.first_name }} ({{ members?.matricule }})
                </h2>
                <ul class="flex flex-col gap-3">
                  <li class="flex items-center gap-2">
                    <vue-feather class="h-4" type="briefcase"></vue-feather>
                    {{ members?.type }}
                  </li>
                  <li v-if="members?.residence" class="flex items-center gap-2">
                    <vue-feather class="h-4" type="map-pin"></vue-feather>
                    {{ members?.residence }}
                  </li>
                </ul>
              </div>
            </div>
            <div class=""></div>
          </div>
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full h-[250px] p-6"
          >
            <h3 class="text-lg font-[700] mb-3">Infos personnelles</h3>
            <div>
              <div class="">
                <div
                  class="flex gap-2 items-center text-sm font-[400] text-gray-400"
                >
                  <vue-feather class="h-4" type="mail"></vue-feather>
                  Adresse Email
                </div>
                <div class="font-[500]">{{ members?.email }}</div>
              </div>
              <div class="mt-4">
                <div
                  class="flex gap-2 items-center text-sm font-[400] text-gray-400"
                >
                  <vue-feather class="h-4" type="phone"></vue-feather>
                  Téléphone
                </div>
                <div class="font-[500]">
                  {{ members?.first_phone }} / {{ members?.second_phone }}
                </div>
              </div>
              <div class="mt-4">
                <div
                  class="flex gap-2 items-center text-sm font-[400] text-gray-400"
                >
                  <vue-feather class="h-4" type="gift"></vue-feather>
                  date de naissance
                </div>
                <div class="font-[500]">12/12/1990 , 30 ans</div>
              </div>
            </div>
          </div>
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full min-h-[300px] p-6"
          >
            <h3 class="text-lg font-[700] mb-3">Autres</h3>
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-[500] mb-3 border-b">Bénéficiaire</h3>

              <BaseButton
                class="flex items-center gap-2 text-sm creatwbtn text-white p-3 rounded-lg"
              >
                <vue-feather class="h-5" type="plus-circle"></vue-feather>
                <div>Ajouter</div>
              </BaseButton>
            </div>

            <div class="table-responsive table-card">
              <table
                class="table table-borderless align-middle"
                style="font-size: 13px"
              >
                <thead class="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col" class="text-center">Téléphone</th>
                    <th scope="col">Type</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(beneficiary, index) in members?.beneficiary"
                    :key="index"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ beneficiary.first_name }}</td>
                    <td class="text-center">
                      {{ beneficiary.first_phone }}
                    </td>
                    <td>{{ beneficiary.type }}</td>
                    <td>
                      <div class="">
                        <a
                          href="javascript:void(0);"
                          @click.prevent="handleRemoveItem(index)"
                        >
                          <vue-feather
                            class="text-danger"
                            type="trash-2"
                          ></vue-feather>
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- <div >
                  <div class="mt-4">
                    <div
                      class="flex gap-2 items-center text-sm font-[400] text-gray-400"
                    >
                      <vue-feather class="h-4" type="edit-2"></vue-feather>
                      Nom et prénom
                    </div>
                    <div class="font-[500] ml-6 ">{{ beneficiary.first_name }}</div>
                  </div>
                  <div class="mt-4">
                    <div
                      class="flex gap-2 items-center text-sm font-[400] text-gray-400"
                    >
                      <vue-feather class="h-4" type="mail"></vue-feather>
                      Adresse Email
                    </div>
                    <div class="font-[500] ml-6 ">null</div>
                  </div>
                  <div class="mt-4">
                    <div
                      class="flex gap-2 items-center text-sm font-[400] text-gray-400"
                    >
                      <vue-feather class="h-4" type="phone"></vue-feather>
                      Téléphone
                    </div>
                    <div class="font-[500] ml-6 ">{{ beneficiary.first_phone }}</div>
                  </div>
                  <div class="mt-4">
                    <div
                      class="flex gap-2 items-center text-sm font-[400] text-gray-400"
                    >
                      <vue-feather class="h-4" type="user"></vue-feather>
                      Type
                    </div>
                    <div class="font-[500] ml-6 ">{{ beneficiary.type }}</div>
                  </div>
                </div> -->
          </div>
        </div>
        <div
          class="w-full s901:w-2/3 flex flex-wrap gap-5 old-desktop:gap-5 justify-between flex-col h-fit"
        >
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full h-auto p-6"
          >
            <h3 class="text-lg font-[700] mb-3">Informations générale</h3>
            <div class="my-10">
              <div class="flex items-center gap-5">
                <template v-if="!members?.is_inscription_payed">
                  <BaseButton
                    id="add-product"
                    type="button"
                    class="text-sm creatwbtn text-white p-3 rounded-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#payerInscription"
                  >
                    <span>Payer son inscription</span>
                  </BaseButton>
                  <div class="flex items-center gap-1">
                    <div class="p-2 border rounded-lg">
                      http://farotygo.com/3237424
                    </div>
                    <div
                      class="p-2 border rounded-lg flex items-center justify-center"
                    >
                      <a
                        title="Copier le lien"
                        href="javascript:void(0)"
                        class="text-3xl group"
                        @click="copyLink(members)"
                      >
                        <vue-feather
                          type="copy"
                          class="group-hover:text-primary"
                        ></vue-feather>
                      </a>
                    </div>
                    <div
                      class="p-2 border rounded-lg flex items-center justify-center"
                    >
                      <a
                        title="Copier le lien"
                        href="javascript:void(0)"
                        class="text-3xl group"
                        @click="copyLink(members)"
                      >
                        <vue-feather
                          type="share-2"
                          class="group-hover:text-primary"
                        ></vue-feather>
                      </a>
                    </div>
                  </div>
                </template>
              </div>

              <div
                class="flex justify-between items-center py-3 border-t mt-10"
              >
                <div class="flex gap-3 items-center">
                  <template v-if="members?.inscription_status === 'Started'">
                    <div
                      class="p-1 bg-yellow-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
                    >
                      <vue-feather
                        class="text-yellow-500"
                        type="alert-circle"
                      ></vue-feather>
                    </div>
                  </template>

                  <template v-if="members?.inscription_status === 'Finished'">
                    <div
                      class="p-1 bg-green-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
                    >
                      <vue-feather
                        class="text-green-500"
                        type="check-circle"
                      ></vue-feather>
                    </div>
                  </template>
                  <template v-if="members?.inscription_status === 'NotStarted'">
                    <div
                      class="p-1 bg-red-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
                    >
                      <vue-feather
                        class="text-red-500"
                        type="x-circle"
                      ></vue-feather>
                    </div>
                  </template>

                  <div class="">
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Inscription:
                    </h6>
                    <span> 5000 XAF</span>
                  </div>
                </div>
                <template v-if="!members?.is_inscription_payed">
                  <div>
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Montant versé:
                    </h6>
                    {{ members?.inscription_balance }} XAF
                  </div>
                  <div>
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Montant restant:
                    </h6>
                    {{ 5000 - members?.inscription_balance }} XAF
                  </div>
                </template>
                <template v-else>
                  <div>
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Montant versé:
                    </h6>
                    5000 XAF
                  </div>
                  <div>
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Montant restant:
                    </h6>
                    0 XAF
                  </div>
                </template>

                <div>
                  <h6 class="text-gray-400 font-semibold text-sm">Status:</h6>
                  <span
                    v-if="members?.inscription_status === 'Started'"
                    class="text-yellow-500"
                  >
                    En cour</span
                  >
                  <span
                    v-if="members?.inscription_status === 'Finished'"
                    class="text-green-500"
                    >Terminé</span
                  >
                  <span
                    v-if="members?.inscription_status === 'NotStarted'"
                    class="text-red-500"
                    >Non payé</span
                  >
                </div>
              </div>
            </div>
            <!-- <div class="flex justify-between items-center gap-8 mt-6">
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
            </div> -->
          </div>
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full h-auto p-6"
          >
            <h3 class="text-lg font-[700] mb-3">Infos supplementaires</h3>
            <div>
              <h3 class="text-lg font-[500] mb-3 border-b">Sanctions</h3>
              <template v-if="members?.sanctions?.length">
                <div
                  v-for="(item, index) in members?.sanctions"
                  :key="index"
                  class="flex justify-between items-center py-3 border-b"
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
                      <h6 class="text-gray-400 font-semibold text-sm">
                        Motif:
                      </h6>
                      {{ item.motif }}
                    </div>
                  </div>

                  <div>
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Montant:
                    </h6>
                    {{ item.amount }} XAF
                  </div>
                  <div v-if="index != 0" class="w-24">
                    <h6 class="text-gray-400 font-semibold text-sm">Etat:</h6>
                    <span class="status text-success">&bull;</span> Payé
                  </div>
                  <div v-else class="w-24">
                    <h6 class="text-gray-400 font-semibold text-sm">Etat:</h6>
                    <span class="status text-danger">&bull;</span> Non payé
                  </div>

                  <div>
                    <h6 class="text-gray-400 font-semibold text-sm">Date:</h6>
                    {{ formateDate(item.created_at) }}
                  </div>
                </div>
              </template>
              <div v-else class="flex flex-col justify-center items-center">
                <div
                  class="flex justify-center items-center text-gray-400 text-lg font-semibold gap-2 mt-5"
                >
                  <vue-feather type="search"></vue-feather>
                  <div>Aucune sanction</div>
                </div>

                <!-- <div class="">
                  <button
                    @click="createSeance()"
                    class="flex items-center creatwbtn gap-2 text-sm text-white font-[500] shadow-sm hover:scale-x-[1.05] transition-all duration-100 ease-linear mt-6 p-3 rounded-lg"
                  >
                    <vue-feather class="h-5" type="plus-circle"></vue-feather>
                    <div>Creér une seance</div>
                  </button>
                </div> -->
              </div>
            </div>
          </div>
          <div
            class="relative rounded-lg shadow-old-design pb-8 font-avertape bg-white w-full h-auto p-6"
          >
            <h3 class="text-lg font-[700] mb-3">
              Historiques de ses transactions
            </h3>
            <div>
              <template v-if="members?.payments?.length">
                <div
                  v-for="(item, index) in members?.payments"
                  :key="index"
                  class="flex justify-between items-center py-3 border-t"
                >
                  <div class="flex gap-3 items-center">
                    <div
                      class="p-1 bg-green-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
                    >
                      <vue-feather
                        class="text-green-500"
                        type="arrow-down-left"
                      ></vue-feather>
                    </div>

                    <div class="text-sm">
                      <h6 class="text-gray-400 font-semibold text-sm">
                        Opération:
                      </h6>
                     {{ item.description }}
                    </div>
                  </div>

                  <div class="text-sm">
                    <h6 class="text-gray-400 font-semibold text-sm">
                      Montant:
                    </h6>
                    {{ item.amount }} {{ item.currency }}
                    <!-- {{ item.admin_id }} -->
                  </div>
                  <div class="text-sm">
                    <h6 class="text-gray-400 font-semibold text-sm">Mode:</h6>
                    Admin(Tsague)
                  </div>

                  <div class="text-sm">
                    <h6 class="text-gray-400 font-semibold text-sm">Date:</h6>
                    {{ formateDate(item.created_at) }}
                  </div>
                </div>
              </template>
              <div v-else class="flex flex-col justify-center items-center">
                <div
                  class="flex justify-center items-center text-gray-400 text-lg font-semibold gap-2 mt-5"
                >
                  <vue-feather type="search"></vue-feather>
                  <div>Aucune Transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import PlanetChart from '@/components/PlanetChart.vue'
import { mapGetters } from "vuex";
import PayInscription from "@/components/membres/PayInscription.vue";
import axios from "axios";
export default {
  components: {
    PayInscription,
  },
  data() {
    return {
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
          name: "Total retrait",
          value: 3,
          icon: "arrow-up",
        },
        {
          id: 4,
          name: "Total Dépots",
          value: 50,
          icon: "arrow-down",
        },
      ],
      members: "",
    };
  },

  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("partners", ["current_partner"]),
    ...mapGetters("comptes", ["comptes"]),
  },

  async mounted() {
    await this.getCurrentMenbre();
  },
  methods: {
    formateDate(date) {
      const newdate = new Date(date);
      const readableDate = newdate.toLocaleString();

      return readableDate;
    },
    handleRemoveItem(index) {
      this.cibles.splice(index, 1);
    },
    async getCurrentMenbre() {
      axios
        .get(
          "http://localhost:3333/api/v1/membre/" +
            this.$route.params.matricule +
            "/show"
        )
        .then((response) => {
          console.log("response", response);
          if (!response.data.error) {
            this.members = response.data.data;
            console.log("this.members", this.members);
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text: "Error" + error,
            type: "error",
          });
          console.log("error", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async payRequest(event) {
      // console.log("currentUser", this.currentUser);

      const data = {
        admin_id: this.currentUser.hash_id,
        amount: event,
        membre_code: this.members.membre_code,
        partner_urlcode: this.current_partner.urlcode,
        source_code: this.members.membre_code,
        type_id: 1,
      };

      await this.$store
        .dispatch("membres/payRequest", data)
        .then(async (response) => {
          console.log("response add ", response);
          if (!response.data.error) {
            await this.getCurrentMenbre();
            this.$snackbar.add({
              text: "Effectué avec succès",
              type: "success",
            });
          }
        })
        .catch((error) => {
          this.$snackbar.add({
            text: "Erreur lors du payment",
            type: "error" + error,
          });
          console.log("error add ", error);
        });

      console.log("data", data);
    },
    copyLink(link) {
      window.navigator.clipboard.writeText(link.matricule);

      this.$snackbar.add({
        text: 'Vous avez copié le lien de "' + link.name + '" !',
        type: "success",
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
