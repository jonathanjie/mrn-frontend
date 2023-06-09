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

    <!-- Additional Remarks -->
    <NoonAddRemarks />

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4">
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
import NoonAddRemarks from "@/components/Reports/NoonReport/NoonAddRemarks.vue";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import axios from "axios";
import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";
import { Report, ConsumptionType } from "@/constants";
import {
  parsePositionToString,
  parsePortLocode,
  generateFuelOilData,
  generateLubricatingOilData,
} from "@/utils/helpers.js";

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
  routeArrivalDateTimeEditedUTC,
  routeArrivalTimeZone,
  dateEditIsDisabled,
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
  // Distance & Time
  hoursSinceNoon,
  hoursSbyToFwe,
  distanceToGo,
  distanceToGoEdited,
  remarksForChanges,
  distanceObsSinceNoon,
  distanceObsSbyToFwe,
  distanceEngSinceNoon,
  distanceEngSbyToFwe,
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
  // Additional Remarks
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
      departure_tz: routeDepartureTimeZone.value,
      arrival_port: routeArrivalPort,
      arrival_date: dateEditIsDisabled.value
        ? routeArrivalDateTimeUTC.value
        : routeArrivalDateTimeEditedUTC.value,
      arrival_tz: routeArrivalTimeZone.value,
    },
    weatherdata: {
      weather_notation: weather.value === "default" ? null : weather.value,
      visibility: visibility.value === "default" ? null : visibility.value,
      wind_direction:
        windDirection.value === "default" ? null : windDirection.value,
      wind_speed: Number(windSpeed.value),
      sea_direction:
        seaDirection.value === "default" ? null : seaDirection.value,
      sea_state: seaState.value === "default" ? null : seaState.value,
      swell_direction:
        swellDirection.value === "default" ? null : swellDirection.value,
      swell_scale: swellScale.value === "default" ? null : swellScale.value,
      air_pressure: Number(airPressure.value),
      air_temperature_dry: Number(airTemperatureDry.value),
      air_temperature_wet: Number(airTemperatureWet.value),
      sea_temperature: Number(seaTemperature.value),
      ice_condition: iceCondition.value,
    },
    distancetimedata: {
      hours_since_last: Number(hoursSinceNoon.value) || 0,
      hours_total: Number(hoursSbyToFwe.value) || 0,
      distance_to_go:
        distanceToGoEdited.value &&
        distanceToGoEdited.value !== distanceToGo.value
          ? Number(distanceToGoEdited.value)
          : Number(distanceToGo.value) || 0,
      remarks_for_changes: remarksForChanges.value
        ? remarksForChanges.value
        : distanceToGoEdited.value != "" &&
          distanceToGoEdited.value !== distanceToGo.value
        ? null
        : "NIL",
      distance_observed_since_last: Number(distanceObsSinceNoon.value),
      distance_observed_total: Number(distanceObsSbyToFwe.value),
      distance_engine_since_last: Number(distanceEngSinceNoon.value),
      distance_engine_total: Number(distanceEngSbyToFwe.value),
      revolution_count: Number(revolutionCount.value),
      set_rpm: 0, // irrelevant for Noon Report
    },
    performancedata: {
      speed_since_last: Number(speedSinceNoon.value) || 0,
      rpm_since_last: Number(rpmSinceNoon.value) || 0,
      slip_since_last: Number(slipSinceNoon.value) || 0,
      speed_average: Number(speedAvg.value) || 0,
      rpm_average: Number(rpmAvg.value) || 0,
      slip_average: Number(slipAvg.value) || 0,
    },
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: Number(freshwaterConsumed.value) || 0,
        generated: Number(freshwaterGenerated.value) || 0,
        received: 0, // irrelevant for noon report
        discharged: 0, // irrelevant for noon report
        rob: Number(freshwaterRob.value) || 0,
      },
      consumption_type: ConsumptionType.NOON_TO_NOON,
    },
    heavyweatherdata: shouldHeavyWeatherDataBeSent.value
      ? {
          weather_notation: heavyWeatherNotation.value,
          total_hours: Number(heavyWeatherHours.value),
          observed_distance: Number(heavyWeatherDist.value),
          fuel_consumption: Number(heavyWeatherConsumption.value),
          wind_direction: heavyWindDirection.value,
          wind_speed: Number(heavyWindSpeed.value),
          sea_direction: heavySeaDirection.value,
          sea_state: heavySeaState.value,
          remarks: heavyRemarks.value,
        }
      : null,
    stoppagedata: shouldStoppageDataBeSent.value
      ? {
          start_date: stoppageBeginning.value,
          end_date: stoppageEnding.value || null,
          duration: Number(stoppageDuration.value),
          reduced_rpm: Number(stoppageChangedRPM.value),
          position: stoppagePosition,
          reason: stoppageReason.value,
          remarks: stoppageRemarks.value,
        }
      : null,
    additionalremarks:
      additionalRemarks.value === ""
        ? null
        : { remarks: additionalRemarks.value },
  };
  console.log("Funny vision thingy", visibility.value);
  console.log("data: ", REPORT);

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
