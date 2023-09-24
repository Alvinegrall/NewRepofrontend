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
    title: "Inventaire",
    isOpen: false,
    icon: "clipboard",
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
        title: "Categorie",
        isOpen: false,
        isMenu: false,
        link: "admin.addcategory",
      },
      {
        title: "Fornisseur",
        isOpen: false,
        isMenu: false,
        link: "admin.addfournisseur",
      },
      {
        title: "Beneficiaire",
        isOpen: false,
        isMenu: false,
        link: "admin.addbeneficiary",
      },
      {
        title: "Magasin",
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
