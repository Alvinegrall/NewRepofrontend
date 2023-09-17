<template>
  <div>
    <CardBoxModal v-model="isModalActive" title="Sample modal">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>

    <CardBoxModal
      v-model="isModalDangerActive"
      title="Please confirm"
      button="danger"
      has-cancel
    >
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </CardBoxModal>
    {{ currentUser }}
    <vue-feather type="info"></vue-feather>
    <BaseButtons type="justify-start lg:justify-end" no-wrap>
      <BaseButton
        color="info"
        icon="trash-2"
        small
        @click="isModalActive = true"
      />
      
      <BaseButton
        color="danger"
        icon="info"
        small
        @click="isModalDangerActive = true"
      />
    </BaseButtons>
  </div>
</template>

<script>
import BaseButtons from "@/components/common/BaseButtons.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import CardBoxModal from "@/components/common/CardBoxModal.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    BaseButtons,
    BaseButton,
    CardBoxModal,
  },
  data() {
    return {
      isModalActive: false,
      isModalDangerActive: false,
    };
  },
  computed:{
    // ...mapGetters(['clients']),
    ...mapGetters("auth", ["currentUser"]),

  }

};
</script>

<style></style>
