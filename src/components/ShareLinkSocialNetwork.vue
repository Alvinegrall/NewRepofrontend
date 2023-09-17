<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const socials = computed(() => {
  return [
    {
      name: "facebook",
      icon: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-circle-512.png",
      color: "text-blue-600",
      action: shareOnFacebook,
    },
    {
      name: "twitter",
      icon: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-twitter-square2-512.png",
      color: "text-blue-400",
      action: shareOnTwitter,
    },
    {
      name: "linkedin",
      icon: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-linkedin-circle-512.png",
      color: "text-blue-700",
      action: shareOnLinkedIn,
    },
    {
      name: "whatsapp",
      icon: "https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png",
      color: "text-green-600",
      action: shareOnWhatsApp,
    },
  ];
});

const payment_links = computed(
  () => store.getters["payment_links/payment_links"]
);
const current_link = computed(
  () => store.getters["payment_links/current_link"]
);

const openLink = (link) => {
  router.push("/payment-links?action=view&ref=" + link.reference);
  store.dispatch("payment_links/setCurrentLink", link);
  window.$("#paymentLinkView").modal("show");
};
const openShareLink = (link) => {
  store.dispatch("payment_links/setCurrentLink", link);
  window.$("#paymentLinkShare").modal("show");
};
const copyLink = (link) => {
  window.navigator.clipboard.writeText(link.link);

  snackbar.add({
    text: 'Vous avez copié le lien de "' + link.name + '" !',
    type: "success",
  });
};
const shareOnFacebook = () => {
  const link = current_link;

  // Share url and description text
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${link.link}&quote=${link.name}`,
    "facebook-share-dialog",
    "width=800,height=600"
  );
};
const shareOnTwitter = () => {
  const link = current_link;

  // Share url and description text
  window.open(
    `https://twitter.com/intent/tweet?url=${link.link}&text=${link.name}`,
    "twitter-share-dialog",
    "width=800,height=600"
  );
};
const shareOnLinkedIn = () => {
  const link = current_link;

  // Share url and description text
  window.open(
    `https://www.linkedin.com/shareArticle?mini=true&url=${link.link}&title=${link.name}`,
    "linkedin-share-dialog",
    "width=800,height=600"
  );
};
const shareOnWhatsApp = () => {
  const link = current_link;

  // Share url and description text
  window.open(
    `https://api.whatsapp.com/send?text=${link.link}  ${link.name}`,
    "whatsapp-share-dialog",
    "width=800,height=600"
  );
};
const handleCancelOrder = (transaction) => {
  const $ = window.$;

  store.dispatch("partners/setCurrentTransaction", transaction);

  $(document).ready(function () {
    $("#cancelOrderModal").modal("show");
  });
};
</script>

<template>
  <div>
    <div class="relative p-4">
      <div class="flex items-center gap-3">
        <div class="text-sm font-semibold">Partager le lien:</div>
        <div class="p-2 border rounded-lg bg-gray-200">
          {{ current_link.link }}
        </div>
        <div class="p-1 border rounded-lg flex items-center justify-center">
          <a
            title="Copier le lien"
            href="javascript:void(0)"
            class="text-3xl group"
            @click="copyLink(link)"
          >
            <vue-feather
              type="copy"
              class="group-hover:text-primary"
            ></vue-feather>
          </a>
          <!-- <vue-feather type="copy"></vue-feather> -->
        </div>
      </div>
      <div class="flex items-center space-x-6">
        <div v-for="social in socials" :key="social.name">
          <a
            href="#"
            class="text-black group cursor-pointer mx-2 my-4 p-2"
            @click.prevent="social.action"
          >
            <img :src="social.icon" class="scale-75 cursor-pointer" />
            <!-- <vue-feather
                    :type="social.icon"
                    class="scale-75 group-hover:text-primary text-black"
                  ></vue-feather> -->
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "payment_links": {
      "title": "Liens de paiement",
      "empty": {
        "title": "No transactions yet",
        "description": "You have not created any payment link yet.",
        "create": "Create a payment link"
      },
      "actions": {
        "payment-details": "Payment details",
        "cancel-payment": "Cancel payment",
        "deliver": "Deliver"
      }
    }
  },
  "fr": {
    "payment_links": {
      "title": "Liens de paiement",
      "empty": {
        "title": "Aucun lien de paiement pour le moment",
        "description": "Vous n'avez pas encore créé de lien de paiement.",
        "create": "Créer un lien de paiement"
      },
      "actions": {
        "payment-details": "Détails du paiement",
        "cancel-payment": "Annuler le paiement",
        "deliver": "Livrer"
      }
    }
  }
}
</i18n>
