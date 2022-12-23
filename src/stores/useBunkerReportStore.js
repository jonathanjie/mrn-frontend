import { defineStore } from "pinia";
import { ref } from "vue";
import { useVoyageStore } from "./useVoyageStore";

export const useBunkerReportStore = defineStore("bunkerReport", () => {
  const store = useVoyageStore();

  // Overview
  // TODO: fetch from backend
  const bdnReportNo = ref(store.bdnReportNo);
  const curLegNo = ref(store.curLegNo);
  const curLoadingCondition = ref(store.curLoadingCondition);
  const voyageNo = ref(store.voyageNo);
  const reportingDateTime = ref("");
  const reportingTimeZone = ref("default");

  // Bunkering Port
  const portCountry = ref("");
  const portName = ref("");

  // Received Bunker Detail
  const oilType = ref("default");
  const oil = ref("default");
  const density = ref("");
  const sg = ref("");
  const viscosity = ref("");
  const viscosityDegree = ref("");
  const flashPoint = ref("");
  const sulfurContent = ref("");
  const marpol1 = ref("");
  const marpol2 = ref("");
  const ship1 = ref("");
  const ship2 = ref("");
  const barge1 = ref("");
  const barge2 = ref("");
  const files = ref([]);

  // Date and Time Bunker
  const alongside = ref("");
  const hoseConnection = ref("");
  const pumpStart = ref("");
  const pumpStop = ref("");
  const hoseDisconnection = ref("");
  const awayside = ref("");
  const purchaser = ref("");
  const bargeName = ref("");
  const supplierName = ref("");
  const address = ref("");
  const telephoneNumber = ref("");

  return {
    // Overview
    bdnReportNo,
    curLegNo,
    curLoadingCondition,
    voyageNo,
    reportingDateTime,
    reportingTimeZone,
    // Bunkering Port
    portCountry,
    portName,
    // Received Bunker Detail
    oilType,
    oil,
    density,
    sg,
    viscosity,
    viscosityDegree,
    flashPoint,
    sulfurContent,
    marpol1,
    marpol2,
    ship1,
    ship2,
    barge1,
    barge2,
    files,
    // Date and Time Bunker
    alongside,
    hoseConnection,
    pumpStart,
    pumpStop,
    hoseDisconnection,
    awayside,
    purchaser,
    bargeName,
    supplierName,
    address,
    telephoneNumber,
  };
});
