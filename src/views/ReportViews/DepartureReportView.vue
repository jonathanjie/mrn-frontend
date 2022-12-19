<template>
  <TabsWrapper class="mt-5">
    <Tab :title="$t('sbyForDeparture')">
      <div class="flex flex-col space-y-6 my-6">
        <!-- Overview -->
        <DepartureSBYOverview />

        <!-- Departure and Destination -->
        <DepartureAndDestinationSBY />

        <!-- Cargo Operation -->
        <DepartureCargoOperation />

        <!-- Vessel Condition at Departure -->
        <DepartureVesselCondition />

        <!-- Consumption & Condition (departure ver.) -->
        <DepartureSBYConsumption />

        <!-- Consumption & Condition (Harbour/In Port in Total) -->
        <DepartureSBYTotalConsumption>{{
          $t("consumptionAndConditionHarbourInPortInTotal")
        }}</DepartureSBYTotalConsumption>
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

    <Tab :title="$t('cosp')">
      <div class="flex flex-col space-y-6 mt-6">
        <!-- Overview -->
        <DepartureCOSPOverview />

        <!-- Departure and Destination TODO: may need to disable some fields -->
        <DepartureAndDestinationCOSP />

        <!-- Pilot Station - Departure -->
        <DeparturePilotStationDeparture />

        <!-- Pilot Station - Arrival -->
        <DeparturePilotStationArrival />

        <!-- Distance & Time (R/UP Engine) & S/BY to R/UP (In Harbour)-->
        <DepartureDistanceAndTime />

        <!-- Budget Trans Ocean (Pilot to Pilot) -->
        <DepartureBudgetTransOcean />

        <!-- Consumption & Condition (S/BY to R/UP) -->
        <DepartureCOSPConsumption>{{
          $t("consumptionAndConditionSbyToRup")
        }}</DepartureCOSPConsumption>
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

import DepartureAndDestinationSBY from "@/components/Reports/DepartureReport/DepartureAndDestinationSBY.vue";
import DepartureAndDestinationCOSP from "@/components/Reports/DepartureReport/DepartureAndDestinationCOSP.vue";
import DepartureCargoOperation from "@/components/Reports/DepartureReport/DepartureCargoOperation.vue";
import DepartureVesselCondition from "@/components/Reports/DepartureReport/DepartureVesselCondition.vue";
import DepartureCOSPConsumption from "@/components/Reports/DepartureReport/DepartureCOSPConsumption.vue";
import DepartureSBYTotalConsumption from "@/components/Reports/DepartureReport/DepartureSBYTotalConsumption.vue";
import DepartureSBYConsumption from "@/components/Reports/DepartureReport/DepartureSBYConsumption.vue";
import DeparturePilotStationArrival from "@/components/Reports/DepartureReport/DeparturePilotStationArrival.vue";
import DeparturePilotStationDeparture from "@/components/Reports/DepartureReport/DeparturePilotStationDeparture.vue";
import DepartureDistanceAndTime from "@/components/Reports/DepartureReport/DepartureDistanceAndTime.vue";
import DepartureBudgetTransOcean from "@/components/Reports/DepartureReport/DepartureBudgetTransOcean.vue";
import DepartureSBYOverview from "@/components/Reports/DepartureReport/DepartureSBYOverview.vue";
import DepartureCOSPOverview from "@/components/Reports/DepartureReport/DepartureCOSPOverview.vue";
</script>
