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
  <!-- <GradientButton>
    <template v-slot:icon>
      <img src="@/assets/icons/upload.svg" class="h-5 w-5 mr-2"/>
    </template>
    <template v-slot:content>Upload Noon Report</template>  
  </GradientButton> -->
</template>

<script>
import SideNav from '../components/SideNav/SideNav.vue'
import WebHeader from '../components/WebHeader.vue'
// import GradientButton from '../components/GradientButton.vue'

export default {
  name: 'HomeView',
  components: {
    SideNav,
    WebHeader,
    // GradientButton
}
}
</script>
