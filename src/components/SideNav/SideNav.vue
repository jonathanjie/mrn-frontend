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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useVoyageStore } from "@/stores/useVoyageStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useShipsQuery } from "@/queries/useShipsQuery";
import axios from "axios";
const router = useRouter();
// const ships = ref(null);
// const { isLoading, data } = useShipsQuery({ enabled: computed(() => !!ships) });
const getShip = async () => {
  return await axios
    .get(`https://testapi.marinachain.io/marinanet/ships`)
    .then((response) => {
      console.log("Ship", response.data);
      return response.data[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getVoyages = async (imo) => {
  return await axios
    .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/voyages/`)
    .then((response) => {
      console.log("Voyages", response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getReports = async (imo) => {
  return await axios
    .get(`https://testapi.marinachain.io/marinanet/ships/${imo}/reports/`)
    .then((response) => {
      console.log("Reports", response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
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

const store = useVoyageStore();
const auth = useAuthStore();
console.log("Role here", auth.role);
const ship = await getShip();
// const ship = ships[0];
const manager = auth.role === "manager";
</script>
