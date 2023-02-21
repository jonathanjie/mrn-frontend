<script setup>
defineProps({ src: String });
</script>

<template>
  <img :src="require(`../../assets` + src)" class="w-5" />
</template>
