import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";

const temp = {
  // Finish With Engine
  plannedOperations: [
    "waiting",
    "crewChange",
    "cargoOpBerth",
    "bunkeringDebunkering",
    "receivingProvisionSpareParts",
  ],
  otherPlannedOperation: "",
  // fetch above from most recent arrival eosp/sby

  // Distance & Time / Performance
  lastNoonReportTime: "2022-12-01T00:00:00Z",
  rupOfDeparture: "2022-11-21T00:00:00Z",
  revolutionCountYesterday: 20000,
  propellerPitch: 2,

  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,
};

export const useArrivalFWEReportStore = defineStore("arrivalFWEReport", () => {
  const store = useVoyageStore();

  // Overview
  const arrfReportNo = ref(store.arrfReportNo);
  const curLegNo = ref(store.curLegNo);
  const curLoadingCondition = ref(store.curLoadingCondition);
  const voyageNo = ref(store.voyageNo);
  const reportingDateTime = ref("");
  const reportingTimeZone = ref("default");

  // Finish With Engine
  const latDir = ref("default");
  const latMinutes = ref("");
  const latDegree = ref("");
  const longDir = ref("default");
  const longMinute = ref("");
  const longDegree = ref("");
  const plannedOperations = ref(temp.plannedOperations);
  const otherPlannedOperation = ref(temp.otherPlannedOperation);
  const operations = ref([]);
  const status = ref("");

  // Pilot Station -- Arrival
  const pilotArrName = ref("");
  const pilotArrDate = ref("");
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
          (Date.parse(reportingDateTime.value) -
            Date.parse(temp.lastNoonReportTime)) /
          (1000 * 60 * 60)
        ).toFixed(0)
      : ""
  );
  const distanceObs = ref("");
  const distanceEng = computed(() =>
    revolutionCount.value
      ? +(
          (Number(revolutionCount.value) - temp.revolutionCountYesterday) *
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
  const freshwaterEvaporated = ref("");
  const freshwaterChange = computed(
    () => +(freshwaterEvaporated.value - freshwaterConsumed.value).toFixed(2)
  );
  const freshwaterRob = computed(
    () => temp.freshwaterPrevROB + freshwaterChange.value
  );

  // Actual Performance
  // TODO: need to be computed values
  const totalDistanceObs = ref("");
  const totalTime = ref("");
  const lsfoMe = ref("");
  const lsfoGe = ref("");
  const lsfoBoiler = ref("");
  const lsfoIgg = ref("");
  const lsfoTotal = ref("");
  const mgoMe = ref("");
  const mgoGe = ref("");
  const mgoBoiler = ref("");
  const mgoIgg = ref("");
  const mgoTotal = ref("");

  return {
    // Overview
    arrfReportNo,
    curLegNo,
    curLoadingCondition,
    voyageNo,
    reportingDateTime,
    reportingTimeZone,
    // Finish With Engine
    latDir,
    latMinutes,
    latDegree,
    longDir,
    longMinute,
    longDegree,
    plannedOperations,
    otherPlannedOperation,
    operations,
    status,
    // Pilot Station -- Arrival
    pilotArrName,
    pilotArrDate,
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
    freshwaterEvaporated,
    freshwaterChange,
    freshwaterRob,
    // Actual performance
    totalDistanceObs,
    totalTime,
    lsfoMe,
    lsfoGe,
    lsfoBoiler,
    lsfoIgg,
    lsfoTotal,
    mgoMe,
    mgoGe,
    mgoBoiler,
    mgoIgg,
    mgoTotal,
  };
});
