<script setup>
import { ref, computed } from "vue";
import { useSidebar } from "@/composables/useSidebar";

// import store from "@/store"

// import { useStore } from "vuex";

const { isOpen } = useSidebar();
</script>

<template>
  <div>
    <div class="">
      <header>
        <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
          <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center justify-start">
                <button
                  id="toggleSidebarMobile"
                  aria-expanded="true"
                  aria-controls="sidebar"
                  class="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                  @click="isOpen = !isOpen"
                >
                  <svg
                    id="toggleSidebarMobileHamburger"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="isOpen ? 'hidden' : 'block'"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>

                  <svg
                    id="toggleSidebarMobileClose"
                    :class="isOpen ? 'block' : 'hidden'"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>

                <router-link
                  to="/"
                  class="text-xl font-bold flex items-center lg:ml-2.5"
                >
                  <img
                    src="/hydrac.jpg"
                    class="h-8 mr-2"
                    alt="Faroty-Associations Logo"
                  />
                  <span class="self-center whitespace-nowrap font-bold"
                    >Hydrac</span
                  >
                </router-link>
              </div>
              <div class="flex items-center">
                <div class="hidden lg:flex items-center">
                  <span class="text-base font-normal text-gray-500 mr-5"
                    >Appli de gestion de stock 💜
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    <div class="min-h-screen w-full bg-[#f1f4f8]">
      <main>
        <div class="about pt-16 px-4">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
