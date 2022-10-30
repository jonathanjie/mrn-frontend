<template>
  <!-- TODO: router view for login page -->
  <!-- <router-view v-if="!isAuthenticated" class="bg-gray-50 min-h-screen"></router-view> -->

  <div v-if="isAuthenticated" class="flex items-start items-stretch">
    <div class="z-50 fixed">
      <SideNav/>
    </div>
    <div class="grow h-screen" :class="collapsed?'ml-20':'ml-64'">
      <!-- TODO: change to fixed, not sticky -->
      <WebHeader class="sticky top-0 z-40"/>
      <div class="flex flex-col">
        <button v-if="isAuthenticated" @click="logout">Log out</button>
      </div>
      <router-view class="bg-gray-50 min-h-screen"></router-view>
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav/SideNav.vue'
import WebHeader from './components/WebHeader.vue'
import { collapsed } from './components/SideNav/state.js'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from './store/auth.store.js'
// import { useRouter } from 'vue-router'

export default {
  setup() {
    const { user, isAuthenticated } = useAuth0();

    return {
      collapsed,
      user,
      isAuthenticated,
    };
  }, 
  async created() {
    const authStore = useAuthStore()
    if (!authStore.user || !authStore.token) {
      const { user, getAccessTokenSilently } = useAuth0();
      const jwt = await getAccessTokenSilently();

      authStore.updateUserAndToken(user, jwt)
    }
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
