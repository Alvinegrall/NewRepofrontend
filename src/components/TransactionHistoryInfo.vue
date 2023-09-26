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
const formateDate = (date) => {
  const newdate = new Date(date);
  const readableDate = newdate.toLocaleString();
  return readableDate;
};
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
                  Opération
                </th>

                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date &amp; Time
                </th>

                <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th />
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in details" :key="index">
                <td class="whitespace-nowrap text-sm font-normal text-gray-900">
                  <div v-html="item.description"></div>
                </td>
                <td class="whitespace-nowrap text-sm font-normal text-gray-500">
                  {{ formateDate(item.created_at) }}
                </td>

                <td class="whitespace-nowrap text-sm font-normal text-gray-900">
                  <div class="flex items-center gap-3">
                    <BaseStatusButton
                      icon="check-circle"
                      label="Success"
                      success
                    />
                    <div class="underline text-blue-600">Détails</div>
                  </div>
                </td>
                <td>
                  <BaseButton
                    color="danger"
                    :icon="'trash-2'"
                    outline
                    small
                    @click="isModalActive = true"
                  />
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
