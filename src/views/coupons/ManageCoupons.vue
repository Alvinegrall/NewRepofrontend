<template>
  <CouponCreate />

  <div class="min-h-screen">
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
                  >{{ $t("coupons_page.title") }}</span
                >
              </div>
            </li>
          </ol>
        </nav>
        <p>
          {{ $t("coupons_page.description") }}
        </p>
      </div>

      <div
        v-if="coupons.length > 0"
        id="les-actions"
        class="flex justify-end w-full sm:w-auto"
      >
        <BaseButton
          id="add-coupon"
          type="button"
          class="text-[14px] bg-primary px-3 py-2 rounded"
          data-bs-toggle="modal"
          data-bs-target="#createCoupon"
        >
          <span>{{ $t("common.breadcrumb.buttons.add-coupon") }}</span>
        </BaseButton>
      </div>
    </div>

    <div id="the-form" class="w-full relative overflow-hidden">
      <div class="w-full h-full relative">
        <!-- <div class="hidden w-full px-6 py-6 relative border-b-[1px]">
          <div class="flex gap-2">
            <button
              class="cursor-pointer px-3 py-2 rounded-lg hover:bg-primary hover:bg-opacity-30 text-primary bg-primary bg-opacity-30 font-bold"
            >
              <span>Coupons actifs</span>
            </button>
            <button
              disabled
              class="cursor-not-allowed px-3 py-2 rounded-lg hover:bg-primary hover:bg-opacity-30 disabled:bg-[#e4e6eb] disabled:text-[#bcc0c4]"
            >
              <span>Coupons suspendus</span>
            </button>
          </div>
        </div> -->
        <div
          class="grid-cols-10 h-full gap-2 md:gap-6"
          :class="{
            grid: coupons.length > 0 || loading,
            flex: coupons.length == 0,
          }"
        >
          <div
            v-if="coupons.length > 0 || loading"
            class="bg-white col-span-4 sm:col-span-4 py-4 px-2 overflow-y-scroll h-96 md:h-full pb-60 border-2 border-gray-900 border-opacity-20 rounded-lg"
          >
            <div class="w-full flex justify-end mb-6">
              <input
                id="search_text"
                v-model="searchText"
                class="border rounded h-9 text-xs px-2 w-full"
                type="search"
                name="search_text"
                placeholder="Rechercher un coupon"
              />
            </div>

            <div>
              <template v-if="loading">
                <ListItemSkeleton v-for="i in 6" :key="i" />
              </template>
              <template v-else>
                <div
                  v-for="coupon of coupons.filter((p) =>
                    p.coupon_code
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )"
                  :key="coupon.id"
                  class="relative"
                >
                  <div
                    class="flex gap-4 cursor-pointer rounded px-2 py-2"
                    :class="{
                      // 'hover:bg-[#d809093e] hover:bg-opacity-30':
                      //   $route.params.coupon_code != coupon.coupon_code &&
                      //   coupon.status == '0',
                      // ' bg-red-300 bg-opacity-70 hover:bg-opacity-100 text-black':
                      //   $route.params.coupon_code == coupon.coupon_code &&
                      //   coupon.status == '0',
                      // 'bg-red-300 bg-opacity-40 hover:bg-opacity-70 text-black':
                      //   $route.params.coupon_code != coupon.coupon_code &&
                      //   coupon.status == '0',
                      'hover:bg-[rgba(0,0,0,.05)] hover:bg-opacity-10':
                        $route.params.coupon_code != coupon.coupon_code,
                      ' bg-primary bg-opacity-40 hover:bg-opacity-70 text-black':
                        $route.params.coupon_code == coupon.coupon_code,
                    }"
                    @click="chooseCoupon(coupon)"
                  >
                    <div class="flex flex-col">
                      <span class="text-sm font-semibold">{{
                        coupon.coupon_code
                      }}</span>
                      <span class="text-xs"
                        >{{ $formatAmount(coupon.amount) }} XAF</span
                      >
                    </div>
                  </div>
                  <div class="border-b my-1 mx-2"></div>

                  <div
                    v-if="coupon.status != '1'"
                    class="absolute top-[30%] right-4 text-red-700"
                  >
                    <vue-feather type="slash"></vue-feather>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <router-view v-if="$route.params.coupon_code"></router-view>
          <div
            v-else-if="coupons.length > 0 || loading"
            class="text-gray-900 text-opacity-40 h-96 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-white col-span-6 sm:col-span-6 flex gap-6 w-full p-2 sm:p-4 md:p-8 lg:p-12 justify-center items-center border-2 border-gray-900 border-opacity-20 rounded-lg"
          >
            {{ $t("coupons_page.click-to-show") }}
          </div>

          <div
            v-else
            class="text-gray-900 text-opacity-40 h-96 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-white col-span-6 sm:col-span-6 flex gap-6 w-full p-2 sm:p-4 md:p-8 lg:p-12 justify-center items-center border-2 border-gray-900 border-opacity-20 rounded-lg"
          >
            <div class="">
              <p class="text-center text-2xl md:text-3xl lg:text-4xl">
                {{ $t("coupons_page.empty") }}
              </p>

              <BaseButton
                data-bs-toggle="modal"
                data-bs-target="#createCoupon"
                class="text-sm md:text-[18px] bg-primary mt-6 px-3 py-4 rounded"
              >
                <span>{{ $t("coupons_page.create-coupon") }}</span>
              </BaseButton>
            </div>
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
import CouponCreate from "@/views/coupons/manage/CouponCreate.vue";

export default {
  components: { CouponCreate, BaseButton, ListItemSkeleton },
  data() {
    return {
      searchText: "",
      loading: true,
    };
  },
  computed: {
    ...mapGetters("coupons", ["coupons", "current_coupon"]),
  },
  async mounted() {
    if (this.$route.query?.action === "create") {
      setTimeout(() => {
        document.getElementById("add-coupon").click();
      }, 100);
    }

    await this.$store.dispatch("coupons/listcoupons");
    this.loading = false;
  },
  methods: {
    async chooseCoupon(coupon) {
      this.$router.push({
        name: "coupons.manage.infos",
        params: { coupon_code: coupon.coupon_code },
      });
      // await store.dispatch("coupons/set_loading", true);
      // await store.dispatch("coupons/get_coupon", coupon.coupon_code);
      // await store.dispatch("coupons/set_loading", false);
    },
  },
};
</script>

<style scoped>


#the-form::before {
  position: absolute;
  content: "";
  height: 100%;
  top: -20px;
  left: -20px;
  width: 100%;
}
</style>
