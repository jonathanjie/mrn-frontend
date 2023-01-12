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
import DepartureAndDestinationCOSP from "@/components/Reports/DepartureReport/DepartureAndDestinationCOSP.vue";
import DepartureCOSPConsumption from "@/components/Reports/DepartureReport/DepartureCOSPConsumption.vue";
import DeparturePilotStationArrival from "@/components/Reports/DepartureReport/DeparturePilotStationArrival.vue";
import DepartureCOSPPilotStation from "@/components/Reports/DepartureReport/DepartureCOSPPilotStation.vue";
import DepartureDistanceAndTime from "@/components/Reports/DepartureReport/DepartureDistanceAndTime.vue";
import DepartureSailingPlan from "@/components/Reports/DepartureReport/DepartureSailingPlan.vue";
import DepartureCOSPOverview from "@/components/Reports/DepartureReport/DepartureCOSPOverview.vue";
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
import { UrlDomain } from "@/constants";

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
  distanceToGo,
  hoursSinceLast,
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
} = storeToRefs(store);

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
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
          draft_fwd: pilotArrDraftFwd.value,
          draft_mid: pilotArrDraftMid.value,
          draft_aft: pilotArrDraftAft.value,
        }
      : null,
    departurerunup: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: departureRupPosition,
    },
    distancetimedata: {
      revolution_count: sbyToRupRevolutionCount.value,
      set_rpm: sbyToRupSetRPM.value,
      distance_observed_since_last: sbyToRupDistanceObs.value,
      distance_observed_total: distanceObsTotal.value,
      distance_engine_since_last: sbyToRupDistanceEng.value,
      distance_engine_total: distanceEngTotal.value,
      distance_to_go: budgetDistance.value,
      hours_total: hoursTotal.value,
      hours_since_last: sbyToRupTime.value,
    },
    sailingplan: {
      distance_to_go: budgetDistance.value,
      speed: budgetSpeed.value,
      me_daily_fo_consumption: meDaily.value,
      me_rpm: meRPM.value,
    },
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: freshwaterConsumed.value || 0,
        generated: freshwaterGenerated.value || 0,
        received: 0, // Does not apply for Departure COSP reports
        discharged: 0, // Does not apply for Departure COSP reports
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.SBY_TO_RUP,
    },
  };

  console.log("data: ", REPORT);

  const response = await fetch(`${UrlDomain.DEV}/marinanet/reports/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
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
  }
};
</script>
