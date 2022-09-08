<script setup>
import SideNav from './components/SideNav'
import WebHeader from './components/WebHeader.vue'

</script>

<template>
  <div class="flex items-start items-stretch">
    <div>
      <SideNav class=""/>
    </div>
    <div class="grow h-screen">
      <WebHeader class="sticky"/>
      <div class="flex bg-backgroundgray h-full"></div>
    </div>

  </div>
</template>

<style>
@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-Regular.ttf) format("truetype");
}
</style>
