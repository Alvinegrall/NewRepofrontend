<script setup>
import SideBarSkeleton from "./SideBarSkeleton.vue";
import HeaderSkeleton from "./HeaderSkeleton.vue";
import BodySkeleton from "./BodySkeleton.vue";
</script>

<template>
  <!-- <div class="flex h-screen  font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto ">
        <div class="container mx-auto px-6 py-8"> class="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
          <slot />
        </div>
      </main>
    </div>
  </div> -->

  <div class="bg-[#f1f4f8]">
    <HeaderSkeleton />

    <div class="flex overflow-hidden bg-white pt-16">
      <SideBarSkeleton />

      <div class="min-h-screen  w-full bg-[#f1f4f8] relative overflow-y-auto lg:ml-64">
        <main>
          <div class="about pt-6 px-4">
            <!-- <slot /> -->
            <BodySkeleton />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  
  }
}
</style>
