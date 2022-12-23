<template>
  <div class="flex flex-col space-y-6 my-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <RadioBtnDetail
        :icon="require('@/assets/icons/in_port.svg')"
        :content="$t('inPortBerthingShiftingDryDocking')"
        type="in_port"
        :active="reportType"
        @onUpdateBtn="updateActiveReportType"
      >
      </RadioBtnDetail>
      <RadioBtnDetail
        :icon="require('@/assets/icons/coastal_water.svg')"
        :content="$t('coastalWaterAnchoringDrifting')"
        type="coastal_water"
        :active="reportType"
        @onUpdateBtn="updateActiveReportType"
      >
      </RadioBtnDetail>
    </div>

    <!-- Overview -->
    <HarbourPortOverview />

    <!-- Report -->
    <HarbourPortReport />

    <!-- Consumption & Condition -->
    <HarbourPortConsumption>{{
      $t("consumptionAndConditionLastReportToEventNoon")
    }}</HarbourPortConsumption>

    <!-- Save and Send -->
    <div class="flex justify-end space-x-4 my-6">
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
import HarbourPortOverview from "@/components/Reports/HarbourPortReport/HarbourPortOverview.vue";
import HarbourPortReport from "@/components/Reports/HarbourPortReport/HarbourPortReport.vue";
import HarbourPortConsumption from "@/components/Reports/HarbourPortReport/HarbourPortConsumption.vue";
import RadioBtnDetail from "@/components/Buttons/RadioBtnDetail.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
import { useHarbourPortReportStore } from "@/stores/useHarbourPortReportStore";
import { storeToRefs } from "pinia";

const store = useHarbourPortReportStore();
const {
  // status var
  reportType,
  eventOrNoon,
  // Harbour Port Overview
  reportNo,
  legNo,
  voyageNo,
  reportingDateTime,
  reportingTimeZone,
  departurePortCountry,
  departurePortName,
  destinationPortCountry,
  destinationPortName,
  // Harbour Port Report
  status,
  distanceTravelled,
  latDir,
  latMinutes,
  latDegree,
  longDir,
  longMinutes,
  longDegree,
  operations,
  // Consumption And Condition (Full)
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
  freshwaterReceiving,
  freshwaterDischarging,
  freshwaterChange,
  freshwaterRob,
} = storeToRefs(store);

const updateActiveReportType = (type) => {
  reportType.value = type;
};
</script>
