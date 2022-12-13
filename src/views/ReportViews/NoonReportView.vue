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
    <NoonOverview />

    <!-- Reporting Noon -->
    <NoonDetails>{{ $t("reportingNoon") }}</NoonDetails>

    <!-- Weather -->
    <NoonWeather />

    <!-- Heavy Weather Condition -->
    <NoonHeavyWeather />

    <!-- Distance & Time -->
    <NoonDistanceAndTime />

    <!-- Performance -->
    <NoonPerformance />

    <!-- Consumption & Condition -->
    <NoonConsumption>{{
      $t("consumptionAndConditionNoonToNoon")
    }}</NoonConsumption>

    <!-- Stoppage or Reduction of RPM (at sea) -->
    <NoonStoppage />

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
// import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
import {
  // textInputOptions,
  // format,
  // preventNaN,
  parsePosition,
  parsePortLocode,
} from "../../utils/helpers.js";

import NoonOverview from "@/components/Reports/NoonReport/NoonOverview.vue";
import NoonDetails from "@/components/Reports/NoonReport/NoonDetails.vue";
import NoonWeather from "@/components/Reports/NoonReport/NoonWeather.vue";
import NoonHeavyWeather from "@/components/Reports/NoonReport/NoonHeavyWeather.vue";
import NoonDistanceAndTime from "@/components/Reports/NoonReport/NoonDistanceAndTime.vue";
import NoonPerformance from "@/components/Reports/NoonReport/NoonPerformance.vue";
import NoonConsumption from "@/components/Reports/NoonReport/NoonConsumption.vue";
import NoonStoppage from "@/components/Reports/NoonReport/NoonStoppage.vue";

import { useNoonReportStore } from "@/stores/useNoonReportStore";
import { storeToRefs } from "pinia";

import { REPORT_CONSTANTS } from "@/constants";

const store = useNoonReportStore();
const {
  // Departure and Destination
  routeDeparturePortCountry,
  routeDeparturePortName,
  routeDepartureDate,
  routeArrivalPortCountry,
  routeArrivalPortName,
  routeArrivalDate,
  // routeArrivalTimeZone,
  // routeArrivalSummerTime,
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
  heavyWeatherIsActive,
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
  lsfoTotalConsumption,
  lsfoRob,
  mgoTotalConsumption,
  mgoRob,
  lsfoBreakdown,
  mgoBreakdown,
  fuelOilDataCorrection,
  mecylinderTotalConsumption,
  mesystemTotalConsumption,
  mesumpTotalConsumption,
  gesystemTotalConsumption,
  mecylinderRob,
  mesystemRob,
  mesumpRob,
  gesystemRob,
  lubricatingOilDataCorrection,
  freshwaterConsumed,
  freshwaterEvaporated,
  freshwaterReceived,
  freshwaterDischarged,
  freshwaterChange,
  freshwaterRob,
  // Stoppage or Reduction RPM
  stoppageBeginning,
  stoppageEnding,
  stoppageDuration,
  stoppageReducedRPM,
  stoppageReason,
  stoppageRemarks,
  stoppageLatDir,
  stoppageLatDegree,
  stoppageLatMinutes,
  stoppageLongDir,
  stoppageLongDegree,
  stoppageLongMinutes,
  stoppageIsActive,
} = storeToRefs(store);

// TODO: retrieve data from backend or generate as needed
// TODO: modify DateTime display to also display UTC time next to local time

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

const sendReport = async () => {
  // TODO: need to do form validation first

  const position = parsePosition({
    latDir: latDir.value,
    latMinutes: latMinutes.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinutes.value,
    longDegree: longDegree.value,
  });

  const stoppagePosition = parsePosition({
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

  let REPORT = {
    report_type: REPORT_CONSTANTS.type.noon,
    voyage: 1, // TODO: fetch from db
    leg_num: 1, // TODO: fetch from db
    report_tz: timeZone.value,
    summer_time: summerTime.value,
    report_num: 1, // TODO: fetch from db
    report_date: dateTime.value,
    position: position,
    route: {
      departure_port: routeDeparturePort,
      departure_date: routeDepartureDate.value,
      arrival_port: routeArrivalPort,
      arrival_date: routeArrivalDate.value,
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
      ice_condiction: iceCondition.value,
    },
    distanceperformancedata: {
      hours_since_noon: hoursSinceNoon.value,
      hours_total: hoursTotal.value,
      distance_to_go:
        distanceToGoEdited.value &&
        distanceToGoEdited.value !== distanceToGo.value
          ? distanceToGoEdited.value
          : distanceToGo.value,
      remarks_for_changes: remarksForChanges.value
        ? remarksForChanges.value
        : "NIL",
      distance_obs_since_noon: distanceObsSinceNoon.value,
      distance_obs_total: distanceObsTotal.value,
      distance_eng_since_noon: distanceEngSinceNoon.value,
      distance_eng_total: distanceEngTotal.value,
      revolution_count: revolutionCount.value,
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
          fuel_oil_type: "LSFO",
          total_consumption: lsfoTotalConsumption.value,
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: lsfoRob.value,
          breakdown: {
            "G/E": lsfoBreakdown.value.ge,
            "M/E": lsfoBreakdown.value.me,
            BLR: lsfoBreakdown.value.blr,
            IGG: lsfoBreakdown.value.igg,
          },
        },
        {
          fuel_oil_type: "MGO",
          total_consumption: mgoTotalConsumption.value,
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: mgoRob.value,
          breakdown: {
            "G/E": mgoBreakdown.value.ge,
            "M/E": mgoBreakdown.value.me,
            BLR: mgoBreakdown.value.blr,
            IGG: mgoBreakdown.value.igg,
          },
        },
      ],
      lubricatingoildata_set: [
        {
          fuel_oil_type: "M/E Cylinder",
          total_consumption: mecylinderTotalConsumption.value,
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: mecylinderRob.value,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === "mecylinder"
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: "M/E System",
          total_consumption: mesystemTotalConsumption.value,
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: mesystemRob.value,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === "mesystem"
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: "M/E Sump",
          total_consumption: mesumpTotalConsumption.value,
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: mesumpRob.value,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === "mesump"
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: "G/E System",
          total_consumption: gesystemTotalConsumption.value,
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: gesystemRob.value,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === "gesystem"
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
      ],
      freshwaterdata: {
        consumed: freshwaterConsumed.value,
        evaporated: freshwaterEvaporated.value,
        received: 0, // irrelevant for noon report
        discharged: 0, // irrelevant for noon report
        rob: freshwaterRob.value,
      },
      consumption_type: "NTON",
    },
  };

  if (heavyWeatherIsActive) {
    REPORT.heavyweatherdata = {
      total_hours: heavyWeatherHours.value,
      observed_distance: heavyWeatherDist.value,
      fuel_consumption: heavyWeatherConsumption.value,
      wind_direction: heavyWindDirection.value,
      wind_speed: heavyWindSpeed.value,
      sea_direction: heavySeaDirection.value,
      sea_state: heavySeaState.value,
      max_wave_height: 10, // TODO: X needed, remove this line once removed from backend
      remarks: heavyRemarks.value,
    };
  }

  if (stoppageIsActive) {
    REPORT.stoppagedata = {
      start_date: stoppageBeginning.value,
      end_date: stoppageEnding.value,
      duration: stoppageDuration.value,
      reduced_rpm: stoppageReducedRPM.value,
      position: stoppagePosition,
      reason: stoppageReason.value,
      remarks: stoppageRemarks.value,
    };
  }

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
