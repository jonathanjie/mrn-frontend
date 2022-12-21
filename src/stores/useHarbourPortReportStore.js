import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useVoyageStore } from "./useVoyageStore";

// TODO: fetch from database
const temp = {
  // Finish With Engine
  plannedOperations: [
    "waiting",
    "crewChange",
    "cargoOpBerth",
    "bunkeringDebunkering",
    "receivingProvisionSpareParts",
  ], // fetch from arrival eosp/sby

  // Overview
  departurePortCountry: "Country A",
  departurePortName: "Port A",
  destinationPortCountry: "Country A",
  destinationPortName: "Port A",

  // Consumption & Condition
  lsfoPrevROB: 200,
  mgoPrevROB: 200,
  mecylPrevROB: 200,
  mesysPrevROB: 200,
  mesumpPrevROB: 200,
  gesysPrevROB: 200,
  freshwaterPrevROB: 200,
};

export const useHarbourPortReportStore = defineStore(
  "harbourPortReport",
  () => {
    const store = useVoyageStore();

    // status var
    const reportType = ref("");

    // Harbour Port Overview
    const reportNo = ref(store.reportNo);
    const curLegNo = ref(store.curLegNo);
    const curLoadingCondition = ref(store.curLoadingCondition);
    const voyageNo = ref(store.voyageNo);
    const reportingDateTime = ref("");
    const reportingTimeZone = ref("default");
    const departurePortCountry = ref(temp.departurePortCountry);
    const departurePortName = ref(temp.departurePortName);
    const destinationPortCountry = ref(temp.destinationPortCountry);
    const destinationPortName = ref(temp.destinationPortName);

    // Harbour Port Report
    const type = ref("");
    const status = ref("default");
    const distanceTravelled = ref("");
    const latDir = ref("default");
    const latMinutes = ref("");
    const latDegree = ref("");
    const longDir = ref("default");
    const longMinutes = ref("");
    const longDegree = ref("");
    const plannedOperations = ref(temp.plannedOperations);
    const operations = ref([]);

    // Consumption And Condition Full
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

    return {
      // status var
      reportType,
      // Harbour Port Overview
      reportNo,
      curLegNo,
      curLoadingCondition,
      voyageNo,
      reportingDateTime,
      reportingTimeZone,
      departurePortCountry,
      departurePortName,
      destinationPortCountry,
      destinationPortName,
      // Harbour Port Report
      type,
      status,
      distanceTravelled,
      latDir,
      latMinutes,
      latDegree,
      longDir,
      longMinutes,
      longDegree,
      plannedOperations,
      operations,
      // Consumption And Condition (Full)
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
    };
  }
);
