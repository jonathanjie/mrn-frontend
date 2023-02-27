<template>
  <div class="flex min-h-screen z-50 fixed" :style="{ width: sidebarWidth }">
    <div
      class="flex flex-col bg-blue text-cyan-100 w-64 relative -translate-x-0 inset-y-0 left-0"
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
            <span v-if="!collapsed" class="text-white text-14 font-bold">{{
              $t("myVessels")
            }}</span>
          </Transition>
        </router-link>
        <router-link
          v-if="!manager"
          :to="{
            name: 'vessel-overview',
            params: {
              vesselname: props.vesselname,
              imo: props.imo,
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
      <a
        v-if="!manager"
        href="https://forms.gle/7wW6NxrpBMdDqNmS9"
        target="_blank"
        class="hover:animate-none animate-bounce flex items-center rounded-lg p-1.5 text-14 mt-auto mb-5 mx-5 border border-yellow-500 bg-yellow-50 text-yellow-700"
      >
        <img src="@/assets/icons/feedback.svg" class="w-6 h-6 mr-1.5" />
        <div v-if="!collapsed">{{ $t("leaveFeedback") }}</div>
      </a>
      <div
        class="flex flex-col relative bg-white rounded-xl py-6 px-4 mx-4 mb-4"
      >
        <img
          src="@/assets/icons/PricingPlan/upper_circle.svg"
          class="absolute top-0 right-0"
        />
        <span class="text-16 text-blue-700 font-bold mb-4"
          >Ready to scale your businesses?</span
        >
        <GradientButton
          class="px-6 py-2 text-14 mr-1 mb-1 justify-center"
          type="button"
          @click="pricingModal()"
        >
          <template v-slot:content>View Pricing Plans</template>
        </GradientButton>
      </div>
    </div>
  </div>
  <PricingPlanModal
    ref="modal"
    v-if="showModal"
    @close-modal="showModal = false"
  />
</template>

<script setup>
import { collapsed, toggleSidebar, sidebarWidth } from "./state";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import GradientButton from "../Buttons/GradientButton.vue";
import { ref } from "vue";
import PricingPlanModal from "@/components/Modals/PricingPlanModal.vue";
let showModal = ref(false);

const pricingModal = () => {
  showModal.value = true;
};
const router = useRouter();

const props = defineProps({
  vesselname: String,
  imo: String,
});

// Home Button
const home = () => {
  if (manager) {
    router.push({ path: "/my-vessels" });
  } else {
    router.push({
      path: `/vessels/${props.vesselname}/${props.imo}/overview`,
    });
  }
};

const auth = useAuthStore();
const manager = auth.role === "manager";
</script>
