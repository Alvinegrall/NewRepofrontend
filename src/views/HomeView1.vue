<template>
  <!-- <TournoisCreate /> -->

  <div class="min-h-screen container">
    <HeaderBreadcrumbs :links="breadcrumbItems" title="Homemememe" />

    <!-- <BaseSkeleton :shadow="'none'" :width="'50px'" :height="'50px'" radius="50%" /> -->

    <div class="flex justify-between flex-col lg:flex-row gap-6 relative">
      <div
        class="flex flex-wrap gap-5 old-desktop:gap-5 justify-between flex-col md:flex-row w-full h-fit old-desktop:flex-row"
      >
        <div
          class="relative rounded-lg shadow-old-design flex justify-between pb-8 font-avertape flex-col bg-white w-full h-[340px] md:w-[calc(50%-10px)] old-desktop:w-[calc(50%-10px)] pt-6"
        >
          <span class="text-darkblue font-inter text-[20px] font-bold px-[25px]"
            >Solde</span
          >
          <div
            class="text-darkblue font-inter text-[20px] px-[25px] flex gap-6"
          >
            <div class="text-secondary font-semibold text-2xl lg:text-4xl">
              23 000 fcfa
            </div>
            <div><vue-feather type="eye"></vue-feather></div>
            <div
              class="absolute top-6 right-6 bg-green-500 text-green-500 bg-opacity-20 rounded-lg h-[70px] w-[100px] text-3xl flex justify-center items-center"
            >
              100 %
            </div>
          </div>
          <div class="flex justify-between items-center gap-8 px-[25px] mt-6">
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
          <div class="flex justify-center items-center">
            <!-- <BaseButton
              class="flex items-center gap-2 text-sm creatwbtn  p-3 rounded-lg"
            >
              <vue-feather class="h-5" type="minus-circle"></vue-feather>
              <div>Effectuer un retrait</div>
            </BaseButton> -->
          </div>
        </div>
        <div
          class="rounded-lg shadow-old-design flex justify-between font-avertape flex-col bg-white w-full h-[340px] md:w-[calc(50%-10px)] old-desktop:w-[calc(50%-10px)] pt-6 pb-1"
        >
          <span
            class="text-darkblue font-inter text-[20px] font-bold px-[25px] pb-[23px]"
            >Variations au cour du temps</span
          >
          <PlanetChart />
        </div>
        <div
          class="rounded-lg bg-white w-full mb-10 old-desktop:w-[calc(50%-10px)] pt-6 pb-1"
        >
          <div
            class="text-darkblue font-inter text-[20px] font-bold px-[25px] pb-[20px]"
          >
            <span>Historique des transactions</span>
          </div>
          <div
            v-for="(item, index) in 7"
            :key="index"
            class="flex justify-between px-[25px] items-center py-3 border-t"
          >
            <div class="flex gap-3 items-center min-w-[300px]">
              <div
                v-if="index == 1 || index == 3 || index == 6"
                class="p-1 bg-green-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
              >
                <vue-feather
                  class="text-green-500"
                  type="arrow-down-left"
                ></vue-feather>
              </div>
              <div
                v-else
                class="p-1 bg-red-500 bg-opacity-20 w-8 h-8 rounded-full flex justify-center items-center"
              >
                <vue-feather
                  class="text-red-500"
                  type="arrow-up-right"
                ></vue-feather>
              </div>
              <div class="min-w-[70%]">
                <h6 class="text-gray-400 font-semibold text-sm">Opération:</h6>
                Transfert d'argent vers un service externe via 674839010
              </div>
            </div>

            <div>
              <h6 class="text-gray-400 font-semibold text-sm">Montant:</h6>
              3 000 XAF
            </div>
            <div>
              <h6 class="text-gray-400 font-semibold text-sm">Mode:</h6>
              MOM
            </div>
            <div>
              <h6 class="text-gray-400 font-semibold text-sm">Solde:</h6>
              435 000 XAF
            </div>
            <div>
              <h6 class="text-gray-400 font-semibold text-sm">Date:</h6>
              06/06/2023 09:10:35
            </div>
          </div>
        </div>
      </div>
      <div
        class="rounded-lg overflow-hidden shadow-old-design bg-white flex-none lg:w-[326px] flex flex-col"
      >
        <div class="flex justify-between items-center">
          <div
            class="flex items-center gap-2 text-darkblue font-inter text-[20px] font-bold px-[25px] py-[23px]"
          >
            <h6>Info</h6>
            <vue-feather class="h-5" type="bell"></vue-feather>
          </div>
          <div class="mr-[23px]">
            <!-- <BaseButton
  
          class="flex items-center gap-2 text-sm creatwbtn  p-3 rounded-lg"
        >
          <vue-feather class="h-5" type="plus-circle"></vue-feather>
          <div>Ajouter</div>
        </BaseButton> -->
          </div>
        </div>
        <hr class="color-[#ebedf0] opacity-10" />
        <div class="px-[25px] pb-5 flex flex-col gap-3 overflow-hidden">
          <ul class="flex flex-col">
            <li v-for="(item, index) in 4" :key="index" class="border-t">
              <div class="py-[15px] flex gap-2.5 font-avertape">
                <div
                  class="rounded-full h-[24px] min-w-[28px] flex justify-center items-center"
                >
                  <div
                    class="bg-secondary bg-opacity-10 h-8 w-8 rounded-full p-1 flex justify-center items-center"
                  >
                    <vue-feather
                      class="text-secondary h-6"
                      type="user"
                    ></vue-feather>
                  </div>
                </div>
                <div class="flex flex-col w-full gap-1">
                  <div class="flex justify-between">
                    <span class="text-[#414355] font-bold"
                      >Fête de l'association</span
                    ><span class="text-xs text-[#9ba9b3]"
                      >08/06/2023, 18:01</span
                    >
                  </div>
                  <span class="text-xs leading-normal"
                    ><div class="w-full">
                      <div
                        class="relative flex items-center truncate w-full max-w-fit"
                      >
                        <a class="underline hover:text-gray-300/70" href="#"
                          >Tout les Membres</a
                        >
                      </div>
                      <div
                        style="
                          position: absolute;
                          z-index: 9999;
                          inset: 0px auto auto 0px;
                          transform: translate(1014px, -10px);
                        "
                      ></div>
                    </div>
                    Doivent donner une somme de 1000 fcfa
                  </span>
                </div>
              </div>
              <hr class="color-darkblue opacity-10" />
            </li>
          </ul>
        </div>
        <!-- <div
          class="rounded-lg hidden lg:block absolute bottom-0 h-[50px] bg-gradient-to-b from-[hsla(0,0%,100%,0)] to-[#fff] w-[326px]"
        ></div> -->
      </div>
    </div>

    <CardBox class="mt-6"> 
      <CardBoxHeader title="title" subtitle="lates test vibes" btnlabel="teste" />
       
        
    </CardBox>

    <!-- <div class="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">
            Latest Transactions
          </h3>
          <span class="text-base font-normal text-gray-500"
            >This is a list of latest transactions</span
          >
        </div>
        <div class="flex-shrink-0">
          <a
            href="#"
            class="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg p-2"
            >View all</a
          >
        </div>
      </div>

      <div class="flex flex-col mt-8">
        <div class="overflow-x-auto rounded-lg">
          <div class="align-middle inline-block min-w-full">
            <div class="shadow overflow-hidden sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date &amp; Time
                    </th>
                    <th
                      scope="col"
                      class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                    >
                      Payment from
                      <span class="font-semibold">Bonnie Green</span>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                    >
                      Apr 23 ,2021
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      $2300
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left"
                    >
                      Payment refund to
                      <span class="font-semibold">#00910</span>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                    >
                      Apr 23 ,2021
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      -$670
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                    >
                      Payment failed from
                      <span class="font-semibold">#087651</span>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                    >
                      Apr 18 ,2021
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      $234
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left"
                    >
                      Payment from <span class="font-semibold">Lana Byrd</span>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                    >
                      Apr 15 ,2021
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      $5000
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                    >
                      Payment from <span class="font-semibold">Jese Leos</span>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                    >
                      Apr 15 ,2021
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      $2300
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-900 rounded-lg rounded-left"
                    >
                      Payment from
                      <span class="font-semibold">THEMESBERG LLC</span>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                    >
                      Apr 11 ,2021
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      $560
                    </td>
                  </tr>
                  <tr>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                    >
                      Payment from <span class="font-semibold">Lana Lysle</span>
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                    >
                      Apr 6 ,2021
                    </td>
                    <td
                      class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900"
                    >
                      $1437
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import BaseButton from "@/components/common/BaseButton.vue";
// import ListItemSkeleton from "@/components/common/ListItemSkeleton.vue";
// import ProductCreate from "@/views/products/manage/ProductCreate.vue";
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";
import PlanetChart from "@/components/PlanetChart.vue";

export default {
  components: {
    PlanetChart,
    HeaderBreadcrumbs,
    BaseSkeleton,
    CardBox,
    CardBoxHeader
  },
  data() {
    return {
      searchText: "",
      loading: true,
      breadcrumbItems: [
        {
          title: "Dashboard",
          link: "common.home",
        },
        
      ],
      datas: [
        {
          id: 1,
          name: "Membres",
          value: 15,
          icon: "users",
        },
        {
          id: 2,
          name: "Transactions",
          value: 257,
          icon: "bar-chart-2",
        },
        {
          id: 3,
          name: "Total retrait",
          value: 50,
          icon: "arrow-up",
        },
        {
          id: 4,
          name: "Total Dépots",
          value: 150,
          icon: "arrow-down",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("products", ["products", "current_product"]),
    // ...mapGetters("partners", ["current_partner"]),
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
    // console.log("currentpartner", this.current_partner);
    if (this.$route.query?.action === "create") {
      setTimeout(() => {
        if (document.getElementById("add-product")) {
          document.getElementById("add-product").click();
        }
      }, 100);
    }

    await this.$store.dispatch("products/listcategories");
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
