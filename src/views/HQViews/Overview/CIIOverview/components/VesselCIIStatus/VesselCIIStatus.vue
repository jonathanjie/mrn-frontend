<script setup>
import CustomButton from "@/components/Buttons/CustomButton.vue";
import { useCIICalculatorStore } from "@/stores/useCIICalculatorStore";
import { storeToRefs } from "pinia";
import CIICalculatorModal from "./components/CIICalculatorModal/CIICalculatorModal.vue";

const currentYear = 2023;
const currentStats = {
  year: 2023,
  grade: "A",
  gradeValue: 4.62,
  ytd: "2023-02-10",
  targetCIIGrade: "A",
  targetCIIGradeValue: 4.62,
  cLevelLimit: 5.0,
};

const store = useCIICalculatorStore();
const { showModal } = storeToRefs(store);
</script>
<template>
  <CIICalculatorModal />
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <span class="text-18 text-gray-700 font-bold">{{ $t("ciiStatus") }}</span>
      <CustomButton
        class="h-9 text-14 text-blue-700 rounded-xl ml-auto min-w-fit disabled:text-gray-500"
        @click="showModal = true"
      >
        <template v-slot:content>
          <img
            src="@/assets/icons/Speed_Graph/CIIOverview/cii_calculator.svg"
            class="mr-1.5"
          />{{ $t("ciiCalculator") }}</template
        >
      </CustomButton>
    </div>
    <div class="flex space-x-6">
      <div class="flex flex-col rounded-xl bg-white p-4">
        <div class="flex flex-row">
          <span class="text-14 text-blue-700 font-semibold mr-1.5">{{
            currentYear
          }}</span>
          <div class="flex rounded-xl h-7 w-auto bg-red-50 ml-2">
            <ul class="list-disc p-0.5 text-14 ml-6 mr-3">
              <li class="text-red-500 font-bold">
                <span class="text-red-700 font-bold">{{
                  $t("currentStats")
                }}</span>
              </li>
            </ul>
          </div>
        </div>
        <span class="w-full"></span>
      </div>
    </div>
  </div>
</template>
