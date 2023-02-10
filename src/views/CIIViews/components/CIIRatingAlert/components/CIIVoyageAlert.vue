<script setup>
const voyageNum = 3;
</script>

<template>
  <div class="flex rounded-2xl items-center bg-yellow-50">
    <span
      class="text-12 text-yellow-700 font-semibold rounded-2xl px-2 py-0.5 mr-8 bg-white"
      >Alert</span
    >
    <span class="text-12 text-yellow-700"
      >Voyage {{ voyageNum }} has exceeded your CII limit.</span
    >
  </div>
</template>
