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
import { useAuthStore } from "./stores/auth.store.js";
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

<style lang="scss">
@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-Medium.otf) format("truetype");
}

$dp__font_family: "Manrope";
$dp__font_size: 0.875rem;
$dp__border_radius: 0px;
$dp__input_padding: 12px 12px;
$dp__input_icon_padding: 14px;

@import "node_modules/@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";

// TODO: no option to change placeholder color for DatePicker; if possible, set to #B3BAC7
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #475467;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #0093b8;
  --dp-hover-icon-color: #0093b8;
  --dp-primary-color: #0093b8;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ffffff;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #ffffff;
  --dp-disabled-color: #f9fafb;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #0093b8;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>
