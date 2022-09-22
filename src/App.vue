<template>
  <div class="flex items-start items-stretch">
    <div class="z-10">
      <SideNav/>
    </div>
    <div class="grow h-screen">
      <WebHeader class="sticky"/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav/SideNav.vue'
import WebHeader from './components/WebHeader.vue'

export default {
  name: 'App',
  components: {
    SideNav,
    WebHeader,
  }
}
</script>

<style>
/* @font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-Regular.ttf) format("truetype");
} */

@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-SemiBold.ttf) format("truetype");
}
</style>
