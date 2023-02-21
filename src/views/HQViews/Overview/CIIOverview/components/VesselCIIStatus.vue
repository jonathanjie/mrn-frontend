<script setup>
import CustomButton from "@/components/Buttons/CustomButton.vue";
const currentYear = 2023;
</script>
<template>
  <div class="flex flex col">
    <div class="flex justify-between items-center">
      <span class="text-18 text-gray-700 font-bold">{{ $t("ciiStatus") }}</span>
      <CustomButton
        class="h-9 text-14 text-blue-700 rounded-xl ml-auto min-w-fit disabled:text-gray-500"
      >
        <template v-slot:content>
          <img
            src="@/assets/icons/Speed_Graph/CIIOverview/cii_calculator.svg"
            class="mr-1.5"
          />{{ $t("ciiCalculator") }}</template
        >
      </CustomButton>
    </div>
    <div class="flex space-x-6 w-full">
      <div class="flex flex-col rounded-l bg-white p-4">
        <span class="text-14 text-blue-700 font-semibold mr-1.5">{{
          currentYear
        }}</span>
      </div>
    </div>
  </div>
</template>
