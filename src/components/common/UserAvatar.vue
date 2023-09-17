<template>
  <div>
    <button
      class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"    >
      <img
        class="object-cover w-full h-full"
        :src="src"
        alt="Your avatar"
      />
    </button>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true
  }
})
</script>

<style></style>
