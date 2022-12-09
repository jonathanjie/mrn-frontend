<template>
  <!-- TODO: router view for login page -->
  <!-- <router-view v-if="!isAuthenticated" class="bg-gray-50 min-h-screen"></router-view> -->

  <div v-if="isAuthenticated" class="flex items-start items-stretch">
    <div class="z-50 fixed">
      <Suspense>
        <SideNav />
      </Suspense>
    </div>
    <div class="grow h-screen" :class="collapsed ? 'ml-20' : 'ml-64'">
      <!-- TODO: change to fixed, not sticky -->
      <WebHeader class="sticky top-0 z-40" />
      <router-view class="bg-gray-50 min-h-screen"></router-view>
    </div>
  </div>
</template>

<script setup>
import SideNav from "./components/SideNav/SideNav.vue";
import WebHeader from "./components/WebHeader.vue";
import { collapsed } from "./components/SideNav/state.js";
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "./store/auth.store.js";
// import { useRouter } from 'vue-router'
import { onMounted } from "vue";

const { user, isAuthenticated } = useAuth0();

onMounted(async () => {
  const authStore = useAuthStore();
  // check not if token exists but if token is expired
  // https://community.auth0.com/t/how-to-check-access-token-is-expired/78890
  // TODO: this check needs to be done when going from one page to another
  if (!authStore.user || !authStore.token) {
    const { user, getAccessTokenSilently } = useAuth0();
    const jwt = await getAccessTokenSilently();

    authStore.updateUserAndToken(user, jwt);
  }
});
</script>

<style>
@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-Medium.otf) format("truetype");
}
</style>
