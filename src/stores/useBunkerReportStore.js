import { defineStore } from "pinia";
import { ref } from "vue";
import { useReportStore } from "./useReportStore";

export const useBunkerReportStore = defineStore("bunkerReport", () => {
  const store = useReportStore();

  // Overview
  // TODO: fetch from backend
  const reportNo = ref(store.reportNo);
  const legNo = ref(store.legNo);
  const voyageNo = ref(store.voyageNo);
  const reportingDate = ref("");
  const reportingTimeZone = ref("default");

  // Bunkering Port
  const portCountry = ref("");
  const portName = ref("");
  const dateTime = ref("");
  const timeZone = ref("default");
  const status = ref([]);

  // Received Bunker Detail
  const oil = ref("default");
  const density = ref("");
  const sg = ref("");
  const viscosity = ref("");
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
    reportNo,
    legNo,
    voyageNo,
    reportingDate,
    reportingTimeZone,
    // Bunkering Port
    portCountry,
    portName,
    dateTime,
    timeZone,
    status,
    // Received Bunker Detail
    oil,
    density,
    sg,
    viscosity,
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
