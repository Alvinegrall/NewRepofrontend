<template>
  <!-- Modal -->

  <div
    v-if="current_order.reference"
    id="orderDetailsView"
    class="modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    tabindex="-1"
    aria-labelledby="orderDetailsViewLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div
      class="modal-dialog modal-dialog-scrollable modal-xl relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
        >
          <h5
            id="orderDetailsViewLabel"
            class="text-lg font-bold leading-normal text-gray-800"
          >
            <!-- {{ $t("products_page.forms.add-product.title") }} -->
            Détails de la commande
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$router.replace('/orders')"
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
            @submit.prevent="handleSubmit($target)"
          >
            <div class="row">
              <div
                class="mb-4 col-xs-12 col-sm-12 col-md-12 align-items-center"
              >
                <div>
                  <span class="text-2xl text-red-500 mb-4">
                    # {{ current_order.reference }}
                  </span>
                </div>
                <table
                  class="table table-WALLETd all-package col-sm-12 table-bordered table-striped table-condensed cf"
                >
                  <thead class="cf">
                    <tr>
                      <th>{{ $t("transactions.properties.ref") }}</th>
                      <th>{{ $t("transactions.properties.date") }}</th>
                      <th>{{ $t("transactions.properties.client") }}</th>
                      <th>{{ "Description" }}</th>
                      <th>{{ $t("transactions.properties.amount") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td :data-title="'Ref.'">
                        {{ current_order.reference }}
                      </td>

                      <td :data-title="$t('transactions.properties.date')">
                        <span>{{
                          new Date(
                            current_order.create_date * 1000
                          ).toLocaleDateString()
                        }}</span
                        ><br />
                        <span>{{
                          new Date(
                            current_order.create_date * 1000
                          ).toLocaleTimeString()
                        }}</span>
                      </td>

                      <td data-title="Client">
                        <div class="flex gap-3 items-center">
                          <div class="text-left">
                            <span>{{ current_order.user_name }}</span>
                            <br />
                            <!-- <span class="font-bold">{{
                                transaction.user_phonenumber
                              }}</span> -->
                          </div>
                        </div>
                      </td>

                      <td :data-title="'Description'">
                        {{ current_order.description }}
                      </td>

                      <td :data-title="$t('transactions.properties.amount')">
                        <span
                          :class="{
                            // 'text-green-500': transaction.type == 0,
                            // 'text-red-500': transaction.type != 0,
                          }"
                        >
                          XAF {{ $formatAmount(current_order.total_amount) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- // Commencer à lister les champs ici -->
              <!-- Commencer par afficher à l'utilisateur qu'il a la possibilité d'ajouter des produits -->
              <div class="mt-4 mb-4">
                <p class="text-center mb-4">Liste des produits</p>

                <div class="row">
                  <div
                    v-for="(item, index) of current_order.products"
                    :key="index"
                    class="col-md-6"
                  >
                    <div
                      class="pt-4 pb-4 pl-2 pr-2 rounded-lg hover:shadow-sm border hover:border-primary"
                    >
                      <div class="d-flex mx-8 justify-content-between">
                        <!-- <i class="fa fa-user"></i> -->
                        <div class="text-red-600">
                          <span>{{ item.product_name }}</span>
                          <span>&nbsp; - &nbsp;</span>
                          <span>{{ $formatAmount(item.pu) }} XAF</span>
                        </div>
                        <span>x {{ item.qty }}</span>
                        <span>{{ $formatAmount(item.total) }} XAF</span>

                        <!-- <div class="space-x-4">
                          <button
                            title="Effacer la ligne"
                            type="button"
                            class="cursor-pointer"
                            @click.prevent="rows.splice(index, 1)"
                          >
                            <i class="fa fa-trash text-red-500"></i>
                          </button>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-none mt-4 d-flex justify-content-center">
                  <button
                    type="button"
                    class="inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                    @click="
                      rows.push({
                        link: '',
                        name: '',
                        product_id: '',
                        qty: '',
                        amount: '',
                      })
                    "
                  >
                    <i class="fa fa-plus-circle"></i> &nbsp; Nouvelle ligne
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div
          class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
        >
          <!-- <button
            type="button"
            class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-dismiss="modal"
          >
            {{ $t("products_page.forms.common.actions.close") }}
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fields: {
        urlcode: "",
        name: "",
        amount: "",
        end_date: "",
        delivery_delay: "",
      },
    };
  },
  computed: {
    ...mapGetters("products", ["categories", "products"]),
    ...mapGetters("partners", ["orders", "current_order"]),
  },
  methods: {},
};
</script>

<style scoped>

</style>
