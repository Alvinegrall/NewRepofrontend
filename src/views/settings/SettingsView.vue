<template>
  <div class="container">
    <div
      class="mb-8 md:mb-16 flex justify-between items-center flex-wrap gap-4"
    >
      <!-- <div class="space-y-1">
      <h5 class="font-bold text-2xl">Liste des transactions</h5>
      <p>
        Vous pouvez ici consulter et gérer toutes les transactions (commandes,
        achats) effectuées sur votre Business Page.
      </p>
    </div> -->

      <div class="space-y-1">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link
                :to="{ name: 'common.home' }"
                class="inline-flex items-center text-2xl font-semibold text-gray-900 hover:text-gray-600"
              >
                {{ $t("common.breadcrumb.dashboard") }}
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="w-6 h-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span
                  href="#"
                  class="ml-1 text-2xl font-semibold text-gray-900 hover:text-gray-900 md:ml-2"
                >
                  <!-- {{ $t("clients_page.title") }} -->

                  Configurations
                </span>
              </div>
            </li>
          </ol>
        </nav>
       
      </div>

      <div id="les-actions" class="flex gap-2 md:gap-4 p-3">
        <BaseButton
          class="flex items-center justify-center space-x-2 text-[12px] sm:text-[14px] bg-primary px-3 py-2 rounded"
          @click="$router.push({ name: 'products.manage' })"
        >
          <vue-feather class="scale-50 md:scale-75" type="eye"></vue-feather>
          <span>{{ $t("common.breadcrumb.buttons.manage-products") }}</span>
        </BaseButton>
        <BaseButton
          class="flex items-center justify-center space-x-2 text-[12px] sm:text-[14px] bg-primary px-3 py-2 rounded"
          @click="$router.push({ name: 'transactions.list' })"
        >
          <vue-feather class="scale-50 md:scale-75" type="eye"></vue-feather>
          <span>{{ $t("common.breadcrumb.buttons.list-transactions") }}</span>
        </BaseButton>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body text-center self-center">
            <div class="relative mx-auto w-full">
              <Teleport to="body">
                <!-- <vue-avatar-upload
                v-show="show_bg"
                :i18="{
                  title: 'Choisissez votre logo',
                  changeAvatar: 'Changer le logo',
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

              <img
                :src="
                  current_partner.background_cover ??
                  '/admin/assets/images/default/bg_cover.png'
                "
                alt="avatar"
                class="border img-fluid"
              />
              <div
                class="absolute top-0 right-0 cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-500 bg-opacity-95 rounded-full group hover:opacity-70"
              >
                <vue-feather
                  class="scale-[0.8] hidden sm:inline text-white group-hover:text-primary"
                  type="edit"
                  @click="show_bg = true"
                ></vue-feather>
              </div>
            </div>
            <div class="text-center self-center relative bottom-10 flex">
              <div class="relative mx-auto">
                <Teleport to="body">
                  <!-- <vue-avatar-upload
                  v-show="show_logo"
                  :i18="{
                    title: 'Choisissez votre logo',
                    changeAvatar: 'Changer le logo',
                    rotate: 'Rotation',
                    preview: 'Aperçu',
                    cancel: 'Annuler',
                    confirm: 'Confirmer',
                  }"
                  @close="show_logo = false"
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

                <img
                  :src="
                    current_partner.profil_photo_url ??
                    '/admin/assets/images/default/logo.png'
                  "
                  alt="avatar"
                  class="border rounded-circle img-fluid bg-white"
                  style="width: 120px"
                />
                <div
                  class="absolute top-2 right-2 cursor-pointer w-10 h-10 flex items-center justify-center bg-gray-500 bg-opacity-95 rounded-full group hover:opacity-70"
                >
                  <vue-feather
                    class="scale-[0.8] hidden sm:inline text-white group-hover:text-primary"
                    type="edit"
                    @click="show_logo = true"
                  ></vue-feather>
                </div>
              </div>
            </div>
            <div class="relative bottom-10">
              <h5 class="my-3 text-lg font-bold">{{ current_partner.name }}</h5>
              <p class="text-muted mb-4">{{ current_partner.biography }}</p>
              <!-- <p class="text-muted mb-4">Bay Area, San Francisco, CA</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <div v-for="field in fields" :key="field.name">
              <div class="row my-2">
                <div class="col-sm-3">
                  <p class="mb-0">{{ field.label }}</p>
                </div>
                <div class="col-sm-7 flex items-center gap-2">
                  <p v-if="!field.editing" class="text-muted mb-0">
                    {{ field.value }}
                  </p>

                  <div v-else class="w-100">
                    <input
                      v-if="!field.multiline"
                      :id="`input-${field.name}-edit`"
                      v-model="field.value"
                      autofocus
                      class="border-1 p-2 bg-white"
                      type="text"
                    />

                    <textarea
                      v-if="field.multiline"
                      :id="`input-${field.name}-edit`"
                      v-model="field.value"
                      autofocus
                      class="border-1 p-2 bg-white w-100"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div
                  v-if="!field.loading"
                  class="col-sm-2 flex justify-end items-center"
                >
                  <vue-feather
                    v-if="!field.editing"
                    class="cursor-pointer hover:text-primary scale-75"
                    type="edit"
                    @click="handleStartEditing(field.name)"
                  ></vue-feather>

                  <div v-else class="space-x-1">
                    <vue-feather
                      class="cursor-pointer text-green-500 hover:text-gray-500 scale-75"
                      type="check"
                      @click="handleSave(field)"
                    ></vue-feather>

                    <vue-feather
                      class="cursor-pointer text-red-500 hover:text-gray-500 scale-75"
                      type="x"
                      @click="handleStopEditing(field)"
                    ></vue-feather>
                  </div>
                </div>
                <div v-else class="col-sm-2 flex justify-end items-center">
                  <div
                    class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-5 w-5"
                  ></div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseButton from "@/components/common/BaseButton.vue";
import PageService from "@/services/PageService";

export default {
  components: { BaseButton },
  setup() {},
  data() {
    return {
      show_logo: false,
      show_bg: false,
      fields: [
        { name: "name", value: "", label: "Nom de la page" },
        {
          name: "biography",
          value: "",
          label: "Description de la page",
          multiline: true,
        },
        { name: "slogan", value: "", label: "Slogan" },
        // { name: "location_name", value: "", label: "Votre adresse" },
        // {
        //   name: "type_name",
        //   value: "",
        //   label: "Catégorie de la page",
        // },
        // { name: "urlcode", value: "", label: "Nom URL" },
        // { name: "phone1", value: "", label: "Téléphone" },
        // { name: "email", value: "", label: "Email" },
      ].map((field) => {
        field.editing = false;
        field.loading = false;
        field.defaultValue = "";
        return field;
      }),
      profil_photo_url: { url: null, data: null },
      background_cover: { url: null, data: null },
    };
  },
  computed: {
    ...mapGetters("partners", ["current_partner"]),
    ...mapGetters("auth", ["urlcode"]),
  },
  beforeMount() {
    console.log(this.current_partner);
    this.fields.forEach((field) => {
      field.value = this.current_partner[field.name];
      field.defaultValue = this.current_partner[field.name];
      this.imgDataUrl = this.current_partner.profil_photo_url;
    });
  },
  methods: {
    handleBeforeUploadLogo(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.cropSuccessLogo(e.target.result);
        this.show_logo = false;
      };

      return true;
    },
    handleBeforeUploadBg(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.cropSuccessBg(e.target.result);
        this.show_logo = false;
      };

      return true;
    },
    cropSuccessBg(imgDataUrl) {
      this.background_cover.data = imgDataUrl;
      this.background_cover.url = imgDataUrl.split("base64,")[1];

      this.handleSave({
        name: "background_cover",
        value: this.background_cover.data,
      });
    },
    cropSuccessLogo(imgDataUrl) {
      this.profil_photo_url.data = imgDataUrl;
      this.profil_photo_url.url = imgDataUrl.split("base64,")[1];

      this.handleSave({
        name: "profil_photo_url",
        value: this.profil_photo_url.data,
      });
    },
    handleStartEditing(fieldName) {
      const field = this.fields.find((field) => field.name === fieldName);
      field.editing = true;
      // window.$(`#input-${field.name}-edit`).focus();
    },
    handleStopEditing(field) {
      field.editing = false;
      field.value = field.defaultValue;
    },
    handleSave(field) {
      field.loading = true;

      PageService.pageupdatecolumn(field.name, field.value, this.urlcode)
        .then(({ data }) => {
          if (!data.error) {
            field.editing = false;
          } else {
            this.$snackbar.add({
              text: "Error lors de la mise à jour",
              type: "error",
            });
          }
        })
        .finally(() => {
          field.loading = false;
        });
    },
  },
};
</script>

<style scoped>


.loader {
  border-top-color: #3490dc;
}
</style>
