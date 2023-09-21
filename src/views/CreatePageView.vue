<script setup>
// import EmptyLayout from "@/components/layouts/EmptyLayout.vue";
import CardBox from "@/components/common/CardBox.vue";
import CardBoxHeader from "@/components/common/CardBoxHeader.vue";

import FormField from "@/components/common/FormField.vue";
import FormControl from "@/components/common/FormControl.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "@/config/axios";

const fields = reactive({
  email: "",
  password: "",
});
const router = useRouter();
const submitted = ref(false);
const authError = ref(null);
const isRegisterError = ref(false);
const registerSuccess = ref(false);
const errors = ref(false);

const login = async () => {
  submitted.value = true;

  if (fields.email == "") {
    errors.value = true;
  } else if ((fields.password = "")) {
    errors.value = true;
  } else {
    errors.value = false;
  }

  const result = await axios.post("/auth/login", {
    email: fields.email,
    password: fields.password,
  });

  submitted.value = false;

  if (result.data.error) {
    isRegisterError.value = true;

    return (authError.value = result.data.message);
  }

  localStorage.setItem("jwt", result.data.token);

  // this.$router.push({
  //   path: this.$route.query.redirectFrom ?? "/",
  // });
  router.push({ name: "common.home" });
};
</script>

<template>
  <div class="">
    <div class="h-screen flex justify-center items-center">
      <div class="w-full md:w-1/2 lg:w-1/3">
        <CardBox is-form @submit.prevent="login">
          <CardBoxHeader title="🔐 Login admin" btnlabel="See all" />
          <div
            v-if="errors"
            class="p-2 bg-red-200 text-red-500 rounded-lg my-4"
          >
            Veuillez remplir tous les champs
          </div>
          <!-- <CircleProgress /> -->
          <div class="grid grid-cols-1 gap-x-6 gap-y-3">
            <FormField label="Email" help="error.$message">
              <FormControl
                v-model="fields.email"
                icon="edit-3"
                placeholder="Email"
              />
            </FormField>
            <FormField label="Password" help="Required">
              <FormControl
                v-model="fields.password"
                icon="lock"
                placeholder="Password"
              />
            </FormField>
          </div>
          <div class="mt-5 flex justify-end">
            <BaseButtons>
              <BaseButton color="info" type="submit" label="Login" />
              <!-- <BaseButton color="info" label="En cour" outline /> -->
            </BaseButtons>
          </div>
        </CardBox>
      </div>
    </div>
  </div>
</template>
