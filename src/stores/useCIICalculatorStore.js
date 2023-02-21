import { ref } from "vue";
import { defineStore } from "pinia";

export const useCIICalculatorStore = defineStore("cii-calculator", () => {
  const showModal = ref(false);
  const isOnlyUsingUserInput = ref("");
  const referenceStartDate = ref("");
  const referenceEndDate = ref("");
  const distanceInPeriod = ref("");
  const fuelType1 = ref("default");
  const fuelAmount1 = ref("");
  // may change to arrays
  const totalEmissions = ref("");
  //   const isESDEnabled = ref(false);
  //   const ESDType = ref("default");
  //   const improvedEmissionByESD = ref("default");
  const isTargetCIIGradeEnabled = ref(false);
  const targetCIIGrade = ref("");

  return {
    showModal,
    isOnlyUsingUserInput,
    referenceStartDate,
    referenceEndDate,
    distanceInPeriod,
    fuelType1,
    fuelAmount1,
    totalEmissions,
    // isESDEnabled,
    // ESDType,
    // improvedEmissionByESD,
    isTargetCIIGradeEnabled,
    targetCIIGrade,
  };
});
