import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC } from "@/utils/helpers";

const temp = {
  // Finish With Engine
  plannedOperations: [
    "waiting",
    "crewChange",
    "cargoOpBerth",
    "bunkeringDebunkering",
    "receivingProvisionSpareParts",
    "others",
  ],
  otherPlannedOperation: "Sign contract",
  // fetch above from most recent arrival eosp/sby

  // Distance & Time / Performance
  sbyTime: "2022-12-01T00:00:00Z",
  revolutionCountAtSby: 20000,
  propellerPitch: 2,

  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,

  // Actual Performance
  prevDistanceByObservation: 2000,
  prevSailingTime: 200,

  // Total Consumption
  prevLsfoBreakdown: {
    me: 100,
    ge: 100,
    blr: 100,
    igg: 100,
  },
  prevMgoBreakdown: {
    me: 100,
    ge: 100,
    blr: 100,
    igg: 100,
  },
};

export const useArrivalFWEReportStore = defineStore("arrivalFWEReport", () => {
  const store = useVoyageStore();
  const { arrfReportNo, curLegNo, curLoadingCondition, curVoyageNo } =
    storeToRefs(store);

  // Overview
  const reportNo = arrfReportNo;
  const legNo = curLegNo;
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
  // Finish With Engine
  const latDir = ref("default");
  const latMinute = ref("");
  const latDegree = ref("");
  const longDir = ref("default");
  const longMinute = ref("");
  const longDegree = ref("");
  const plannedOperations = ref(temp.plannedOperations);
  const otherPlannedOperation = ref(temp.otherPlannedOperation);
  const operations = ref([]);
  const status = ref("");

  // Pilot Station -- Arrival
  const shouldPilotArrDataBeSent = computed(
    () =>
      pilotArrName.value ||
      pilotArrDateTime.value ||
      pilotArrDraftFwd.value ||
      pilotArrDraftMid.value ||
      pilotArrDraftAft.value
  );
  const pilotArrName = ref("");
  const pilotArrDateTime = ref("");
  const pilotArrDateTimeUTC = computed(() =>
    reportingTimeZone.value !== "default" && pilotArrDateTime.value
      ? convertLTToUTC(
          new Date(pilotArrDateTime.value),
          reportingTimeZone.value
        )
      : ""
  );
  const pilotArrDraftFwd = ref("");
  const pilotArrDraftMid = ref("");
  const pilotArrDraftAft = ref("");
  const pilotArrLatDir = ref("default");
  const pilotArrLatDegree = ref("");
  const pilotArrLatMinute = ref("");
  const pilotArrLongDir = ref("default");
  const pilotArrLongDegree = ref("");
  const pilotArrLongMinute = ref("");

  // Distance & Time (S/BY to F.W.E)
  const hours = computed(() =>
    reportingDateTime.value
      ? +(
          (Date.parse(reportingDateTime.value) - Date.parse(temp.sbyTime)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const distanceObs = ref("");
  const distanceEng = computed(() =>
    revolutionCount.value
      ? +(
          (Number(revolutionCount.value) - temp.revolutionCountAtSby) *
          temp.propellerPitch
        ).toFixed(2)
      : ""
  );
  const revolutionCount = ref("");

  // Consumption & Condition (S/BY to F.W.E)
  const lsfoBreakdown = reactive({
    me: "",
    ge: "",
    blr: "",
    igg: "",
  });
  const mgoBreakdown = reactive({
    me: "",
    ge: "",
    blr: "",
    igg: "",
  });
  const lsfoTotalConsumption = computed(
    () =>
      +(
        Number(lsfoBreakdown.me) +
        Number(lsfoBreakdown.ge) +
        Number(lsfoBreakdown.blr) +
        Number(lsfoBreakdown.igg)
      )
  );
  const lsfoRob = computed(() => temp.lsfoPrevROB - lsfoTotalConsumption.value);
  const mgoTotalConsumption = computed(
    () =>
      +(
        Number(mgoBreakdown.me) +
        Number(mgoBreakdown.ge) +
        Number(mgoBreakdown.blr) +
        Number(mgoBreakdown.igg)
      ).toFixed(2)
  );
  const mgoRob = computed(() => temp.mgoPrevROB - mgoTotalConsumption.value);
  const fuelOilDataCorrection = reactive({
    type: "default",
    correction: "",
    remarks: "",
  });

  const mecylinderBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const mesystemBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const mesumpBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const gesystemBreakdown = reactive({
    total_consumption: "",
    receipt: "",
    debunkering: "",
  });
  const mecylinderRob = computed(
    () =>
      +(
        temp.mecylPrevROB -
        Number(mecylinderBreakdown.total_consumption) +
        Number(mecylinderBreakdown.receipt) -
        Number(mecylinderBreakdown.debunkering)
      ).toFixed(2)
  );
  const mesystemRob = computed(
    () =>
      +(
        temp.mesysPrevROB -
        Number(mesystemBreakdown.total_consumption) +
        Number(mesystemBreakdown.receipt) -
        Number(mesystemBreakdown.debunkering)
      ).toFixed(2)
  );
  const mesumpRob = computed(
    () =>
      +(
        temp.mesumpPrevROB -
        Number(mesumpBreakdown.total_consumption) +
        Number(mesumpBreakdown.receipt) -
        Number(mesumpBreakdown.debunkering)
      ).toFixed(2)
  );
  const gesystemRob = computed(
    () =>
      +(
        temp.gesysPrevROB -
        Number(gesystemBreakdown.total_consumption) +
        Number(gesystemBreakdown.receipt) -
        Number(gesystemBreakdown.debunkering)
      ).toFixed(2)
  );
  const lubricatingOilDataCorrection = reactive({
    type: "default",
    correction: "",
    remarks: "",
  });

  const freshwaterConsumed = ref("");
  const freshwaterGenerated = ref("");
  const freshwaterChange = computed(
    () => +(freshwaterGenerated.value - freshwaterConsumed.value).toFixed(2)
  );
  const freshwaterRob = computed(
    () => temp.freshwaterPrevROB + freshwaterChange.value
  );

  // Actual Performance
  const totalDistanceObs = computed(
    () =>
      +(temp.prevDistanceByObservation + Number(distanceObs.value)).toFixed(2)
  );
  const totalSailingTime = computed(
    () => +(temp.prevSailingTime + Number(hours.value)).toFixed(2)
  );
  const lsfoMeSum = computed(
    () => +(temp.prevLsfoBreakdown.me + Number(lsfoBreakdown.me)).toFixed(2)
  );
  const lsfoGeSum = computed(
    () => +(temp.prevLsfoBreakdown.ge + Number(lsfoBreakdown.ge)).toFixed(2)
  );
  const lsfoBoilerSum = computed(
    () => +(temp.prevLsfoBreakdown.blr + Number(lsfoBreakdown.blr)).toFixed(2)
  );
  const lsfoIggSum = computed(
    () => +(temp.prevLsfoBreakdown.igg + Number(lsfoBreakdown.igg)).toFixed(2)
  );
  const lsfoTotalSum = computed(
    () =>
      +(
        Number(lsfoMeSum.value) +
        Number(lsfoGeSum.value) +
        Number(lsfoBoilerSum.value) +
        Number(lsfoIggSum.value)
      ).toFixed(2)
  );
  const mgoMeSum = computed(
    () => +(temp.prevMgoBreakdown.me + Number(mgoBreakdown.me)).toFixed(2)
  );
  const mgoGeSum = computed(
    () => +(temp.prevMgoBreakdown.ge + Number(mgoBreakdown.ge)).toFixed(2)
  );
  const mgoBoilerSum = computed(
    () => +(temp.prevMgoBreakdown.blr + Number(mgoBreakdown.blr)).toFixed(2)
  );
  const mgoIggSum = computed(
    () => +(temp.prevMgoBreakdown.igg + Number(mgoBreakdown.igg)).toFixed(2)
  );
  const mgoTotalSum = computed(
    () =>
      +(
        Number(mgoMeSum.value) +
        Number(mgoGeSum.value) +
        Number(mgoBoilerSum.value) +
        Number(mgoIggSum.value)
      ).toFixed(2)
  );

  return {
    // Overview
    reportNo,
    legNo,
    loadingCondition,
    voyageNo,
    reportingDateTime,
    reportingTimeZone,
    reportingDateTimeUTC,
    // Finish With Engine
    latDir,
    latMinute,
    latDegree,
    longDir,
    longMinute,
    longDegree,
    plannedOperations,
    otherPlannedOperation,
    operations,
    status,
    // Pilot Station -- Arrival
    shouldPilotArrDataBeSent,
    pilotArrName,
    pilotArrDateTime,
    pilotArrDateTimeUTC,
    pilotArrDraftFwd,
    pilotArrDraftMid,
    pilotArrDraftAft,
    pilotArrLatDir,
    pilotArrLatDegree,
    pilotArrLatMinute,
    pilotArrLongDir,
    pilotArrLongDegree,
    pilotArrLongMinute,
    // Distance & Time (S/BY to F.W.E)
    hours,
    distanceObs,
    distanceEng,
    revolutionCount,
    // Consumption and Condition
    lsfoTotalConsumption,
    lsfoRob,
    mgoTotalConsumption,
    mgoRob,
    lsfoBreakdown,
    mgoBreakdown,
    fuelOilDataCorrection,
    mecylinderBreakdown,
    mesystemBreakdown,
    mesumpBreakdown,
    gesystemBreakdown,
    mecylinderRob,
    mesystemRob,
    mesumpRob,
    gesystemRob,
    lubricatingOilDataCorrection,
    freshwaterConsumed,
    freshwaterGenerated,
    freshwaterChange,
    freshwaterRob,
    // Actual performance
    totalDistanceObs,
    totalSailingTime,
    lsfoMeSum,
    lsfoGeSum,
    lsfoBoilerSum,
    lsfoIggSum,
    lsfoTotalSum,
    mgoMeSum,
    mgoGeSum,
    mgoBoilerSum,
    mgoIggSum,
    mgoTotalSum,
  };
});
