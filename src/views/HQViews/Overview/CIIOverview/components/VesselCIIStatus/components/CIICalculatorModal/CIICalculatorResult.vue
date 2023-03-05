<script setup>
// import { preventNaN, format, textInputOptions } from "@/utils/helpers.js";
// import Tab from "@/components/Tabs/Tab.vue";
// import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
// import HazingBanner from "@/components/HazingBanner.vue";
// import { ref } from "vue";
import { useCIICalculatorStore } from "@/stores/useCIICalculatorStore.js";
import { storeToRefs } from "pinia";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";

// const hide = ref(true);
const store = useCIICalculatorStore();
const {
  ciiValue,
  ciiGrade,
  minCIIGrade,
  targetCIIGrade,
  ciiBoundaries,
  fuelTypes,
  CO2EmissionForTargetGrade,
  fuelAmountsForTargetGrade,
  CO2EmissionForMinGrade,
  fuelAmountsForMinGrade,
} = storeToRefs(store);

const ciiGradeToTailwindBg = (grade) => {
  return "bg-grades-" + grade;
};
const ciiGradeToTailwindOpaqueBg = (grade) => {
  if (grade === "a") {
    return "bg-gradeslighta";
  } else if (grade === "b") {
    return "bg-gradeslightb";
  } else if (grade === "c") {
    return "bg-gradeslightc";
  } else if (grade === "d") {
    return "bg-gradeslightd";
  } else {
    return "bg-gradeslighte";
  }
};
const ciiGradeToTailwindText = (grade) => {
  return "text-grades-" + grade;
};
// const calculateCII = () => {};
</script>

<template>
  <div
    class="flex flex-col space-y-3 text-gray-700 text-14 accent-blue-700 overflow-auto"
  >
    <div class="grid grid-cols-3 divide-x">
      <div
        class="space-y-4 py-8 px-7"
        :class="targetCIIGrade ? 'col-span-1' : 'col-span-3'"
      >
        <span class="text-16 font-bold">Estimated AER/CII Grade:</span>
        <div
          class="flex flex-col py-8 rounded-xl space-y-4 items-center"
          :class="ciiGradeToTailwindOpaqueBg(ciiGrade)"
        >
          <div
            class="text-white text-18 rounded-xl py-1.5 px-3"
            :class="ciiGradeToTailwindBg(ciiGrade)"
          >
            {{ ciiGrade.toUpperCase() }}
          </div>
          <div class="text-30" :class="ciiGradeToTailwindText(ciiGrade)">
            {{ ciiValue }}
          </div>
        </div>
      </div>
      <div v-if="targetCIIGrade" class="col-span-2 grid divide-y">
        <div class="py-8 px-7">
          <div
            class="flex items-center bg-gray-50 py-3 pr-3 rounded-r-lg relative"
          >
            <div
              class="absolute w-0.5 min-h-full"
              :class="ciiGradeToTailwindBg(targetCIIGrade)"
            ></div>
            <span class="pl-3">Selected target CII rating:</span>
            <div
              class="flex items-center ml-auto rounded-full py-1 px-2 text-12"
              :class="
                ciiGradeToTailwindText(targetCIIGrade) +
                ' ' +
                ciiGradeToTailwindOpaqueBg(targetCIIGrade)
              "
            >
              <span>{{ ciiBoundaries[targetCIIGrade] }}</span>
              <div
                class="ml-1 rounded-full text-white px-3"
                :class="ciiGradeToTailwindBg(targetCIIGrade)"
              >
                {{ targetCIIGrade.toUpperCase() }}
              </div>
            </div>
          </div>
          <div
            class="flex relative items-center bg-gray-50 pr-3 py-3 mt-3 rounded-r-lg"
          >
            <div class="absolute w-0.5 min-h-full bg-grades-c"></div>

            <span class="mx-3">Vessel can emit</span>
            <div
              class="flex-grow justify-center border border-yellow-200 bg-yellow-25 flex place-center text-yellow-800 rounded-xl"
            >
              {{
                CO2EmissionForTargetGrade === ""
                  ? "000,000"
                  : CO2EmissionForTargetGrade
              }}
            </div>
            <span class="ml-3">ton(s) of CO2</span>
          </div>

          <div class="mt-8 text-14">Reference:</div>
          <!-- v-for the below in one row -->
          <div class="flex space-x-3 mt-2">
            <div
              v-for="(fuelType, index) in fuelTypes"
              :key="index"
              class="bg-gray-50 flex-grow rounded-xl p-3"
            >
              <div class="text-gray-500 text-14">{{ fuelType }}</div>
              <div class="flex items-center">
                <div class="text-16 text-gray-700">
                  {{
                    fuelAmountsForTargetGrade[index] === ""
                      ? "0,000.00"
                      : fuelAmountsForTargetGrade[index]
                  }}
                </div>
                <MiniUnitDisplay class="ml-1 py-0">MT</MiniUnitDisplay>
              </div>
            </div>
          </div>
        </div>
        <div class="py-8 px-7">
          <div
            class="flex items-center bg-gray-50 py-3 pr-3 rounded-r-lg relative"
          >
            <div
              class="absolute w-0.5 min-h-full"
              :class="ciiGradeToTailwindBg('c')"
            ></div>
            <span class="pl-3">To meet the minimum grade:</span>
            <div
              class="flex items-center ml-auto rounded-full py-1 px-2 text-12"
              :class="
                ciiGradeToTailwindText(minCIIGrade) +
                ' ' +
                ciiGradeToTailwindOpaqueBg(minCIIGrade)
              "
            >
              <span>{{ ciiBoundaries[minCIIGrade] }}</span>
              <div
                class="ml-1 rounded-full text-white px-3"
                :class="ciiGradeToTailwindBg(minCIIGrade)"
              >
                {{ minCIIGrade.toUpperCase() }}
              </div>
            </div>
          </div>
          <div
            class="flex relative items-center bg-gray-50 pr-3 py-3 mt-3 rounded-r-lg"
          >
            <div class="absolute w-0.5 min-h-full bg-grades-c"></div>

            <span class="mx-3">Vessel can emit</span>
            <div
              class="flex-grow justify-center border border-yellow-200 bg-yellow-25 flex place-center text-yellow-800 rounded-xl"
            >
              {{
                CO2EmissionForMinGrade === ""
                  ? "000,000"
                  : CO2EmissionForMinGrade
              }}
            </div>
            <span class="ml-3">ton(s) of CO2</span>
          </div>

          <div class="mt-8 text-14">Reference:</div>
          <!-- v-for the below in one row -->
          <div class="flex space-x-3 mt-2">
            <div
              v-for="(fuelType, index) in fuelTypes"
              :key="index"
              class="bg-gray-50 flex-grow rounded-xl p-3"
            >
              <div class="text-gray-500 text-14">{{ fuelType }}</div>
              <div class="flex items-center">
                <div class="text-16 text-gray-700">
                  {{
                    fuelAmountsForMinGrade[index] === ""
                      ? "0,000.00"
                      : fuelAmountsForMinGrade[index]
                  }}
                </div>
                <MiniUnitDisplay class="ml-1 py-0">MT</MiniUnitDisplay>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
