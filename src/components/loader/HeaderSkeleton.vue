<script setup>
import BaseSkeleton from "@/components/common/BaseSkeleton.vue";

// import store from "@/store"
</script>

<template>
  <header>
    <nav class="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start">
            <BaseSkeleton :shadow="'none'" :width="'150px'" :height="'30px'" />
            <!-- <BaseSkeleton :shadow="'none'" :width="'50px'" :height="'50px'" radius="50%" /> -->
            <div class="text-xl font-bold flex items-center lg:ml-2.5">
              <BaseSkeleton :shadow="'none'" :width="'90px'" :height="'30px'" />

              <span class="self-center whitespace-nowrap mx-5">
                <BaseSkeleton
                  :shadow="'none'"
                  :width="'30px'"
                  :height="'30px'"
                />
              </span>
            </div>
            <form action="#" method="GET" class="hidden lg:block lg:pl-32">
              <div class="mt-1 relative lg:w-64">
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <BaseSkeleton
                    :shadow="'none'"
                     width="300px"
                    :height="'30px'"
                  />
                </div>
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <BaseSkeleton :shadow="'none'" width="150px" :height="'30px'" />

            <div class="hidden sm:inline-flex ml-5 mr-3">
              <BaseSkeleton :shadow="'none'" width="20px" :height="'30px'" />
            </div>

            <div>
              <BaseSkeleton
                :shadow="'none'"
                :width="'40px'"
                :height="'40px'"
                radius="50%"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
