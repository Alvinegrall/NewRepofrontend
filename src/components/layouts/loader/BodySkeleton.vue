<template>
  <div>
    <div class="flex justify-between flex-col lg:flex-row gap-6 relative">
      <div
        class="flex flex-wrap gap-5 old-desktop:gap-5 justify-between flex-col md:flex-row w-full h-fit old-desktop:flex-row"
      >
        <div
          class="relative rounded-lg shadow-old-design flex justify-between pb-8 font-avertape flex-col bg-white w-full h-[340px] md:w-[calc(50%-10px)] old-desktop:w-[calc(50%-10px)] pt-6"
        >
          <div class="flex justify-center items-center">
            <BaseSkeleton :shadow="'none'" width="250px" :height="'150px'" />
          </div>

          <div class="flex justify-between items-center gap-8 px-[25px] mt-6">
            <div v-for="(item, index) in 4" :key="index">
              <BaseSkeleton :shadow="'none'" width="50px" :height="'50px'" />
            </div>
          </div>
          <div class="flex justify-center items-center mt-3">
            <BaseSkeleton :shadow="'none'" width="90px" :height="'40px'" />
          </div>
        </div>

        <div
          class="relative rounded-lg shadow-old-design flex justify-between pb-8 font-avertape flex-col bg-white w-full h-[340px] md:w-[calc(50%-10px)] old-desktop:w-[calc(50%-10px)] pt-6"
        >
          <div class="flex justify-center items-center">
            <BaseSkeleton :shadow="'none'" width="250px" :height="'150px'" />
          </div>

          <div class="flex justify-between items-center gap-8 px-[25px] mt-6">
            <div v-for="(item, index) in 4" :key="index">
              <BaseSkeleton :shadow="'none'" width="50px" :height="'50px'" />
            </div>
          </div>
          <div class="flex justify-center items-center mt-3">
            <BaseSkeleton :shadow="'none'" width="90px" :height="'40px'" />
          </div>
        </div>

        <div
          class="rounded-lg bg-white w-full mb-10 old-desktop:w-[calc(50%-10px)] pt-6 pb-1"
        >
          <div
            v-for="(item, index) in 3"
            :key="index"
            class="flex justify-center px-[25px] items-center py-3 border-t"
          >
            <div class="flex gap-3 items-center min-w-[300px]">
              <BaseSkeleton :shadow="'none'" width="600px" :height="'40px'" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="rounded-lg overflow-hidden shadow-old-design pt-6 bg-white flex-none lg:w-[326px] flex flex-col"
      >
        <hr class="color-[#ebedf0] opacity-10" />
        <div class="px-[25px] pb-5 flex flex-col gap-3 overflow-hidden">
          <ul class="flex flex-col justify-center">
            <li v-for="(item, index) in 5" :key="index">
              <BaseSkeleton :shadow="'none'" width="250px" :height="'30px'" />
            </li>
          </ul>
        </div>
        <!-- <div
          class="rounded-lg hidden lg:block absolute bottom-0 h-[50px] bg-gradient-to-b from-[hsla(0,0%,100%,0)] to-[#fff] w-[326px]"
        ></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";
</script>

<style></style>
