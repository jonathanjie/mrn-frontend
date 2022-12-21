<template>
  <TabsWrapper class="mt-5">
    <Tab :title="$t('eosp')">
      <div class="flex flex-col space-y-6 my-6">
        <!-- Overview -->
        <ArrivalEOSPOverview />

        <!-- Departure and Arrival -->
        <ArrivalAndDeparture />

        <!-- S/BY for EOSP -->
        <ArrivalDetails>{{ $t("sbyForArrival") }}</ArrivalDetails>

        <!-- Weather (Noon to S/BY) -->
        <ArrivalWeather>{{ $t("weatherNoonToSby") }}</ArrivalWeather>

        <!-- Distance & Time (Noon to S/BY) -->
        <ArrivalEOSPDistanceAndTime>{{
          $t("distanceAndTimeNoonToSby")
        }}</ArrivalEOSPDistanceAndTime>

        <!-- Performance -->
        <ArrivalPerformance>{{ $t("performance") }}</ArrivalPerformance>

        <!-- Pilot Station - Arrival -->
        <ArrivalEOSPPilotStation />

        <!-- Consumption & Condition (Noon - S/BY) -->
        <ArrivalEOSPConsumption>{{
          $t("consumptionAndConditionNoonToSby")
        }}</ArrivalEOSPConsumption>

        <!-- Actual Performance at Sea / Total Consumption (Pilot to Pilot) -->
        <ArrivalEOSPSummary />
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
        <!-- Overview -->
        <ArrivalFWEOverview />

        <!-- Finish With Engine -->
        <ArrivalFinishWithEngine></ArrivalFinishWithEngine>

        <!-- Pilot Station - Arrival -->
        <ArrivalFWEPilotStation />

        <!-- Distance & Time (S/BY to F.W.E) -->
        <ArrivalFWEDistanceAndTime />

        <!-- Consumption & Condition (S/BY - F.W.E) -->
        <ArrivalFWEConsumption>{{
          $t("consumptionAndConditionSbyToFwe")
        }}</ArrivalFWEConsumption>

        <!-- ArrivalFWESummary: Actual Performance (Port to Port) & Total Consumption (Pilot to Pilot) -->
        <ArrivalFWESummary />
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
import TabsWrapper from "@/components/Tabs/TabsWrapper.vue";
import Tab from "@/components/Tabs/Tab.vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";

import ArrivalAndDeparture from "@/components/Reports/ArrivalReport/ArrivalAndDeparture.vue";
import ArrivalDetails from "@/components/Reports/ArrivalReport/ArrivalDetails.vue";
import ArrivalWeather from "@/components/Reports/ArrivalReport/ArrivalWeather.vue";
import ArrivalEOSPDistanceAndTime from "@/components/Reports/ArrivalReport/ArrivalEOSPDistanceAndTime.vue";
import ArrivalFWEDistanceAndTime from "@/components/Reports/ArrivalReport/ArrivalFWEDistanceAndTime.vue";
import ArrivalPerformance from "@/components/Reports/ArrivalReport/ArrivalPerformance.vue";
import ArrivalEOSPPilotStation from "@/components/Reports/ArrivalReport/ArrivalEOSPPilotStation.vue";
import ArrivalFWEPilotStation from "@/components/Reports/ArrivalReport/ArrivalFWEPilotStation.vue";
import ArrivalEOSPConsumption from "@/components/Reports/ArrivalReport/ArrivalEOSPConsumption.vue";
import ArrivalFWEConsumption from "@/components/Reports/ArrivalReport/ArrivalFWEConsumption.vue";
import ArrivalFinishWithEngine from "@/components/Reports/ArrivalReport/ArrivalFinishWithEngine.vue";
import ArrivalEOSPSummary from "@/components/Reports/ArrivalReport/ArrivalEOSPSummary.vue";
import ArrivalFWESummary from "@/components/Reports/ArrivalReport/ArrivalFWESummary.vue";
import ArrivalEOSPOverview from "@/components/Reports/ArrivalReport/ArrivalEOSPOverview.vue";
import ArrivalFWEOverview from "@/components/Reports/ArrivalReport/ArrivalFWEOverview.vue";
</script>
