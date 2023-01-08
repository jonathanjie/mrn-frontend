<template>
  <SideNav />
  <div class="grow h-screen" :class="collapsed ? 'ml-20' : 'ml-64'">
    <!-- TODO: change to fixed, not sticky -->
    <WebHeader class="sticky top-0 z-40" />
    <router-view class="bg-gray-50 min-h-screen" />
  </div>
</template>

<script setup>
import SideNav from "@/components/SideNav/SideNav.vue";
import WebHeader from "@/components/WebHeader.vue";
import { collapsed } from "@/components/SideNav/state.js";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth0 } from "@auth0/auth0-vue";
import axios from "axios";
import { UrlDomain } from "@/constants";

const auth = useAuthStore();
const { user, getAccessTokenSilently } = useAuth0();

const getUserRole = async () => {
  return await axios
    .get(`${UrlDomain.TEST}/marinanet/user/`)
    .then((response) => {
      console.log("User Role", response);
      return response.data.role;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const jwt = await getAccessTokenSilently();
axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
const role = await getUserRole();
auth.updateUserRoleToken(user, role, jwt);
</script>
