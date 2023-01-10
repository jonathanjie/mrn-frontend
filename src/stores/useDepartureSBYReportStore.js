import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { useShipStore } from "@/stores/useShipStore";
import { useLatestReportDetailsQuery } from "@/queries/useLatestReportDetailsQuery";
import { Machinery } from "@/constants";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

const temp = {
  // Consumption & Condition
  // prevRobs: {
  //   LSFO: 200,
  //   MGO: 200,
  //   MDO: 200,
  //   HFO: 200,
  //   LPGP: 200,
  //   LPGB: 200,
  //   LNG: 200,
  //   "M/E Cylinder": 200,
  //   "M/E System": 200,
  //   "M/E Sump": 200,
  //   "G/E System": 200,
  //   "T/C System": 200,
  // },
  // freshwaterPrevROB: 200,

  // Cargo Operation (from init modal, M³/MT/TEU/CEU)
  prevCargoTotalAmount: 100,
  // cargoUnit: "M³",

  // Consumption & Condition (Total)
  fuelOilPrevBreakdown: {
    me: 10,
    ge: 10,
    blr: 10,
    igg: 10,
    receipt: 20,
    debunkering: 10,
  },
  lubricatingOilPrevBreakdown: {
    total_consumption: 10,
    receipt: 20,
    debunkering: 10,
  },
  freshwaterPrevConsumed: 100,
  freshwaterPrevEvaporated: 100,
  freshwaterPrevReceiving: 10,
  freshwaterPrevDischarging: 5,
};

export const useDepartureSBYReportStore = defineStore(
  "departureReportSBY",
  () => {
    // SubsStores
    const store = useVoyageStore();
    const { voyageUuid, depsReportNo, legNo, curVoyageNo } = storeToRefs(store);

    const detailsStore = useLatestReportDetailsStore();
    const {
      fuelOilRobs: prevFuelOilRobs,
      lubeOilRobs: prevLubeOilRobs,
      freshwaterRob: prevFreshWaterRob,
    } = storeToRefs(detailsStore);

    const shipStore = useShipStore();
    const { fuelOils, lubricatingOils, machinery, imoReg, crewShipDetails } =
      storeToRefs(shipStore);

    // Queries
    const {
      isFetching: isFetchingPrevData,
      isSucess: IsSuccessPrevData,
      data: prevData,
    } = useLatestReportDetailsQuery(imoReg.value);

    // refs
    // Overview
    const reportNo = depsReportNo;
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

    // Departure and Destination
    const departurePortCountry = ref("");
    const departurePortName = ref("");
    const isDestinationEnabled = ref(true);
    const destinationPortCountry = ref("");
    const destinationPortName = ref("");
    const destinationTimeZone = ref("default");
    const destinationEstimatedArrival = ref("");
    const destinationEstimatedArrivalUTC = computed(() =>
      destinationTimeZone.value !== "default" &&
      destinationEstimatedArrival.value
        ? convertLTToUTC(
            new Date(destinationEstimatedArrival.value),
            destinationTimeZone.value
          )
        : ""
    );

    // Cargo Operation
    const loadCondition = ref("default");
    const loading = ref("");
    const unloading = ref("");
    const totalAmount = computed(
      () =>
        +(
          temp.prevCargoTotalAmount +
          Number(loading.value) -
          Number(unloading.value)
        ).toFixed(2)
    );
    const time = ref("");
    const cargoUnit = computed(
      () => crewShipDetails.value.shipspecs.cargo_unit
    );

    // Vessel Condition at Departure
    const draftFwd = ref("");
    const draftMid = ref("");
    const draftAft = ref("");
    const constant = ref("");
    const gm = ref("");
    const ballast = ref("");
    const displacement = ref("");

    // Pilot Station - Departure
    const shouldPilotDepDataBeSent = computed(
      () => pilotDepName.value || pilotDepDateTime.value
    );
    const pilotDepName = ref("");
    const pilotDepDateTime = ref("");
    const pilotDepDateTimeUTC = computed(() =>
      reportingTimeZone.value !== "default" && pilotDepDateTime.value
        ? convertLTToUTC(
            new Date(pilotDepDateTime.value),
            reportingTimeZone.value
          )
        : ""
    );

    const pilotDepLatDir = ref("default");
    const pilotDepLatDegree = ref("");
    const pilotDepLatMinute = ref("");
    const pilotDepLongDir = ref("default");
    const pilotDepLongDegree = ref("");
    const pilotDepLongMinute = ref("");

    // Consumption And Condition
    const fuelOilBreakdowns = reactive({});
    const fuelOilReceipts = reactive({});
    const fuelOilDebunkerings = reactive({});
    for (const fuelOil of fuelOils.value) {
      fuelOilBreakdowns[fuelOil] = {};
      fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
      fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
      fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
      fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
      fuelOilReceipts[fuelOil] = "";
      fuelOilDebunkerings[fuelOil] = "";
    }
    const fuelOilTotalConsumptions = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +sumObjectValues(fuelOilBreakdowns[fuelOil]).toFixed(2);
      }
      return rtn;
    });
    const fuelOilRobs = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +(
          prevFuelOilRobs[fuelOil] -
          Number(fuelOilTotalConsumptions.value[fuelOil]) +
          Number(fuelOilReceipts[fuelOil]) -
          Number(fuelOilDebunkerings[fuelOil])
        ).toFixed(2);
      }
      return rtn;
    });
    const fuelOilDataCorrection = reactive({
      type: "default",
      correction: "",
      remarks: "",
    });

    const lubricatingOilBreakdowns = reactive({});
    for (const lubricatingOil of lubricatingOils.value) {
      lubricatingOilBreakdowns[lubricatingOil] = {
        total_consumption: "",
        receipt: "",
        debunkering: "",
      };
    }
    const lubricatingOilRobs = computed(() => {
      let rtn = {};
      for (const lubricatingOil of lubricatingOils.value) {
        rtn[lubricatingOil] = +(
          prevLubeOilRobs[lubricatingOil] -
          Number(lubricatingOilBreakdowns[lubricatingOil].total_consumption) +
          Number(lubricatingOilBreakdowns[lubricatingOil].receipt) -
          Number(lubricatingOilBreakdowns[lubricatingOil].debunkering)
        ).toFixed(2);
      }
      return rtn;
    });
    const lubricatingOilDataCorrection = reactive({
      type: "default",
      correction: "",
      remarks: "",
    });

    const freshwaterConsumed = ref("");
    const freshwaterGenerated = ref("");
    const freshwaterReceiving = ref("");
    const freshwaterDischarging = ref("");
    const freshwaterChange = computed(
      () => +(freshwaterGenerated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () =>
        prevFreshWaterRob +
        Number(freshwaterReceiving.value) -
        Number(freshwaterDischarging.value) +
        freshwaterChange.value
    );

    // Consumption and Condition (Total)
    const fuelOilBreakdownsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = {};
        rtn[fuelOil][Machinery.ME] = fuelOilBreakdowns[fuelOil][Machinery.ME]
          ? +(
              temp.fuelOilPrevBreakdown.me +
              Number(fuelOilBreakdowns[fuelOil][Machinery.ME])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.me;
        rtn[fuelOil][Machinery.GE] = fuelOilBreakdowns[fuelOil][Machinery.GE]
          ? +(
              temp.fuelOilPrevBreakdown.ge +
              Number(fuelOilBreakdowns[fuelOil][Machinery.GE])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.ge;
        rtn[fuelOil][Machinery.IGG] = fuelOilBreakdowns[fuelOil][Machinery.IGG]
          ? +(
              temp.fuelOilPrevBreakdown.igg +
              Number(fuelOilBreakdowns[fuelOil][Machinery.IGG])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.igg;
        rtn[fuelOil][Machinery.BLR] = fuelOilBreakdowns[fuelOil][Machinery.BLR]
          ? +(
              temp.fuelOilPrevBreakdown.blr +
              Number(fuelOilBreakdowns[fuelOil][Machinery.BLR])
            ).toFixed(2)
          : temp.fuelOilPrevBreakdown.blr;
      }
      return rtn;
    });
    const fuelOilReceiptsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +(
          temp.fuelOilPrevBreakdown.receipt + Number(fuelOilReceipts[fuelOil])
        ).toFixed(2);
      }
      return rtn;
    });
    const fuelOilDebunkeringsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +(
          temp.fuelOilPrevBreakdown.debunkering +
          Number(fuelOilDebunkerings[fuelOil])
        ).toFixed(2);
      }
      return rtn;
    });
    const fuelOilTotalConsumptionsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        if (fuelOils.value.includes(fuelOil)) {
          rtn[fuelOil] = +sumObjectValues(
            fuelOilBreakdownsSum.value[fuelOil]
          ).toFixed(2);
        }
      }
      return rtn;
    });
    const fuelOilRobsSum = fuelOilRobs;

    const lubricatingOilBreakdownsSum = computed(() => {
      let rtn = {};
      for (const lubricatingOil of lubricatingOils.value) {
        rtn[lubricatingOil] = {
          total_consumption: +(
            temp.lubricatingOilPrevBreakdown.total_consumption +
            Number(lubricatingOilBreakdowns[lubricatingOil].total_consumption)
          ).toFixed(2),
          receipt: +(
            temp.lubricatingOilPrevBreakdown.receipt +
            Number(lubricatingOilBreakdowns[lubricatingOil].receipt)
          ).toFixed(2),
          debunkering: +(
            temp.lubricatingOilPrevBreakdown.debunkering +
            Number(lubricatingOilBreakdowns[lubricatingOil].debunkering)
          ).toFixed(2),
        };
      }
      return rtn;
    });
    const lubricatingOilRobsSum = lubricatingOilRobs;

    const freshwaterConsumedSum = computed(
      () =>
        +(
          temp.freshwaterPrevConsumed + Number(freshwaterConsumed.value)
        ).toFixed(2)
    );
    const freshwaterGeneratedSum = computed(
      () =>
        +(
          temp.freshwaterPrevEvaporated + Number(freshwaterGenerated.value)
        ).toFixed(2)
    );
    const freshwaterReceivingSum = computed(
      () =>
        +(
          temp.freshwaterPrevReceiving + Number(freshwaterReceiving.value)
        ).toFixed(2)
    );
    const freshwaterDischargingSum = computed(
      () =>
        +(
          temp.freshwaterPrevDischarging + Number(freshwaterDischarging.value)
        ).toFixed(2)
    );
    const freshwaterChangeSum = computed(
      () =>
        +(freshwaterGeneratedSum.value - freshwaterConsumedSum.value).toFixed(2)
    );
    const freshwaterRobSum = freshwaterRob;

    return {
      isFetchingPrevData,
      IsSuccessPrevData,
      prevData,
      // Overview
      voyageUuid,
      reportNo,
      legNo,
      voyageNo,
      reportingDateTime,
      reportingTimeZone,
      reportingDateTimeUTC,
      // Departure and Destination
      departurePortCountry,
      departurePortName,
      isDestinationEnabled,
      destinationPortCountry,
      destinationPortName,
      destinationTimeZone,
      destinationEstimatedArrival,
      destinationEstimatedArrivalUTC,
      // Cargo Operation
      loadCondition,
      loading,
      unloading,
      totalAmount,
      time,
      cargoUnit,
      // Vessel Condition at Departure
      draftFwd,
      draftMid,
      draftAft,
      constant,
      gm,
      ballast,
      displacement,
      // Pilot station - Departure
      shouldPilotDepDataBeSent,
      pilotDepName,
      pilotDepDateTime,
      pilotDepDateTimeUTC,
      pilotDepLatDir,
      pilotDepLatDegree,
      pilotDepLatMinute,
      pilotDepLongDir,
      pilotDepLongDegree,
      pilotDepLongMinute,
      // Consumption And Condition
      fuelOils,
      lubricatingOils,
      machinery,
      fuelOilRobs,
      fuelOilBreakdowns,
      fuelOilReceipts,
      fuelOilDebunkerings,
      fuelOilTotalConsumptions,
      fuelOilDataCorrection,
      lubricatingOilBreakdowns,
      lubricatingOilRobs,
      lubricatingOilDataCorrection,
      freshwaterConsumed,
      freshwaterGenerated,
      freshwaterReceiving,
      freshwaterDischarging,
      freshwaterChange,
      freshwaterRob,
      // Consumption And Condition (Total)
      fuelOilRobsSum,
      fuelOilBreakdownsSum,
      fuelOilReceiptsSum,
      fuelOilDebunkeringsSum,
      fuelOilTotalConsumptionsSum,
      lubricatingOilBreakdownsSum,
      lubricatingOilRobsSum,
      freshwaterConsumedSum,
      freshwaterGeneratedSum,
      freshwaterReceivingSum,
      freshwaterDischargingSum,
      freshwaterChangeSum,
      freshwaterRobSum,
    };
  }
);
