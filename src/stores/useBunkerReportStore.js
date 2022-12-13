import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

// TODO: fetch from database
const temp = {
  // Overview
  reportNo: "2",
  legNo: "2",
  voyageNo: "1",
};

export const useBunkerReportStore = defineStore("bunkerReport", () => {
  // Overview
  // TODO: fetch from backend
  const reportNo = ref(temp.reportNo);
  const legNo = ref(temp.legNo);
  const voyageNo = ref(temp.voyageNo);

  // Bunkering Port
  const portCountry = ref("");
  const portName = ref("");
  const dateTime = ref("");
  const timeZone = ref("");
  const summerTime = ref("default");
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
    // Bunkering Port
    portCountry,
    portName,
    dateTime,
    timeZone,
    summerTime,
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
