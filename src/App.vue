<template>
  <!-- router view for login page
  <router-view v-if="!isAuthenticated" class="bg-gray-50 min-h-screen"></router-view> -->

  <div v-if="isAuthenticated" class="flex items-start items-stretch">
    <div class="z-50 fixed">
      <SideNav/>
    </div>
    <div class="grow h-screen" :class="collapsed?'ml-20':'ml-64'">
      <!-- TODO: change to fixed, not sticky -->
      <WebHeader class="sticky top-0 z-40"/>
      <div>
        <h2>User Profile</h2>
        <button @click="login">Log in</button>
        <pre v-if="isAuthenticated">
            <code>{{ user }}</code>
            <code>{{ data }}</code>
            <button @click="logout">Log out</button>
        </pre>
        <button @click="getToken">Get Token</button>
      </div>
      <router-view class="bg-gray-50 min-h-screen"></router-view>
    </div>
  </div>
</template>

<script>
import SideNav from './components/SideNav/SideNav.vue'
import WebHeader from './components/WebHeader.vue'
import { collapsed } from "./components/SideNav/state.js"
import { useAuth0 } from '@auth0/auth0-vue'
// import { useRouter } from 'vue-router';

export default {
  setup() {
    const { user, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();
    
    return {
      collapsed,
      logout: () => {
        logout({ returnTo: window.location.origin });
      },
      login: () => {
        loginWithRedirect();
      },
      getToken: async() => {
        const token = await getAccessTokenSilently();
        console.log(token);
      },
      doSomethingWithToken: async() => {
        const token = await getAccessTokenSilently();
        const response = await fetch('https://django-jwt-test-dan/api/posts', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
        // const data = await response.json();
      },
      user,
      isAuthenticated
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
