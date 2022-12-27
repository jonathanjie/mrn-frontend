<script setup>
import { defineProps } from "vue";
import { Report } from "@/constants";
import TabsWrapper from "../../components/Tabs/TabsWrapper.vue";
import Tab from "../../components/Tabs/Tab.vue";

import GradientButton from "@/components/Buttons/GradientButton.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";

import DepartureSBYOverview from "@/components/Reports/DepartureReport/DepartureSBYOverview.vue";
import DeparturePilotStationDeparture from "@/components/Reports/DepartureReport/DeparturePilotStationDeparture.vue";
import DepartureDistanceAndTime from "@/components/Reports/DepartureReport/DepartureDistanceAndTime.vue";
import DepartureSBYTotalConsumption from "@/components/Reports/DepartureReport/DepartureSBYTotalConsumption.vue";
import DepartureSBYConsumption from "@/components/Reports/DepartureReport/DepartureSBYConsumption.vue";
import DepartureBudgetTransOcean from "@/components/Reports/DepartureReport/DepartureBudgetTransOcean.vue";
import DepartureAndDestination from "@/components/Reports/DepartureReport/DepartureAndDestination.vue";

import DepartureCOSPOverview from "@/components/Reports/DepartureReport/DepartureCOSPOverview.vue";
import DepartureCargoOperation from "@/components/Reports/DepartureReport/DepartureCargoOperation.vue";
import DepartureVesselCondition from "@/components/Reports/DepartureReport/DepartureVesselCondition.vue";
import DepartureCOSPConsumption from "@/components/Reports/DepartureReport/DepartureCOSPConsumption.vue";
import DeparturePilotStationArrival from "@/components/Reports/DepartureReport/DeparturePilotStationArrival.vue";

import DepartureReportCOSP from "./DepartureReportCOSP/DepartureReportCOSP.vue";
import DepartureReportSBY from "./DepartureReportCOSP/DepartureReportCOSP.vue";
const props = defineProps({
  report: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <div v-if="report.report_type == Report.type.DEP_SBY">
      <DepartureReportSBY :report="report" />
    </div>
    <div v-else-if="report.report_type == Report.type.DEP_COSP_RUP">
      <DepartureReportCOSP :report="report" />
    </div>
    <div v-else>
      <div>Invalid Report Type</div>
    </div>

  
    <TabsWrapper v-show="false" class="mt-5">
      <Tab :title="$t('sbyForDeparture')">
        <div class="flex flex-col space-y-6 my-6">
          <!-- Overview -->
          <DepartureSBYOverview :report="props.report" />

          <!-- Departure and Destination -->
          <DepartureAndDestination :report="props.report" />

          <!-- Cargo Operation -->
          <DepartureCargoOperation :report="props.report" />

          <!-- Vessel Condition at Departure -->
          <DepartureVesselCondition :report="props.report" />

          <!-- Consumption & Condition (departure ver.) -->
          <DepartureSBYConsumption :report="props.report" />

          <!-- Consumption & Condition (Harbour/In Port in Total) -->
          <DepartureSBYTotalConsumption :report="props.report">{{
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
          <DepartureAndDestination />

          <!-- Pilot Station - Departure -->
          <DeparturePilotStationDeparture>{{
            $t("pilotStationDeparture")
          }}</DeparturePilotStationDeparture>

          <!-- Pilot Station - Arrival -->
          <DeparturePilotStationArrival>{{
            $t("pilotStationArrival")
          }}</DeparturePilotStationArrival>

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
  </div>
</template>
