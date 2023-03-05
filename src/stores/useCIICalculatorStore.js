import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
// import { useShipStore } from "./useShipStore";
// import { storeToRefs } from "pinia";

export const useCIICalculatorStore = defineStore("cii-calculator", () => {
  // TODO: need ot use fuel oils from ship store
  // const shipStore = useShipStore();
  // const { fuelOils } = storeToRefs(shipStore);
  const fuelOils = ref(["LSFO", "MGO"]);

  const showModal = ref(false);
  const isOnlyUsingUserInput = ref("");
  const referenceStartDate = ref("");
  const referenceEndDate = ref("");
  const distanceInPeriod = ref("");
  const fuelTypes = fuelOils;
  const resultsCalculated = ref(false);

  // const fuelTypes = computed(() => {
  // TODO: add feature to choose fuel types; for now we fetch from the ship store
  // if (isOnlyUsingUserInput.value) {
  //   return ["default", "default"];
  // } else {
  // return fuelOils;
  // }
  // });

  const fuelAmounts = ref([]);
  const totalEmissions = ref("");
  const isTargetCIIGradeEnabled = ref(false);
  const targetCIIGrade = ref("");
  const minCIIGrade = computed(() => {
    if (ciiGrade.value === "d" || ciiGrade.value === "e") {
      return "c";
    } else if (ciiGrade.value === "c") {
      return "b";
    } else {
      return "a";
    }
  });

  const ciiValue = ref("4.36"); // can be computed?
  const ciiGrade = ref("c");
  const ciiBoundaries = reactive({
    a: "4.82",
    b: "4.62",
    c: "4.3",
    d: "4",
    e: "0",
  });
  const CO2EmissionForTargetGrade = ref("");
  const fuelAmountsForTargetGrade = ref(["", ""]);
  const CO2EmissionForMinGrade = ref("");
  const fuelAmountsForMinGrade = ref(["", ""]);

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
    showModal,
    isOnlyUsingUserInput,
    referenceStartDate,
    referenceEndDate,
    distanceInPeriod,
    fuelTypes,
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
    fuelAmountsForTargetGrade,
    CO2EmissionForMinGrade,
    fuelAmountsForMinGrade,
    resetValues,
  };
});
