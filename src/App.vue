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
import { useAuthStore } from "./store/auth.store.js";
import { useRouter } from "vue-router";
import { onMounted, onBeforeMount } from "vue";

const { isAuthenticated } = useAuth0();
const router = useRouter();

let addSpec = true;

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
      // console.log(ship[0]);
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
      const user = await response.json();
      const userRole = user.role;
      return userRole;
    };
    const role = await getUserRole();
    const ship = await getShip();
    authStore.updateUserRoleToken(user, role, jwt);
    if (role === "manager") {
      console.log("Did the code reach here?");
      router.push({ path: "/my-vessels" });
    } else {
      router.push({ path: `/vessels/${ship.name}/${ship.imo_reg}/${addSpec}` });
    }
  }
});
</script>

<style>
@font-face {
  font-family: "Manrope";
  src: local("Manrope"), url(./fonts/Manrope-Medium.otf) format("truetype");
}
</style>
