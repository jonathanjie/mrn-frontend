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
      $t("consumptionAndConditionLastReportEventNoon")
    }}</HarbourPortConsumption>

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
  </div>
</template>

<script setup>
import HarbourPortOverview from "@/components/Reports/HarbourPortReport/HarbourPortOverview.vue";
import HarbourPortReport from "@/components/Reports/HarbourPortReport/HarbourPortReport.vue";
import HarbourPortConsumption from "@/components/Reports/HarbourPortReport/HarbourPortConsumption.vue";
import RadioBtnDetail from "@/components/Buttons/RadioBtnDetail.vue";
import CustomButton from "@/components/Buttons/CustomButton.vue";
import GradientButton from "@/components/Buttons/GradientButton.vue";
import { Report } from "@/constants";
import { useHarbourPortReportStore } from "@/stores/useHarbourPortReportStore";
import { storeToRefs } from "pinia";

const store = useHarbourPortReportStore();
const {
  // status var
  reportType,
  // Harbour Port Overview
  reportNo,
  legNo,
  voyageNo,
  departurePortCountry,
  departurePortName,
  destinationPortCountry,
  destinationPortName,
  // Harbour Port Report
  type,
  status,
  dateTime,
  timeZone,
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
  freshwaterGenerated,
  freshwaterReceiving,
  freshwaterDischarging,
  freshwaterChange,
  freshwaterRob,
} = storeToRefs(store);

const updateActiveReportType = (type) => {
  reportType.value = type;
};

const sendReport = async () => {
  let REPORT = {
    report_type: Report.type.BUNKER,
    voyage: 1, // TODO: fetch from db
    leg_num: 1, // TODO: fetch from db
    report_tz: timeZone.value, // FIND TIMEZONE FROM PORT
    report_num: 1, // TODO: fetch from db
    report_date: dateTime.value,
    position: null, // no pos for bunker report
    // TODO: MORE BELOW, when backend is done
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
