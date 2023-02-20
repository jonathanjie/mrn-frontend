<script setup>
import { toRefs } from "vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
const props = defineProps({
  userCurrentPlan: String,
  userPlan: String,
  userDescription: String,
  options: Array,
});

const emailSubject = "Request%20to%20be%20added%20onto%20the%20ESG%20list";
const { userCurrentPlan, userPlan, userDescription, options } = toRefs(props);
</script>

<template>
  <div
    class="flex flex-col justify-start rounded-xl border border-gray-200 bg-white px-5 py-12 w-full"
  >
    <div class="flex flex-col">
      <span class="text-20 text-gray-700 font-bold">{{ userPlan }}</span>
      <span class="text-16 text-gray-700">{{ userDescription }}</span>
    </div>
    <div class="flex my-7">
      <div
        v-if="userCurrentPlan == userPlan"
        class="flex rounded-xl border disabled py-2 text-14 mr-1 mb-1 w-full justify-center"
      >
        <span class="text-14 text-gray-400">You are on this plan</span>
      </div>
      <GradientButton
        v-else
        class="py-2 text-14 mr-1 mb-1 w-full justify-center"
        type="button"
      >
        <template v-slot:content
          ><a :href="'mailto:info@marinachain.io?subject=' + emailSubject">{{
            $t("contactUs")
          }}</a></template
        >
      </GradientButton>
    </div>

    <div class="flex flex-col justify-start">
      <span>{{ userPlan }} includes:</span>
      <div v-for="option in options" :key="option.id" class="flex mt-5">
        <img src="@/assets/icons/PricingPlan/pricing_check.svg" class="mr-2" />
        <span class="text-14 text-gray-700">{{ option }}</span>
      </div>
    </div>
  </div>
</template>
