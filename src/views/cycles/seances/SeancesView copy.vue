<template>

  <div class="container min-h-screen">
    <div class="mb-3 flex justify-between items-center flex-wrap gap-4">
      <div class="space-y-1">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link
                :to="{ name: 'common.home' }"
                class="inline-flex items-center text-2xl font-semibold text-gray-900 hover:text-gray-600"
              >
                {{ $t("common.breadcrumb.dashboard") }}
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-900"
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
                  class="ml-1 text-2xl font-semibold text-gray-900 hover:text-gray-900 md:ml-2"
                  >Séances</span
                >
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div class="relative flex items-center gap-5">
        <BaseButton
          class="flex xl:hidden items-center creatwbtn  p-3 rounded-lg"
          @click="showFiltres()"
        >
          <vue-feather class="h-5" type="filter"></vue-feather>
        </BaseButton>
        <div
          class="absolute z-50 top-[58px] xl:hidden left-0 sm:left-[-200px] p-5 w-[300px]"
          :class="{ hidden: !showFiltre }"
        >
          <div class="bg-white justify-center pt-4 xl:flex w-full shadow-lg">
            <div class="pb-3 border-b border-b-gray/30 w-full px-4">
              <div class="flex gap-3 items-center">
                <div class="w-full flex flex-col gap-3">
                  <div
                    class="text-primary font-semibold text-sm mb-5 border-b-2 border-secondary w-fit"
                  >
                    <span class="pb-3">Filter par</span>
                  </div>
                  <div>
                    <CommonFiltreItem name="Mois" />
                  </div>
                  <div>
                    <CommonFiltreItem name="Region" />
                  </div>
                  <div>
                    <CommonFiltreItem name="Ville" />
                  </div>

                  <div>
                    <CommonFiltreItem name="Nom" />
                  </div>
                  <div>
                    <CommonFiltreItem name="Membre" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <router-link
         :to="{ name: 'cycles.create-seance' }"
          class="flex items-center gap-2 text-sm creatwbtn  p-3 rounded-lg text-white"
        >
          <vue-feather class="h-5" type="plus-circle"></vue-feather>
          <div>Créer</div>
        </router-link>
      </div>
    </div>

    <!-- <div id="the-form" class="w-full relative overflow-hidden">
      <div class="w-full h-full relative">
        <div class="grid-cols-10 h-full gap-2 md:gap-6 flex">
          <router-view v-if="$route.params.hashid"></router-view>

          <div
            v-else
            class="text-gray-900 text-opacity-40 h-96 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-white col-span-6 sm:col-span-6 flex gap-6 w-full p-2 sm:p-4 md:p-8 lg:p-12 justify-center items-center page_cart rounded-lg"
          >
            <div class="text-center">
              <div class="flex justify-center">
                <img src="/assets/images/search.png" class="h-24" alt="" />
              </div>
              <p class="text-center text-lg">
                Oopps ! <br />
                Aucune séance n'a été trouvée
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div id="the-form" class="w-full relative overflow-hidden">
      <div class="w-full h-full relative">
        <div class="grid-cols-10 h-full gap-2 md:gap-6 flex">
         

          <div
          
            class="text-gray-900 text-opacity-40 h-96 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-white col-span-6 sm:col-span-6 flex gap-6 w-full p-2 sm:p-4 md:p-8 lg:p-12 justify-center items-center page_cart rounded-lg"
          >
          
          </div>
        </div>
      </div>
    </div> -->
    <div class="flex gap-0 xl:gap-5 flex-col xl:flex-row mb-28 md:mb-20">
      <div
        class="hidden xl:flex flex-col w-full h-screen xl:flex-shrink-0 xl:w-fit xl:min-w-[307px] rounded-lg overflow-x-hidden lg:overflow-visible xl:overflow-x-hidden"
      >
        <div class="bg-white justify-center h-[700px] pt-4 xl:flex">
          <div class="pb-3 border-b border-b-gray/30 w-full px-4">
            <div class="flex gap-3 items-center">
              <div class="w-full flex flex-col gap-3">
                <div
                  class="text-primary font-semibold text-xl mb-5 border-b-2 border-secondary w-fit"
                >
                  <span class="pb-3">Filter par</span>
                </div>
                <div>
                  <CommonFiltreItem name="Mois" />
                </div>
                <div>
                  <CommonFiltreItem name="Region" />
                </div>
                <div>
                  <CommonFiltreItem name="Ville" />
                </div>

                <div>
                  <CommonFiltreItem name="Nom" />
                </div>
                <div>
                  <CommonFiltreItem name="Membre" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3 w-full h-screen">
        <div class="overflow-x-hidden rounded-lg">
          <div class="hidden lg:flex items-center bg-primary">
            <div
              class="text-start text-darkblue px-6 py-4 lg:table-cell font-bold font-inter text-[17px] truncate"
              style="flex: 20 1 0%"
            >
              <div class="flex gap-3">
                <div class="flex items-center">
                  <button
                    class="flex justify-items-center focus:outline-none rounded-full focus-visible:ring-2 ring-blue ring-offset-1 false"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-[16px] sm:w-[20px] h-[16px] sm:h-[20px] cursor-pointer main-transition-colors false opacity-100"
                      fill="#CBD5E1"
                    >
                      <path
                        d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                        fill="transparent"
                        stroke="#CBD5E1"
                        stroke-width="2"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="w-full">
                  <div
                    class="relative truncate flex items-center w-full max-w-fit h-full overflow-hidden"
                  >
                    <span class="truncate">Créer le</span>
                  </div>
                  <div
                    style="
                      position: absolute;
                      z-index: 9999;
                      inset: 0px auto auto 0px;
                      transform: translate(464px, 107px);
                    "
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="text-start text-darkblue px-6 py-4 lg:table-cell font-bold font-inter text-[17px] truncate"
              style="flex: 40 1 0%"
            >
              <div>
                <div
                  class="relative truncate flex items-center w-full max-w-fit h-full overflow-hidden"
                >
                  <span class="truncate inline-block w-full"
                    >Membre Récepteur</span
                  >
                </div>
                <div
                  style="
                    position: absolute;
                    z-index: 9999;
                    inset: 0px auto auto 0px;
                    transform: translate(649px, 107px);
                  "
                ></div>
              </div>
            </div>
            <div
              class="text-start text-darkblue px-6 py-4 lg:table-cell font-bold font-inter text-[17px] truncate"
              style="flex: 20 1 0%"
            >
              <div>
                <div
                  class="relative truncate flex items-center w-full max-w-fit h-full overflow-hidden"
                >
                  <span class="truncate inline-block w-full">Localisation</span>
                </div>
                <div
                  style="
                    position: absolute;
                    z-index: 9999;
                    inset: 0px auto auto 0px;
                    transform: translate(1134px, 151px);
                  "
                ></div>
              </div>
            </div>
            <div
              class="text-start text-darkblue px-6 py-4 lg:table-cell font-bold font-inter text-[17px] truncate"
              style="flex: 15 1 0%"
            >
              <div>
                <div
                  class="relative truncate flex items-center justify-center w-full max-w-fit h-full overflow-hidden"
                >
                  <span class="truncate inline-block w-full">GPS</span>
                </div>
                <div
                  style="
                    position: absolute;
                    z-index: 9999;
                    inset: 0px auto auto 0px;
                    transform: translate(1134px, 151px);
                  "
                ></div>
              </div>
            </div>
            <div
              class="text-start text-darkblue px-6 py-4 lg:table-cell font-bold font-inter text-[17px] truncate"
              style="flex: 5 1 0%"
            >
              <div>
                <div
                  style="
                    position: absolute;
                    z-index: 9999;
                    inset: 0px auto auto 0px;
                    transform: translate(1134px, 151px);
                  "
                ></div>
              </div>
            </div>
          </div>
          <div v-for="(item, index) in 4" :key="index">
            <!-- start here -->

            

            <!-- end here -->

            <CommonSeance />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseButton from "@/components/common/BaseButton.vue";
import ListItemSkeleton from "@/components/common/ListItemSkeleton.vue";
import ProductCreate from "@/views/products/manage/ProductCreate.vue";
import CommonSeance from "@/components/common/CommonSeance.vue";
import CommonFiltreItem from "@/components/common/CommonFiltreItem.vue";

export default {
  components: {
    ProductCreate,
    BaseButton,
    ListItemSkeleton,
    CommonSeance,
    CommonFiltreItem,
  },
  data() {
    return {
      searchText: "",
      loading: true,
      showFiltre: false,
    };
  },
  computed: {
    ...mapGetters("products", ["products", "current_product"]),
    // products() {
    //   return [
    //     {
    //       id: null,
    //       hashid: "1",
    //       name: "Produit 1",
    //       type_name: "Type 1",
    //       picture: "https://picsum.photos/200/300",
    //       pu: 1000,
    //       quantity: 10,
    //       description: "Description du produit 1",
    //     },
    //     {
    //       id: null,
    //       hashid: "2",
    //       name: "Produit 2",
    //       type_name: "Type 2",
    //       picture: "https://picsum.photos/200/300",
    //       pu: 2000,
    //       quantity: 20,
    //       description: "Description du produit 2",
    //     },
    //     {
    //       id: null,
    //       hashid: "3",
    //       name: "Produit 3",
    //       type_name: "Type 3",
    //       picture: "https://picsum.photos/200/300",
    //       pu: 3000,
    //       quantity: 30,
    //       description: "Description du produit 3",
    //     },
    //   ];
    // },
  },
  async mounted() {
    if (this.$route.query?.action === "create") {
      setTimeout(() => {
        if (document.getElementById("add-product")) {
          document.getElementById("add-product").click();
        }
      }, 100);
    }

    // await this.$store.dispatch("products/listcategories");
    // await this.$store.dispatch("products/listproducts");

    this.loading = false;
  },
  methods: {
    async chooseProduct(product) {
      this.$router.push({
        name: "products.manage.infos",
        params: { hashid: product.hashid },
      });
      // await store.dispatch("products/set_loading", true);
      // await store.dispatch("products/get_product", product.hashid);
      // await store.dispatch("products/set_loading", false);
    },
    showFiltres() {
      this.showFiltre = !this.showFiltre;
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
