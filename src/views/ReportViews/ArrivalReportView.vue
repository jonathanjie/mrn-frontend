<template>
  <TabsWrapper class="mt-5">
    <Tab :title="$t('eosp')">
      <div class="flex flex-col space-y-6 my-6">
        <!-- Overview -->
        <Overview></Overview>

        <!-- Departure and Arrival -->
        <DepartureAndArrival></DepartureAndArrival>

        <!-- S/BY for EOSP -->
        <DateTimeLatLong>{{ $t("sbyForEOSP") }}</DateTimeLatLong>

        <!-- Weather (Noon to S/BY) -->
        <Weather>{{ $t("weatherNoonToSby") }}</Weather>

        <!-- Distance & Time (Noon to S/BY) -->
        <DistanceAndTime>{{ $t("distanceAndTimeNoonToSby") }}</DistanceAndTime>

        <!-- Performance -->
        <Performance>{{ $t("performance") }}</Performance>

        <!-- Pilot Station - Arrival -->
        <PilotStationArrival></PilotStationArrival>

        <!-- Consumption & Condition (Noon - S/BY) -->
        <ConsumptionAndCondition>{{
          $t("consumptionAndConditionNoonToSby")
        }}</ConsumptionAndCondition>

        <!-- Actual Performance at Sea / Total Consumption (Pilot to Pilot) -->
        <ArrivalEOSPSummary></ArrivalEOSPSummary>
      </div>

      <!-- Save and Send -->
      <div class="flex justify-end space-x-4 my-6">
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
    </Tab>

    <Tab :title="$t('fwe')">
      <div class="flex flex-col space-y-6 mt-6">
        <!-- Finish With Engine -->
        <FinishWithEngine></FinishWithEngine>

        <!-- Pilot station - arrival -->
        <PilotStationArrival></PilotStationArrival>

        <!-- Vessel condition -->
        <VesselCondition></VesselCondition>

        <!-- Distance & Time (S/BY to F.W.E) -->
        <DistanceAndTimeFWE></DistanceAndTimeFWE>

        <!-- Consumption & Condition (S/BY - F.W.E) -->
        <ConsumptionAndCondition>{{
          $t("consumptionAndConditionSbyToFwe")
        }}</ConsumptionAndCondition>

        <!-- ArrivalFWESummary: Actual Performance (Port to Port) & Total Consumption (Pilot to Pilot) -->
        <ArrivalFWESummary></ArrivalFWESummary>
      </div>

      <!-- Save and Send -->
      <div class="flex justify-end space-x-4 my-6">
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
    </Tab>
  </TabsWrapper>
</template>

<script setup>
import TabsWrapper from "../../components/Tabs/TabsWrapper.vue";
import Tab from "../../components/Tabs/Tab.vue";

import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";

import Overview from "../../components/ReportComponents/Overview.vue";
import DepartureAndArrival from "../../components/ReportComponents/DepartureAndArrival.vue";
import DateTimeLatLong from "../../components/ReportComponents/DateTimeLatLong.vue";
import Weather from "../../components/ReportComponents/Weather.vue";
import DistanceAndTime from "../../components/ReportComponents/DistanceAndTime.vue";
import Performance from "../../components/ReportComponents/Performance.vue";
import PilotStationArrival from "@/components/ReportComponents/PilotStationArrival.vue";
import ConsumptionAndCondition from "@/components/ReportComponents/ConsumptionAndCondition.vue";
import ArrivalEOSPSummary from "@/components/ReportComponents/ArrivalEOSPSummary.vue";
import FinishWithEngine from "@/components/ReportComponents/FinishWithEngine.vue";
import VesselCondition from "@/components/ReportComponents/VesselCondition.vue";
import DistanceAndTimeFWE from "@/components/ReportComponents/DistanceAndTimeFWE.vue";
import ArrivalFWESummary from "@/components/ReportComponents/ArrivalFWESummary.vue";
</script>
