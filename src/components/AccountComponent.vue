<script setup>
import CompteHeader from "@/components/common/CompteHeader.vue";
import BaseDropdownButton from "@/components/common/BaseDropdownButton.vue";
import CompteAmountAndLabel from "@/components/common/CompteAmountAndLabel.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  details: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();

const dropdownOpen = ref(false);
const btnDropdownOpen = ref(false);
const emit = defineEmits(["btn-more-options"]);

const moreOptions = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const showdetails = () => {
  router.push({
    name: "finance.detail-compte",
    params: { public_ref: "item.public_ref" },
  });
};
</script>

<template>
  <div class="relative">
    <CompteHeader
      :title="details.name"
      :publicRef="details.public_ref"
      @more-options="moreOptions()"
    />
    <div @click="showdetails">
      <div
        v-show="dropdownOpen"
        @click="dropdownOpen = false"
        class="fixed inset-0 z-10 w-full h-full"
      ></div>
      <transition
        enter-active-class="transition duration-150 ease-out transform"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in transform"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <div
          v-show="dropdownOpen"
          class="absolute right-0 z-50 w-48 py-2 bg-white rounded-lg shadow-xl border"
        >
          <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
            >Voir les détails</a
          >
          <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
            >Faire un dépôt</a
          >
          <router-link to="/" class="block px-4 py-2 text-sm hover:bg-gray-200"
            >Faire un retrait</router-link
          >
        </div>
      </transition>

      <CompteAmountAndLabel
        isColorText
        amountSize="text-4xl"
        :amount="details.balance"
        label="Solde principale"
        labelColor="text-gray-500"
        amountColor=""
        class="mb-5"
      />

      <CompteAmountAndLabel
        isColorText
        amountSize="text-3xl"
        amount="0"
        label="Solde Faroty"
        labelColor="text-gray-500"
        amountColor="info"
        class="mb-5"
      />
    </div>

    <div class="mt-5 flex items-center justify-between">
      <BaseDropdownButton
        roundedFull
        color="info"
        label="Transférer"
        icon="chevron-down"
      />

      <img src="/wallet.png" class="w-8" alt="" />
    </div>
  </div>
</template>
