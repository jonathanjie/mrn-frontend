<template>
  <div class="flex items-start items-stretch">
    <div class="z-50 fixed">
      <SideNav/>
    </div>
    <div class="grow h-screen" :class="collapsed?'ml-20':'ml-64'">
      <!-- TODO: change to fixed, not sticky -->
      <WebHeader class="sticky top-0 z-40"/>
      <router-view class="bg-gray-50 min-h-screen"></router-view>
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav/SideNav.vue'
import WebHeader from './components/WebHeader.vue'
import { collapsed } from "./components/SideNav/state.js"

export default {
  setup() {
    return {
      collapsed
    };
  }, 
  components: {
    SideNav,
    WebHeader,
  }
}
</script>

<style>
@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-SemiBold.ttf) format("truetype");
}
</style>
