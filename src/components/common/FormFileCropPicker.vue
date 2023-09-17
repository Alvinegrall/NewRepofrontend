<script setup>
import { computed, reactive, ref } from "vue";
import BaseButton from "@/components/common/BaseButton.vue";
import FormField from "@/components/common/FormField.vue";


const props = defineProps({
  modelValue: {
    type: [Object, File, Array],
    default: null,
  },
  label: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: "upload-cloud",
  },
  accept: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: "info",
  },
  isRoundIcon: Boolean,
});

const emit = defineEmits(["img-data"]);

const fields = reactive({
  logo: { url: null, data: null },
});

const params = reactive({
  token: "123456798",
  name: "avatar",
});
const headers = reactive({
  smail: "*_~",
});
const imgDataUrl = ref("");
const show_avatar = ref(false);

const upload = () => {
  show_avatar.value = true;
};
const cropSuccessBg = (imgDataUrl) => {
  fields.logo.url = imgDataUrl;
  fields.logo.data = imgDataUrl.split("base64,")[1];
  emit("img-data", fields.logo);
};
</script>

<template>
  <div>
    <my-upload
      v-model="show_avatar"
      field="img"
      :params="params"
      :headers="headers"
      :lang-type="$i18n.locale"
      img-format="png"
      @crop-success="cropSuccessBg"
    ></my-upload>

    <div class="flex items-center gap-3">
      <FormField label="Choisir une photo" help="Max 500kb">
        <label class="inline-flex">
          <BaseButton
            as="a"
            :class="{
              'w-12 h-12': isRoundIcon,
            }"
            :icon-size="isRoundIcon ? 24 : undefined"
            :label="isRoundIcon ? null : label"
            :icon="icon"
            :color="color"
            :rounded-full="isRoundIcon"
            @click="upload"
          />
        </label>
      </FormField>
      <div class="w-24 md:w-28 lg:w-28 shadow-md rounded-lg">
        <img
          class="object-cover"
          :src="fields.logo.url || '/default.png'"
          alt=""
        />
      </div>
    </div>
  </div>
</template>
