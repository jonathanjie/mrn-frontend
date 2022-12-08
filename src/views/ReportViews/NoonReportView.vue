<template>
  <div class="flex flex-col space-y-6 my-6">

    <!-- visual indicator -->
    <span class="col-span-4 flex flex-col bg-green-25/[0.24] text-green-800 font-bold text-12 p-5 h-min-fit min-w-fit rounded-xl inline-flex border-green-400 border">
        <span class="pb-3">{{ $t('sailingAtSea') }}</span>
        <img class="lg:hidden" src="@/assets/icons/report_subtype_sailing_at_sea.svg">
        <img class="hidden lg:block" src="@/assets/icons/report_subtype_sailing_at_sea_long.svg">
    </span>

    <!-- Overview -->
    <NoonOverview></NoonOverview>

    <!-- Reporting Noon -->
    <DateTimeLatLong>{{ $t("reportingNoon") }}</DateTimeLatLong>

    <!-- Weather -->
    <Weather></Weather>

    <!-- Heavy Weather Condition -->
    <HeavyWeatherCondition></HeavyWeatherCondition>

    <!-- Distance & Time -->
    <DistanceAndTime></DistanceAndTime>

    <!-- Performance -->
    <Performance></Performance>

    <!-- Consumption & Condition -->
    <ConsumptionAndCondition>{{ $t("consumptionAndConditionNoonToNoon") }}</ConsumptionAndCondition>

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
  convertDMSToDD,
} from "../../utils/helpers.js";

import NoonOverview from "@/components/ReportComponents/NoonOverview.vue";
import DateTimeLatLong from "@/components/ReportComponents/DateTimeLatLong.vue";
import Weather from "@/components/ReportComponents/Weather.vue";
import HeavyWeatherCondition from "@/components/ReportComponents/HeavyWeatherCondition.vue";
import DistanceAndTime from "@/components/ReportComponents/DistanceAndTime.vue";
import Performance from "@/components/ReportComponents/Performance.vue";
import ConsumptionAndCondition from "@/components/ReportComponents/ConsumptionAndCondition.vue";
import StoppageOrReductionRPM from "@/components/ReportComponents/StoppageOrReductionRPM.vue";

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

const sendReport = async () => {
  // TODO: need to do form validation first

  // const latDD = convertDMSToDD(parseFloat(lat_degree.value), parseFloat(lat_minutes.value), lat_dir.value);
  // const longDD = convertDMSToDD(parseFloat(long_degree.value), parseFloat(long_minutes.value), long_dir.value);

  // convert fields to correct

  const REPORT = {
    // fill out report based on backend field names and match them with values
  };

  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/reports/new/",
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
};
</script>

<style lang="scss">
$dp__font_family: "Manrope";
$dp__font_size: 0.875rem;
$dp__border_radius: 0px;
$dp__input_padding: 12px 12px;
$dp__input_icon_padding: 14px;

@import "node_modules/@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss";

.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #0093b8;
  --dp-hover-icon-color: #0093b8;
  --dp-primary-color: #0093b8;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ffffff;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #ffffff;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #0093b8;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-highlight-color: rgba(25, 118, 210, 0.1);
}
</style>