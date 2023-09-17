<template>
  <!-- Modal -->
  <div
    id="createCoupon"
    class="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    tabindex="-1"
    aria-labelledby="createCouponLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-lg relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
        >
          <h5
            id="createCouponLabel"
            class="text-lg font-bold leading-normal text-gray-800"
          >
            {{ $t("coupons_page.forms.add-coupon.title") }}
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            X
          </button>
        </div>
        <div class="modal-body relative p-4">
          <!-- <div class="text-lg font-bold">Image du produit</div>
          <p class="text-base">
            Montrez à vos clients l’aspect que prend ce service.
          </p> -->
          <form
            id="create-form"
            class="theme-form theme-form-2 mega-form"
            @submit.prevent="handleSubmit"
          >
            <div class="row">
              <div class="mb-4 col-12 align-items-center">
                <label class="form-label-title mb-1">{{
                  $t("coupons_page.forms.common.fields.code")
                }}</label>
                <div class="">
                  <input
                    v-model="fields.coupon_code"
                    class="form-control"
                    :class="{
                      'is-valid':
                        fields.coupon_code.length && coupon_valid === true,
                      'is-invalid':
                        fields.coupon_code.length && coupon_valid === false,
                    }"
                    type="text"
                    :placeholder="$t('coupons_page.forms.common.fields.code')"
                    required
                  />
                  <div
                    v-if="coupon_valid !== null"
                    id="validationServer03Feedback"
                    :class="{
                      'valid-feedback': coupon_valid,
                      'invalid-feedback': !coupon_valid,
                    }"
                  >
                    {{
                      coupon_valid
                        ? $t(
                            "coupons_page.forms.common.feedbacks.code.available"
                          )
                        : $t("coupons_page.forms.common.feedbacks.code.taken")
                    }}
                  </div>
                </div>
              </div>

              <div class="mb-4 col-xs-12 col-md-6 align-items-center">
                <label class="mb-1 col-form-label form-label-title">{{
                  $t("coupons_page.forms.common.fields.amount")
                }}</label>
                <div class="">
                  <input
                    v-model="fields.amount"
                    class="form-control"
                    type="number"
                    :placeholder="$t('coupons_page.forms.common.fields.amount')"
                    required
                  />
                </div>
              </div>

              <div class="mb-4 col-xs-12 col-md-6 align-items-center">
                <label class="mb-1 col-form-label form-label-title">{{
                  $t("coupons_page.forms.common.fields.quantity")
                }}</label>
                <div class="">
                  <input
                    v-model="fields.nb_total"
                    class="form-control"
                    type="text"
                    :placeholder="
                      $t('coupons_page.forms.common.fields.quantity')
                    "
                    required
                    min="1"
                  />
                </div>
              </div>

              <div class="mb-4">
                <!-- Calculate and display a message with of amount times quantity total amount -->
                <div class="col-lg-12">
                  <p
                    v-if="fields.amount || fields.nb_total"
                    class="text-base font-semibold"
                  >
                    {{ $t("coupons_page.forms.common.feedbacks.total-amount") }}
                    <b
                      >{{
                        $formatAmount(fields.amount * fields.nb_total)
                      }}
                      XAF</b
                    >
                  </p>
                </div>
              </div>

              <div class="mb-4 col-xs-12 col-md-6 align-items-center">
                <label class="mb-1 col-form-label form-label-title">{{
                  $t("coupons_page.forms.common.fields.start-date")
                }}</label>
                <div class="">
                  <input
                    v-model="fields.begin_date"
                    :min="today"
                    class="form-control"
                    type="date"
                    :placeholder="
                      $t('coupons_page.forms.common.fields.start-date')
                    "
                    required
                  />
                </div>
              </div>

              <div class="mb-4 col-xs-12 col-md-6 align-items-center">
                <label class="mb-1 col-form-label form-label-title">{{
                  $t("coupons_page.forms.common.fields.end-date")
                }}</label>
                <div class="">
                  <input
                    v-model="fields.end_date"
                    :disabled="!fields.begin_date"
                    class="form-control"
                    :class="{
                      'cursor-not-allowed': !fields.begin_date,
                    }"
                    type="date"
                    :min="fields.begin_date"
                    :placeholder="
                      $t('coupons_page.forms.common.fields.end-date')
                    "
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div
          class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
        >
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
            @click="handleSubmit"
          >
            {{ $t("coupons_page.forms.common.actions.save") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CouponsService from "@/services/CouponsService";
import store from "@/store";

export default {
  data() {
    return {
      coupon_valid: null,
      fields: {
        nb_total: 0,
        amount: 0,
        coupon_code: "",
        begin_date: "",
        end_date: "",
        // coupon: null,
      },
    };
  },
  computed: {
    today() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      return yyyy + "-" + mm + "-" + dd;
    },
  },
  watch: {
    "fields.coupon_code": async function (val) {
      const urlcode = store.getters["partners/urlcode"];
      await CouponsService.getcoupon({ urlcode, coupon: val }).then(
        ({ data }) => {
          if (data.error_msg === "no_coupon") {
            this.coupon_valid = true;
          } else {
            this.coupon_valid = false;
          }
        }
      );
    },
  },
  methods: {
    async handleSubmit() {
      const form = document.getElementById("create-form");

      // Check if the form is valid
      const valid = form.checkValidity();

      // If the form isn't valid, we stop here
      if (!valid) {
        form.reportValidity();
        this.$snackbar.add({
          text: this.$t("notifications.coupons.error-empty-form"),
          type: "warning",
        });
        return;
      }

      await store.dispatch("setGlobalLoading", true);
      const urlcode = store.getters["partners/urlcode"];

      CouponsService.newcoupon({ urlcode, ...this.fields })
        .then(async ({ data }) => {
          if (!data.error) {
            this.$snackbar.add({
              text: this.$t("notifications.coupons.create.success"),
              type: "success",
            });

            form.reset();

            this.fields = {
              nb_total: 0,
              amount: 0,
              coupon_code: "",
              begin_date: "",
              end_date: "",
              // coupon: null,
            };

            await store.dispatch("coupons/listcoupons");

            this.$router.push({
              name: "coupons.manage.infos",
              params: { coupon_code: data.coupon.coupon_code },
            });

            window.$("#createCoupon").modal("hide");
          } else {
            this.$snackbar.add({
              text: this.$t("notifications.coupons.create.error"),
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$snackbar.add({
            text: this.$t("notifications.coupons.create.error"),
            type: "error",
          });
        })
        .finally(() => {
          store.dispatch("setGlobalLoading", false);
        });
    },
  },
};
</script>

<style scoped>

</style>
