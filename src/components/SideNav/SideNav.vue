<template>
  <div class="flex min-h-screen z-50 fixed" :style="{ width: sidebarWidth }">
    <div
      class="bg-blue text-cyan-100 w-64 relative -translate-x-0 inset-y-0 left-0 transition all ease-in-out delay-150 duration-200"
    >
      <div class="absolute -right-4 top-5">
        <button @click="toggleSidebar">
          <!-- add 180 degree rotation when clicked -->
          <img
            src="@/assets/icons/navbar_minmax.svg"
            class="w-8 drop-shadow-sm"
          />
        </button>
      </div>
      <div class="flex items-center justify-center py-5 bg-blue-700/[0.24]">
        <button @click="home">
          <img
            v-if="collapsed"
            src="@/assets/logomark_white.svg"
            class="h-8 px-6"
          />
          <img v-else src="@/assets/marina_logo.svg" class="w-100" />
        </button>
      </div>

      <nav>
        <div class="py-2"></div>
        <!-- temporary fix to jump to specific vessel page for demo -->
        <!-- Still in development, enabled for easier access -->
        <router-link
          v-if="manager"
          to="/my-vessels"
          class="flex py-4 px-7 space-x-3 hover:bg-blue-700/[0.24]"
          :class="{ 'justify-center': collapsed }"
        >
          <img src="@/assets/icons/my_vessels.svg" class="h-6 w-6" />
          <Transition name="fade">
            <span v-if="!collapsed" class="text-white text-14 font-bold"
              >MyVessels HQ</span
            >
          </Transition>
        </router-link>
        <router-link
          v-if="!manager"
          :to="{
            name: 'vessel-overview',
            params: {
              vesselname: ship.name,
              imo: ship.imo_reg,
            },
          }"
          class="flex py-4 px-7 space-x-3 hover:bg-blue-700/[0.24]"
          :class="{ 'justify-center': collapsed }"
        >
          <img src="@/assets/icons/my_vessels.svg" class="h-6 w-6" />
          <Transition name="fade">
            <span v-if="!collapsed" class="text-white text-14 font-bold">{{
              $t("myVessels")
            }}</span>
          </Transition>
        </router-link>
        <!-- <router-link
          to="/"
          class="flex py-4 px-7 space-x-3 hover:bg-blue-700/[0.24]"
          :class="{ 'justify-center': collapsed }"
        >
          <img src="@/assets/icons/overview.svg" class="h-6 w-6" />
          <Transition name="fade">
            <span v-if="!collapsed" class="text-white text-14 font-bold">{{
              $t("reporting")
            }}</span>
          </Transition>
        </router-link> -->
      </nav>
    </div>
  </div>
</template>

<script setup>
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
import { useRouter } from "vue-router";
import { useShipStore } from "@/stores/useShipStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth0 } from "@auth0/auth0-vue";
import { storeToRefs } from "pinia";

console.log("Sidenav loads");
const auth = useAuthStore();
const router = useRouter();
const { user, getAccessTokenSilently } = useAuth0();
const jwt = await getAccessTokenSilently();

const store = useShipStore();
const { imoReg, companyUuid } = storeToRefs(store);

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
  let output = {};
  if (response.status === 200) {
    output = await response.json();
  } else {
    console.log("Error at getShip call, with error code", response.status);
  }
  return output[0];
};

const getUserRole = async () => {
  const response = await fetch(
    `https://testapi.marinachain.io/marinanet/user/`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  let output = "";
  if (response.status === 200) {
    const reply = await response.json();
    output = reply.role;
  } else {
    console.log("Error at getUserRole call, with error code", response.status);
  }
  return output;
};

const getVoyages = async (imo) => {
  const response = await fetch(
    `https://testapi.marinachain.io/marinanet/ships/${imo}/voyages/`,
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  let output = {};
  if (response.status === 200) {
    output = await response.json();
  } else {
    console.log("Error at getVoyages call, with error code", response.status);
  }
  return output;
};

const getReports = async (imo) => {
  const response = await fetch(
    `https://testapi.marinachain.io/marinanet/ships/${imo}/reports/`,
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  let output = {};
  if (response.status === 200) {
    output = await response.json();
  } else {
    console.log("Error at getReports call, with error code", response.status);
  }
  return output;
};

// Home Button
const home = () => {
  if (manager) {
    router.push({ path: "/my-vessels" });
  } else {
    router.push({
      path: `/vessels/${ship.name}/${ship.imo_reg}/overview`,
    });
  }
};

const role = await getUserRole();
const manager = role === "manager";
console.log("Sidebar loads");
auth.updateUserRoleToken(user, role, jwt);
console.log("Auth store is updated here");
const ship = await getShip();

if (manager) {
  router.push({ path: "/my-vessels" });
} else {
  // store in ship store for crew side
  imoReg.value = ship.imo_reg;
  companyUuid.value = ship.company.uuid;

  router.push({
    path: `/vessels/${ship.name}/${ship.imo_reg}/overview`,
  });
}
</script>
