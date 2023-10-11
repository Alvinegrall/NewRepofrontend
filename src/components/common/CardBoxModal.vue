<script setup>
import { computed } from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import CardBox from "@/components/common/CardBox.vue";
import OverlayLayer from "@/components/common/OverlayLayer.vue";
import CardBoxComponentTitle from "@/components/common/CardBoxComponentTitle.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: "",
  },
  button: {
    type: String,
    default: "success",
  },
  buttonLabel: {
    type: String,
    default: "Valider",
  },
  cancelBtnLabel:{
    type: String,
    default: "Annuler",
  },

  hasCostomWith: Boolean,
  hasCancel: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "cancel", "confirm"]);

const value = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const cartElClass = computed(() => {
  const base = [
    "shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 z-50 ",
    props.hasCostomWith ? props.width : " xl:w-4/12 ",
  ];

  if (props.icon) {
    base.push("pl-10");
  }

  return base;
});

const confirmCancel = (mode) => {
  value.value = false;
  emit(mode);
};

const confirm = () => confirmCancel("confirm");

const cancel = () => confirmCancel("cancel");

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && value.value) {
    cancel();
  }
});
</script>

<template>
  <OverlayLayer v-if="value" @overlay-click="cancel">
    <CardBox v-if="value" :class="cartElClass" is-modal>
      <CardBoxComponentTitle :title="title">
        <!-- <BaseButton
          v-if="hasCancel"
          icon="x"
          color="whiteDark"
          small
          rounded-full
          @click.prevent="cancel"
        /> -->
        <BaseButton v-if="hasCancel" icon="x" small @click.prevent="cancel" />
      </CardBoxComponentTitle>

      <div class="space-y-3">
        <slot />
      </div>

      <template #footer>
        <BaseButtons>
          <BaseButton :label="buttonLabel" :color="button" @click="confirm" />
          <BaseButton
            v-if="hasCancel"
            :label="cancelBtnLabel"
            :color="button"
            outline
            @click="cancel"
          />
        </BaseButtons>
      </template>
    </CardBox>
  </OverlayLayer>
</template>
