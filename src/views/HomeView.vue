<script setup>
import BaseButtons from "@/components/common/BaseButtons.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import { mapGetters } from "vuex";
import { computed, reactive, ref } from "vue";

const isModalActive = ref(false);
const isModalDangerActive = ref(false);
const showLanguageDropdown = ref(false);

const languages = computed(() => {
  return {
    current: "Français",
    list: ["Français", "Anglais"],
  };
});

const setChousedLanguage = (lang) => {
  console.log(lang);
  showLanguageDropdown.value = false;
  languages.value.current = lang;
};
</script>

<template>
  <div>
    <CardBoxModal v-model="isModalActive" title="Sample modal">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal
      v-model="isModalDangerActive"
      title="Please confirm"
      button="danger"
      has-cancel
    >
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>
    <vue-feather type="info"></vue-feather>
    <BaseButtons type="justify-start lg:justify-end" no-wrap>
      <BaseButton
        color="info"
        icon="trash-2"
        small
        @click="isModalActive = true"
      />

      <BaseButton
        color="danger"
        icon="info"
        small
        @click="isModalDangerActive = true"
      />
    </BaseButtons>

    <div class="grid grid-cols-1 gap-x-6 gap-y-3 mb-10">
      <div class="font-[400]">{{ $t("common.previous") }}</div>
      <ul class="relative">
        <li
          class="flex items-center justify-between p-2 bg-[#f9fafb] rounded-lg w-full"
          @click="showLanguageDropdown = !showLanguageDropdown"
        >
          <div class="font-bold w-[90%]">
            {{ $i18n.locale == "en" ? "Anglais" : "Français" }}
          </div>
          <button class="w-[10%] flex justify-end">
            <vue-feather type="edit-3"></vue-feather>
          </button>
        </li>

        <Transition>
          <ul
            v-if="showLanguageDropdown"
            class="w-full h-auto bg-[#f9fafb] shadow-md rounded-b-lg overflow-hidden z-50 absolute top-10 flex flex-col gap-4"
          >
            <!-- TODO: Languages logic here -->
            <li
              class="hover:bg-slate-300 px-4 p-2 cursor-pointer"
              @click.stop.prevent="
                changeLanguage('fr');
                showLanguageDropdown = false;
              "
            >
              Français
            </li>
            <li
              class="hover:bg-slate-300 px-4 p-2 cursor-pointer"
              @click.stop.prevent="
                changeLanguage('en');
                showLanguageDropdown = false;
              "
            >
              Anglais
            </li>
          </ul>
        </Transition>
      </ul>
      <div
        v-if="showLanguageDropdown"
        class="w-full h-screen z-10 fixed"
        @click="showLanguageDropdown = false"
      ></div>

      <!-- <div class="font-[400]">Montant d'aide minimum</div>

          <div
            class="flex items-center justify-between p-2 bg-[#f9fafb] rounded-lg w-full"
          >
            <div class="font-bold w-[90%]">
              {{ current_association.min_help_amount }}
            </div>
            <button
              class="w-[10%] flex justify-end"
              @click="updateValue('ass_help')"
            >
              <vue-feather type="edit-3"></vue-feather>
            </button>
          </div> -->
    </div>
  </div>
</template>

<style></style>
