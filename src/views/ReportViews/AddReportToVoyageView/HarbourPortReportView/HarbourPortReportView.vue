<template>
  <div class="flex flex-col space-y-6 my-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RadioBtnDetail
        :icon="require('@/assets/icons/in_port.svg')"
        :content="$t('inPortBerthingShiftingDryDocking')"
        type="true"
        :active="reportSubtypeIsPort + ''"
        @onUpdateBtn="updateActiveReportType"
      >
      </RadioBtnDetail>
      <RadioBtnDetail
        :icon="require('@/assets/icons/coastal_water.svg')"
        :content="$t('coastalWaterAnchoringDrifting')"
        type="false"
        :active="reportSubtypeIsPort + ''"
        @onUpdateBtn="updateActiveReportType"
      >
      </RadioBtnDetail>
    </div>

    <!-- Overview -->
    <HarbourPortOverview />

    <!-- Report -->
    <HarbourPortReport />

    <!-- Consumption & Condition -->
    <HarbourPortConsumption>{{
      $t("consumptionAndConditionLastReportToEventNoon")
    }}</HarbourPortConsumption>

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4 my-6">
      <!-- <CustomButton
        class="p-3 text-14"
        type="button"
        v-on:click="saveChanges()"
      >
        <template v-slot:content>{{ $t("saveChanges") }}</template>
      </CustomButton> -->
      <GradientButton
        class="p-3 text-14"
        type="button"
        v-on:click="sendReport()"
        :disabled="isSubmissionRequested"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-slot:content>{{ $t("sendReport") }}</template>
      </GradientButton>
    </div>
  </div>
</template>

<script setup>
import HarbourPortOverview from "@/components/Reports/HarbourPortReport/HarbourPortOverview.vue";
import HarbourPortReport from "@/components/Reports/HarbourPortReport/HarbourPortReport.vue";
import HarbourPortConsumption from "@/components/Reports/HarbourPortReport/HarbourPortConsumption.vue";
import RadioBtnDetail from "@/components/Buttons/RadioBtnDetail.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
import { useHarbourPortReportStore } from "@/stores/useHarbourPortReportStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import { storeToRefs } from "pinia";
import { Report, ConsumptionType, FuelOil, LubricatingOil } from "@/constants";
import { parsePositionToString } from "@/utils/helpers";
import { OPERATIONS } from "@/utils/options";

// TODO: hacky due to the behavior of the custom component RadioBtnDetail, will update later
const updateActiveReportType = (type) => {
  if (type === "false") {
    reportSubtypeIsPort.value = false;
  } else {
    reportSubtypeIsPort.value = true;
  }
};

const store = useHarbourPortReportStore();
const {
  // status var
  reportSubtypeIsPort, // HarbourPortReportOverview.vue
  reportSubtypeIsNoon, // HarbourPortReport.vue
  // Harbour Port Overview
  reportNo,
  legNo,
  voyageNo,
  reportingTimeZone,
  reportingDateTimeUTC,
  // Harbour Port Report
  status,
  distanceTravelled,
  latDir,
  latMinutes,
  latDegree,
  longDir,
  longMinutes,
  longDegree,
  otherPlannedOperation,
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
  freshwaterGenerated,
  freshwaterReceiving,
  freshwaterDischarging,
  freshwaterRob,
} = storeToRefs(store);

const getEventReportSubtype = (isPort, isNoon) => {
  if (isPort && isNoon) {
    return Report.type.NOON_PORT;
  } else if (isPort && !isNoon) {
    return Report.type.EVENT_PORT;
  } else if (!isPort && isNoon) {
    return Report.type.NOON_HARBOUR;
  } else if (!isPort && !isNoon) {
    return Report.type.EVENT_HARBOUR;
  } else {
    return ""; // Should not reach here
  }
};

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
  isSubmissionSuccessful,
  errorMessage,
} = storeToRefs(submissionStatusStore);

const includesOperation = (op) => operations.value.includes(op);

const sendReport = async () => {
  isSubmissionRequested.value = true;

  // TODO: need to do form validation first
  const position = parsePositionToString({
    latDir: latDir.value,
    latMinutes: latMinutes.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinutes.value,
    longDegree: longDegree.value,
  });

  const REPORT = {
    report_type: getEventReportSubtype(
      reportSubtypeIsPort.value,
      reportSubtypeIsNoon.value
    ),
    voyage: voyageNo.value,
    voyage_leg: legNo.value,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    eventdata: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: position,
      distance_travelled: distanceTravelled.value,
      parking_status: status.value,
    },
    plannedoperations: {
      cargo_operation_berth: includesOperation(OPERATIONS.cargoOperationBerth),
      cargo_operation_stsstb: includesOperation(
        OPERATIONS.cargoOperationSTSSTB
      ),
      bunkering_debunkering: includesOperation(OPERATIONS.bunkeringDebunkering),
      dry_docking: includesOperation(OPERATIONS.dryDocking),
      crew_change: includesOperation(OPERATIONS.crewChange),
      receiving_provisions_spares: includesOperation(
        OPERATIONS.receivingProvisionSpareParts
      ),
      surveying: includesOperation(OPERATIONS.survey),
      others: includesOperation("others"),
      planned_operation_othersdetails: otherPlannedOperation.value || "NIL",
    },
    consumptionconditiondata: {
      fueloildata_set: [
        {
          fuel_oil_type: FuelOil.LSFO,
          total_consumption: lsfoTotalConsumption.value || 0,
          receipt: lsfoBreakdown.value.receipt || 0,
          debunkering: lsfoBreakdown.value.debunkering || 0,
          rob: lsfoRob.value || 0,
          breakdown: {
            GE: lsfoBreakdown.value.ge || 0,
            ME: lsfoBreakdown.value.me || 0,
            BLR: lsfoBreakdown.value.blr || 0,
            IGG: lsfoBreakdown.value.igg || 0,
          },
          fueloildatacorrection:
            fuelOilDataCorrection.value.type === FuelOil.LSFO
              ? {
                  correction: fuelOilDataCorrection.value.correction,
                  remarks: fuelOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: FuelOil.MGO,
          total_consumption: mgoTotalConsumption.value || 0,
          receipt: mgoBreakdown.value.receipt || 0,
          debunkering: mgoBreakdown.value.debunkering || 0,
          rob: mgoRob.value || 0,
          breakdown: {
            GE: mgoBreakdown.value.ge || 0,
            ME: mgoBreakdown.value.me || 0,
            BLR: mgoBreakdown.value.blr || 0,
            IGG: mgoBreakdown.value.igg || 0,
          },
          fueloildatacorrection:
            fuelOilDataCorrection.value.type === FuelOil.MGO
              ? {
                  correction: fuelOilDataCorrection.value.correction,
                  remarks: fuelOilDataCorrection.value.remarks,
                }
              : null,
        },
      ],
      lubricatingoildata_set: [
        {
          fuel_oil_type: LubricatingOil.ME_CYLINDER,
          total_consumption: mecylinderBreakdown.value.total_consumption || 0,
          receipt: mecylinderBreakdown.value.receipt || 0,
          debunkering: mecylinderBreakdown.value.debunkering || 0,
          rob: mecylinderRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type ===
            LubricatingOil.ME_CYLINDER
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.ME_SYSTEM,
          total_consumption: mesystemBreakdown.value.total_consumption || 0,
          receipt: mesystemBreakdown.value.receipt || 0,
          debunkering: mesystemBreakdown.value.debunkering || 0,
          rob: mesystemRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === LubricatingOil.ME_SYSTEM
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.ME_SUMP,
          total_consumption: mesumpBreakdown.value.total_consumption || 0,
          receipt: mesumpBreakdown.value.receipt || 0,
          debunkering: mesumpBreakdown.value.debunkering || 0,
          rob: mesumpRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === LubricatingOil.ME_SUMP
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.GE_SYSTEM,
          total_consumption: gesystemBreakdown.value.total_consumption || 0,
          receipt: gesystemBreakdown.value.receipt || 0,
          debunkering: gesystemBreakdown.value.debunkering || 0,
          rob: gesystemRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === LubricatingOil.GE_SYSTEM
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
      ],
      freshwaterdata: {
        consumed: freshwaterConsumed.value || 0,
        generated: freshwaterGenerated.value || 0,
        received: freshwaterReceiving.value || 0,
        discharged: freshwaterDischarging.value || 0,
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.LAST_TO_EVENT,
    },
  };

  console.log("data: ", REPORT);

  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/reports/",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(REPORT),
    }
  );

  try {
    const data = await response.json();
    console.log(response);
    console.log(data);

    if (response.ok) {
      isSubmissionSuccessful.value = true;
      store.$reset();
    } else {
      errorMessage.value = data;
    }
    isSubmissionModalVisible.value = true;
  } catch (error) {
    console.log(error);
  }
};
</script>
