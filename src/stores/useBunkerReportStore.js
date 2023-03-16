import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC } from "@/utils/helpers";

export const useBunkerReportStore = defineStore("bunkerReport", () => {
  const store = useVoyageStore();
  const { bdnReportNo, lastLegNo, legUuid, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  // Getters
  // Overview
  const reportingDateTimeUTC = computed(() =>
    reportingTimeZone.value !== "default" && reportingDateTime.value
      ? convertLTToUTC(
          new Date(reportingDateTime.value),
          reportingTimeZone.value
        )
      : ""
  );

  // Received Bunker Detail
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
      this.type = file.type;
      this.presignedUrl = "";
      this.name = file.name;
      // this.status = null;
    }
  }

  // Date and Time Bunker
  const alongsideUTC = computed(() =>
    reportingTimeZone.value !== "default" && alongside.value
      ? convertLTToUTC(new Date(alongside.value), reportingTimeZone.value)
      : ""
  );
  const hoseConnectionUTC = computed(() =>
    reportingTimeZone.value !== "default" && hoseConnection.value
      ? convertLTToUTC(new Date(hoseConnection.value), reportingTimeZone.value)
      : ""
  );
  const pumpStartUTC = computed(() =>
    reportingTimeZone.value !== "default" && pumpStart.value
      ? convertLTToUTC(new Date(pumpStart.value), reportingTimeZone.value)
      : ""
  );
  const pumpStopUTC = computed(() =>
    reportingTimeZone.value !== "default" && pumpStop.value
      ? convertLTToUTC(new Date(pumpStop.value), reportingTimeZone.value)
      : ""
  );
  const hoseDisconnectionUTC = computed(() =>
    reportingTimeZone.value !== "default" && hoseDisconnection.value
      ? convertLTToUTC(
          new Date(hoseDisconnection.value),
          reportingTimeZone.value
        )
      : ""
  );
  const awaysideUTC = computed(() =>
    reportingTimeZone.value !== "default" && awayside.value
      ? convertLTToUTC(new Date(awayside.value), reportingTimeZone.value)
      : ""
  );

  // State
  // Overview
  // report subtype variable
  const isBeforeArrival = ref(true);
  // TODO: fetch from backend
  const reportNo = bdnReportNo;
  const legNo = lastLegNo;
  const loadingCondition = curLoadingCondition;
  const voyageNo = curVoyageNo;
  const reportingDateTime = ref("");
  const reportingTimeZone = ref("default");

  // Bunkering Port
  const portCountry = ref("");
  const portName = ref("");

  // Received Bunker Detail
  const oilType = ref("default");
  const oil = ref("default");
  const quantity = ref("");
  const density = ref("");
  const viscosity = ref("");
  const viscosityDegree = ref("");
  const flashPoint = ref("");
  const sulfurContent = ref("");
  const marpol = ref("");
  const ship = ref("");
  const barge = ref("");
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

  function $reset() {
    console.log("Bunker report store reset is called");
    // Overview
    // report subtype variable
    isBeforeArrival.value = true;
    // TODO: fetch from backend
    reportNo.value = bdnReportNo;
    legNo.value = lastLegNo;
    loadingCondition.value = curLoadingCondition;
    voyageNo.value = curVoyageNo;
    reportingDateTime.value = "";
    reportingTimeZone.value = "default";

    // Bunkering Port
    portCountry.value = "";
    portName.value = "";

    // Received Bunker Detail
    oilType.value = "default";
    oil.value = "default";
    quantity.value = "";
    density.value = "";
    viscosity.value = "";
    viscosityDegree.value = "";
    flashPoint.value = "";
    sulfurContent.value = "";
    marpol.value = "";
    ship.value = "";
    barge.value = "";
    files.value = [];

    // Date and Time Bunker
    alongside.value = "";
    hoseConnection.value = "";
    pumpStart.value = "";
    pumpStop.value = "";
    hoseDisconnection.value = "";
    awayside.value = "";
    purchaser.value = "";
    bargeName.value = "";
    supplierName.value = "";
    address.value = "";
    telephoneNumber.value = "";
  }
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
    $reset,
  };
});
