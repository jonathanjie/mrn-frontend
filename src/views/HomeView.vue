<template>
  <SideNav :vesselname="ship.name" :imo="ship.imo_reg.toString()" />
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
import { ref } from "vue";
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

const getUserRole = async () => {
  return await axios
    .get(`${UrlDomain.DEV}/marinanet/user/`)
    .then((response) => {
      // console.log("User Role", response);
      return response.data.role;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
const updateShipDetails = (shipDetails, shipStore) => {
  const {
    crewShipDetails,
    companyUuid,
    imoReg,
    shipUuid,
    fuelOils,
    lubricatingOils,
    machinery,
  } = storeToRefs(shipStore);

  crewShipDetails.value = shipDetails;
  companyUuid.value = shipDetails.company.uuid;
  imoReg.value = shipDetails.imo_reg;
  shipUuid.value = shipDetails.uuid;
  fuelOils.value = Object.entries(shipDetails.shipspecs.fuel_options)
    .filter((option) => option[1] == true)
    .map((x) => x[0]);
  lubricatingOils.value = Object.entries(
    shipDetails.shipspecs.lubricating_oil_options
  )
    .filter((option) => option[1] == true)
    .map((x) => x[0]);
  machinery.value = Object.entries(shipDetails.shipspecs.machinery_options)
    .filter((option) => option[1] == true)
    .map((x) => x[0]);
  // console.log(fuelOils.value);
  // console.log(lubricatingOils.value);
  // console.log(machinery.value);

  return shipDetails;
};
const getShip = async () => {
  return await axios
    .get(`${UrlDomain.DEV}/marinanet/ships`)
    .then((response) => {
      // console.log("Ship Details (home view): ", response.data);
      if (response.data[0].shipsspecs != undefined) {
        updateShipDetails(response.data[0], shipStore);
      }
      return response.data[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const jwt = await getAccessTokenSilently();
console.log("Token", jwt);
axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;

let showModal = ref(false);
const ship = await getShip();
console.log(ship);
if (ship.shipspecs == undefined) {
  showModal = true;
}

const role = await getUserRole();
auth.updateUserRoleToken(user, role, jwt);
</script>
