<script setup>
import { useSidebar } from "@/composables/useSidebar";
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";


const { isOpen } = useSidebar();
const { sideMenuItems } = useSidebar();
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
           

              <div v-for="(item, index) in sideMenuItems" :key="index">
                <BaseSkeleton :shadow="'none'" width="240px" :height="'20px'" />
              </div>
            </ul>
            <div  v-for="(item, index) in 10" :key="index" class="space-y-2 pt-2">
                <BaseSkeleton :shadow="'none'" width="240px" :height="'20px'" />
              </div>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>
