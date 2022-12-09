<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- visual indicator -->
    <span
      class="col-span-4 flex flex-col bg-green-25/[0.24] text-green-800 font-bold text-12 p-5 h-min-fit min-w-fit rounded-xl inline-flex border-green-400 border"
    >
      <span class="pb-3">{{ $t("sailingAtSea") }}</span>
      <img
        class="lg:hidden"
        src="@/assets/icons/report_subtype_sailing_at_sea.svg"
      />
      <img
        class="hidden lg:block"
        src="@/assets/icons/report_subtype_sailing_at_sea_long.svg"
      />
    </span>

    <!-- Overview -->
    <NoonOverview></NoonOverview>

    <!-- Reporting Noon -->
    <DateTimeLatLong>{{ $t("reportingNoon") }}</DateTimeLatLong>

    <!-- Weather -->
    <Weather />

    <!-- Heavy Weather Condition -->
    <HeavyWeatherCondition></HeavyWeatherCondition>

    <!-- Distance & Time -->
    <DistanceAndTime></DistanceAndTime>

    <!-- Performance -->
    <Performance></Performance>

    <!-- Consumption & Condition -->
    <ConsumptionAndCondition>{{
      $t("consumptionAndConditionNoonToNoon")
    }}</ConsumptionAndCondition>

    <!-- Stoppage or Reduction of RPM (at sea) -->
    <StoppageOrReductionRPM></StoppageOrReductionRPM>

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4">
      <CustomButton
        class="p-3 text-14"
        type="button"
        v-on:click="saveChanges()"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-slot:content>{{ $t("saveChanges") }}</template>
      </CustomButton>
      <GradientButton
        class="p-3 text-14"
        type="button"
        v-on:click="sendReport()"
      >
        <!-- TODO: need alternate function for saving changes to backend -->
        <template v-slot:content>{{ $t("sendReport") }}</template>
      </GradientButton>
    </div>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import {
  textInputOptions,
  format,
  preventNaN,
  parsePosition,
} from "../../utils/helpers.js";

import NoonOverview from "@/components/ReportComponents/NoonOverview.vue";
import DateTimeLatLong from "@/components/ReportComponents/DateTimeLatLong.vue";
import Weather from "@/components/ReportComponents/Weather.vue";
import HeavyWeatherCondition from "@/components/ReportComponents/HeavyWeatherCondition.vue";
import DistanceAndTime from "@/components/ReportComponents/DistanceAndTime.vue";
import Performance from "@/components/ReportComponents/Performance.vue";
import ConsumptionAndCondition from "@/components/ReportComponents/ConsumptionAndCondition.vue";
import StoppageOrReductionRPM from "@/components/ReportComponents/StoppageOrReductionRPM.vue";

import { useNoonReportStore } from "@/store/useNoonReportStore";
import { storeToRefs } from "pinia";

import constants, { REPORT_CONSTANTS } from "@/constants";

const store = useNoonReportStore();
const {
  // DateTimeLatLong
  timeZone,
  summerTime,
  dateTime,
  latDir,
  latMinutes,
  latDegree,
  longDir,
  longMinutes,
  longDegree,
  // Weather Conditions
  weather,
  seaState,
  windDirection,
  windSpeed,
  beaufort,
  waveDirection,
  waveHeight,
  waveForce,
  swellDirection,
  swellHeight,
  swellScale,
  iceCondition,
  // Heavy Weather Conditions
  heavyWeatherHours,
  heavyWeatherDist,
  heavyWeatherConsumption,
  heavyWindDirection,
  heavyWindSpeed,
  heavyMaxWaveHt,
  heavyWaveForce,
  // DistanceTime
  hoursSinceNoon,
  hoursTotal,
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
  // Stoppage or Reduction RPM
  stoppageBeginning,
  stoppageEnding,
  stoppageDuration,
  reducedRPM,
  stoppageReason,
  stoppageRemarks,
  stoppageLatDir,
  stoppageLatDegree,
  stoppageLatMinutes,
  stoppageLongDir,
  stoppageLongDegree,
  stoppageLongMinutes,
} = storeToRefs(store);

// TODO: retrieve data from backend or generate as needed
// TODO: modify DateTime display to also display UTC time next to local time

const getFuelCorrection = (fuel_type) => {
  // should return float
  switch (fuel_type) {
    case "LSFO":
      return cc_correction_type == "LSFO" ? cc_lsfo_total : "0.00";
      break;
    case "MGO":
      return cc_correction_type == "MGO" ? cc_mgo_total : "0.00";
      break;
  }
};

const getFuelCorrectionRemarks = (fuel_type) => {
  switch (fuel_type) {
    case "LSFO":
      return cc_correction_type == "LSFO" ? cc_remarks : "NIL";
      break;
    case "MGO":
      return cc_correction_type == "MGO" ? cc_remarks : "NIL";
      break;
  }
};

const convertReportDate = (date) => {
  // TODO: consider daylight savings in calculating UTC timezone offset + display
  const userOffset = parseInt(reporting_time_zone.value) * -60;
  const calcOffset = date.getTimezoneOffset();

  // calculate based on timezone input
  if (userOffset !== calcOffset) {
    date = new Date(
      date.getTime() +
        3600000 * (parseInt(reporting_time_zone.value) + calcOffset / 60)
    );
  }

  return date.toISOString();
};

// TODO: should be dynamic; get all fuels used from database and filter accordingly
const createBunkerData = () => {
  return [lsfo_data, mgo_data];

  // for (const fuel in fuel_data) {
  //     bunkerDataList.push(fuel);
  // }
  // return bunkerDataList;
};

// imoprt useNoonReport
// data = {.... all of noonReport}
// Send data api

const sendReport = async () => {
  // TODO: need to do form validation first

  // const latDD = convertDMSToDD(parseFloat(lat_degree.value), parseFloat(lat_minutes.value), lat_dir.value);
  // const longDD = convertDMSToDD(parseFloat(long_degree.value), parseFloat(long_minutes.value), long_dir.value);

  // convert fields to correct

  const rawData = {
    timeZone: timeZone.value,
    summerTime: summerTime.value,
    dateTime: dateTime.value,
    latDir: latDir.value,
    latMinutes: latMinutes.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinutes.value,
    longDegree: longDegree.value,
  };

  // console.log("data: ", rawData);
  const position = parsePosition({
    latDir: latDir.value,
    latMinutes: latMinutes.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinutes.value,
    longDegree: longDegree.value,
  });

  const stoppagePosition = parsePosition({
    latDir: latDir.value,
    latMinutes: latMinutes.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinutes.value,
    longDegree: longDegree.value,
  });

  const REPORT = {
    report_type: REPORT_CONSTANTS.type.noon,
    voyage: 1,
    leg_num: 1,
    report_tz: "Asia/Singapore",
    summer_time: summerTime.value,
    report_num: 1,
    report_date: dateTime.value,
    position: position,
    route: {
      departure_port: "SG PPT",
      departure_date: "2022-12-01T00:00:00Z",
      arrival_port: "KR BNP",
      arrival_date: "2022-12-08T00:00:00Z",
    },
    weatherdata: {
      weather_notation: "D",
      visibility: 8,
      wind_direction: windDirection.value,
      wind_speed: windSpeed.value,
      sea_direction: "E",
      sea_state: seaState.value,
      swell_direction: swellDirection.value,
      swell_scale: swellScale.value,
      air_pressure: 1011,
      air_temperature_dry: "27.0",
      air_temperature_wet: "25.0",
      sea_temperature: "24.0",
      ice_condiction: iceCondition.value,
    },
    heavyweatherdata: {
      total_hours: heavyWeatherHours.value,
      observed_distance: heavyWeatherDist.value,
      fuel_consumption: heavyWeatherConsumption.value,
      wind_direction: heavyWindDirection.value,
      wind_speed: heavyWindSpeed.value,
      sea_direction: "E",
      sea_state: 4,
      max_wave_height: heavyMaxWaveHt.value,
      remarks: "nil",
    },
    distanceperformancedata: {
      hours_since_noon: hoursSinceNoon.value,
      hours_total: hoursTotal.value,
      distance_to_go: "1000",
      remarks_for_changes: "No change",
      distance_obs_since_noon: distanceObsSinceNoon.value,
      distance_obs_total: distanceObsTotal.value,
      distance_eng_since_noon: distanceEngSinceNoon.value,
      distance_eng_total: distanceEngTotal.value,
      revolution_count: parseInt(revolutionCount.value),
      speed_since_noon: speedSinceNoon.value,
      rpm_since_noon: rpmSinceNoon.value,
      slip_since_noon: slipSinceNoon.value,
      speed_avg: speedAvg.value,
      rpm_avg: rpmAvg.value,
      slip_avg: slipAvg.value,
    },
    consumptionconditiondata: {
      fueloildata_set: [
        {
          fuel_oil_type: "HFO",
          total_consumption: "100.00",
          receipt: "0.00",
          debunkering: "0.00",
          rob: "10000.00",
          breakdown: {
            "G/E": 20,
            "M/E": 80,
          },
        },
        {
          fuel_oil_type: "LSFO",
          total_consumption: "100.00",
          receipt: "0.00",
          debunkering: "0.00",
          rob: "1000.00",
          breakdown: {
            "G/E": 80,
            "M/E": 20,
          },
        },
      ],
      lubricatingoildata_set: [
        {
          fuel_oil_type: "M/E Sump",
          total_consumption: "100.00",
          receipt: "0.00",
          debunkering: "0.00",
          rob: "1000.00",
          lubricatingoildatacorrection: {
            correction: "100.00",
            remarks: "Hi",
          },
        },
      ],
      freshwaterdata: {
        consumed: 1000,
        evaporated: 100,
        received: 0,
        discharged: 100,
        rob: 10000,
      },
      consumption_type: "NTON",
    },
    stoppagedata: {
      start_date: stoppageBeginning.value,
      end_date: stoppageEnding.value,
      duration: stoppageDuration.value,
      reduced_rpm: reducedRPM.value,
      position: stoppagePosition,
      reason: stoppageReason.value,
      remarks: stoppageRemarks.value,
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
  const data = await response.json();
  console.log(response);
  console.log(data);
};
</script>
