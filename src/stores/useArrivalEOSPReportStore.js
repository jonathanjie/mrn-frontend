import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC } from "@/utils/helpers";

const temp = {
  // Arrival and Departure
  departurePortCountry: "KR",
  departurePortName: "PUS",
  arrivalPortCountry: "SG",
  arrivalPortName: "PPT",
  departureDateTime: "2022-06-01T04:23:00Z",
  departureTimeZone: 9, // from departure sby time zone of this leg

  // Distance & Time / Performance
  lastNoonReportTime: "2022-12-01T00:00:00Z",
  rupOfDeparture: "2022-11-21T00:00:00Z",
  distanceLeft: 4000,
  distanceObsSoFar: 1000,
  distanceEngSoFar: 1000,
  revolutionCountPrevNoon: 20000,
  propellerPitch: 2,
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

  // Actual Performance
  displacement: 2000, // from departure s/by (vessel condition)

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

export const useArrivalEOSPReportStore = defineStore(
  "arrivalEOSPReport",
  () => {
    const store = useVoyageStore();
    const { arrsReportNo, curLegNo, curLoadingCondition, curVoyageNo } =
      storeToRefs(store);

    // Overview
    const reportNo = arrsReportNo;
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

    // Departure and Arrival
    const departurePortCountry = ref(temp.departurePortCountry);
    const departurePortName = ref(temp.departurePortName);
    const departureDateTime = ref(temp.departureDateTime);
    const departureTimeZone = ref(temp.departureTimeZone);
    const departureDateTimeUTC = computed(() =>
      departureTimeZone.value !== "default" && departureDateTime.value
        ? convertLTToUTC(
            new Date(departureDateTime.value),
            departureTimeZone.value
          )
        : departureDateTime.value
    );
    const arrivalPortCountry = ref(temp.arrivalPortCountry);
    const arrivalPortName = ref(temp.arrivalPortName);
    const plannedOperations = ref([]);
    const isOtherPlannedOperationEnabled = computed(() =>
      plannedOperations.value.includes("others")
    );
    const otherPlannedOperation = ref("");

    // S/BY for Arrival
    const latDir = ref("default");
    const latMinute = ref("");
    const latDegree = ref("");
    const longDir = ref("default");
    const longMinute = ref("");
    const longDegree = ref("");

    // Weather (Noon to S/BY)
    const weather = ref("default");
    const visibility = ref("default");
    const windDirection = ref("default");
    const windSpeed = ref("");
    const seaDirection = ref("default");
    const seaState = ref("default");
    const swellDirection = ref("default");
    const swellScale = ref("default");
    const airTemperatureDry = ref("");
    const airTemperatureWet = ref("");
    const airPressure = ref("");
    const seaTemperature = ref("");
    const iceCondition = ref("default");

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
    const distanceObsTotal = computed(() =>
      distanceObsSinceNoon.value
        ? +(temp.distanceObsSoFar + Number(distanceObsSinceNoon.value)).toFixed(
            2
          )
        : ""
    );
    const distanceEngSinceNoon = computed(() =>
      revolutionCount.value
        ? +(
            (Number(revolutionCount.value) - temp.revolutionCountPrevNoon) *
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
            (Number(revolutionCount.value) - temp.revolutionCountPrevNoon) /
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
      speedSinceNoon.value !== "" && hoursTotal.value
        ? +(
            (temp.voyageAvgSpeed + speedSinceNoon.value) /
            (hoursTotal.value / 24)
          ).toFixed(2)
        : ""
    );
    const rpmAvg = computed(() =>
      rpmSinceNoon.value !== "" && hoursTotal.value
        ? +(
            (temp.voyageAvgRpm + rpmSinceNoon.value) /
            (hoursTotal.value / 24)
          ).toFixed(1)
        : ""
    );
    const slipAvg = computed(() =>
      slipSinceNoon.value !== "" && hoursTotal.value
        ? +(
            (temp.voyageAvgSlip + slipSinceNoon.value) /
            (hoursTotal.value / 24)
          ).toFixed(2)
        : ""
    );

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
    const freshwaterGenerated = ref("");
    const freshwaterChange = computed(
      () => +(freshwaterGenerated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () => temp.freshwaterPrevROB + freshwaterChange.value
    );

    // Actual performance
    const totalDistanceObs = distanceObsTotal;
    const totalSailingTime = hoursTotal;
    const displacement = ref(temp.displacement);
    const avgSpeed = speedAvg;
    const avgRpm = rpmAvg;
    const meFoConsumption = computed(() =>
      hoursTotal.value
        ? (
            (lsfoMeSum.value + mgoMeSum.value) /
            (hoursTotal.value * 24)
          ).toFixed(2)
        : ""
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
      reportingDateTimeUTC,
      reportingTimeZone,
      // Departure and Arrival
      departurePortCountry,
      departurePortName,
      departureTimeZone,
      departureDateTime,
      departureDateTimeUTC,
      arrivalPortCountry,
      arrivalPortName,
      plannedOperations,
      isOtherPlannedOperationEnabled,
      otherPlannedOperation,
      // S/BY for Arrival
      latDir,
      latMinute,
      latDegree,
      longDir,
      longMinute,
      longDegree,
      // Weather
      weather,
      visibility,
      windDirection,
      windSpeed,
      seaDirection,
      seaState,
      swellDirection,
      swellScale,
      airTemperatureDry,
      airTemperatureWet,
      airPressure,
      seaTemperature,
      iceCondition,
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
      shouldPilotArrDataBeSent,
      pilotArrName,
      pilotArrDateTime,
      pilotArrDateTimeUTC,
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
      freshwaterGenerated,
      freshwaterChange,
      freshwaterRob,
      // Actual performance
      totalDistanceObs,
      totalSailingTime,
      displacement,
      avgSpeed,
      avgRpm,
      meFoConsumption,
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
