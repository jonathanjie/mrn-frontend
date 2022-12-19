import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

const temp = {
  // Overview
  reportNo: "2",
  legNo: "2",
  voyageNo: "2",

  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,

  // Consumption & Condition (Sum)
  lsfoPrevROBSum: 400,
  mgoPrevROBSum: 400,
  mecylPrevROBSum: 400,
  mesysPrevROBSum: 400,
  mesumpPrevROBSum: 400,
  gesysPrevROBSum: 400,
  freshwaterPrevROBSum: 400,
};

export const useDepartureSBYReportStore = defineStore(
  "departureReportSBY",
  () => {
    // Overview
    const reportNo = ref(temp.reportNo);
    const legNo = ref(temp.legNo);
    const voyageNo = ref(temp.voyageNo);
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

    // Cargo Operation
    const loadCondition = ref("default");
    const loading = ref("");
    const unloading = ref("");
    const totalAmount = ref("");
    const time = ref("");

    // Vessel Condition at Departure
    const draftFwd = ref("");
    const draftMid = ref("");
    const draftAft = ref("");
    const constant = ref("");
    const gm = ref("");
    const ballast = ref("");
    const displacement = ref("");

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
    const freshwaterEvaporated = ref("");
    const freshwaterReceiving = ref("");
    const freshwaterDischarging = ref("");
    const freshwaterChange = computed(
      () => +(freshwaterEvaporated.value - freshwaterConsumed.value).toFixed(2)
    );
    const freshwaterRob = computed(
      () =>
        temp.freshwaterPrevROB +
        Number(freshwaterReceiving.value) -
        Number(freshwaterDischarging.value) +
        freshwaterChange.value
    );

    // Consumption and Condition (Sum)
    const lsfoBreakdownSum = reactive({
      me: "",
      ge: "",
      blr: "",
      igg: "",
      receipt: "",
      debunkering: "",
    });
    const mgoBreakdownSum = reactive({
      me: "",
      ge: "",
      blr: "",
      igg: "",
      receipt: "",
      debunkering: "",
    });
    const lsfoTotalConsumptionSum = computed(
      () =>
        +(
          Number(lsfoBreakdownSum.me) +
          Number(lsfoBreakdownSum.ge) +
          Number(lsfoBreakdownSum.blr) +
          Number(lsfoBreakdownSum.igg)
        )
    );
    const lsfoRobSum = computed(
      () =>
        temp.lsfoPrevROBSum -
        lsfoTotalConsumptionSum.value +
        Number(lsfoBreakdownSum.receipt) -
        Number(lsfoBreakdownSum.debunkering)
    );
    const mgoTotalConsumptionSum = computed(
      () =>
        +(
          Number(mgoBreakdownSum.me) +
          Number(mgoBreakdownSum.ge) +
          Number(mgoBreakdownSum.blr) +
          Number(mgoBreakdownSum.igg)
        ).toFixed(2)
    );
    const mgoRobSum = computed(
      () =>
        temp.mgoPrevROBSum -
        mgoTotalConsumptionSum.value +
        Number(mgoBreakdownSum.receipt) -
        Number(mgoBreakdownSum.debunkering)
    );
    const fuelOilDataCorrectionSum = reactive({
      type: "default",
      correction: "",
      remarks: "",
    });

    const mecylinderBreakdownSum = reactive({
      total_consumption: "",
      receipt: "",
      debunkering: "",
    });
    const mesystemBreakdownSum = reactive({
      total_consumption: "",
      receipt: "",
      debunkering: "",
    });
    const mesumpBreakdownSum = reactive({
      total_consumption: "",
      receipt: "",
      debunkering: "",
    });
    const gesystemBreakdownSum = reactive({
      total_consumption: "",
      receipt: "",
      debunkering: "",
    });
    const mecylinderRobSum = computed(
      () =>
        +(
          temp.mecylPrevROBSum -
          Number(mecylinderBreakdownSum.total_consumption) +
          Number(mecylinderBreakdownSum.receipt) -
          Number(mecylinderBreakdownSum.debunkering)
        ).toFixed(2)
    );
    const mesystemRobSum = computed(
      () =>
        +(
          temp.mesysPrevROBSum -
          Number(mesystemBreakdownSum.total_consumption) +
          Number(mesystemBreakdownSum.receipt) -
          Number(mesystemBreakdownSum.debunkering)
        ).toFixed(2)
    );
    const mesumpRobSum = computed(
      () =>
        +(
          temp.mesumpPrevROBSum -
          Number(mesumpBreakdownSum.total_consumption) +
          Number(mesumpBreakdownSum.receipt) -
          Number(mesumpBreakdownSum.debunkering)
        ).toFixed(2)
    );
    const gesystemRobSum = computed(
      () =>
        +(
          temp.gesysPrevROBSum -
          Number(gesystemBreakdownSum.total_consumption) +
          Number(gesystemBreakdownSum.receipt) -
          Number(gesystemBreakdownSum.debunkering)
        ).toFixed(2)
    );
    const lubricatingOilDataCorrectionSum = reactive({
      type: "default",
      correction: "",
      remarks: "",
    });

    const freshwaterConsumedSum = ref("");
    const freshwaterEvaporatedSum = ref("");
    const freshwaterReceivingSum = ref("");
    const freshwaterDischargingSum = ref("");
    const freshwaterChangeSum = computed(
      () =>
        +(freshwaterEvaporatedSum.value - freshwaterConsumedSum.value).toFixed(
          2
        )
    );
    const freshwaterRobSum = computed(
      () =>
        temp.freshwaterPrevROBSum +
        Number(freshwaterReceivingSum.value) -
        Number(freshwaterDischargingSum.value) +
        freshwaterChangeSum.value
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
      // Cargo Operation
      loadCondition,
      loading,
      unloading,
      totalAmount,
      time,
      // Vessel Condition at Departure
      draftFwd,
      draftMid,
      draftAft,
      constant,
      gm,
      ballast,
      displacement,
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
      freshwaterEvaporated,
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
      fuelOilDataCorrectionSum,
      mecylinderBreakdownSum,
      mesystemBreakdownSum,
      mesumpBreakdownSum,
      gesystemBreakdownSum,
      mecylinderRobSum,
      mesystemRobSum,
      mesumpRobSum,
      gesystemRobSum,
      lubricatingOilDataCorrectionSum,
      freshwaterConsumedSum,
      freshwaterEvaporatedSum,
      freshwaterReceivingSum,
      freshwaterDischargingSum,
      freshwaterChangeSum,
      freshwaterRobSum,
    };
  }
);
