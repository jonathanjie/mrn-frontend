<template>
  <SideNav :vesselname="ship.name" :imo="ship.imo_reg" />
  <div class="grow h-screen" :class="collapsed ? 'ml-20' : 'ml-64'">
    <!-- TODO: change to fixed, not sticky -->
    <WebHeader class="sticky top-0 z-40" />
    <router-view class="bg-gray-50 min-h-screen" />
    <InitializationModal
      ref="modal"
      v-if="showModal"
      @close-modal="showModal = false"
      :vesselname="ship.name"
      :imo="ship.imo_reg"
      :flag="ship.flag"
      :deadweight_tonnage="ship.deadweight_tonnage"
    ></InitializationModal>
  </div>
</template>

<script setup>
import SideNav from "@/components/SideNav/SideNav.vue";
import WebHeader from "@/components/WebHeader.vue";
import InitializationModal from "@/components/Modals/InitializationModal.vue";
import { collapsed } from "@/components/SideNav/state.js";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth0 } from "@auth0/auth0-vue";
import { useShipStore } from "@/stores/useShipStore";
import axios from "axios";
import { UrlDomain } from "@/constants";
import { storeToRefs } from "pinia";

const auth = useAuthStore();
const { user, getAccessTokenSilently } = useAuth0();
const shipStore = useShipStore();
const { crewShipDetails, companyUuid, imoReg, shipUuid } =
  storeToRefs(shipStore);

const getUserRole = async () => {
  return await axios
    .get(`${UrlDomain.DEV}/marinanet/user/`)
    .then((response) => {
      console.log("User Role", response);
      return response.data.role;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getShip = async () => {
  return await axios
    .get(`${UrlDomain.DEV}/marinanet/ships`)
    .then((response) => {
      console.log("Ship Details (home view): ", response.data);
      crewShipDetails.value = response.data[0];
      companyUuid.value = response.data[0].company.uuid;
      imoReg.value = response.data[0].imo_reg;
      shipUuid.value = response.data[0].uuid;
      return response.data[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const jwt = await getAccessTokenSilently();
axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;

let showModal = false;
const ship = await getShip();
if (ship.shipspecs === null) {
  showModal = true;
}

const role = await getUserRole();
auth.updateUserRoleToken(user, role, jwt);
</script>
