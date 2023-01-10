<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- Overview -->
    <ArrivalEOSPOverview />

    <!-- Departure and Arrival -->
    <ArrivalAndDeparture />

    <!-- S/BY for Arrival -->
    <ArrivalDetails />

    <!-- Weather (Noon to S/BY) -->
    <ArrivalWeather />

    <!-- Distance & Time (Noon to S/BY) -->
    <ArrivalEOSPDistanceAndTime />

    <!-- Performance -->
    <ArrivalPerformance />

    <!-- Pilot Station - Arrival -->
    <ArrivalEOSPPilotStation />

    <!-- Consumption & Condition (Noon - S/BY) -->
    <ArrivalEOSPConsumption />

    <!-- Actual Performance at Sea / Total Consumption (Pilot to Pilot) -->
    <ArrivalEOSPSummary />
  </div>

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
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import ArrivalAndDeparture from "@/components/Reports/ArrivalReport/ArrivalAndDeparture.vue";
import ArrivalDetails from "@/components/Reports/ArrivalReport/ArrivalDetails.vue";
import ArrivalWeather from "@/components/Reports/ArrivalReport/ArrivalWeather.vue";
import ArrivalEOSPDistanceAndTime from "@/components/Reports/ArrivalReport/ArrivalEOSPDistanceAndTime.vue";
import ArrivalPerformance from "@/components/Reports/ArrivalReport/ArrivalPerformance.vue";
import ArrivalEOSPPilotStation from "@/components/Reports/ArrivalReport/ArrivalEOSPPilotStation.vue";
import ArrivalEOSPConsumption from "@/components/Reports/ArrivalReport/ArrivalEOSPConsumption.vue";
import ArrivalEOSPSummary from "@/components/Reports/ArrivalReport/ArrivalEOSPSummary.vue";
import ArrivalEOSPOverview from "@/components/Reports/ArrivalReport/ArrivalEOSPOverview.vue";
import { storeToRefs } from "pinia";
import { useArrivalEOSPReportStore } from "@/stores/useArrivalEOSPReportStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import {
  Report,
  ConsumptionType,
  TotalConsumptionType,
  ActualPerformanceType,
} from "@/constants";
import {
  parsePositionToString,
  parsePortLocode,
  generateFuelOilData,
  generateLubricatingOilData,
} from "@/utils/helpers.js";
import { OPERATIONS } from "@/utils/options";
import { UrlDomain } from "@/constants";

const store = useArrivalEOSPReportStore();
const {
  // Overview
  reportNo,
  legUuid,
  voyageNo,
  reportingDateTimeUTC,
  reportingTimeZone,
  // Departure and Arrival
  departurePortCountry,
  departurePortName,
  departureTimeZone,
  departureDateTimeUTC,
  arrivalPortCountry,
  arrivalPortName,
  plannedOperations,
  isOtherPlannedOperationEnabled,
  otherPlannedOperation,
  // S/BY for Arrival
  latDir,
  latMinute,
  latDegree,
  longDir,
  longMinute,
  longDegree,
  // Weather
  weather,
  visibility,
  windDirection,
  windSpeed,
  seaDirection,
  seaState,
  swellDirection,
  swellScale,
  airTemperatureDry,
  airTemperatureWet,
  airPressure,
  seaTemperature,
  iceCondition,
  // Distance & Time
  hoursSinceNoon,
  hoursTotal,
  distanceToGo,
  distanceToGoEdited,
  remarksForChanges,
  distanceObsSinceNoon,
  distanceObsTotal,
  distanceEngSinceNoon,
  distanceEngTotal,
  revolutionCount,
  // Performance
  speedSinceNoon,
  rpmSinceNoon,
  slipSinceNoon,
  speedAvg,
  rpmAvg,
  slipAvg,
  // Pilot Station -- Arrival
  shouldPilotArrDataBeSent,
  pilotArrName,
  pilotArrDateTimeUTC,
  pilotArrDraftAft,
  pilotArrDraftMid,
  pilotArrDraftFwd,
  pilotArrLatDir,
  pilotArrLatDegree,
  pilotArrLatMinute,
  pilotArrLongDir,
  pilotArrLongDegree,
  pilotArrLongMinute,
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
  displacement,
  avgSpeed,
  avgRpm,
  meFoConsumption,
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

const includesOperation = (op) => plannedOperations.value.includes(op);

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
  const arrivalSbyPosition = parsePositionToString({
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
    report_type: Report.type.ARR_SBY_EOSP,
    voyage: voyageNo.value,
    voyage_leg: {
      uuid: legUuid.value,
    },
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    reportroute: {
      departure_port: departurePort,
      departure_date: departureDateTimeUTC.value,
      departure_tz: departureTimeZone.value,
      arrival_port: arrivalPort,
      arrival_date: reportingDateTimeUTC.value, // irrelevant for Arrival EOSP
      arrival_tz: reportingTimeZone.value, // irrelevant for Arrival EOSP
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
      others: isOtherPlannedOperationEnabled.value,
      planned_operation_othersdetails: otherPlannedOperation.value || "NIL",
    },
    arrivalstandbytimeandposition: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: arrivalSbyPosition,
    },
    weatherdata: {
      weather_notation: weather.value,
      visibility: visibility.value,
      wind_direction: windDirection.value,
      wind_speed: windSpeed.value,
      sea_direction: seaDirection.value,
      sea_state: seaState.value,
      swell_direction: swellDirection.value,
      swell_scale: swellScale.value,
      air_pressure: airPressure.value,
      air_temperature_dry: airTemperatureDry.value,
      air_temperature_wet: airTemperatureWet.value,
      sea_temperature: seaTemperature.value,
      ice_condition: iceCondition.value,
    },
    distanceperformancedata: {
      hours_since_noon: hoursSinceNoon.value || 0,
      hours_total: hoursTotal.value || 0,
      distance_to_go:
        distanceToGoEdited.value &&
        distanceToGoEdited.value !== distanceToGo.value
          ? distanceToGoEdited.value
          : distanceToGo.value || 0,
      remarks_for_changes: remarksForChanges.value
        ? remarksForChanges.value
        : "NIL",
      distance_observed_since_noon: distanceObsSinceNoon.value,
      distance_observed_total: distanceObsTotal.value,
      distance_engine_since_noon: distanceEngSinceNoon.value,
      distance_engine_total: distanceEngTotal.value,
      revolution_count: revolutionCount.value,
      speed_since_noon: speedSinceNoon.value,
      rpm_since_noon: rpmSinceNoon.value,
      slip_since_noon: slipSinceNoon.value,
      speed_average: speedAvg.value,
      rpm_average: rpmAvg.value,
      slip_average: slipAvg.value,
    },
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
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: freshwaterConsumed.value || 0,
        generated: freshwaterGenerated.value || 0,
        received: 0, // Does not apply for Arrival EOSP reports
        discharged: 0, // Does not apply for Arrival EOSP reports
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.NOON_TO_SBY,
    },
    actualperformancedata: {
      actual_performance_type: ActualPerformanceType.PILOT_TO_PILOT,
      distance_obs_total: totalDistanceObs.value,
      sailing_time: totalSailingTime.value,
      displacement: displacement.value,
      speed_average: avgSpeed.value,
      rpm_average: avgRpm.value,
      me_average_daily_fo_consumption: meFoConsumption.value,
    },
    totalconsumptiondata: {
      fueloiltotalconsumptiondata_set: fuelOilDataSum,
      freshwatertotalconsumptiondata: null,
      consumption_type: TotalConsumptionType.PILOT_TO_PILOT,
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
  }
};
</script>
