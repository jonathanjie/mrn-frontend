<script setup>
import { toRefs } from "vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
const props = defineProps({
  userCurrentPlan: String,
  userPlan: String,
  userDescription: String,
  options: Array,
});

const emailSubject = "Sales%20Inquiry%20for%20MarinaNet";
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
        class="flex rounded-xl border disabled py-2 text-14 mr-1 mb-1 w-full justify-center bg-gray-100"
      >
        <span class="text-14 text-gray-200">You are on this plan</span>
      </div>
      <a
        v-else
        :href="'mailto:sales@marinachain.io?subject=' + emailSubject"
        class="w-full"
      >
        <GradientButton
          class="py-2 text-14 mr-1 mb-1 w-full justify-center"
          type="button"
          ><template v-slot:content>{{ $t("contactUs") }}</template>
        </GradientButton>
      </a>
    </div>

    <div class="flex flex-col justify-start">
      <span>{{ userPlan }} includes:</span>
      <div
        v-for="option in options"
        :key="option.id"
        class="flex mt-5 items-start"
      >
        <img src="@/assets/icons/PricingPlan/pricing_check.svg" class="mr-2" />
        <span class="text-14 text-gray-700">{{ option }}</span>
      </div>
    </div>
  </div>
</template>
