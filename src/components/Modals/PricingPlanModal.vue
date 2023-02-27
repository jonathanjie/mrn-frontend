<script setup>
import PricingContainer from "@/components/Modals/components/PricingContainer.vue";

const emit = defineEmits(["close-modal"]);
const userCurrentPlan = "Starter";
// const userPlans = ["Starter"];
const userPlans = ["Starter", "Growth", "Pro", "Enterprise"];

const userDescription = [
  "For you to Explore",
  "Perfect to get started",
  "For users who want to do more",
  "Full access to MarinaNet",
];
const options = {
  Starter: [
    "3 Manager accounts",
    "Full CII report for 1 ship",
    "Dashboard-fleet overview",
    "Onboard & view unlimited ships",
  ],
  Growth: [
    "Up to 10 Manager accounts",
    "Full CII report for whole fleet",
    "Voyage CII report",
    "CII optimisation",
    "Lifecycle CO2 monitoring",
  ],
  Pro: [
    "Unlimited number of managers accounts",
    "Full CII report for whole fleet",
    "Data analytics features",
    "Route visualization & checking",
    "Workflow reporting automation",
  ],
  Enterprise: [
    "Full features",
    "Data analytics features",
    "CII Management",
    "Route Management",
    "Customer support 24/7",
  ],
};

const closeModal = () => {
  emit("close-modal");
};
</script>
<template>
  <div>
    <div
      class="overflow-auto fixed inset-0 z-50 justify-center items-center flex bg-slate-400"
    >
      <div class="relative mx-auto h-5/6 w-8/12">
        <div
          class="border rounded-lg items-center relative flex flex-col w-full bg-white"
        >
          <!--header-->
          <div class="flex items-center w-full justify-end p-5 rounded-t">
            <button
              class="p-1 bg-gray-100 border-0 text-black opacity-50 float-right text-100 leading-none font-semibold"
              @click="closeModal"
            >
              <span class="h-2.5 w-2.5 text-3xl block">x</span>
            </button>
          </div>
          <div class="flex flex-col items-center">
            <span class="text-30 text-gray-700 font-semibold"
              >Ready to get Started?</span
            >
            <span class="text-20 text-gray-700 mt-3"
              >Start realising your savings today</span
            >
          </div>
          <!--body-->
          <div
            class="flex flex-row w-full justify-center space-x-6 px-10 mt-8 mb-20"
          >
            <PricingContainer
              v-for="(userPlan, index) in userPlans"
              :key="userPlan.id"
              :userCurrentPlan="userCurrentPlan"
              :userPlan="userPlan"
              :userDescription="userDescription[index]"
              :options="options[userPlan]"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="opacity-80 fixed inset-0 z-40 bg-gray-900"></div>
  </div>
</template>
