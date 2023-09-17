<template>
  <!-- tap on top start -->
  <div class="tap-top">
    <span class="lnr lnr-chevron-up"></span>
  </div>
  <!-- tap on tap end -->

  <div
    id="pageWrapper"
    class="page-wrapper compact-wrapper dark-sidebar bg-[#f0f2f5]"
  >
    <LayoutHeader :moon="true" />

    <div class="page-body-wrapper">
      <div class="block md:hidden">
        <LayoutSidebar />
      </div>

      <div
        class="page-body ml-0 px-0 mt-[70px] sm:mt-[80px]"
        style="margin-top: 80px !important"
      >
        <div class="container-fluid p-0 m-0">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <!-- <LayoutFooter />
    <CommonLogoutModal />
    <CommonUserAssociationModal /> -->
    <!-- <CommonCreateDefaultMenbre /> -->
  </div>
</template>

<script>

// import CommonCreateDefaultMenbre from "../common/CommonCreateDefaultMenbre.vue";

export default {

  mounted() {
    // this.loadAllScript();
  },
 
};
</script>

<style scoped>

</style>
