<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- Overview -->
    <NoonOverview />

    <!-- Reporting Noon -->
    <NoonDetails />

    <!-- Weather -->
    <NoonWeather />

    <!-- Heavy Weather Condition -->
    <NoonHeavyWeather />

    <!-- Distance & Time -->
    <NoonDistanceAndTime />

    <!-- Performance -->
    <NoonPerformance />

    <!-- Consumption & Condition -->
    <NoonConsumption
      :fuel-oils="fuelOils"
      :lubricating-oils="lubricatingOils"
      :machinery="machinery"
      >{{ $t("consumptionAndConditionNoonToNoon") }}</NoonConsumption
    >

    <!-- Stoppage or Reduction of RPM (at sea) -->
    <NoonStoppage />

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4">
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
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import NoonOverview from "@/components/Reports/NoonReport/NoonOverview.vue";
import NoonDetails from "@/components/Reports/NoonReport/NoonDetails.vue";
import NoonWeather from "@/components/Reports/NoonReport/NoonWeather.vue";
import NoonHeavyWeather from "@/components/Reports/NoonReport/NoonHeavyWeather.vue";
import NoonDistanceAndTime from "@/components/Reports/NoonReport/NoonDistanceAndTime.vue";
import NoonPerformance from "@/components/Reports/NoonReport/NoonPerformance.vue";
import NoonConsumption from "@/components/Reports/NoonReport/NoonConsumption.vue";
import NoonStoppage from "@/components/Reports/NoonReport/NoonStoppage.vue";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";
import { Report, ConsumptionType } from "@/constants";
import {
  parsePositionToString,
  parsePortLocode,
  generateFuelOilData,
  generateLubricatingOilData,
} from "@/utils/helpers.js";
import { UrlDomain } from "@/constants";

const store = useNoonReportStore();
const {
  fuelOils,
  lubricatingOils,
  machinery,
  // Overview
  legUuid,
  reportNo,
  reportingTimeZone,
  reportingDateTimeUTC,
  // Departure and Destination
  routeDeparturePortCountry,
  routeDeparturePortName,
  routeDepartureDateTime,
  routeDepartureTimeZone,
  routeArrivalPortCountry,
  routeArrivalPortName,
  routeArrivalDateTimeUTC,
  isRouteArrivalDateTimeEdited,
  routeArrivalDateTimeEditedUTC,
  routeArrivalTimeZone,
  // DateTimeLatLong
  latDir,
  latMinutes,
  latDegree,
  longDir,
  longMinutes,
  longDegree,
  // Weather Conditions
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
  // Heavy Weather Conditions
  heavyWeatherHours,
  heavyWeatherDist,
  heavyWeatherConsumption,
  heavyWeatherNotation,
  heavyWindDirection,
  heavyWindSpeed,
  heavySeaDirection,
  heavySeaState,
  heavyRemarks,
  shouldHeavyWeatherDataBeSent,
  // DistanceTime
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
  // Stoppage or Reduction RPM
  stoppageBeginning,
  stoppageEnding,
  stoppageDuration,
  stoppageChangedRPM,
  stoppageReason,
  stoppageRemarks,
  stoppageLatDir,
  stoppageLatDegree,
  stoppageLatMinutes,
  stoppageLongDir,
  stoppageLongDegree,
  stoppageLongMinutes,
  shouldStoppageDataBeSent,
} = storeToRefs(store);

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
  isSubmissionSuccessful,
  errorMessage,
} = storeToRefs(submissionStatusStore);

const sendReport = async () => {
  // TODO: need to do form validation first
  isSubmissionRequested.value = true;

  const position = parsePositionToString({
    latDir: latDir.value,
    latMinutes: latMinutes.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinutes.value,
    longDegree: longDegree.value,
  });

  const stoppagePosition = parsePositionToString({
    latDir: stoppageLatDir.value,
    latMinutes: stoppageLatMinutes.value,
    latDegree: stoppageLatDegree.value,
    longDir: stoppageLongDir.value,
    longMinutes: stoppageLongMinutes.value,
    longDegree: stoppageLongDegree.value,
  });

  const routeDeparturePort = parsePortLocode({
    portCountry: routeDeparturePortCountry.value,
    portName: routeDeparturePortName.value,
  });

  const routeArrivalPort = parsePortLocode({
    portCountry: routeArrivalPortCountry.value,
    portName: routeArrivalPortName.value,
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
    report_type: Report.type.NOON,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    noonreporttimeandposition: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: position,
    },
    voyage_leg: {
      uuid: legUuid.value,
    },
    reportroute: {
      departure_port: routeDeparturePort,
      departure_date: routeDepartureDateTime.value,
      depature_tz: routeDepartureTimeZone.value,
      arrival_port: routeArrivalPort,
      arrival_date: isRouteArrivalDateTimeEdited.value
        ? routeArrivalDateTimeEditedUTC.value
        : routeArrivalDateTimeUTC.value,
      arrival_tz: routeArrivalTimeZone.value,
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
      speed_since_noon: speedSinceNoon.value || 0,
      rpm_since_noon: rpmSinceNoon.value || 0,
      slip_since_noon: slipSinceNoon.value || 0,
      speed_average: speedAvg.value || 0,
      rpm_average: rpmAvg.value || 0,
      slip_average: slipAvg.value || 0,
    },
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: freshwaterConsumed.value || 0,
        generated: freshwaterGenerated.value || 0,
        received: 0, // irrelevant for noon report
        discharged: 0, // irrelevant for noon report
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.NOON_TO_NOON,
    },
    heavyweatherdata: shouldHeavyWeatherDataBeSent.value
      ? {
          weather_notation: heavyWeatherNotation.value,
          total_hours: heavyWeatherHours.value,
          observed_distance: heavyWeatherDist.value,
          fuel_consumption: heavyWeatherConsumption.value,
          wind_direction: heavyWindDirection.value,
          wind_speed: heavyWindSpeed.value,
          sea_direction: heavySeaDirection.value,
          sea_state: heavySeaState.value,
          remarks: heavyRemarks.value,
        }
      : null,
    stoppagedata: shouldStoppageDataBeSent.value
      ? {
          start_date: stoppageBeginning.value,
          end_date: stoppageEnding.value || null,
          duration: stoppageDuration.value,
          reduced_rpm: stoppageChangedRPM.value,
          position: stoppagePosition,
          reason: stoppageReason.value,
          remarks: stoppageRemarks.value,
        }
      : null,
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
    errorMessage.value = error.toString();
    isSubmissionModalVisible.value = true;
  }
};
</script>
