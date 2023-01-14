<template>
  <div class="flex flex-col space-y-6 mt-6">
    <!-- Overview -->
    <ArrivalFWEOverview />

    <!-- Finish With Engine -->
    <ArrivalFinishWithEngine />

    <!-- Pilot Station - Arrival -->
    <ArrivalFWEPilotStation />

    <!-- Distance & Time (S/BY to F.W.E) -->
    <ArrivalFWEDistanceAndTime />

    <!-- Consumption & Condition (S/BY - F.W.E) -->
    <ArrivalFWEConsumption />

    <!-- ArrivalFWESummary: Actual Performance (Port to Port) & Total Consumption (Pilot to Pilot) -->
    <ArrivalFWESummary />
  </div>

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
      <template v-slot:content>{{ $t("sendReport") }}</template>
    </GradientButton>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import ArrivalFWEDistanceAndTime from "@/components/Reports/ArrivalReport/ArrivalFWEDistanceAndTime.vue";
import ArrivalFWEPilotStation from "@/components/Reports/ArrivalReport/ArrivalFWEPilotStation.vue";
import ArrivalFWEConsumption from "@/components/Reports/ArrivalReport/ArrivalFWEConsumption.vue";
import ArrivalFinishWithEngine from "@/components/Reports/ArrivalReport/ArrivalFinishWithEngine.vue";
import ArrivalFWESummary from "@/components/Reports/ArrivalReport/ArrivalFWESummary.vue";
import ArrivalFWEOverview from "@/components/Reports/ArrivalReport/ArrivalFWEOverview.vue";
import { storeToRefs } from "pinia";
import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import {
  Report,
  ConsumptionType,
  TotalConsumptionType,
  ActualPerformanceType,
} from "@/constants";
import {
  parsePositionToString,
  generateFuelOilData,
  generateLubricatingOilData,
  parsePortLocode,
} from "@/utils/helpers.js";
import { OPERATIONS } from "@/utils/options";
import { UrlDomain } from "@/constants";

const store = useArrivalFWEReportStore();
const {
  departurePortCountry,
  departurePortName,
  departureDateTime,
  departureTimeZone,
  arrivalPortCountry,
  arrivalPortName,
  // Overview
  reportNo,
  legUuid,
  voyageNo,
  reportingTimeZone,
  reportingDateTimeUTC,
  // Finish With Engine
  latDir,
  latMinute,
  latDegree,
  longDir,
  longMinute,
  longDegree,
  otherPlannedOperation,
  operations,
  status,
  // Pilot Station -- Arrival
  shouldPilotArrDataBeSent,
  pilotArrName,
  pilotArrDateTimeUTC,
  pilotArrDraftFwd,
  pilotArrDraftMid,
  pilotArrDraftAft,
  pilotArrLatDir,
  pilotArrLatDegree,
  pilotArrLatMinute,
  pilotArrLongDir,
  pilotArrLongDegree,
  pilotArrLongMinute,
  // Distance & Time (S/BY to F.W.E)
  hours,
  distanceObs,
  distanceEng,
  revolutionCount,
  distanceObsTotal,
  distanceEngTotal,
  hoursTotal,
  // Consumption and Condition
  fuelOils,
  lubricatingOils,
  fuelOilRobs,
  fuelOilBreakdowns,
  fuelOilTotalConsumptions,
  fuelOilDataCorrection,
  lubricatingOilBreakdowns,
  lubricatingOilRobs,
  lubricatingOilDataCorrection,
  freshwaterConsumed,
  freshwaterGenerated,
  freshwaterRob,
  // Actual performance
  totalDistanceObs,
  totalSailingTime,
  fuelOilBreakdownsSum,
  fuelOilTotalConsumptionsSum,
} = storeToRefs(store);

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

  const pilotArrPosition = parsePositionToString({
    latDir: pilotArrLatDir.value,
    latMinutes: pilotArrLatMinute.value,
    latDegree: pilotArrLatDegree.value,
    longDir: pilotArrLongDir.value,
    longMinutes: pilotArrLongMinute.value,
    longDegree: pilotArrLongDegree.value,
  });
  const arrivalFwePosition = parsePositionToString({
    latDir: latDir.value,
    latMinutes: latMinute.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinute.value,
    longDegree: longDegree.value,
  });

  const departurePort = parsePortLocode({
    portCountry: departurePortCountry.value,
    portName: departurePortName.value,
  });

  const arrivalPort = parsePortLocode({
    portCountry: arrivalPortCountry.value,
    portName: arrivalPortName.value,
  });

  const fuelOilData = generateFuelOilData(
    fuelOils.value,
    fuelOilBreakdowns.value,
    fuelOilTotalConsumptions.value,
    fuelOilRobs.value,
    fuelOilDataCorrection.value
  );

  const lubricatingOilData = generateLubricatingOilData(
    lubricatingOils.value,
    lubricatingOilBreakdowns.value,
    lubricatingOilRobs.value,
    lubricatingOilDataCorrection.value
  );

  const fuelOilDataSum = generateFuelOilData(
    fuelOils.value,
    fuelOilBreakdownsSum.value,
    fuelOilTotalConsumptionsSum.value
  );

  const REPORT = {
    report_type: Report.type.ARR_FWE,
    voyage: voyageNo.value,
    voyage_leg: {
      uuid: legUuid.value,
    },
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    reportroute: {
      departure_port: departurePort,
      departure_date: departureDateTime.value,
      departure_tz: departureTimeZone.value,
      arrival_port: arrivalPort,
      arrival_date: reportingDateTimeUTC.value,
      arrival_tz: reportingTimeZone.value,
    },
    arrivalfwetimeandposition: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: arrivalFwePosition,
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
    arrivalpilotstation: shouldPilotArrDataBeSent.value
      ? {
          name: pilotArrName.value,
          date: pilotArrDateTimeUTC.value,
          position: pilotArrPosition,
          draft_fwd: Number(pilotArrDraftFwd.value),
          draft_mid: Number(pilotArrDraftMid.value),
          draft_aft: Number(pilotArrDraftAft.value),
        }
      : null,
    distancetimedata: {
      revolution_count: Number(revolutionCount.value),
      set_rpm: 0, // irrelevant for Arrival FWE report
      distance_observed_since_last: Number(distanceObs.value),
      distance_observed_total: Number(distanceObsTotal.value),
      distance_engine_since_last: Number(distanceEng.value),
      distance_engine_total: Number(distanceEngTotal.value),
      distance_to_go: 0,
      hours_total: Number(hoursTotal.value),
      hours_since_last: Number(hours.value),
      remarks_for_changes: "NIL",
    },
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: Number(freshwaterConsumed.value) || 0,
        generated: Number(freshwaterGenerated.value) || 0,
        received: 0, // Does not apply for Arrival FWE reports
        discharged: 0, // Does not apply for Arrival FWE reports
        rob: Number(freshwaterRob.value) || 0,
      },
      consumption_type: ConsumptionType.SBY_TO_FWE,
    },
    actualperformancedata: {
      actual_performance_type: ActualPerformanceType.PORT_TO_PORT,
      distance_obs_total: Number(totalDistanceObs.value),
      sailing_time: Number(totalSailingTime.value),
      displacement: 0, // Does not apply for Arrival FWE reports
      speed_average: 0, // Does not apply for Arrival FWE reports
      rpm_average: 0, // Does not apply for Arrival FWE reports
      me_average_daily_fo_consumption: 0, // Does not apply for Arrival FWE reports
    },
    totalconsumptiondata: {
      fueloiltotalconsumptiondata_set: fuelOilDataSum,
      freshwatertotalconsumptiondata: null,
      consumption_type: TotalConsumptionType.PORT_TO_PORT,
    },
  };

  console.log("data: ", REPORT);

  const response = await fetch(`${UrlDomain.DEV}/marinanet/reports/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: JSON.stringify(REPORT),
  });

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
    errorMessage.value = {
      unexpectedError: ["Please contact the administrator."],
    };
    isSubmissionModalVisible.value = true;
  }
};
</script>
