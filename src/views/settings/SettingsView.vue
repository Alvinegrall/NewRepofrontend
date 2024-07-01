<script setup>
import Tabs from "@/components/common/Tabs.vue"; // Importez le composant Tabs

import TablesUtilisateurs from "@/components/TablesUtilisateurs.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";
// import ProductCreate from "@/views/products/manage/ProductCreate.vue";
// import ModelInterestType from "@/helpers/enums/ModelInterestType";
import AuthService from "@/services/AuthService";

import CardBox from "@/components/common/CardBox.vue";
// import FormControlCompte from "@/components/common/FormControlCompte.vue";
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
import HeaderBreadcrumbs from "@/components/common/HeaderBreadcrumbs.vue";

import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import BaseButtons from "@/components/common/BaseButtons.vue";
import { useSnackbar } from "vue3-snackbar";
import { computed, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";

const snackbar = useSnackbar();
const store = useStore();

const tabs = reactive([
  {
    id: 1,
    name: "Profile",
  },
  {
    id: 2,
    name: "Utilisateurs",
  },
]);

const all_users = ref([]);
const currentUser = computed(() => store.getters["auth/currentUser"]);
const isCreateUserModalActive = ref(false);


const fields = reactive({
  name: "",
  email: "",
  password: "",
  role: "",
  phone: "",
});

const roles = ref([
  {
    id: 1,
    name: "Admin",
  },
  {
    id: 2,
    name: "User",
  },
]);
onMounted(async () => {
  await handleGetUsers();
});

const handleGetUsers = async () => {
  await AuthService.getAllUsers()
    .then((res) => {
      if (!res.data.error) {
        const data = res.data.data;
        all_users.value = data.users;
      }
    })
    .finally(() => {});
};

const createUser = () => {
  isCreateUserModalActive.value = true;
};

const handleCreateUser = async () => {
  const datas = {
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    password: fields.password,
    role: fields.role?.id,
  };
  await AuthService.createUser(datas)
    .then(async (res) => {
      await handleGetUsers();
  
    }).catch((error)=>{
      store.dispatch("setLoadingSpinner", false);
      isCreateUserModalActive.value = true;
      snackbar.add({
        type: "error",
        text: error.response.data.message,
      });

    })
    .finally(() => {});
};

</script>
<template>
  <div>
    <CardBoxModal
      v-model="isCreateUserModalActive"
      hasCostomWith
      width="xl:w-6/12"
      hasCancel
      title="✍️ Créer un utilisateur"
      @confirm="handleCreateUser"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        <FormField label="Choisir le role" help="Required">
          <FormControl
            v-model="fields.role"
            :options="roles"
            icon="check-circle"
            placeholder="Choisir le role"
          />
        </FormField>
        <FormField label="Nom" help="Optionel">
          <FormControl
            v-model="fields.name"
            icon="edit-3"
            placeholder="Entrez le nom"
          />
        </FormField>
        <FormField label="Téléphone" help="Optionel">
          <FormControl
            v-model="fields.phone"
            icon="edit-3"
            placeholder="Numéro de Téléphone"
          />
        </FormField>

        <FormField label="Email" help="Optionel">
          <FormControl
            v-model="fields.email"
            icon="edit-3"
            placeholder="Email"
          />
        </FormField>
        <FormField label="Mot de passe" help="Optionel">
          <FormControl
            v-model="fields.password"
            icon="edit-3"
            placeholder="Mot de passe"
          />
        </FormField>
      </div>
    </CardBoxModal>
    <div class="">
      <Tabs :tabs="tabs">
        <template v-slot:1>
          <div class="flex flex-col gap-6">
            <CardBox>
              <div class="my-0 md:my-10 flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                  <div class="font-[400]">
                    {{ $t("Nom") }}
                  </div>
                  <div
                    class="flex items-center justify-between p-1 px-3 bg-[#f9fafb] border rounded-lg w-full"
                  >
                    <div class="font-bold w-[90%]">{{ currentUser.name }}</div>
                    <!-- <button
                      class="w-[10%] flex justify-end"
                      @click="updateValue('first_name', 'forms.membre.name')"
                    >
                      <vue-feather
                        class="h-4 md:h-6"
                        type="edit-3"
                      ></vue-feather>
                    </button> -->
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="font-[400]">
                    {{ $t("Email") }}
                  </div>
                  <div
                    class="flex items-center justify-between p-1 px-3 bg-[#f9fafb] border rounded-lg w-full"
                  >
                    <div class="font-bold w-[90%]">{{ currentUser.email }}</div>
                    <!-- <button
                      class="w-[10%] flex justify-end"
                      @click="updateValue('email', 'details_membre.email')"
                    >
                      <vue-feather
                        class="h-4 md:h-6"
                        type="edit-3"
                      ></vue-feather>
                    </button> -->
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <div class="font-[400]">
                    {{ $t("Téléphone") }}
                  </div>
                  <div
                    class="flex items-center justify-between p-1 px-3 bg-[#f9fafb] border rounded-lg w-full"
                  >
                    <div class="font-bold w-[90%]">{{ currentUser.phone }}</div>
                    <!-- <button
                      class="w-[10%] flex justify-end"
                      @click="updateValue('email', 'details_membre.email')"
                    >
                      <vue-feather
                        class="h-4 md:h-6"
                        type="edit-3"
                      ></vue-feather>
                    </button> -->
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
        </template>

        <template v-slot:2>
          <div class="flex flex-col gap-6">
            <CardBox>
              <div v-if="currentUser.role=='1'" class="flex justify-end mb-5">
                <BaseButton
                  color="success"
                  type="submit"
                  label="Créer un utilisateur"
                  @click="createUser"
                />
              </div>

              <TablesUtilisateurs :details="all_users" @deleted="handleGetUsers" />
            </CardBox>
          </div>
        </template>
      </Tabs>
    </div>
  </div>
</template>
