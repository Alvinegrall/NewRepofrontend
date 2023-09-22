<script setup>
import { ref } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import SideMenuItem from "@/components/common/SideMenuItem.vue";

const { isOpen } = useSidebar();
const { sideMenuItems } = useSidebar();

const showSubMenu = (index) => {
  const show = sideMenuItems.value[index].isOpen;

  sideMenuItems.value = sideMenuItems.value.map((item) => ({
    ...item,
    isOpen: false,
  }));
  sideMenuItems.value[index].isOpen = !show;

  // console.log("datas",sideMenuItems.value );
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
      @click="isOpen = false"
    />

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
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
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
