<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import BaseButton from "@/components/common/BaseButton.vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  totalAmount: {
    type: String,
    default: "3000",
  },
  paidAmount: {
    type: String,
    default: "1000",
  },
  remainingAmount: {
    type: String,
    default: "2000",
  },
  currency: {
    type: String,
    default: "XAF",
  },
  details: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div>
    <!-- <h5 id="defaultMembreLabel" class="modal-title text-sm mb-3 font-semibold">
      Détails
    </h5> -->

    <div class="overflow-x-auto rounded-lg">
      <div class="align-middle inline-block min-w-full">
        <div class="shadow overflow-hidden sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nom
                </th>

                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Marque
                </th>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Magasins
                </th>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Catégories
                </th>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantité
                </th>

                <th
                  scope="col"
                  class="flex items-center flex-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock d'alerte
                </th>
                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock securité
                </th>
               
              
                <th />
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in 5" :key="index">
                <td class="whitespace-nowrap text-sm font-normal text-gray-900">
                  Payment from <span class="font-semibold">Bonnie Green</span>
                </td>
                <td class="whitespace-nowrap text-sm font-normal text-gray-500">
                  Apr 23 ,2021
                </td>

                <BaseAmountWithArrow isColorText isTable amount="3000" />
                <td>Lorem ipsum dolor</td>

                <td class="whitespace-nowrap text-sm font-normal text-gray-900">
                  <!-- <BaseStatusButton
                    icon="x"
                    label="Échoué"
                    roundedFull
                    danger
                  /> -->
                  <div class="flex items-center gap-3">
                    324
                    <!-- <BaseStatusButton
                      icon="check-circle"
                      label="Success"
                      success
                    /> -->
                  </div>
                </td>
                <td>Lorem ipsum dolor</td>

                <td>Lorem ipsum dolor</td>

                <td>
                  <BaseButtons type="justify-start" class="flex gap-2" no-wrap>
                    <BaseButton
                      color="info"
                      :icon="'edit'"
                      small
                      @click="isModalActive = true"
                    />

                    <BaseButton
                      color="danger"
                      icon="trash-2"
                      small
                      @click="isModalDangerActive = true"
                    />
                  </BaseButtons>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
tr:nth-child(even) {
  background-color: #fff;
}
</style>
