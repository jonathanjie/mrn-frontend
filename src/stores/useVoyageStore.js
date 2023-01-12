import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useVoyageStore = defineStore("voyage", () => {
  const voyageLegs = ref([]);
  const voyageUuid = ref("");
  const legUuid = ref("");

  const curLoadingCondition = ref("");
  const curVoyageNo = ref(0);

  const lastLegNo = ref(0);
  const lastNoonReportNo = ref(0); // Noon
  const lastDepsReportNo = ref(0); // Departure S/BY
  const lastDeprReportNo = ref(0); // Departure COSP or R/UP
  const lastArrsReportNo = ref(0); // Arrival EOSP or S/BY
  const lastArrfReportNo = ref(0); // Arrival FWE
  const lastBdnReportNo = ref(0); // Bunker Delivery
  const lastEvntpReportNo = ref(0); // Event Port
  const lastEvntcReportNo = ref(0); // Event Coastal
  const lastNoonpReportNo = ref(0); // Noon Port
  const lastNooncReportNo = ref(0); // Noon Coastal

  const legNo = computed(() => {
    return lastLegNo.value + 1;
  });
  const noonReportNo = computed(() => {
    return lastNoonReportNo.value + 1;
  });
  const depsReportNo = computed(() => {
    return lastDepsReportNo.value + 1;
  });
  const deprReportNo = computed(() => {
    return lastDeprReportNo.value + 1;
  });
  const arrsReportNo = computed(() => {
    return lastArrsReportNo.value + 1;
  });
  const arrfReportNo = computed(() => {
    return lastArrfReportNo.value + 1;
  });
  const bdnReportNo = computed(() => {
    return lastBdnReportNo.value + 1;
  });
  const evntpReportNo = computed(() => {
    return lastEvntpReportNo.value + 1;
  });
  const evntcReportNo = computed(() => {
    return lastEvntcReportNo.value + 1;
  });
  const noonpReportNo = computed(() => {
    return lastNoonpReportNo.value + 1;
  });
  const nooncReportNo = computed(() => {
    return lastNooncReportNo.value + 1;
  });

  // TODO: get reportroute from voyage
  return {
    voyageLegs,
    voyageUuid,
    legUuid,
    curLoadingCondition,
    curVoyageNo,
    lastLegNo,
    lastNoonReportNo,
    lastDepsReportNo,
    lastDeprReportNo,
    lastArrsReportNo,
    lastArrfReportNo,
    lastBdnReportNo,
    lastEvntpReportNo,
    lastEvntcReportNo,
    lastNoonpReportNo,
    lastNooncReportNo,
    legNo,
    noonReportNo,
    depsReportNo,
    deprReportNo,
    arrsReportNo,
    arrfReportNo,
    bdnReportNo,
    evntpReportNo,
    evntcReportNo,
    noonpReportNo,
    nooncReportNo,
  };
});
