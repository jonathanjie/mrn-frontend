<script setup>
import SideNav from './components/SideNav/SideNav.vue'
import WebHeader from './components/WebHeader.vue'

</script>

<template>
  <div class="flex items-start items-stretch">
    <div class="z-10">
      <SideNav/>
    </div>
    <div class="grow h-screen">
      <WebHeader class="sticky"/>
      <div class="flex bg-bggray h-full"></div>
    </div>

  </div>
</template>

<style>
@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-Regular.ttf) format("truetype");
}
</style>
