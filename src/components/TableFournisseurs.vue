<script setup>
import BaseAmountWithArrow from "@/components/common/BaseAmountWithArrow.vue";
import BaseStatusButton from "@/components/common/BaseStatusButton.vue";
import BaseButton from "@/components/common/BaseButton.vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
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

                <!-- <th
                  scope="col"
                  class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th> -->
                <th />
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(item, index) in details" :key="index">
                <td class="whitespace-nowrap text-sm font-normal text-gray-900">
                  {{ item.name }}
                </td>
                <!-- <td class="whitespace-nowrap text-sm font-normal text-gray-500">
                  Apr 23 ,2021
                </td> -->

                <td class="flex justify-center items-center">
                  <BaseButtons type="justify-start" no-wrap class="flex gap-3">
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
