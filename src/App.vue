<template>
  <!-- TODO: router view for login page -->
  <!-- <router-view v-if="!isAuthenticated" class="bg-gray-50 min-h-screen"></router-view> -->
  <div v-if="isAuthenticated" class="flex items-start items-stretch">
    <div class="z-50 fixed">
      <Suspense>
        <SideNav></SideNav>
      </Suspense>
    </div>
    <div class="grow h-screen" :class="collapsed ? 'ml-20' : 'ml-64'">
      <!-- TODO: change to fixed, not sticky -->
      <WebHeader class="sticky top-0 z-40" />
      <router-view class="bg-gray-50 min-h-screen" />
    </div>
  </div>
</template>

<script setup>
import SideNav from "./components/SideNav/SideNav.vue";
import WebHeader from "./components/WebHeader.vue";
import { collapsed } from "./components/SideNav/state.js";
import { useAuth0 } from "@auth0/auth0-vue";
import { useAuthStore } from "./stores/auth.store.js";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const { isAuthenticated, logout } = useAuth0();
let addSpec = true;
const router = useRouter();
onMounted(async () => {
  const authStore = useAuthStore();
  // check not if token exists but if token is expired
  // https://community.auth0.com/t/how-to-check-access-token-is-expired/78890
  // TODO: this check needs to be done when going from one page to another
  if (!authStore.user || !authStore.jwt) {
    const { user, getAccessTokenSilently } = useAuth0();
    const jwt = await getAccessTokenSilently();
    const getShip = async () => {
      const response = await fetch(
        // Assuming that ships api can only provide 1 ship
        `https://testapi.marinachain.io/marinanet/ships`,
        {
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const ship = await response.json();
      if (ship[0].shipspecs === null) {
        addSpec = true;
      } else {
        addSpec = false;
      }
      return ship[0];
    };

    const getUserRole = async () => {
      const response = await fetch(
        `https://testapi.marinachain.io/marinanet/user`,
        {
          headers: {
            Authorization: "Bearer " + jwt,
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const reply = await response.json();
      const userRole = reply.role;
      return userRole;
    };
    const role = await getUserRole();
    const ship = await getShip();
    authStore.updateUserRoleToken(user, role, jwt);
    if (role === "manager") {
      router.push({ path: "/my-vessels" });
    } else {
      router.push({
        path: `/vessels/${ship.name}/${ship.imo_reg}/${addSpec}/overview`,
      });
    }
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
