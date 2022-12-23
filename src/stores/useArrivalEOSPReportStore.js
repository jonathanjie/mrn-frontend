import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";

const temp = {
  // Arrival and Departure
  departurePortCountry: "Country A",
  departurePortName: "Port A",
  arrivalPortCountry: "Country B",
  arrivalPortName: "Port B",
  departureDateTime: "2022-06-01T04:23:00Z",

  // Distance & Time / Performance
  lastNoonReportTime: "2022-12-01T00:00:00Z",
  rupOfDeparture: "2022-11-21T00:00:00Z",
  distanceLeft: 4000,
  distanceObsSoFar: 1000,
  distanceEngSoFar: 1000,
  revolutionCountYesterday: 20000,
  propellerPitch: 2,
  previousNoonReportCount: 2,
  voyageAvgSpeed: 200,
  voyageAvgRpm: 100,
  voyageAvgSlip: 5,

  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,
};

export const useArrivalEOSPReportStore = defineStore(
  "arrivalEOSPReport",
  () => {
    const store = useVoyageStore();

    // Overview
    const arrsReportNo = ref(store.arrsReportNo);
    const curLegNo = ref(store.curLegNo);
    const curLoadingCondition = ref(store.curLoadingCondition);
    const voyageNo = ref(store.voyageNo);
    const reportingDateTime = ref("");
    const reportingTimeZone = ref("default");

    // Departure and Arrival
    const departurePortCountry = ref(temp.departurePortCountry);
    const departurePortName = ref(temp.departurePortName);
    const departureDateTime = ref(temp.departureDateTime);
    const arrivalPortCountry = ref(temp.arrivalPortCountry);
    const arrivalPortName = ref(temp.arrivalPortName);
    const plannedOperation = ref([]);
    const isOtherPlannedOperationEnabled = computed(() =>
      plannedOperation.value.includes("others")
    );
    const otherPlannedOperation = ref("");

    // S/BY for Arrival
    const latDir = ref("default");
    const latMinutes = ref("");
    const latDegree = ref("");
    const longDir = ref("default");
    const longMinutes = ref("");
    const longDegree = ref("");

    // Distance & Time
    const hoursSinceNoon = computed(() =>
      reportingDateTime.value
        ? +(
            (Date.parse(reportingDateTime.value) -
              Date.parse(temp.lastNoonReportTime)) /
            (1000 * 60 * 60)
          ).toFixed(0)
        : ""
    );
    const hoursTotal = computed(() =>
      reportingDateTime.value
        ? +(
            (Date.parse(reportingDateTime.value) -
              Date.parse(temp.rupOfDeparture)) /
            (1000 * 60 * 60)
          ).toFixed(0)
        : ""
    );
    const distanceObsSinceNoon = ref("");
    const distanceObsTotal = computed(
      () =>
        +(temp.distanceObsSoFar + Number(distanceObsSinceNoon.value)).toFixed(2)
    );
    const distanceEngSinceNoon = computed(() =>
      revolutionCount.value
        ? +(
            (Number(revolutionCount.value) - temp.revolutionCountYesterday) *
            temp.propellerPitch
          ).toFixed(2)
        : ""
    );
    const distanceEngTotal = computed(() =>
      distanceEngSinceNoon.value
        ? +(distanceEngSinceNoon.value + temp.distanceEngSoFar).toFixed(2)
        : ""
    );
    const distanceToGo = computed(() =>
      distanceObsSinceNoon.value
        ? +(temp.distanceLeft - Number(distanceObsSinceNoon.value)).toFixed(2)
        : ""
    );
    const distanceToGoEdited = ref(""); // use distanceToGoEdited instead of distanceToGo if distanceToGoEdited.value != distanceToGo.value
    const remarksForChanges = ref("");
    const revolutionCount = ref("");

    // Performance
    const speedSinceNoon = computed(() =>
      distanceObsSinceNoon.value && hoursSinceNoon.value
        ? +(Number(distanceObsSinceNoon.value) / hoursSinceNoon.value).toFixed(
            2
          )
        : ""
    );
    const rpmSinceNoon = computed(() =>
      revolutionCount.value && hoursSinceNoon.value
        ? +(
            (Number(revolutionCount.value) - temp.revolutionCountYesterday) /
            (hoursSinceNoon.value * 60)
          ).toFixed(1)
        : ""
    );
    const slipSinceNoon = computed(() =>
      distanceEngSinceNoon.value && distanceObsSinceNoon.value
        ? +(
            100 *
            ((distanceEngSinceNoon.value - Number(distanceObsSinceNoon.value)) /
              distanceEngSinceNoon.value)
          ).toFixed(2)
        : ""
    );
    const speedAvg = computed(() =>
      speedSinceNoon.value
        ? +(
            (temp.voyageAvgSpeed + speedSinceNoon.value) /
            (temp.previousNoonReportCount + 1)
          ).toFixed(2)
        : ""
    );
    const rpmAvg = computed(() =>
      rpmSinceNoon.value
        ? +(
            (temp.voyageAvgRpm + rpmSinceNoon.value) /
            (temp.previousNoonReportCount + 1)
          ).toFixed(1)
        : ""
    );
    const slipAvg = computed(() =>
      slipSinceNoon.value
        ? +(
            (temp.voyageAvgSlip + slipSinceNoon.value) /
            (temp.previousNoonReportCount + 1)
          ).toFixed(2)
        : ""
    );
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

    // Consumption and condition
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
    const lsfoRob = computed(
      () => temp.lsfoPrevROB - lsfoTotalConsumption.value
    );
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

    // Actual performance
    // TODO: need to be computed values
    const pilotToPilotTotalDistanceObs = ref("");
    const pilotToPilotTotalSailingTime = ref("");
    const pilotToPilotDisplacement = ref("");
    const pilotToPilotAvgSpeed = ref("");
    const pilotToPilotAvgRpm = ref("");
    const pilotToPilotMeFoConsumption = ref("");
    const lsfoMeSum = ref("");
    const lsfoGeSum = ref("");
    const lsfoBoilerSum = ref("");
    const lsfoIggSum = ref("");
    const lsfoTotalSum = ref("");
    const mgoMeSum = ref("");
    const mgoGeSum = ref("");
    const mgoBoilerSum = ref("");
    const mgoIggSum = ref("");
    const mgoTotalSum = ref("");

    return {
      // Overview
      arrsReportNo,
      curLegNo,
      curLoadingCondition,
      voyageNo,
      reportingDateTime,
      reportingTimeZone,
      // Departure and Arrival
      departurePortCountry,
      departurePortName,
      departureDateTime,
      arrivalPortCountry,
      arrivalPortName,
      plannedOperation,
      isOtherPlannedOperationEnabled,
      otherPlannedOperation,
      // S/BY for Arrival
      latDir,
      latMinutes,
      latDegree,
      longDir,
      longMinutes,
      longDegree,
      // Distance & Time
      hoursSinceNoon,
      hoursTotal,
      distanceToGo,
      distanceToGoEdited,
      remarksForChanges,
      distanceObsSinceNoon,
      distanceObsTotal,
      distanceEngSinceNoon,
      distanceEngTotal,
      revolutionCount,
      // Performance
      speedSinceNoon,
      rpmSinceNoon,
      slipSinceNoon,
      speedAvg,
      rpmAvg,
      slipAvg,
      // Pilot Station -- Arrival
      pilotArrName,
      pilotArrDate,
      pilotArrDraftAft,
      pilotArrDraftMid,
      pilotArrDraftFwd,
      pilotArrLatDir,
      pilotArrLatDegree,
      pilotArrLatMinute,
      pilotArrLongDir,
      pilotArrLongDegree,
      pilotArrLongMinute,
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
      pilotToPilotTotalDistanceObs,
      pilotToPilotTotalSailingTime,
      pilotToPilotDisplacement,
      pilotToPilotAvgSpeed,
      pilotToPilotAvgRpm,
      pilotToPilotMeFoConsumption,
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
  }
);
