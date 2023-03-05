import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useShipStore } from "./useShipStore";
import { storeToRefs } from "pinia";

export const useCIICalculatorStore = defineStore("cii-calculator", () => {
  const shipStore = useShipStore();
  const { imoReg, fuelOils } = storeToRefs(shipStore);

  const showModal = ref(false);
  const isOnlyUsingUserInput = ref("");
  const isTargetCIIGradeEnabled = ref(false);
  const resultsCalculated = ref(false);

  const referenceStartDate = ref("");
  const referenceEndDate = ref("");
  const distanceInPeriod = ref("");

  const fuelAmounts = ref(["", ""]);

  const CONVERSION_FACTORS = {
    MGO: "3.206",
    MDO: "3.206",
    LSFO: "3.151",
    HFO: "3.114",
    LPG_PROPANE: "3.000",
    LPG_BUTANE: "3.030",
    LNG: "2.750",
    METHANOL: "1.375",
    ETHANOL: "1.913",
  };

  const totalEmissions = computed(() => {
    let total = 0;
    for (let i = 0; i < fuelOils.value.length; i++) {
      const fuelType = fuelOils.value[i];
      const fuelAmount = fuelAmounts.value[i];
      const conversionFactor = CONVERSION_FACTORS[fuelType];
      const emissions = fuelAmount * conversionFactor;
      total += emissions;
    }
    return total;
  });

  const targetCIIGrade = ref("");

  const ciiGrade = ref("");
  const ciiValue = ref("");
  const minCIIGrade = ref("");
  const ciiBoundaries = reactive({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
  });
  const CO2EmissionForTargetGrade = ref("");
  const CO2EmissionForMinGrade = ref("");
  const targetFuelProjection = ref({});
  const minFuelProjection = ref({});

  function resetValues() {
    referenceStartDate.value = "";
    referenceEndDate.value = "";
    distanceInPeriod.value = "";
    fuelAmounts.value = ["", ""];
    totalEmissions.value = "";
    isTargetCIIGradeEnabled.value = false;
    targetCIIGrade.value = "";
    resultsCalculated.value = false;
  }

  return {
    imoReg,
    showModal,
    isOnlyUsingUserInput,
    referenceStartDate,
    referenceEndDate,
    distanceInPeriod,
    fuelOils,
    resultsCalculated,
    ciiValue,
    ciiGrade,
    minCIIGrade,
    ciiBoundaries,
    fuelAmounts,
    totalEmissions,
    isTargetCIIGradeEnabled,
    targetCIIGrade,
    CO2EmissionForTargetGrade,
    CO2EmissionForMinGrade,
    targetFuelProjection,
    minFuelProjection,
    resetValues,
  };
});
