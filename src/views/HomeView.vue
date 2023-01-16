<template>
  <div v-if="!ship">
    {{ $t("userAccountHasNotBeenInitialized") }}
  </div>
  <div v-else class="grow h-screen">
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
    shipName,
    fuelOils,
    lubricatingOils,
    machinery,
  } = storeToRefs(shipStore);

  crewShipDetails.value = shipDetails;

  companyUuid.value = shipDetails.company.uuid;
  imoReg.value = shipDetails.imo_reg;
  shipUuid.value = shipDetails.uuid;
  shipName.value = shipDetails.name;
  fuelOils.value = shipDetails.shipspecs.fuel_options;
  lubricatingOils.value = shipDetails.shipspecs.lubricating_oil_options;
  machinery.value = shipDetails.shipspecs.machinery_options;
  // console.log(shipDetails.shipspecs.fuel_options);

  return shipDetails;
};

const getShip = async () => {
  return await axios
    .get(`${UrlDomain.DEV}/marinanet/ships`)
    .then((response) => {
      // console.log("Ship Details (home view): ", response.data);
      if (response.data[0].shipspecs != undefined) {
        updateShipDetails(response.data[0], shipStore);
      }
      return response.data[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const jwt = await getAccessTokenSilently();
// console.log("Token", jwt);
axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;

let showModal = ref(true);
const ship = await getShip();
const role = await getUserRole();
auth.updateUserRoleToken(user, role, jwt);

if (ship?.shipspecs != undefined || role == "manager") {
  showModal = false;
}
</script>
