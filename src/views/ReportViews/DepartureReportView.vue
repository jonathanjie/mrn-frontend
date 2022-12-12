<template>
  <TabsWrapper class="mt-5">
    <Tab :title="$t('sbyForDeparture')">
      <div class="flex flex-col space-y-6 my-6">
        <!-- Overview -->
        <Overview />

        <!-- Departure and Destination -->
        <DepartureAndDestination />

        <!-- Cargo Operation -->
        <CargoOperation />

        <!-- Vessel Condition at Departure -->
        <VesselConditionAtDeparture />

        <!-- Consumption & Condition (departure ver.) -->
        <ConsumptionAndConditionFull
          :has-detail="true"
        ></ConsumptionAndConditionFull>

        <!-- Consumption & Condition (Harbour/In Port in Total) -->
        <ConsumptionAndConditionFull :is-yellow="true">{{
          $t("consumptionAndConditionHarbourInPortInTotal")
        }}</ConsumptionAndConditionFull>
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
        <Overview />

        <!-- Departure and Destination TODO: may need to disable some fields -->
        <DepartureAndDestination />

        <!-- Pilot Station - Departure (same format as arrival report's pilot arrival)-->
        <PilotStationArrival>{{
          $t("pilotStationDeparture")
        }}</PilotStationArrival>

        <!-- Pilot Station - Arrival (component name is purposefully flipped)-->
        <PilotStationDeparture>{{
          $t("pilotStationArrival")
        }}</PilotStationDeparture>

        <!-- Distance & Time (R/UP Engine) & S/BY to R/UP (In Harbour)-->
        <DistanceAndTimeCOSP />

        <!-- Budget Trans Ocean (Pilot to Pilot) -->
        <BudgetTransOcean />

        <!-- Consumption & Condition (S/BY to R/UP) -->
        <ConsumptionAndCondition>{{
          $t("consumptionAndConditionSbyToRup")
        }}</ConsumptionAndCondition>
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

import Overview from "@/components/ReportComponents/Overview.vue";
import DepartureAndDestination from "@/components/ReportComponents/DepartureAndDestination.vue";
import CargoOperation from "@/components/ReportComponents/CargoOperation.vue";
import VesselConditionAtDeparture from "@/components/ReportComponents/VesselConditionAtDeparture.vue";
import ConsumptionAndConditionFull from "@/components/ReportComponents/ConsumptionAndConditionFull.vue";
import PilotStationArrival from "@/components/ReportComponents/PilotStationArrival.vue";
import PilotStationDeparture from "@/components/ReportComponents/PilotStationDeparture.vue";
import DistanceAndTimeCOSP from "@/components/ReportComponents/DistanceAndTimeCOSP.vue";
import BudgetTransOcean from "@/components/ReportComponents/BudgetTransOcean.vue";
import ConsumptionAndCondition from "@/components/ReportComponents/ConsumptionAndCondition.vue";
</script>
