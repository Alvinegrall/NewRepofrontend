<script setup>
import FormDatePicker from "@/components/common/FormDatePicker.vue";
import { ref } from "vue";

const props = defineProps({
  placeholder:{
    type: String,
    default:""
  },
  showHour:Boolean

})

const emit = defineEmits(["getDate"]);
const date = ref("");

const updateDate = (event) => {
  const formatedDate = changeDateFormat(event.target.value);
  emit("getDate", formatedDate);
};
const changeDateFormat = (val) => {
  // transform date from 12/04/2023 to 2023-04-12
  if (date) {
    const dateArry = val.split("/");
    return (
      dateArry[2]?.split(" ")[0] +
      "-" +
      dateArry[1] +
      "-" +
      dateArry[0] +
      " " +
      dateArry[2]?.split(" ")[1]
    );
  }
};
</script>
<template>
  <div>
    <FormDatePicker
      v-model="date"
      type="date"
      icon="calendar"
      :placeholder="placeholder"
      :showHour="showHour"
      @input="updateDate($event)"
    />
  </div>
</template>
