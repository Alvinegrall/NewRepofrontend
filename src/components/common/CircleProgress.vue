<template>
  <div class="flex justify-center items-center">
    <circle-progress
      :is-gradient="true"
      :transition="200"
      :percent="10"
      :show-percent="true"
      :unit="'%'"
      :gradient="{
        angle: 50,
        startColor: '#142d63',
        stopColor: '#00a0ff',
      }"
    />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
