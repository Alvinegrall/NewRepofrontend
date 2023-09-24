<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  currency: {
    type: String,
    default: "XAF",
  },
  details: {
    type: Array,
    default: () => {},
  },
});
const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};
</script>

<template>
  <div>
    <h5 id="defaultMembreLabel" class="modal-title text-sm mb-3 font-semibold">
      Statu des cotisations
    </h5>
    <div class="flex w-full justify-between mb-5 border rounded-lg">
      <div
        class="text-gray-500 text-sm border-r text-center p-1 rounded-tl-lg rounded-bl-lg w-full"
      >
        <div>Cotisation</div>
        <div class="font-semibold">
          {{ details?.source_amount }} {{ currency }}
        </div>
      </div>
      <div class="text-green-500 p-1 text-sm border-r text-center w-full">
        <div>Versé</div>
        <div class="font-semibold">
          {{ details?.balance_after }} {{ currency }}
        </div>
      </div>
      <div
        class="text-red-500 p-1 text-sm text-center rounded-tr-lg rounded-br-lg w-full"
      >
        <div>Restant</div>
        <div class="font-semibold">
          {{ details?.balance_remaining }} {{ currency }}
        </div>
      </div>
    </div>
    <h5 id="defaultMembreLabel" class="modal-title text-sm mb-3 font-semibold">
      Détails
    </h5>

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
                  class="flex items-center flex-1 p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in details?.transanctions" :key="index">
                <td
                  class="p-4 whitespace-nowrap text-sm font-normal text-gray-900"
                >
                  Payment from <span class="font-semibold">Bonnie Green</span>
                </td>
                <td
                  class="p-4 whitespace-nowrap text-sm font-normal text-gray-500"
                >
                  {{ formateDate(item.created_at) }}
                </td>

                <BaseAmountWithArrow
                  isColorText
                  isTable
                  :amount="item.amount"
                />
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
