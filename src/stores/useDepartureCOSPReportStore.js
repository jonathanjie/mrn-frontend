import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useReportStore } from "./useReportStore";

const temp = {
  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,
};

export const useDepartureCOSPReportStore = defineStore(
  "departureReportCOSP",
  () => {
    const store = useReportStore();

    // Overview
    const reportNo = ref(store.reportNo);
    const legNo = ref(store.legNo);
    const voyageNo = ref(store.voyageNo);
    const reportingDate = ref("");
    const reportingTimeZone = ref("default");

    // Departure and Destination
    const departurePortCountry = ref("");
    const departurePortName = ref("");
    const departureTimeZone = ref("default");
    const departureDateTime = ref("");
    const destinationPortCountry = ref("");
    const destinationPortName = ref("");
    const destinationTimeZone = ref("default");
    const destinationEstimatedArrival = ref("");

    // Pilot Station - Departure
    const pilotDepName = ref("");
    const pilotDepDate = ref("");
    const pilotDepLatDir = ref("default");
    const pilotDepLatDegree = ref("");
    const pilotDepLatMinute = ref("");
    const pilotDepLongDir = ref("default");
    const pilotDepLongDegree = ref("");
    const pilotDepLongMinute = ref("");

    // Pilot Station - Arrival
    const pilotArrName = ref("");
    const pilotArrDate = ref("");
    const pilotArrLatDir = ref("default");
    const pilotArrDraftFwd = ref("");
    const pilotArrDraftMid = ref("");
    const pilotArrDraftAft = ref("");
    const pilotArrLatDegree = ref("");
    const pilotArrLatMinute = ref("");
    const pilotArrLongDir = ref("default");
    const pilotArrLongDegree = ref("");
    const pilotArrLongMinute = ref("");

    // R/UP Engine / Distance & Time
    const rupEngDate = ref("");
    const rupEngLatDir = ref("default");
    const rupEngLatDegree = ref("");
    const rupEngLatMinute = ref("");
    const rupEngLongDir = ref("default");
    const rupEngLongDegree = ref("");
    const rupEngLongMinute = ref("");
    const sbyToRupTime = ref("");
    const sbyToRupDistanceObs = ref("");
    const sbyToRupDistanceEng = ref("");
    const sbyToRupRevolutionCount = ref("");
    const sbyToRupSetRPM = ref("");

    // Budget Trans Ocean (Pilot to Pilot)
    const budgetDistance = ref("");
    const budgetSpeed = ref("");
    const meDaily = ref("");
    const meRPM = ref("");

    // Consumption and Condition
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
    const freshwaterReceived = ref("");
    const freshwaterDischarged = ref("");
    const freshwaterChange = computed(
      () => +(freshwaterEvaporated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () => temp.freshwaterPrevROB + freshwaterChange.value
    );

    return {
      // Overview
      reportNo,
      legNo,
      voyageNo,
      reportingDate,
      reportingTimeZone,
      // Departure and Destination
      departurePortCountry,
      departurePortName,
      departureTimeZone,
      departureDateTime,
      destinationPortCountry,
      destinationPortName,
      destinationTimeZone,
      destinationEstimatedArrival,
      // Pilot station - Departure
      pilotDepName,
      pilotDepDate,
      pilotDepLatDir,
      pilotDepLatDegree,
      pilotDepLatMinute,
      pilotDepLongDir,
      pilotDepLongDegree,
      pilotDepLongMinute,
      // Pilot Station - Arrival
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
      // R/UP Engine / Distance & Time
      rupEngDate,
      rupEngLatDir,
      rupEngLatDegree,
      rupEngLatMinute,
      rupEngLongDir,
      rupEngLongDegree,
      rupEngLongMinute,
      sbyToRupTime,
      sbyToRupDistanceObs,
      sbyToRupDistanceEng,
      sbyToRupRevolutionCount,
      sbyToRupSetRPM,
      // Budget Trans Ocean (Pilot to Pilot)
      budgetDistance,
      budgetSpeed,
      meDaily,
      meRPM,
      // Consumption and Condition
      lsfoBreakdown,
      mgoBreakdown,
      lsfoTotalConsumption,
      lsfoRob,
      mgoTotalConsumption,
      mgoRob,
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
      freshwaterReceived,
      freshwaterDischarged,
      freshwaterChange,
      freshwaterRob,
    };
  }
);
