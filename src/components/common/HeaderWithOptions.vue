<template>
  <!-- <CardBox is-form @submit.prevent="submitProfile">
    <FormField label="Name" help="Required. Your name">
      <FormControl
        v-model="profileForm.name"
        :icon="'search'"
        name="username"
        placeholder="Enter your name"
        required
        autocomplete="username"
      />
    </FormField>
    <BaseButton color="info" type="submit" label="Submit" />
  </CardBox> -->
  <!-- <CardBox is-form @submit.prevent="submitProfile">
    <FormField label="Name" help="Required. Your name">
      <FormControl
        v-model="profileForm.name"
        :icon="'search'"
        name="username"
        placeholder="Enter your name"
        required
        autocomplete="username"
      />
    </FormField>
    <BaseButtons>
      <BaseButton color="info" type="submit" label="Submit" />
      <BaseButton color="info" label="Options" outline />
    </BaseButtons>
  </CardBox> -->
  <div class="sm:flex mb-4">
    <div
      class="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0"
    >
      <div class="lg:pr-3">
        <label for="users-search" class="sr-only">Search</label>
        <div class="mt-1 relative lg:w-64 xl:w-96">
          <FormControl
            v-model="searchKey"
            :icon="'search'"
            name="username"
            placeholder="Rechercher..."
            required
            autocomplete="username"
            @input="makeResearch"
          />
        </div>
      </div>
      <div class="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
        <a
          href="#"
          class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>

        <a
          href="#"
          class="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center"
        >
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>

    <div class="ml-auto">
      <BaseButton
        v-if="hasOneBtn"
        :icon="icons[0] ?? 'info'"
        color="info"
        iconSize="18"
        :label="btnLabel[0] ?? ''"
        @click="btnClick"
        :outline="outline"
      />
      <BaseButtons v-else>
        <BaseButton
          :icon="icons[0] ?? 'info'"
          color="info"
          iconSize="18"
          :label="btnLabel[0] ?? ''"
          @click="btnClick"
        />
        <BaseButton color="info"  :icon="icons[1] ?? 'info'" :label="btnLabel[1] ?? ''" outline />
      </BaseButtons>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import CardBox from "@/components/common/CardBox.vue";

// const profileForm = ref("");
defineProps({
  btnLabel: {
    type: Array,
    default: () => [],
  },
  icons: {
    type: Array,
    default: () => [],
  },
  hasOneBtn: Boolean,
  outline: Boolean
});
const emit = defineEmits(["makeResearch", "btnClick"]);

const searchKey = ref("");

const makeResearch = (event) => {
  emit("makeResearch", event);
  //   mainStore.setUser(profileForm);
};
const btnClick = (event) => {
  emit("btnClick", event);
};
</script>

<style></style>
