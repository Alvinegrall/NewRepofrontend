import "./assets/main.css";

import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import App from "./App.vue";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import router from "./router";
import store from "./store";
import VueFeather from "vue-feather";

import VOtpInput from "vue3-otp-input";
import MyUpload from "vue-image-crop-upload";

import VueAvatarUpload from "vue-avatar-upload";
import "vue-avatar-upload/lib/style.css";

import { SnackbarService, Vue3Snackbar } from "vue3-snackbar";
import "vue3-snackbar/dist/style.css";
// circular progress
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";

import DashboardLayout from "./components/layouts/DashboardLayout.vue";
import EmptyLayout from "./components/layouts/EmptyLayout.vue";

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
// import snackbarPlugin from './plugin/snackbar.js';

const i18n = createI18n({
  locale: localStorage.getItem("@CURRENT_LANGUAGE") || "fr",
  messages: { en, fr },
});

const app = createApp(App);

app.component("DefaultLayout", DashboardLayout);
app
  .component("EmptyLayout", EmptyLayout)

app
  .use(router)
  .use(store)
  .component("circle-progress", CircleProgress)
  .component("v-otp-input", VOtpInput)
  .component("flatPickr", flatPickr)
  .component("vue-avatar-upload", VueAvatarUpload)
  .component("my-upload", MyUpload)
  .component(VueFeather.name, VueFeather)
  .use(SnackbarService)
  .component("vue3-snackbar", Vue3Snackbar)
  .use(i18n);

app.mount("#app");
