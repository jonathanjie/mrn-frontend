import { ref } from "vue";
import { defineStore } from "pinia";

export const useCIIStore = defineStore("crew", () => {
  const pageNum = ref(2);
  const shipIndexType = ref("eedi");
  const shipIndexVal = ref("");
  const isEngineLimited = ref(true);
  const engineLimitType = ref("epl");
  const engineLimitPercent = ref("");
  const reportTypes = ref(["imodcs"]);
  const ciiTrials = ref([]);
  const applicableCII = ref("");
  const IMODCSMethod = ref("1");
  const EUMRVMethod = ref("");
  const fuelOilTypes = ref([]);
  const otherOilName = ref("");
  const conversionFactor = ref("");
  const targetCIIGrade = ref("default");
  const technicalFiles = ref([]);
  const standardizedFiles = ref([]);
  const IMODCSFiles = ref([]);

  return {
    pageNum,
    shipIndexType,
    shipIndexVal,
    isEngineLimited,
    engineLimitType,
    engineLimitPercent,
    reportTypes,
    ciiTrials,
    applicableCII,
    IMODCSMethod,
    EUMRVMethod,
    fuelOilTypes,
    otherOilName,
    conversionFactor,
    targetCIIGrade,
    technicalFiles,
    standardizedFiles,
    IMODCSFiles,
  };
});
