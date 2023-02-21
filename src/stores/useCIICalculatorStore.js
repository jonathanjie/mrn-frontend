import { ref } from "vue";
import { defineStore } from "pinia";

export const useCIISetupStore = defineStore("crew", () => {
  const isOnlyUsingUserInput = ref(true);
  const referenceStartDate = ref("");
  const referenceEndDate = ref("");
  const distanceInPeriod = ref("");
  const fuelDetails = ref([]);
  const totalEmissions = ref("");
  const isESDEnabled = ref(false);
  const ESDType = ref("default");
  const improvedEmissionByESD = ref("default");
  const isTargetCIIGradeEnabled = ref(false);
  const targetCIIGrade = ref("");

  return {
    isOnlyUsingUserInput,
    referenceStartDate,
    referenceEndDate,
    distanceInPeriod,
    fuelDetails,
    totalEmissions,
    isESDEnabled,
    ESDType,
    improvedEmissionByESD,
    isTargetCIIGradeEnabled,
    targetCIIGrade,
  };
});
