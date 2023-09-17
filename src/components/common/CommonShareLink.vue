<script setup>
import { useRouter } from "vue-router";

const store = useRouter();
const emit = defineEmits(["open-social-network"]);
const copyLink = (link) => {
  window.navigator.clipboard.writeText(link.matricule);

  $snackbar.add({
    text: "Vous avez copié le lien de !",
    type: "success",
  });
};
const openShareLink = () => {
  const link = {
    link: "",
    name: "",
  };
  emit("open-social-network");

  //   store.dispatch("payment_links/setCurrentLink", link);
};
</script>

<template>
  <div>
    <div class="flex items-center gap-3">
      <div class="text-sm font-semibold">Partagez le lien:</div>
      <div class="p-1 border rounded-lg bg-gray-200">
        http://farotygo.com/paylink/37424
      </div>
      <div class="p-1 w-8 h-8 border rounded-lg">
        <a
          title="Copier le lien"
          href="javascript:void(0)"
          @click="copyLink('members')"
        >
          <vue-feather
            type="copy"
            class="group-hover:text-primary  h-4"
          ></vue-feather>
        </a>
        <!-- <vue-feather type="copy"></vue-feather> -->
      </div>
      <div class="p-1 w-8 h-8 border rounded-lg">
        <a
          title="Partager le lien"
          href="javascript:void(0)"
          @click="openShareLink(currentUser)"
        >
          <vue-feather
            type="share-2"
            class="group-hover:text-primary h-4"
          ></vue-feather>
        </a>
      </div>
    </div>
  </div>
</template>
