<template>
  <div class="flex min-h-screen" :style="{ width: sidebarWidth }">
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
        <router-link to="/">
          <img
            v-if="collapsed"
            src="@/assets/logomark_white.svg"
            class="h-8 px-6"
          />
          <img v-else src="@/assets/marina_logo.svg" class="w-100" />
        </router-link>
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
          v-if="manager"
          :to="{
            name: 'vessel-overview',
            params: {
              vesselname: ship.name,
              imo: ship.imo_reg,
              specs: addSpec,
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
        <router-link
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
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth.store";
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
let addSpec = true;
const auth = useAuthStore();
const manager = auth.role.localeCompare("manager") == 0;
const getShip = async () => {
  const response = await fetch(
    // Assuming that ships api can only provide 1 ship
    `https://testapi.marinachain.io/marinanet/ships`,
    {
      headers: {
        Authorization: "Bearer " + auth.jwt,
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  const ship = await response.json();
  console.log(ship[0]);
  if (ship[0].shipspecs === null) {
    addSpec = true;
  } else {
    addSpec = false;
  }
  return ship[0];
};

const ship = await getShip();
</script>
