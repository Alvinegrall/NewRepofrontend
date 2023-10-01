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
    
    </div>

    <div class="ml-auto">
      <BaseButton
        v-if="hasOneBtn"
        :icon="icons[0] ?? 'info'"
        color="success"
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
