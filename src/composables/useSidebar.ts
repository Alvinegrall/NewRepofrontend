import { ref } from "vue";

const isOpen = ref(false);

const sideMenuItems = ref([
  {
    title: "Dashboard",
    icon: "pie-chart",
    isOpen: false,
    isMenu: false,
    link: "common.home",
  },
  {
    title: "Créer un article",
    isOpen: false,
    icon: "edit",
    isMenu: false,
    link: "create-article",
  },

  {
    title: "Mouvements",
    isOpen: false,
    icon: "database",
    isMenu: true,
    children: [
      { title: "Entrée", isOpen: false, isMenu: false, link: "mvt.entree" },
      { title: "Sortie", isOpen: false, isMenu: false, link: "mvt.sortie" },
    ],
  },
  {
    title: "Administration",
    isOpen: false,
    icon: "settings",
    isMenu: true,
    children: [
      {
        title: "Ajouter une categorie",
        isOpen: false,
        isMenu: false,
        link: "admin.addcategory",
      },
      {
        title: "Ajouter un fornisseur",
        isOpen: false,
        isMenu: false,
        link: "admin.addfournisseur",
      },
      {
        title: "Ajouter un Beneficiaire",
        isOpen: false,
        isMenu: false,
        link: "admin.addbeneficiary",
      },
      {
        title: "Ajouter un magasin",
        isOpen: false,
        isMenu: false,
        link: "admin.addmagasin",
      },
    ],
  },
  {
    title: "Statistiques",
    isOpen: false,
    icon: "activity",
    isMenu: false,
    link: "statistiques",
  },
]);

export function useSidebar() {
  return {
    isOpen,
    sideMenuItems,
  };
}
