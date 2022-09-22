<template>
  <HomeView></HomeView>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/myvessels">My Vessels</router-link>
    <router-link :to="{ name: 'vessel', params: { vesselId: 'placeholderid' } }" >Vessel</router-link>>
  </nav>
  <router-view/>
</template>

<script>
import HomeView from './views/HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView,
  }
}
</script>

<style>
@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-Regular.ttf) format("truetype");
}
</style>

