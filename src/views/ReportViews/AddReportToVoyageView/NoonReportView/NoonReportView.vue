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
    <NoonConsumption>{{
      $t("consumptionAndConditionNoonToNoon")
    }}</NoonConsumption>

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
// import MiniUnitDisplay from "@/components/MiniUnitDisplay.vue";
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
import { Report, FuelOil, LubricatingOil, ConsumptionType } from "@/constants";
import {
  convertLTToUTC,
  parsePositionToString,
  parsePortLocode,
} from "@/utils/helpers.js";

const store = useNoonReportStore();
const {
  // Overview
  voyageNo,
  legNo,
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
  routeArrivalDateTime,
  routeArrivalDateTimeUTC,
  routeArrivalDateTimeEdited,
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
  freshwaterEvaporated,
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
const { isSubmissionRequested, isSubmissionSuccessful, errorMessage } =
  storeToRefs(submissionStatusStore);

const sendReport = async () => {
  // TODO: need to do form validation first

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

  const REPORT = {
    report_type: Report.type.NOON,
    voyage: voyageNo.value,
    voyage_leg: legNo.value,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    noonreporttimeandposition: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: position,
    },
    reportroute: {
      departure_port: routeDeparturePort,
      departure_date: routeDepartureDateTime.value,
      depature_tz: routeDepartureTimeZone.value,
      arrival_port: routeArrivalPort,
      arrival_date: routeArrivalDateTimeEdited.value
        ? convertLTToUTC(routeArrivalDateTime.value, routeArrivalTimeZone.value)
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
      speed_since_noon: speedSinceNoon.value,
      rpm_since_noon: rpmSinceNoon.value,
      slip_since_noon: slipSinceNoon.value,
      speed_average: speedAvg.value,
      rpm_average: rpmAvg.value,
      slip_average: slipAvg.value,
    },
    consumptionconditiondata: {
      fueloildata_set: [
        {
          fuel_oil_type: FuelOil.LSFO,
          total_consumption: lsfoTotalConsumption.value || 0,
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: lsfoRob.value || 0,
          breakdown: {
            "G/E": lsfoBreakdown.value.ge || 0,
            "M/E": lsfoBreakdown.value.me || 0,
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
          receipt: "0.00", // irrelevant for noon report
          debunkering: "0.00", // irrelevant for noon report
          rob: mgoRob.value || 0,
          breakdown: {
            "G/E": mgoBreakdown.value.ge || 0,
            "M/E": mgoBreakdown.value.me || 0,
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
        evaporated: freshwaterEvaporated.value || 0,
        received: 0, // irrelevant for noon report
        discharged: 0, // irrelevant for noon report
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.NOON_TO_NOON,
    },
    heavyweatherdata: shouldHeavyWeatherDataBeSent.value
      ? {
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
    isSubmissionRequested.value = true;
  } catch (error) {
    console.log(error);
  }
};
</script>
