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
        @click="saveChanges()"
      >
        <template v-slot:content>{{ $t("saveChanges") }}</template>
      </CustomButton> -->
      <GradientButton
        class="p-3 text-14"
        type="button"
        @click="sendReport()"
        :is-disabled="isSubmissionRequested"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-if="isSubmissionRequested" v-slot:content>
          <div>Loading...</div>
        </template>
        <template v-else v-slot:content>
          <div>{{ $t("sendReport") }}</div>
        </template>
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
import { Report, ConsumptionType } from "@/constants";
import {
  parsePositionToString,
  generateFuelOilData,
  generateLubricatingOilData,
} from "@/utils/helpers";
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
  fuelOils,
  lubricatingOils,
  // status var
  reportSubtypeIsPort, // HarbourPortReportOverview.vue
  reportSubtypeIsNoon, // HarbourPortReport.vue
  // Harbour Port Overview
  reportNo,
  legUuid,
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
  // Consumption And Condition
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
  isSubmissionResponse,
  isSubmissionSuccessful,
  errorMessage,
} = storeToRefs(submissionStatusStore);

const includesOperation = (op) => operations.value.includes(op);

const sendReport = async () => {
  isSubmissionRequested.value = true;

  const position = parsePositionToString({
    latDir: latDir.value,
    latMinutes: latMinutes.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinutes.value,
    longDegree: longDegree.value,
  });

  const fuelOilData = generateFuelOilData(
    fuelOils.value,
    fuelOilBreakdowns.value,
    fuelOilTotalConsumptions.value,
    fuelOilRobs.value,
    fuelOilDataCorrection.value,
    fuelOilReceipts.value,
    fuelOilDebunkerings.value
  );

  const lubricatingOilData = generateLubricatingOilData(
    lubricatingOils.value,
    lubricatingOilBreakdowns.value,
    lubricatingOilRobs.value,
    lubricatingOilDataCorrection.value
  );

  const REPORT = {
    report_type: getEventReportSubtype(
      reportSubtypeIsPort.value,
      reportSubtypeIsNoon.value
    ),
    voyage: voyageNo.value,
    voyage_leg: {
      uuid: legUuid.value,
    },
    report_num: reportNo.value.value, // temp fix for recursive structure error
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    eventdata: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: position,
      distance_travelled: Number(distanceTravelled.value) || 0,
      parking_status: status.value,
    },
    plannedoperations: {
      waiting: includesOperation("waiting"),
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
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: Number(freshwaterConsumed.value) || 0,
        generated: Number(freshwaterGenerated.value) || 0,
        received: Number(freshwaterReceiving.value) || 0,
        discharged: Number(freshwaterDischarging.value) || 0,
        rob: Number(freshwaterRob.value) || 0,
      },
      consumption_type: ConsumptionType.LAST_TO_EVENT,
    },
  };

  // console.log("data: ", REPORT);

  isSubmissionModalVisible.value = true;
  const response = await fetch(
    `${process.env.VUE_APP_URL_DOMAIN}/marinanet/reports/`,
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
    // console.log(response);
    // console.log(data);

    if (response.ok) {
      isSubmissionSuccessful.value = true;
      store.$reset();
    } else {
      errorMessage.value = data;
    }
  } catch (error) {
    console.log(error);
    errorMessage.value = {
      unexpectedError: ["Please contact the administrator."],
    };
  }
  isSubmissionResponse.value = true;
};
</script>
