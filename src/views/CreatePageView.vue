<template>
  <VOnboardingWrapper
    ref="wrapper"
    :steps="steps"
    :options="{
      labels: {
        previousButton: 'Précédent',
        nextButton: 'Suivant',
        finishButton: 'Terminer',
      },
    }"
  />

  <form
    class="h-screen overflow-scroll bg-[#f0f2f5] flex flex-col md:block pb-16 md:pb-0"
    @submit.prevent="handleSubmit"
  >
    <div
      class="w-auto relative md:fixed md:w-4/12 lg:w-3/12 left-box col-span-3 bg-white"
    >
      <div
        class="flex flex-col justify-between h-full overflow-y-scroll scrollbar-hide pb-12 md:pb-36"
      >
        <div class="p-8">
          <div id="form-fields" class="mb-6">
            <h1 class="text-2xl font-bold mb-1" style="text-transform: none">
              <!-- Créer une Page -->
              {{ $t("create_page.title") }}
            </h1>
            <p class="text-sm text-[#65676b] leading-5 font-light">
              <!-- Les internautes accèdent à votre Page pour en savoir plus sur
              vous. Veillez à y inclure toutes les informations dont ils
              pourraient avoir besoin. -->
              {{ $t("create_page.description") }}
            </p>
          </div>

          <div class="flex-1">
            <div>
              <BaseInput
                :label="$t('create_page.name')"
                :name="'name'"
                :required="'required'"
                :modelvalue="fields.name"
                @update:modelvalue="fields.name = $event"
              />
              <p
                class="mt-1.5 text-gray-500 text-[12px] font-extralight leading-4"
              >
                <!-- Utilisez le nom de votre entreprise, marque ou organisation, ou
                un nom qui décrit votre Page. -->
                {{ $t("create_page.name_description") }}
              </p>
            </div>

            <div class="mt-6 relative">
              <BaseAutocompleteInput
                :label="$t('create_page.category')"
                :name="'cat_id'"
                :required="'required'"
                :modelvalue="fields.cat_id"
                :items="
                  categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  }))
                "
                @update:modelvalue="fields.cat_id = $event"
              />
              <p
                class="mt-1.5 text-gray-500 text-[12px] font-extralight leading-4"
              >
                <!-- Saisissez la catégorie qui vous décrit le mieux. -->
                {{ $t("create_page.category_description") }}
              </p>
            </div>

            <div class="mt-6">
              <BaseInput
                :label="$t('create_page.email')"
                :name="'email'"
                :required="'required'"
                :modelvalue="fields.email"
                @update:modelvalue="fields.email = $event"
              />
              <p
                class="mt-1.5 text-gray-500 text-[12px] font-extralight leading-4"
              >
                <!-- Votre adresse email que nous utiliserons pour vous notifier. -->
                {{ $t("create_page.email_description") }}
              </p>
            </div>

            <div class="mt-6">
              <BaseInputPhone
                :label="$t('create_page.phone_number')"
                :name="'phone_number'"
                :modelvalue="fields.phone_number"
                :error="errors.phone_number"
                @update:modelvalue="fields.phone_number = $event"
              />

              <p
                class="mt-1.5 text-gray-500 text-[12px] font-extralight leading-4"
              >
                <!-- Renseignez votre numéro de téléphone pour d'éventuelles
                notifications -->
                {{ $t("create_page.phone_number_description") }}
              </p>
            </div>

            <div class="mt-6">
              <BaseTextarea
                :label="$t('create_page.bio')"
                :name="'bio'"
                :required="'required'"
                :modelvalue="fields.bio"
                @update:modelvalue="fields.bio = $event"
              />
              <p class="mt-1.5 text-gray-500 text-sm font-extralight leading-4">
                <!-- Dites-en plus sur votre activité. -->
                {{ $t("create_page.bio_description") }}
              </p>
            </div>
          </div>
        </div>

        <div class="fixed bottom-0 w-full z-[6]">
          <div
            class="bottom-actions w-full md:w-4/12 lg:w-3/12 py-4 px-4 h-full"
          >
            <button
              id="submit-button"
              class="bg-primary text-gray-100 disabled:bg-[#e4e6eb] disabled:text-[#bcc0c4] rounded-lg w-full h-10 text-lg font-semibold"
              :disabled="!submit_possible"
              type="submit"
            >
              <!-- Enregistrer la page -->
              {{ $t("create_page.save_page") }}
            </button>

            <div class="text-center mt-2 text-sm">
              <span class="text-[#86888b] tracking-wider">
                <!-- En créant une Page, vous acceptez les -->
                {{ $t("create_page.accept") }}
                &nbsp;
              </span>
              <a
                href="#"
                target="_blank"
                class="text-primary text-sm tracking-wider hover:underline"
              >
                <!-- Règles relatives aux Pages et à la confidentialité -->
                {{ $t("create_page.rules") }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full m-0 px-[10px] md:w-8/12 lg:w-9/12 md:ml-[34%] lg:ml-[25%] py-8 sm:px-8 md:px-12 lg:px-12 bg-[#f0f2f5]"
    >
      <div class="right-box rounded-lg p-4 bg-white h-full w-full">
        <div class="font-semibold text-lg">
          <!-- Aperçu de la page -->
          {{ $t("create_page.preview") }}
        </div>
        <div class="mt-4 border rounded-lg">
          <div class="relative">
            <div
              class="h-40 md:h-60 lg:h-80 lg:w-auto rounded-lg bg-cover"
              :style="
                'background-image: url(' +
                (fields.bg.url || '/admin/assets/images/default/bg_cover.png') +
                ')'
              "
            ></div>
            <div
              id="edit-bg"
              class="absolute right-4 top-4 bg-slate-500 rounded-full w-12 h-12 flex items-center justify-center opacity-80 text-white cursor-pointer hover:opacity-95"
              @click="show_bg = true"
            >
              <vue-feather type="camera"></vue-feather>
            </div>

            <Teleport to="body">
              <!-- <vue-avatar-upload
                v-show="show_bg"
                :fixed="true"
                :i18="{
                  title: 'Choisissez votre image',
                  changeAvatar: 'Changer l\'image',
                  rotate: 'Rotation',
                  preview: 'Aperçu',
                  cancel: 'Annuler',
                  confirm: 'Confirmer',
                }"
                @close="show_bg = false"
                @befoure-upload="handleBeforeUploadBg"
              /> -->
              <my-upload
                v-model="show_bg"
                field="img"
                :width="290 * 3"
                :height="156 * 3"
                :params="params"
                :headers="headers"
                img-format="png"
                :lang-type="$i18n.locale"
                @crop-success="cropSuccessBg"
              ></my-upload>
            </Teleport>
          </div>
          <div class="flex justify-center">
            <div
              class="relative bottom-[50px] lg:bottom-[100px] flex flex-col items-center"
            >
              <div id="edit-logo" class="relative">
                <img
                  class="w-24 md:w-32 lg:w-40 outline-[10px] outline-gray-900 border-[5px] border-gray-50 rounded-full bg-white"
                  :src="
                    fields.logo.url || '/admin/assets/images/default/logo.png'
                  "
                  alt=""
                />
                <div
                  class="absolute right-2 top-2 md:right-5 bg-slate-500 rounded-full w-8 h-8 md:w-9 md:h-9 flex items-center justify-center opacity-90 text-white cursor-pointer hover:opacity-100"
                  @click="show_logo = true"
                >
                  <vue-feather
                    type="camera"
                    class="scale-75 md:scale-100"
                  ></vue-feather>
                </div>

                <Teleport to="body">
                  <!-- <vue-avatar-upload
                    v-show="show_logo"
                    :i18="{
                      title: 'Choisissez votre image',
                      changeAvatar: 'Changer l\'image',
                      rotate: 'Rotation',
                      preview: 'Aperçu',
                      cancel: 'Annuler',
                      confirm: 'Confirmer',
                    }"
                    @close="show_bg = false"
                    @befoure-upload="handleBeforeUploadLogo"
                  /> -->
                  <my-upload
                    v-model="show_logo"
                    field="img"
                    :width="150"
                    :height="150"
                    :params="params"
                    :headers="headers"
                    img-format="png"
                    :lang-type="$i18n.locale"
                    @crop-success="cropSuccessLogo"
                  ></my-upload>
                </Teleport>
              </div>

              <div
                class="text-xl md:text-2xl lg:text-3xl font-semibold mt-4 text-gray-400"
                :class="{
                  'text-gray-400': !fields.name.length,
                  'text-gray-900': fields.name.length,
                }"
              >
                <!-- Nom de la page -->
                {{
                  fields.name.length ? fields.name : $t("create_page.page_name")
                }}
              </div>
              <div
                class="mt-2 md:mt-0 text-base md:text-lg font-light text-gray-900"
              >
                {{ fields.bio ?? "" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { VOnboardingWrapper, useVOnboarding } from "v-onboarding";
import "v-onboarding/dist/style.css";

import BaseInput from "../components/common/BaseInput.vue";
import BaseTextarea from "../components/common/BaseTextarea.vue";
import BaseInputPhone from "../components/common/BaseInputPhone.vue";
import { mapGetters } from "vuex";
import BaseAutocompleteInput from "../components/common/BaseAutocompleteInput.vue";
import PageService from "../services/PageService";
import AssociationService from "../services/AssociationService";

import store from "../store";

export default {
  components: {
    BaseInput,
    BaseTextarea,
    BaseInputPhone,
    VOnboardingWrapper,
    BaseAutocompleteInput,
  },

  setup() {
    const wrapper = ref(null);
    const { start } = useVOnboarding(wrapper);

    const steps = [
      {
        attachTo: { element: "#form-fields" },
        content: {
          title: "Informations sur la page",
          description:
            "Formulaire à remplir pour la création de votre Business Page ",
        },
      },
      {
        attachTo: { element: "#edit-bg" },
        content: {
          title: "Image de couverture",
          description:
            "Ici pour définir l'image de couverture de votre Business Page",
        },
      },
      {
        attachTo: { element: "#edit-logo" },
        content: {
          title: "Votre Logo",
          description: "Ici pour ajouter un logo à votre Business Page",
        },
      },
      {
        attachTo: { element: "#submit-button" },
        content: {
          title: "Enregistrer la page",
          description:
            "Ici pour soumettre le formulaire lorsque toutes les données sont renseignées",
        },
      },
    ];

    return {
      wrapper,
      steps,
      start,
    };
  },
  data() {
    return {
      fields: {
        name: "",
        email: "",
        cat_id: null,
        bio: "",
        phone_number: "",
        logo: { url: null, data: null },
        bg: { url: null, data: null },
      },
      errors: {},
      show_logo: false,
      show_bg: false,
      params: {
        token: "123456798",
        name: "avatar",
      },
      headers: {
        smail: "*_~",
      },
      imgDataUrl: "",
    };
  },
  computed: {
    // ...mapGetters("page_categories", ["categories"]),
    ...mapGetters("auth", ["currentUser"]),

    categories() {
      return store.getters["page_categories/categories"] || [];
    },
    // getCategorie() {
    //   return this.categories.find(
    //     (category) => category.name == this.fields.cat_id
    //   )
    // },

    submit_possible() {
      if (
        this.fields.name.trim().length &&
        this.fields.cat_id &&
        this.categories.findIndex(
          (category) => category.name == this.fields.cat_id
        ) != -1 &&
        this.fields.phone_number &&
        this.fields.email
      ) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    const create_page_demo = localStorage.getItem("@DEMO_CREATE_PAGE");
    if (!create_page_demo) {
      this.start();
      localStorage.setItem("@DEMO_CREATE_PAGE", "complete");
    }
  },
  methods: {
    async handleSubmit() {
      const fields = {
        cat_id: this.categories.find(
          (category) => category.name == this.fields.cat_id
        ).id,
        name: this.fields.name,
        bio: this.fields.bio,
        phone: this.fields.phone_number,
        ind: "237",
        email: this.fields.email,
        logo_string: this.fields.logo.data,
        bg_string: this.fields.bg.data,
      };

      if (!this.submit_possible) {
        this.$snackbar.add({
          text: "Veuillez remplir tous les champs obligatoires",
          type: "error",
        });
        return;
      }

      store.dispatch("setGlobalLoading", true);

      if (fields.cat_id == 14) {
        const memberData = {
          first_name: this.currentUser.name,
          first_phone: this.currentUser.phone,
          country: this.currentUser.country_name,
          hash_id: this.currentUser.hash_id,
        };

        const datas = {
          group_data: fields,
          member_data: memberData,
        };

        AssociationService.createNewGroupe(datas)
          .then((response) => {
            console.log("response", response);
            if (!response.data.error) {
              this.$snackbar.add({
                text: "Page crée avec succès",
                type: "success",
              });
              store.dispatch("auth/refreshuser").then(() => {
                window.location.reload();
              });
              this.$router.push({
                name: "home",
              });
            
            }
          })
          .catch((error) => {
            this.$snackbar.add({
              text: "Erreur lors de l'ajout du membre",
              type: "error",
            });
            console.log("error", error);
          })
          .finally(() => {
            store.dispatch("setGlobalLoading", false);
          });
      } else {
        await PageService.create(fields)
          .then(async ({ data }) => {
            if (!data.error) {
              console.log("created pages:", data);

              this.$snackbar.add({
                text: "Page créée avec succès",
                type: "success",
              });
            } else {
              this.$snackbar.add({
                text: "Erreur lors de la création de la page. Veuillez réessayer",
                type: "error",
              });
            }
          })
          .catch(() => {
            this.$snackbar.add({
              text: "Erreur lors de la création de la page. Veuillez réessayer",
              type: "error",
            });
          })
          .finally(() => {
            store.dispatch("setGlobalLoading", false);
          });
      }
    },
    handleBeforeUploadBg(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.cropSuccessBg(e.target.result);
        this.show_bg = false;
      };

      return true;
    },
    handleBeforeUploadLogo(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.cropSuccessLogo(e.target.result);
        this.show_logo = false;
      };

      return true;
    },
    cropSuccessBg(imgDataUrl) {
      this.fields.bg.url = imgDataUrl;
      this.fields.bg.data = imgDataUrl.split("base64,")[1];
    },
    cropSuccessLogo(imgDataUrl) {
      this.fields.logo.url = imgDataUrl;
      this.fields.logo.data = imgDataUrl.split("base64,")[1];
    },
  },
};
</script>

<style scoped>


.bottom-actions {
  box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.left-box {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  /* height: calc(100vh - 100px); */
  height: calc(100vh - 80px);
}

.right-box {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
}
</style>

<i18n lang="json">
{
  "fr": {
    "create_page": {
      "title": "Créer une page",
      "description": "Les internautes accèdent à votre Page pour en savoir plus sur vous. Veillez à y inclure toutes les informations dont ils pourraient avoir besoin.",
      "name": "Nom de la page *",
      "name_description": " Utilisez le nom de votre entreprise, marque ou organisation, ou un nom qui décrit votre Page",
      "category": "Catégorie *",
      "category_description": " Saisissez la catégorie qui vous décrit le mieux.",
      "email": "Adresse email *",
      "email_description": " Votre adresse email que nous utiliserons pour vous notifier.",
      "phone_number": "Numéro de téléphone *",
      "phone_number_description": " Renseignez votre numéro de téléphone pour d'éventuelles notifications.",
      "bio": "Bio (facultatif)",
      "bio_description": " Dites-en plus sur votre activité.",
      "save_page": "Enregistrer la page",
      "accept": "En créant une Page, vous acceptez les",
      "rules": "Règles relatives aux Pages et à la confidentialité",
      "preview": "Aperçu de la page",
      "page_name": "Nom de la page"
    }
  },
  "en": {
    "create_page": {
      "title": "Create a page",
      "description": "People visit your Page to learn more about you. Make sure you include all the information they might need.",
      "name": "Page name *",
      "name_description": " Use your business, brand or organization name, or a name that describes your Page",
      "category": "Category *",
      "category_description": " Enter the category that best describes you.",
      "email": "Email address *",
      "email_description": " Your email address that we will use to notify you.",
      "phone_number": "Phone number *",
      "phone_number_description": " Enter your phone number for any notifications.",
      "bio": "Bio (optional)",
      "bio_description": " Tell more about your activity.",
      "save_page": "Save page",
      "accept": "By creating a Page, you agree to the",
      "rules": "Page Rules and Privacy Policy",
      "preview": "Page preview",
      "page_name": "Page name"
    }
  }
}
</i18n>
