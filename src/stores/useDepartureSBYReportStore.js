import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";
import { storeToRefs } from "pinia";
import { convertLTToUTC } from "@/utils/helpers";

const temp = {
  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,

  // Cargo Operation (from init modal, M³/MT/TEU/CEU)
  cargoUnit: "M³",

  // Consumption & Condition (Total)
  lsfoPrevBreakdown: {
    me: 10,
    ge: 10,
    blr: 10,
    igg: 10,
    receipt: 20,
    debunkering: 10,
  },
  mgoPrevBreakdown: {
    me: 10,
    ge: 10,
    blr: 10,
    igg: 10,
    receipt: 20,
    debunkering: 10,
  },
  mecylinderPrevBreakdown: {
    total_consumption: 10,
    receipt: 20,
    debunkering: 10,
  },
  mesystemPrevBreakdown: {
    total_consumption: 10,
    receipt: 20,
    debunkering: 10,
  },
  mesumpPrevBreakdown: {
    total_consumption: 10,
    receipt: 20,
    debunkering: 10,
  },
  gesystemPrevBreakdown: {
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
    const store = useVoyageStore();
    const { depsReportNo, curLegNo, curVoyageNo } = storeToRefs(store);

    // Overview
    const reportNo = depsReportNo;
    const legNo = curLegNo;
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
    const totalAmount = ref("");
    const time = ref("");
    const cargoUnit = ref(temp.cargoUnit);

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
    const lsfoBreakdown = reactive({
      me: "",
      ge: "",
      blr: "",
      igg: "",
      receipt: "",
      debunkering: "",
    });
    const mgoBreakdown = reactive({
      me: "",
      ge: "",
      blr: "",
      igg: "",
      receipt: "",
      debunkering: "",
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
      () =>
        temp.lsfoPrevROB -
        lsfoTotalConsumption.value +
        Number(lsfoBreakdown.receipt) -
        Number(lsfoBreakdown.debunkering)
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
    const mgoRob = computed(
      () =>
        temp.mgoPrevROB -
        mgoTotalConsumption.value +
        Number(mgoBreakdown.receipt) -
        Number(mgoBreakdown.debunkering)
    );
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
    const freshwaterReceiving = ref("");
    const freshwaterDischarging = ref("");
    const freshwaterChange = computed(
      () => +(freshwaterGenerated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () =>
        temp.freshwaterPrevROB +
        Number(freshwaterReceiving.value) -
        Number(freshwaterDischarging.value) +
        freshwaterChange.value
    );

    // Consumption and Condition (Total)
    const lsfoBreakdownSum = computed(() => {
      return {
        me: +(temp.lsfoPrevBreakdown.me + Number(lsfoBreakdown.me)).toFixed(2),
        ge: +(temp.lsfoPrevBreakdown.ge + Number(lsfoBreakdown.ge)).toFixed(2),
        blr: +(temp.lsfoPrevBreakdown.blr + Number(lsfoBreakdown.blr)).toFixed(
          2
        ),
        igg: +(temp.lsfoPrevBreakdown.igg + Number(lsfoBreakdown.igg)).toFixed(
          2
        ),
        receipt: +(
          temp.lsfoPrevBreakdown.receipt + Number(lsfoBreakdown.receipt)
        ).toFixed(2),
        debunkering: +(
          temp.lsfoPrevBreakdown.debunkering + Number(lsfoBreakdown.debunkering)
        ).toFixed(2),
      };
    });
    const mgoBreakdownSum = computed(() => {
      return {
        me: +(temp.mgoPrevBreakdown.me + Number(mgoBreakdown.me)).toFixed(2),
        ge: +(temp.mgoPrevBreakdown.ge + Number(mgoBreakdown.ge)).toFixed(2),
        blr: +(temp.mgoPrevBreakdown.blr + Number(mgoBreakdown.blr)).toFixed(2),
        igg: +(temp.mgoPrevBreakdown.igg + Number(mgoBreakdown.igg)).toFixed(2),
        receipt: +(
          temp.mgoPrevBreakdown.receipt + Number(mgoBreakdown.receipt)
        ).toFixed(2),
        debunkering: +(
          temp.mgoPrevBreakdown.debunkering + Number(mgoBreakdown.debunkering)
        ).toFixed(2),
      };
    });
    const lsfoTotalConsumptionSum = computed(
      () =>
        +(
          Number(lsfoBreakdownSum.value.me) +
          Number(lsfoBreakdownSum.value.ge) +
          Number(lsfoBreakdownSum.value.blr) +
          Number(lsfoBreakdownSum.value.igg)
        ).toFixed(2)
    );
    const lsfoRobSum = lsfoRob;
    const mgoTotalConsumptionSum = computed(
      () =>
        +(
          Number(mgoBreakdownSum.value.me) +
          Number(mgoBreakdownSum.value.ge) +
          Number(mgoBreakdownSum.value.blr) +
          Number(mgoBreakdownSum.value.igg)
        ).toFixed(2)
    );
    const mgoRobSum = mgoRob;

    const mecylinderBreakdownSum = computed(() => {
      return {
        total_consumption: +(
          temp.mecylinderPrevBreakdown.total_consumption +
          Number(mecylinderBreakdown.total_consumption)
        ).toFixed(2),
        receipt: +(
          temp.mecylinderPrevBreakdown.receipt +
          Number(mecylinderBreakdown.receipt)
        ).toFixed(2),
        debunkering: +(
          temp.mecylinderPrevBreakdown.debunkering +
          Number(mecylinderBreakdown.debunkering)
        ).toFixed(2),
      };
    });
    const mesystemBreakdownSum = computed(() => {
      return {
        total_consumption: +(
          temp.mesystemPrevBreakdown.total_consumption +
          Number(mesystemBreakdown.total_consumption)
        ).toFixed(2),
        receipt: +(
          temp.mesystemPrevBreakdown.receipt + Number(mesystemBreakdown.receipt)
        ).toFixed(2),
        debunkering: +(
          temp.mesystemPrevBreakdown.debunkering +
          Number(mesystemBreakdown.debunkering)
        ).toFixed(2),
      };
    });
    const mesumpBreakdownSum = computed(() => {
      return {
        total_consumption: +(
          temp.mesumpPrevBreakdown.total_consumption +
          Number(mesumpBreakdown.total_consumption)
        ).toFixed(2),
        receipt: +(
          temp.mesumpPrevBreakdown.receipt + Number(mesumpBreakdown.receipt)
        ).toFixed(2),
        debunkering: +(
          temp.mesumpPrevBreakdown.debunkering +
          Number(mesumpBreakdown.debunkering)
        ).toFixed(2),
      };
    });
    const gesystemBreakdownSum = computed(() => {
      return {
        total_consumption: +(
          temp.gesystemPrevBreakdown.total_consumption +
          Number(gesystemBreakdown.total_consumption)
        ).toFixed(2),
        receipt: +(
          temp.gesystemPrevBreakdown.receipt + Number(gesystemBreakdown.receipt)
        ).toFixed(2),
        debunkering: +(
          temp.gesystemPrevBreakdown.debunkering +
          Number(gesystemBreakdown.debunkering)
        ).toFixed(2),
      };
    });
    const mecylinderRobSum = mecylinderRob;
    const mesystemRobSum = mesystemRob;
    const mesumpRobSum = mesumpRob;
    const gesystemRobSum = gesystemRob;

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
      // Overview
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
      freshwaterReceiving,
      freshwaterDischarging,
      freshwaterChange,
      freshwaterRob,
      // Consumption And Condition (Total)
      lsfoTotalConsumptionSum,
      lsfoRobSum,
      mgoTotalConsumptionSum,
      mgoRobSum,
      lsfoBreakdownSum,
      mgoBreakdownSum,
      mecylinderBreakdownSum,
      mesystemBreakdownSum,
      mesumpBreakdownSum,
      gesystemBreakdownSum,
      mecylinderRobSum,
      mesystemRobSum,
      mesumpRobSum,
      gesystemRobSum,
      freshwaterConsumedSum,
      freshwaterGeneratedSum,
      freshwaterReceivingSum,
      freshwaterDischargingSum,
      freshwaterChangeSum,
      freshwaterRobSum,
    };
  }
);
