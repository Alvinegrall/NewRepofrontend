<template>
  <CouponUpdate v-if="current_coupon" />
  <CouponModalDelete />
  <CouponModalSuspend />
  <CouponModalUnSuspend />

  <div v-if="current_coupon" class="col-span-6 sm:col-span-6">
    <div
      class="bg-white sm:flex gap-6 w-full p-4 overflow-y-scroll border-2 border-gray-900 border-opacity-20 rounded-lg"
    >
      <div class="w-full">
        <div class="border-b pb-5 flex space-x-12 items-center">
          <div>
            <div v-if="!loading" class="font-bold text-[1.125rem]">
              {{ current_coupon.coupon_code }}
            </div>
            <BaseSkeleton v-else :shadow="'none'" class="w-60 h-4 mb-2" />
            <span v-if="!loading" class="text-[.875rem]"
              >{{ $formatAmount(current_coupon.amount) }} XAF</span
            >
            <BaseSkeleton v-else :shadow="'none'" class="w-32 h-4" />
          </div>

          <div class="flex mt-4 gap-2">
            <BaseButton
              type="button"
              class="text-center text-sm w-[40px] bg-primary bg-opacity-80 hover:bg-opacity-100 h-[36px] p-2 rounded-md"
              data-bs-toggle="modal"
              data-bs-target="#updateCoupon"
            >
              <vue-feather type="edit" class="w-4 h-4"></vue-feather>
            </BaseButton>

            <BaseButton
              type="button"
              class="text-center group w-[40px] bg-gray-50 hover:bg-gray-200 rounded-md border relative"
              :textcolor="'black'"
              :backgroundcolor="'gray'"
            >
              <span>...</span>

              <div class="absolute hidden group-hover:block right-0 pt-4 z-50">
                <div class="flex flex-col bg-white min-w-[200px] border">
                  <a
                    v-if="current_coupon.status == '1'"
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#suspendCoupon"
                    class="p-2 hover:bg-[rgba(0,0,0,.05)] text-yellow-700"
                    >{{ $t("coupons_page.common.suspend") }}</a
                  >
                  <a
                    v-if="current_coupon.status != '1'"
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#unSuspendCoupon"
                    class="p-2 hover:bg-[rgba(0,0,0,.05)] text-green-700"
                  >
                    {{ $t("coupons_page.common.unsuspend") }}
                  </a>
                  <a
                    href="javascript:void(0)"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteCoupon"
                    class="p-2 hover:bg-[rgba(0,0,0,.05)] text-red-600"
                    >{{ $t("coupons_page.common.delete") }}</a
                  >
                </div>
              </div>
            </BaseButton>
          </div>
        </div>
        <div class="mt-5 row">
          <div class="col-lg-6">
            <div class="mt-5">
              <div class="font-bold text-[1rem]">
                {{ $t("coupons_page.common.coupons-count") }}
              </div>
              <span v-if="!loading" class="text-[.875rem]">{{
                current_coupon.nb_total
              }}</span>
              <BaseSkeleton v-else :shadow="'none'" class="w-16 h-4" />
            </div>

            <div class="mt-5">
              <div class="font-bold text-[1rem]">
                {{ $t("coupons_page.common.uses-count") }}
              </div>
              <span v-if="!loading" class="text-[.875rem]">{{
                current_coupon.nb_used
              }}</span>
              <BaseSkeleton v-else :shadow="'none'" class="w-16 h-4" />
            </div>

            <div class="mt-5">
              <div class="font-bold text-[1rem]">
                {{ $t("coupons_page.common.amount") }}
              </div>
              <span v-if="!loading" class="text-[.875rem]"
                >{{ $formatAmount(current_coupon.amount) }} XAF</span
              >
              <BaseSkeleton v-else :shadow="'none'" class="w-32 h-4" />
            </div>

            <div class="mt-5">
              <div class="font-bold text-[1rem]">
                {{ $t("coupons_page.common.validity") }}
              </div>
              <template v-if="!loading">
                <span v-if="$i18n.locale === 'fr'" class="text-[.875rem]">
                  Du
                  <b>{{
                    new Date(current_coupon.date_debut).toLocaleDateString()
                  }}</b>
                  au
                  <b>{{
                    new Date(current_coupon.date_fin).toLocaleDateString()
                  }}</b>
                </span>
                <span v-else class="text-[.875rem]">
                  From
                  <b>{{
                    new Date(current_coupon.date_debut).toLocaleDateString()
                  }}</b>
                  to
                  <b>{{
                    new Date(current_coupon.date_fin).toLocaleDateString()
                  }}</b>
                </span>
              </template>
              <BaseSkeleton v-else :shadow="'none'" class="w-64 h-4" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="mt-5">
              <div class="font-bold text-[1rem]">
                {{ $t("coupons_page.common.required-spend") }}
              </div>
              <span v-if="!loading" class="text-[.875rem]"
                >{{
                  $formatAmount(current_coupon.nb_total * current_coupon.amount)
                }}
                XAF</span
              >
              <BaseSkeleton v-else :shadow="'none'" class="w-32 h-4" />
            </div>
            <div class="mt-5">
              <div class="font-bold text-[1rem]">
                {{ $t("coupons_page.common.current-spend") }}
              </div>
              <span v-if="!loading" class="text-[.875rem]"
                >{{
                  $formatAmount(current_coupon.nb_used * current_coupon.amount)
                }}
                XAF</span
              >
              <BaseSkeleton v-else :shadow="'none'" class="w-32 h-4" />
            </div>

            <div class="mt-5">
              <div class="font-bold text-[1rem]">
                {{ $t("coupons_page.common.status") }}
              </div>
              <span
                v-if="!loading"
                class="text-[.875rem]"
                :class="{
                  'text-green-700': current_coupon.status == '1',
                  'text-red-600': current_coupon.status != '1',
                }"
                >{{
                  current_coupon.status == "1"
                    ? $t("coupons_page.active-label")
                    : $t("coupons_page.suspended-label")
                }}</span
              >
              <BaseSkeleton v-else :shadow="'none'" class="w-24 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";

import CouponModalDelete from "@/components/coupons/modal/CouponModalDelete.vue";
import CouponModalSuspend from "@/components/coupons/modal/CouponModalSuspend.vue";
import CouponModalUnSuspend from "@/components/coupons/modal/CouponModalUnSuspend.vue";
import CouponUpdate from "@/views/coupons/manage/CouponUpdate.vue";
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";

export default {
  components: {
    CouponUpdate,
    CouponModalDelete,
    CouponModalSuspend,
    CouponModalUnSuspend,
    BaseSkeleton,
  },
  async beforeRouteEnter(to, _from, next) {
    await store.dispatch("coupons/set_loading", true);
    await store
      .dispatch("coupons/get_coupon", to.params.coupon_code)
      .then((data) => {
        if (data.error) {
          next({ name: "404" });
        }
      });
    await store.dispatch("coupons/set_loading", false);

    next();
  },
  computed: {
    ...mapGetters("coupons", ["coupons", "current_coupon", "loading"]),
  },
  watch: {
    "$route.params.coupon_code": {
      handler: async function (coupon_code) {
        await store.dispatch("coupons/set_loading", true);
        await store.dispatch("coupons/get_coupon", coupon_code);
        await store.dispatch("coupons/set_loading", false);
      },
    },
  },
  mounted() {},
  methods: {
    // async reloadProduct() {
    //   await store.dispatch("setGlobalLoading", true);
    //   await store.dispatch("coupons/get_coupon", this.$route.coupon_code);
    //   await store.dispatch("setGlobalLoading", false);
    // },
  },
};
</script>

<style scoped>


form::before {
  position: absolute;
  content: "";
  border-image-slice: 5 5 fill;
  box-sizing: content-box;
  height: 100%;
  top: -20px;
  left: -20px;
  border-image-width: 20px;
  border-image-repeat: stretch;
  border-style: solid;
  border-width: 20px;
  /* z-index: -2; */
  width: 100%;
  border-image-source: url(data:image/png;base64,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);
}
</style>
