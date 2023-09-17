<script setup>
import { computed } from "vue";
import { getButtonColor } from "@/colors.js";



const props = defineProps({
    label:{
        type:String,
        default:"Active"
    },
    color:{
        type:String,
        default:""
    }
});

const componentClass = computed(()=>{
    const base = [
    "h-2.5 w-2.5 rounded-full mr-2",
    getButtonColor(props.color, props.outline, !props.disabled, props.active),
  ];
  return base
})
</script>

<template>
  <div>
    <div class="flex items-center">
      <div :class="componentClass"></div>
      {{ label  }}
    </div>
  </div>
</template>
