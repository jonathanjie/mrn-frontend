<script setup>
defineProps({ buttons: Array });
</script>

<template>
  <div class="max-w-fit ml-auto">
    <button v-for="(btn, idx) in buttons" :key="idx" @click="btn.onClick">
      <img :src="require(`../../assets` + btn.src)" class="w-5 ml-4" />
    </button>
  </div>
</template>
