import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC } from "@/utils/helpers";

export const useBunkerReportStore = defineStore("bunkerReport", () => {
  const store = useVoyageStore();
  const { bdnReportNo, lastLegNo, legUuid, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  // report subtype variable
  const isBeforeArrival = ref(true);

  // Overview
  // TODO: fetch from backend
  const reportNo = bdnReportNo;
  const legNo = lastLegNo;
  const loadingCondition = curLoadingCondition;
  const voyageNo = curVoyageNo;
  const reportingDateTime = ref("");
  const reportingTimeZone = ref("default");
  const reportingDateTimeUTC = computed(() =>
    reportingTimeZone.value !== "default" && reportingDateTime.value
      ? convertLTToUTC(
          new Date(reportingDateTime.value),
          reportingTimeZone.value
        )
      : ""
  );

  // Bunkering Port
  const portCountry = ref("");
  const portName = ref("");

  // Received Bunker Detail
  const oilType = ref("default");
  const oil = ref("default");
  const quantity = ref("");
  const density = ref("");
  const sg = ref("");
  const viscosity = ref("");
  const viscosityDegree = ref("");
  const flashPoint = ref("");
  const sulfurContent = ref("");
  const marpol = ref("");
  const ship = ref("");
  const barge = ref("");
  const files = ref([]);
  const canAppendMoreFiles = computed(() => files.value.length <= 10);

  const addFiles = (newFiles) => {
    let newUploadableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !fileExists(file.id));
    files.value = files.value.concat(newUploadableFiles);
  };

  const fileExists = (otherId) => {
    return files.value.some(({ id }) => id === otherId);
  };

  const removeFile = (file) => {
    const index = files.value.indexOf(file);

    if (index > -1) files.value.splice(index, 1);
  };

  class UploadableFile {
    constructor(file) {
      this.file = file;
      this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
      this.presignedUrl = "";
      // this.status = null;
    }
  }
  // Date and Time Bunker
  const alongside = ref("");
  const alongsideUTC = computed(() =>
    reportingTimeZone.value !== "default" && alongside.value
      ? convertLTToUTC(new Date(alongside.value), reportingTimeZone.value)
      : ""
  );
  const hoseConnection = ref("");
  const hoseConnectionUTC = computed(() =>
    reportingTimeZone.value !== "default" && hoseConnection.value
      ? convertLTToUTC(new Date(hoseConnection.value), reportingTimeZone.value)
      : ""
  );
  const pumpStart = ref("");
  const pumpStartUTC = computed(() =>
    reportingTimeZone.value !== "default" && pumpStart.value
      ? convertLTToUTC(new Date(pumpStart.value), reportingTimeZone.value)
      : ""
  );
  const pumpStop = ref("");
  const pumpStopUTC = computed(() =>
    reportingTimeZone.value !== "default" && pumpStop.value
      ? convertLTToUTC(new Date(pumpStop.value), reportingTimeZone.value)
      : ""
  );
  const hoseDisconnection = ref("");
  const hoseDisconnectionUTC = computed(() =>
    reportingTimeZone.value !== "default" && hoseDisconnection.value
      ? convertLTToUTC(
          new Date(hoseDisconnection.value),
          reportingTimeZone.value
        )
      : ""
  );
  const awayside = ref("");
  const awaysideUTC = computed(() =>
    reportingTimeZone.value !== "default" && awayside.value
      ? convertLTToUTC(new Date(awayside.value), reportingTimeZone.value)
      : ""
  );

  const purchaser = ref("");
  const bargeName = ref("");
  const supplierName = ref("");
  const address = ref("");
  const telephoneNumber = ref("");

  return {
    // subtype variable
    isBeforeArrival,
    // Overview
    reportNo,
    legNo,
    legUuid,
    loadingCondition,
    voyageNo,
    reportingDateTime,
    reportingTimeZone,
    reportingDateTimeUTC,
    // Bunkering Port
    portCountry,
    portName,
    // Received Bunker Detail
    oilType,
    oil,
    quantity,
    density,
    sg,
    viscosity,
    viscosityDegree,
    flashPoint,
    sulfurContent,
    marpol,
    ship,
    barge,
    files,
    canAppendMoreFiles,
    addFiles,
    removeFile,
    // Date and Time Bunker
    alongside,
    alongsideUTC,
    hoseConnection,
    hoseConnectionUTC,
    pumpStart,
    pumpStartUTC,
    pumpStop,
    pumpStopUTC,
    hoseDisconnection,
    hoseDisconnectionUTC,
    awayside,
    awaysideUTC,
    purchaser,
    bargeName,
    supplierName,
    address,
    telephoneNumber,
  };
});
