<script setup>
import { ref, computed } from "vue";
import { useSidebar } from "@/composables/useSidebar";
import UserProfile from "@/components/common/UserProfile.vue";
import BaseButton from "@/components/common/BaseButton.vue";
// import store from "@/store"

import { useStore } from "vuex";

const dropdownOpen = ref(false);
const { isOpen } = useSidebar();
const store = useStore();

const confirm = (mode) => {
  console.log("hello");
};

const currentUser = computed(() => store.getters["auth/currentUser"]);
</script>

<template>
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
            <form action="#" method="GET" class="hidden lg:block lg:pl-32">
              <label for="topbar-search" class="sr-only">Search</label>
              <div class="mt-1 relative lg:w-64">
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
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              class="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
            >
              <span class="sr-only">Search</span>
              <svg
                class="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <!-- ❤️ -->
            </button>
            <div class="hidden lg:flex items-center">
              <span class="text-base font-normal text-gray-500 mr-5"
                >Appli de gestion de stock 💜
              </span>
              <div class="-mb-1">
                <span></span>
              </div>
            </div>

            <div class="hidden sm:inline-flex ml-5 mr-3">
              <BaseButton icon="bell" color="success" />
            </div>

            <div>
              <div @click="dropdownOpen = !dropdownOpen">
                <UserProfile avatar="tsague" />
              </div>
              <div
                v-show="dropdownOpen"
                @click="dropdownOpen = false"
                class="fixed inset-0 z-10 w-full h-full"
              ></div>

              <transition
                enter-active-class="transition duration-150 ease-out transform"
                enter-from-class="scale-95 opacity-0"
                enter-to-class="scale-100 opacity-100"
                leave-active-class="transition duration-150 ease-in transform"
                leave-from-class="scale-100 opacity-100"
                leave-to-class="scale-95 opacity-0"
              >
                <div
                  v-show="dropdownOpen"
                  class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
                >
                  <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
                    >Paramètres</a
                  >

                  <router-link
                    to="/login"
                    class="block px-4 py-2 text-sm hover:bg-gray-200"
                    >Log out</router-link
                  >
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
