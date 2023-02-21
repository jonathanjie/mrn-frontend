<script setup>
import { toRefs } from "vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
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
    class="flex flex-col relative justify-start rounded-xl border border-gray-200 px-5 w-full"
    :class="userPlan === 'Enterprise' ? 'bg-blue-800 py-6' : 'bg-white py-12'"
  >
    <img
      v-if="userPlan == 'Enterprise'"
      src="@/assets/icons/PricingPlan/upper_circle.svg"
      class="absolute top-0 right-0"
    />
    <img
      v-if="userPlan == 'Enterprise'"
      src="@/assets/icons/PricingPlan/lower_circle.svg"
      class="absolute bottom-0 left-0"
    />
    <div v-if="userPlan == 'Enterprise'" class="flex justify-end">
      <span
        class="text-14 font-bold text-white bg-gradient-to-r from-gradientblue to-gradientgreen rounded-2xl py-0.5 px-2.5"
        >{{ $t("popular") }}</span
      >
    </div>
    <div class="flex flex-col">
      <div class="flex">
        <img src="@/assets/icons/PricingPlan/price_circle.svg" class="mr-2" />
        <span
          class="text-20 font-bold"
          :class="
            userPlan === 'Enterprise' ? 'text-white mt-13' : 'text-gray-700'
          "
          >{{ userPlan }}</span
        >
      </div>
      <span
        class="text-16"
        :class="userPlan === 'Enterprise' ? 'text-white' : 'text-gray-700'"
        >{{ userDescription }}</span
      >
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
          v-if="userPlan != 'Enterprise'"
          class="py-2 text-14 mr-1 mb-1 w-full justify-center"
          type="button"
          ><template v-slot:content>{{ $t("contactUs") }}</template>
        </GradientButton>
        <CustomButton
          v-else
          class="py-2 text-14 mr-1 mb-1 w-full justify-center"
          type="button"
          @click="closeModal"
        >
          <template v-slot:content>{{ $t("contactUs") }}</template>
        </CustomButton>
      </a>
    </div>
    <div class="flex flex-col justify-start">
      <span
        class="text-14 font-bold"
        :class="userPlan === 'Enterprise' ? 'text-white' : 'text-gray-700'"
        >{{ userPlan }} includes:</span
      >
      <div
        v-for="option in options"
        :key="option.id"
        class="flex mt-5 items-start"
      >
        <img
          v-if="userPlan === 'Enterprise'"
          src="@/assets/icons/PricingPlan/pricing_enterprise_check.svg"
          class="mr-2"
        />
        <img
          v-else
          src="@/assets/icons/PricingPlan/pricing_check.svg"
          class="mr-2"
        />
        <span
          class="text-14"
          :class="userPlan === 'Enterprise' ? 'text-white' : 'text-gray-700'"
          >{{ option }}</span
        >
      </div>
    </div>
  </div>
</template>
