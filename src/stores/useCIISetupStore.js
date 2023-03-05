import { ref } from "vue";
import { defineStore } from "pinia";

export const useCIISetupStore = defineStore("cii-setup", () => {
  const showModal = ref(false);
  const pageNum = ref(2);
  const energyEfficiencyIndexType = ref("eedi");
  const energyEfficiencyIndexVal = ref("");
  const isEnginePowerLimited = ref(true);
  const enginePowerLimitType = ref("epl");
  const enginePowerLimitVal = ref("");
  const reportTypes = ref(["imodcs"]);
  const trialCII = ref([]);
  const applicableCII = ref("");
  const IMODCSMethod = ref("1");
  const EUMRVMethod = ref("");
  const fuelOilTypes = ref([]);
  const otherOilName = ref("");
  const conversionFactor = ref("");
  const currentYearTargetCIIGrade = ref("default");
  const technicalFiles = ref([]);
  const standardizedFiles = ref([]);
  const IMODCSFiles = ref([]);

  return {
    showModal,
    pageNum,
    energyEfficiencyIndexType,
    energyEfficiencyIndexVal,
    isEnginePowerLimited,
    enginePowerLimitType,
    enginePowerLimitVal,
    reportTypes,
    trialCII,
    applicableCII,
    IMODCSMethod,
    EUMRVMethod,
    fuelOilTypes,
    otherOilName,
    conversionFactor,
    currentYearTargetCIIGrade,
    technicalFiles,
    standardizedFiles,
    IMODCSFiles,
  };
});
