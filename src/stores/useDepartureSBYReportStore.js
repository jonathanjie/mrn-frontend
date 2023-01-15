import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC, sumObjectValues } from "@/utils/helpers";
import { useShipStore } from "@/stores/useShipStore";
import { useLatestReportDetailsQuery } from "@/queries/useLatestReportDetailsQuery";
import { useLatestReportDetailsStore } from "./useLatestReportDetailsStore";

const temp = {
  fuelOilPrevBreakdown: {
    receipt: 0,
    debunkering: 0,
  },

  // Consumption & Condition (Total)
  lubricatingOilPrevBreakdown: {
    total_consumption: 0,
    receipt: 0,
    debunkering: 0,
  },
  freshwaterPrevConsumed: 0,
  freshwaterPrevEvaporated: 0,
  freshwaterPrevReceiving: 0,
  freshwaterPrevDischarging: 0,
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
      fuelOilConsInHarbourPort,
      cargoTotal,
      fuelOilDebunkering: prevFuelOilDebunkering,
      fuelOilReceipt: prevFuelOilReceipt,
      lubeOilDebunkering: prevLubeOilDebunkering,
      lubeOilReceipt: prevLubeOilReceipt,
      lubeOilTotalConsumption: prevLubeOilTotalConsumption,
      freshwaterConsumed: prevFreshwaterConsumed,
      freshwaterDischarged: prevFreshwaterDischarged,
      freshwaterGenerated: prevFreshwaterGenerated,
      freshwaterReceived: prevFreshwaterReceived,
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
    const isFirstReport = computed(
      () => reportNo.value === 1 && legNo.value === 1
    );

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
    const totalAmountComputed = computed(
      () =>
        +(
          Number(cargoTotal.value) +
          Number(loading.value) -
          Number(unloading.value)
        ).toFixed(2)
    );
    const totalAmountStatic = ref(0.0);
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
      for (const machine of machinery.value) {
        fuelOilBreakdowns[fuelOil][machine] = "";
      }
      // fuelOilBreakdowns[fuelOil][Machinery.ME] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.GE] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.IGG] = "";
      // fuelOilBreakdowns[fuelOil][Machinery.BLR] = "";
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
    const fuelOilRobsComputed = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +(
          (Number(prevFuelOilRobs.value[fuelOil]) || 0) -
          Number(fuelOilTotalConsumptions.value[fuelOil]) +
          Number(fuelOilReceipts[fuelOil]) -
          Number(fuelOilDebunkerings[fuelOil])
        ).toFixed(2);
      }
      return rtn;
    });
    const fuelOilRobsStatic = reactive({});
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
    const lubricatingOilRobsComputed = computed(() => {
      let rtn = {};
      for (const lubricatingOil of lubricatingOils.value) {
        rtn[lubricatingOil] = +(
          (Number(prevLubeOilRobs.value[lubricatingOil]) || 0) -
          Number(lubricatingOilBreakdowns[lubricatingOil].total_consumption) +
          Number(lubricatingOilBreakdowns[lubricatingOil].receipt) -
          Number(lubricatingOilBreakdowns[lubricatingOil].debunkering)
        ).toFixed(2);
      }
      return rtn;
    });

    const lubricatingOilRobsStatic = reactive({});
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

    const freshwaterRobComputed = computed(
      () =>
        (Number(prevFreshWaterRob.value) || 0) +
        Number(freshwaterReceiving.value) -
        Number(freshwaterDischarging.value) +
        freshwaterChange.value
    );
    const freshwaterRobStatic = ref("");

    // Consumption and Condition (Total)
    const fuelOilBreakdownsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = {};
        if (Object.keys(fuelOilConsInHarbourPort.value).length !== 0) {
          for (const machine of machinery.value) {
            rtn[fuelOil][machine] = fuelOilBreakdowns[fuelOil][machine]
              ? +(
                  Number(fuelOilConsInHarbourPort.value[fuelOil][machine]) +
                  Number(fuelOilBreakdowns[fuelOil][machine])
                ).toFixed(2)
              : Number(fuelOilConsInHarbourPort.value[fuelOil][machine]);
          }
        } else {
          for (const machine of machinery.value) {
            rtn[fuelOil][machine] = Number(fuelOilBreakdowns[fuelOil][machine]);
          }
        }
      }
      return rtn;
    });
    const fuelOilReceiptsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +(
          Number(prevFuelOilReceipt.value[fuelOil]) +
          Number(fuelOilReceipts[fuelOil])
        ).toFixed(2);
      }
      return rtn;
    });
    const fuelOilDebunkeringsSum = computed(() => {
      let rtn = {};
      for (const fuelOil of fuelOils.value) {
        rtn[fuelOil] = +(
          Number(prevFuelOilDebunkering.value[fuelOil]) +
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
    const fuelOilRobsSum = fuelOilRobsComputed;

    const lubricatingOilBreakdownsSum = computed(() => {
      let rtn = {};
      for (const lubricatingOil of lubricatingOils.value) {
        rtn[lubricatingOil] = {
          total_consumption: +(
            Number(prevLubeOilTotalConsumption.value[lubricatingOil]) +
            Number(lubricatingOilBreakdowns[lubricatingOil].total_consumption)
          ).toFixed(2),
          receipt: +(
            Number(prevLubeOilReceipt.value[lubricatingOil]) +
            Number(lubricatingOilBreakdowns[lubricatingOil].receipt)
          ).toFixed(2),
          debunkering: +(
            Number(prevLubeOilDebunkering.value[lubricatingOil]) +
            Number(lubricatingOilBreakdowns[lubricatingOil].debunkering)
          ).toFixed(2),
        };
      }
      return rtn;
    });
    const lubricatingOilRobsSum = lubricatingOilRobsComputed;

    const freshwaterConsumedSum = computed(
      () =>
        +(
          Number(prevFreshwaterConsumed.value) +
          Number(freshwaterConsumed.value)
        ).toFixed(2)
    );
    const freshwaterGeneratedSum = computed(
      () =>
        +(
          Number(prevFreshwaterGenerated.value) +
          Number(freshwaterGenerated.value)
        ).toFixed(2)
    );
    const freshwaterReceivingSum = computed(
      () =>
        +(
          Number(prevFreshwaterReceived.value) +
          Number(freshwaterReceiving.value)
        ).toFixed(2)
    );
    const freshwaterDischargingSum = computed(
      () =>
        +(
          Number(prevFreshwaterDischarged.value) +
          Number(freshwaterDischarging.value)
        ).toFixed(2)
    );
    const freshwaterChangeSum = computed(
      () =>
        +(
          Number(freshwaterGeneratedSum.value) -
          Number(freshwaterConsumedSum.value)
        ).toFixed(2)
    );
    const freshwaterRobSum = freshwaterRobComputed;

    return {
      isFetchingPrevData,
      IsSuccessPrevData,
      prevData,
      isFirstReport,
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
      totalAmountComputed,
      totalAmountStatic,
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
      fuelOilRobsComputed,
      fuelOilRobsStatic,
      fuelOilBreakdowns,
      fuelOilReceipts,
      fuelOilDebunkerings,
      fuelOilTotalConsumptions,
      fuelOilDataCorrection,
      lubricatingOilRobsComputed,
      lubricatingOilRobsStatic,
      lubricatingOilBreakdowns,
      lubricatingOilDataCorrection,
      freshwaterConsumed,
      freshwaterGenerated,
      freshwaterReceiving,
      freshwaterDischarging,
      freshwaterChange,
      freshwaterRobComputed,
      freshwaterRobStatic,
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
