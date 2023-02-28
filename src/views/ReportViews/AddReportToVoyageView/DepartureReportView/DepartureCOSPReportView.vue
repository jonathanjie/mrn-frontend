<template>
  <div class="flex flex-col space-y-6 mt-6">
    <!-- Overview -->
    <DepartureCOSPOverview />

    <!-- Departure and Destination TODO: may need to disable some fields -->
    <DepartureAndDestinationCOSP />

    <!-- Pilot Station - Departure -->
    <DepartureCOSPPilotStation />

    <!-- Pilot Station - Arrival -->
    <DeparturePilotStationArrival />

    <!-- Distance & Time (R/UP Engine) & S/BY to R/UP (In Harbour)-->
    <DepartureDistanceAndTime />

    <!-- Sailing Plan (Pilot to Pilot) -->
    <DepartureSailingPlan />

    <!-- Consumption & Condition (S/BY to R/UP) -->
    <DepartureCOSPConsumption />

    <!-- Additional Remarks -->
    <DepartureCOSPAddRemarks />
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

      <template v-if="isSubmissionRequested" v-slot:content>
        <div>Loading...</div>
      </template>
      <template v-else v-slot:content>
        <div>{{ $t("sendReport") }}</div>
      </template>
    </GradientButton>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import DepartureAndDestinationCOSP from "@/components/Reports/DepartureReport/DepartureAndDestinationCOSP.vue";
import DepartureCOSPConsumption from "@/components/Reports/DepartureReport/DepartureCOSPConsumption.vue";
import DeparturePilotStationArrival from "@/components/Reports/DepartureReport/DeparturePilotStationArrival.vue";
import DepartureCOSPPilotStation from "@/components/Reports/DepartureReport/DepartureCOSPPilotStation.vue";
import DepartureDistanceAndTime from "@/components/Reports/DepartureReport/DepartureDistanceAndTime.vue";
import DepartureSailingPlan from "@/components/Reports/DepartureReport/DepartureSailingPlan.vue";
import DepartureCOSPOverview from "@/components/Reports/DepartureReport/DepartureCOSPOverview.vue";
import DepartureCOSPAddRemarks from "@/components/Reports/DepartureReport/DepartureCOSPAddRemarks.vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import { Report, ConsumptionType } from "@/constants";
import {
  parsePositionToString,
  parsePortLocode,
  generateFuelOilData,
  generateLubricatingOilData,
} from "@/utils/helpers.js";

const store = useDepartureCOSPReportStore();
const {
  fuelOils,
  lubricatingOils,
  // Overview
  legUuid,
  reportNo,
  voyageNo,
  reportingDateTimeUTC,
  reportingTimeZone,
  // Departure and Destination
  departurePortCountry,
  departurePortName,
  departureTimeZone,
  departureDateTimeUTC,
  destinationPortCountry,
  destinationPortName,
  destinationTimeZone,
  destinationEstimatedArrivalUTC,
  // Pilot station - Departure
  pilotDepName,
  pilotDepDateTimeUTC,
  pilotDepLatDir,
  pilotDepLatDegree,
  pilotDepLatMinute,
  pilotDepLongDir,
  pilotDepLongDegree,
  pilotDepLongMinute,
  shouldPilotDepDataBeSent,
  // Pilot Station - Arrival
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
  shouldPilotArrDataBeSent,
  // R/UP Engine / Distance & Time
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
  distanceObsTotal,
  distanceEngTotal,
  // distanceToGo,
  // hoursSinceLast,
  hoursTotal,
  // Sailing Plan (Pilot to Pilot)
  budgetDistance,
  budgetSpeed,
  meDaily,
  meRPM,
  // Consumption and Condition
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
  // additional Remarks
  additionalRemarks,
} = storeToRefs(store);

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
  isSubmissionResponse,
  isSubmissionSuccessful,
  errorMessage,
} = storeToRefs(submissionStatusStore);

const sendReport = async () => {
  isSubmissionRequested.value = true;

  const pilotDepPosition = parsePositionToString({
    latDir: pilotDepLatDir.value,
    latMinutes: pilotDepLatMinute.value,
    latDegree: pilotDepLatDegree.value,
    longDir: pilotDepLongDir.value,
    longMinutes: pilotDepLongMinute.value,
    longDegree: pilotDepLongDegree.value,
  });
  const pilotArrPosition = parsePositionToString({
    latDir: pilotArrLatDir.value,
    latMinutes: pilotArrLatMinute.value,
    latDegree: pilotArrLatDegree.value,
    longDir: pilotArrLongDir.value,
    longMinutes: pilotArrLongMinute.value,
    longDegree: pilotArrLongDegree.value,
  });
  const departureRupPosition = parsePositionToString({
    latDir: rupEngLatDir.value,
    latMinutes: rupEngLatMinute.value,
    latDegree: rupEngLatDegree.value,
    longDir: rupEngLongDir.value,
    longMinutes: rupEngLongMinute.value,
    longDegree: rupEngLongDegree.value,
  });

  const departurePort = parsePortLocode({
    portCountry: departurePortCountry.value,
    portName: departurePortName.value,
  });

  const destinationPort = parsePortLocode({
    portCountry: destinationPortCountry.value,
    portName: destinationPortName.value,
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

  const REPORT = {
    report_type: Report.type.DEP_COSP_RUP,
    voyage: voyageNo.value,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    voyage_leg: {
      uuid: legUuid.value,
    },
    reportroute: {
      departure_port: departurePort,
      departure_date: departureDateTimeUTC.value,
      departure_tz: departureTimeZone.value,
      arrival_port: destinationPort,
      arrival_date: destinationEstimatedArrivalUTC.value,
      arrival_tz: destinationTimeZone.value,
    },
    departurepilotstation: shouldPilotDepDataBeSent.value
      ? {
          name: pilotDepName.value,
          date: pilotDepDateTimeUTC.value || null,
          position: pilotDepPosition,
        }
      : null,
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
    departurerunup: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: departureRupPosition,
    },
    distancetimedata: {
      revolution_count: Number(sbyToRupRevolutionCount.value),
      set_rpm: Number(sbyToRupSetRPM.value),
      distance_observed_since_last: Number(sbyToRupDistanceObs.value),
      distance_observed_total: Number(distanceObsTotal.value),
      distance_engine_since_last: Number(sbyToRupDistanceEng.value),
      distance_engine_total: Number(distanceEngTotal.value),
      distance_to_go: Number(budgetDistance.value),
      hours_total: Number(hoursTotal.value),
      hours_since_last: Number(sbyToRupTime.value),
      remarks_for_changes: "NIL",
    },
    sailingplan: {
      distance_to_go: Number(budgetDistance.value),
      speed: Number(budgetSpeed.value),
      me_daily_fo_consumption: Number(meDaily.value),
      me_rpm: Number(meRPM.value),
    },
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: Number(freshwaterConsumed.value) || 0,
        generated: Number(freshwaterGenerated.value) || 0,
        received: 0, // Does not apply for Departure COSP reports
        discharged: 0, // Does not apply for Departure COSP reports
        rob: Number(freshwaterRob.value) || 0,
      },
      consumption_type: ConsumptionType.SBY_TO_RUP,
    },
    additionalremarks:
      additionalRemarks.value === ""
        ? null
        : { remarks: additionalRemarks.value },
  };

  // console.log("data: ", REPORT);

  isSubmissionModalVisible.value = true;
  axios
    .post(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/reports/`, REPORT)
    .then(() => {
      isSubmissionSuccessful.value = true;
      store.$reset();
    })
    .catch((error) => {
      if (error.response.status == 400) {
        errorMessage.value = error.response.data;
      } else {
        errorMessage.value = {
          unexpectedError: ["Please contact the administrator."],
        };
      }
    })
    .finally(() => {
      isSubmissionResponse.value = true;
    });
};
</script>
