<script setup>
import { computed, ref } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import SideMenuItem from "@/components/common/SideMenuItem.vue";
import { useStore } from "vuex";
import FormateDate from "@/helpers/FormateDate";

import { useSnackbar } from "vue3-snackbar";

const snackbar = useSnackbar();

const { isOpen } = useSidebar();
const { sideMenuItems } = useSidebar();
const store = useStore();

const showSubMenu = (index) => {
  const show = sideMenuItems.value[index].isOpen;

  sideMenuItems.value = sideMenuItems.value.map((item) => ({
    ...item,
    isOpen: false,
  }));
  sideMenuItems.value[index].isOpen = !show;

  // console.log("datas",sideMenuItems.value );
};
const current_cycle = computed(() => store.getters["cycles/current_cycle"]);
const cycles = computed(() => store.getters["cycles/cycles"]);
const isMenuAssociationsOpen = ref(false);
const showAssociations = () => {
  isMenuAssociationsOpen.value = !isMenuAssociationsOpen.value;
};

const handleSelectPage = async (item) => {
  await store
    .dispatch("cycles/getCurrentCycle", item)
    .then(async (response) => {
      if (!response.data.error) {
        // await store.dispatch("cycles/getActiveCycle");
        // await store.dispatch("articles/getHomepageData");
        window.location.reload();
      }
    })
    .catch((error) => {
      snackbar.add({
        type: "error",
        text: "Une erreur s'est produite",
      });

      console.log("error", error);
    });

  // isMenuAssociationsOpen.value = false;
};
</script>

<template>
  <div>
    <!-- <div class="text-black">
     lflsflsfls {{ isOpen }}
    </div> -->

    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-30 lg:hidden"
      @click="
        {
          isOpen = false;
          isMenuAssociationsOpen = false;
        }
      "
    />

    <div
      v-if="isMenuAssociationsOpen"
      class="w-full h-screen z-10 fixed"
      @click="isMenuAssociationsOpen = false"
    ></div>
    <aside
      id="sidebar"
      class="fixed z-20 h-full top-0 left-0 pt-16 lg:translate-x-0 flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      @click="isOpen = false"
    >
      <div
        class="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0 h-full"
      >
        <div
          class="flex items-center gap-2 w-64 overflow-ellipsis my-2 px-4 max-h-24 p-3 border-b pb-2"
          @click="showAssociations"
        >
          <div class="p-1 text-sm w-64 overflow-hidden font-[500]">
            {{ current_cycle.code }}
          </div>
          <div class="">
            <!-- <vue-feather class="h-3" type="chevron-right"></vue-feather> -->
          </div>
        </div>

        <div
          v-if="isMenuAssociationsOpen1"
          class="absolute w-64 -right-[268px] h-[80vh] overflow-y-auto top-5 bg-white z-50 shadow-lg rounded-lg p-2"
        >
          <div
            v-for="(item, index) of cycles"
            :key="index"
            @click="handleSelectPage(item.code)"
            class="relative flex items-center cursor-pointer gap-2 w-full overflow-hidden mt-2 max-h-24 p-3 border-t pb-2"
          >
            <div
              class="p-1 text-sm w-full overflow-hidden font-[500] flex items-center gap-2"
            >
              <div>
                {{ FormateDate(item.date_debut) }}
              </div>
              <div class="text-gray-500 font-bold text-xl">|</div>
              <div>
                {{ FormateDate(item.date_fin) }}
              </div>
            </div>
            <div
              v-if="current_cycle.id === item.id"
              class="absolute top-0 right-0 text-emerald-500 text-center text-[8px] w-fit p-1 bg-emerald-200 rounded-bl-lg"
            >
              Default
            </div>
            <div
              v-if="item.is_passed == 1"
              class="absolute top-0 left-0 text-red-500 text-center text-[8px] w-fit p-1 bg-red-200 rounded-bl-lg"
            >
              Archivé
            </div>
            <div
              v-else
              class="absolute top-0 left-0 text-emerald-500 text-center text-[8px] w-fit p-1 bg-emerald-200 rounded-bl-lg"
            >
              En cours
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col pb-4 overflow-y-auto">
          <div class="flex-1 px-3 bg-white divide-y space-y-1">
            <ul class="space-y-2 pb-2">
              <li>
                <form action="#" method="GET" class="lg:hidden">
                  <label for="mobile-search" class="sr-only">Search</label>
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="email"
                      id="mobile-search"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </li>

              <div v-for="(item, index) in sideMenuItems" :key="index">
                <template v-if="item.isMenu">
                  <SideMenuItem
                    :title="item.title"
                    :isMenu="true"
                    :memus="item.children"
                    :icon="item.icon"
                    :link="item.link"
                    :isOpen="item.isOpen"
                    @handleclick="showSubMenu(index)"
                  />
                </template>
                <template v-else>
                  <SideMenuItem
                    :title="item.title"
                    :link="item.link"
                    :icon="item.icon"
                    :isMenu="false"
                    @handleclick="showSubMenu(index)"
                  />
                </template>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.router-link-active .router-link-exact-active {
  background-color: #f3f4f6;
  color: black;
  font-weight: 500;
}
</style>
