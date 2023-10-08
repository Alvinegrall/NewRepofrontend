<script setup>


import { computed, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  item: {
    type: Object,
  },

});
const store = useStore();
const loading = ref(false);
const memberArr = ref([]);
const emit = defineEmits(["handleclick", "selected-member"]);

const toggle = () => {
  emit("handleclick");
};
const saveBtn = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    emit("selected-member", memberArr.value);
    memberArr.value.splice(0, memberArr.value.length);
    emit("handleclick");
  }, 1000);
};

const beforeEnter = (el) => {
  el.style.height = "0";
};
const enter = (el) => {
  el.style.height = el.scrollHeight + "px";
};
const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};
const leave = (el) => {
  el.style.height = "0";
};
// const membresList = computed(() => store.getters["membres/membresList"]);

const selectedMember = (event) => {
  memberArr.value.splice(0, memberArr.value.length);
  event.forEach((element) => {
    memberArr.value.push(element);
  });
  emit("selected-member", memberArr.value);
};
</script>
<template>
  <div
    class="accordion relative mx-auto my-3 h-auto"
    :class="{ 'border border-solid border-[#D8D8D8]': item.open }"
  >
    <div
      class="flex justify-between p-5 rounded-lg bg-white shadow-sm cursor-pointer"
      :class="{ 'border border-solid border-[#D8D8D8]': !item.open }"
      @click.self="toggle"
    >
      <span class="font-semibold text-[15px]">{{ item.file }}</span>
      <img
        v-if="!item.open"
        class="header-icon"
        :class="{ rotate: item.open }"
        src="/arrow-down.svg"
        alt=""
      />
      <div class="flex justify-end items-center gap-3" v-if="item.open">
        <button
          id="close-modal"
          type="button"
          class="ml-4 Button Button--small"
          @click="toggle"
        >
          <span class="Button__Content font-bold text-[.75rem] uppercase">
            Annuler
          </span>
        </button>
        <button
          type="button"
          class="bg-blue-500 bg-opacity-20 text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 py-2 px-3 rounded-lg Button--small flex justify-center items-center gap-2 text-sm"
          @click="saveBtn()"
        >
          <div v-if="loading">
            <svg
              class="w-5 h-5 mr-1 -ml-1 text-black animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <div>Telechager</div>
        </button>
      </div>
    </div>

    <transition
      name="accordion"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div v-show="item.open" class="body h-auto">
        <div class="text-justify">
          <template v-if="item.answer == 'sanction'">
            <div class="" v-for="(item, index) in item.entres" :key="index">
              ldlfdfdfkdfldkfdlfdkfdlk
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.accordion .header-icon {
  transform: rotate(0deg);
  transition-duration: 0.3s;
}

.accordion .body {
  overflow: auto;
  transition: 150ms ease-out;
}

.accordion .header-icon.rotate {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}
</style>
