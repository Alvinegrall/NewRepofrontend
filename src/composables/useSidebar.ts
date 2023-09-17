import { ref } from "vue";

const isOpen = ref(false);

const sideMenuItems = ref([
  { title: "Dashboard", icon: "pie-chart", isMenu: false, link: "common.home" },
  {
    title: "Cycles",
    icon: "",
    isMenu: true,
    children: [
      { title: "Tournois", isMenu: false, link: "cycles.tournois" },
      { title: "Séances", isMenu: false, link: "cyles.seances" },
    ],
  },
  {
    title: "Administrations",
    icon: "",
    isMenu: true,
    children: [
      { title: "Membres", isMenu: false, link: "administration.membres" },
      { title: "Utilisateur", isMenu: false, link: "administration.utilisateurs" },
    ],
  },
  {
    title: "Finances",
    icon: "",
    isMenu: true,
    children: [
      { title: "Fond de caise", isMenu: false, link: "finance.fond-caisse" },
      { title: "Cotisations", isMenu: false, link: "finance.cotisations" },
      { title: "Comptes", isMenu: false, link: "finance.solde-du-compte" },
      { title: "Sanctions", isMenu: false, link: "finance.sanctions" },
    ],
  },
  {
    title: "Communications",
    icon: "",
    isMenu: true,
    children: [
      { title: "Mailing", isMenu: false, link: "communication.mailing" },
      { title: "SMS", isMenu: false, link: "communication.sms" },
    ],
  },
]);

export function useSidebar() {
  return {
    isOpen,
    sideMenuItems,
  };
}
