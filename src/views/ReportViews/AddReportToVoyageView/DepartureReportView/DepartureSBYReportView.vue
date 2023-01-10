<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import DepartureAndDestinationSBY from "@/components/Reports/DepartureReport/DepartureAndDestinationSBY.vue";
import DepartureCargoOperation from "@/components/Reports/DepartureReport/DepartureCargoOperation.vue";
import DepartureVesselCondition from "@/components/Reports/DepartureReport/DepartureVesselCondition.vue";
import DepartureSBYTotalConsumption from "@/components/Reports/DepartureReport/DepartureSBYTotalConsumption.vue";
import DepartureSBYConsumption from "@/components/Reports/DepartureReport/DepartureSBYConsumption.vue";
import DepartureSBYPilotStation from "@/components/Reports/DepartureReport/DepartureSBYPilotStation.vue";
import DepartureSBYOverview from "@/components/Reports/DepartureReport/DepartureSBYOverview.vue";
import { useDepartureSBYReportStore } from "@/stores/useDepartureSBYReportStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import { storeToRefs } from "pinia";
import { Report, ConsumptionType, TotalConsumptionType } from "@/constants";
import {
  parsePositionToString,
  parsePortLocode,
  generateFuelOilData,
  generateLubricatingOilData,
} from "@/utils/helpers.js";
import { UrlDomain } from "@/constants";
import { useLatestReportDetailsStore } from "@/stores/useLatestReportDetailsStore";

const store = useDepartureSBYReportStore();
const {
  fuelOils,
  lubricatingOils,
  // Overview
  voyageUuid,
  reportNo,
  legNo,
  voyageNo,
  reportingTimeZone,
  reportingDateTimeUTC,
  // Departure and Destination
  departurePortCountry,
  departurePortName,
  destinationPortCountry,
  destinationPortName,
  destinationTimeZone,
  destinationEstimatedArrivalUTC,
  // Cargo Operation
  loadCondition,
  loading,
  unloading,
  totalAmount,
  time,
  // Vessel Condition at Departure
  draftFwd,
  draftMid,
  draftAft,
  constant,
  gm,
  ballast,
  displacement,
  // Pilot station - Departure
  shouldPilotDepDataBeSent,
  pilotDepName,
  pilotDepDateTimeUTC,
  pilotDepLatDir,
  pilotDepLatDegree,
  pilotDepLatMinute,
  pilotDepLongDir,
  pilotDepLongDegree,
  pilotDepLongMinute,
  // Consumption And Condition
  fuelOilRobs,
  fuelOilBreakdowns,
  fuelOilTotalConsumptions,
  fuelOilReceipts,
  fuelOilDebunkerings,
  fuelOilDataCorrection,
  lubricatingOilBreakdowns,
  lubricatingOilRobs,
  lubricatingOilDataCorrection,
  freshwaterConsumed,
  freshwaterGenerated,
  freshwaterReceiving,
  freshwaterDischarging,
  freshwaterRob,
  // Consumption And Condition (Total)
  fuelOilRobsSum,
  fuelOilBreakdownsSum,
  fuelOilReceiptsSum,
  fuelOilDebunkeringsSum,
  fuelOilTotalConsumptionsSum,
  lubricatingOilBreakdownsSum,
  lubricatingOilRobsSum,
  freshwaterConsumedSum,
  freshwaterGeneratedSum,
  freshwaterReceivingSum,
  freshwaterDischargingSum,
  freshwaterRobSum,
} = storeToRefs(store);

const latestReportDetailsStore = useLatestReportDetailsStore();
const { latestReportDetails } = storeToRefs(latestReportDetailsStore);

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
  isSubmissionSuccessful,
  errorMessage,
} = storeToRefs(submissionStatusStore);

const sendReport = async () => {
  isSubmissionRequested.value = true;

  const pilotPosition = parsePositionToString({
    latDir: pilotDepLatDir.value,
    latMinutes: pilotDepLatMinute.value,
    latDegree: pilotDepLatDegree.value,
    longDir: pilotDepLongDir.value,
    longMinutes: pilotDepLongMinute.value,
    longDegree: pilotDepLongDegree.value,
  });

  const departurePort = parsePortLocode({
    portCountry: departurePortCountry.value,
    portName: departurePortName.value,
  });

  const destinationPort = parsePortLocode({
    portCountry: destinationPortCountry.value,
    portName: destinationPortName.value,
  });

  const fuelOilData = generateFuelOilData(
    fuelOils.value,
    fuelOilBreakdowns.value,
    fuelOilTotalConsumptions.value,
    fuelOilRobs.value,
    fuelOilDataCorrection.value,
    fuelOilReceipts.value,
    fuelOilDebunkerings.value
  );

  const lubricatingOilData = generateLubricatingOilData(
    lubricatingOils.value,
    lubricatingOilBreakdowns.value,
    lubricatingOilRobs.value,
    lubricatingOilDataCorrection.value
  );

  const fuelOilDataSum = generateFuelOilData(
    fuelOils.value,
    fuelOilBreakdownsSum.value,
    fuelOilTotalConsumptionsSum.value,
    fuelOilReceiptsSum.value,
    fuelOilDebunkeringsSum.value,
    fuelOilRobsSum.value
  );

  const lubricatingOilDataSum = generateLubricatingOilData(
    lubricatingOils.value,
    lubricatingOilBreakdownsSum.value,
    lubricatingOilRobsSum.value
  );

  const REPORT = {
    report_type: Report.type.DEP_SBY,
    voyage: voyageNo.value,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    voyage_leg: {
      leg_num: legNo.value,
      voyage: {
        uuid: voyageUuid.value,
      },
      departure_port: departurePort,
      departure_date: reportingDateTimeUTC.value,
      departure_tz: reportingTimeZone.value,
      // TODO: should be optional in backend
      arrival_port: destinationPort || null,
      arrival_date: destinationEstimatedArrivalUTC.value || null,
      arrival_tz: destinationTimeZone.value || null,
    },
    reportroute: {
      departure_port: departurePort,
      departure_date: reportingDateTimeUTC.value,
      departure_tz: reportingTimeZone.value,
      // TODO: should be optional in backend
      arrival_port: destinationPort || null,
      arrival_date: destinationEstimatedArrivalUTC.value || null,
      arrival_tz: destinationTimeZone.value || null,
    },
    cargooperation: {
      load_condition: loadCondition.value,
      loading: loading.value,
      unloading: unloading.value,
      total: totalAmount.value,
      time: time.value,
    },
    departurevesselcondition: {
      draft_fwd: draftFwd.value,
      draft_mid: draftMid.value,
      draft_aft: draftAft.value,
      constant: constant.value,
      gm: gm.value,
      ballast: ballast.value,
      displacement: displacement.value,
    },
    departurepilotstation: shouldPilotDepDataBeSent.value
      ? {
          name: pilotDepName.value,
          date: pilotDepDateTimeUTC.value || null,
          position: pilotPosition,
        }
      : null,
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: freshwaterConsumed.value || 0,
        generated: freshwaterGenerated.value || 0,
        received: freshwaterReceiving.value || 0,
        discharged: freshwaterDischarging.value || 0,
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.LAST_TO_SBY,
    },
    totalconsumptiondata: {
      fueloiltotalconsumptiondata_set: fuelOilDataSum,
      lubricatingoiltotalconsumptiondata_set: lubricatingOilDataSum,
      freshwatertotalconsumptiondata: {
        consumed: freshwaterConsumedSum.value || 0,
        generated: freshwaterGeneratedSum.value || 0,
        received: freshwaterReceivingSum.value || 0,
        discharged: freshwaterDischargingSum.value || 0,
        rob: freshwaterRobSum.value || 0,
      },
      consumption_type: TotalConsumptionType.IN_HARBOUR_PORT,
    },
  };

  console.log("data: ", REPORT);

  const response = await fetch(`${UrlDomain.DEV}/marinanet/reports/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(REPORT),
  });

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
    isSubmissionModalVisible.value = true;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="flex flex-col space-y-6 my-6">
    <!-- <div>{{ latestReportDetails }}</div> -->

    <!-- Overview -->
    <DepartureSBYOverview />

    <!-- Departure and Destination -->
    <DepartureAndDestinationSBY />

    <!-- Cargo Operation -->
    <DepartureCargoOperation />

    <!-- Vessel Condition at Departure -->
    <DepartureVesselCondition />

    <!-- Pilot Station - Departure -->
    <DepartureSBYPilotStation />

    <!-- Consumption & Condition (departure ver.) -->
    <DepartureSBYConsumption />

    <!-- Consumption & Condition (Harbour/In Port in Total) -->
    <DepartureSBYTotalConsumption />
  </div>

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
      :disabled="isSubmissionRequested"
    >
      <!-- TODO: need alternate function for saving changes to backend -->
      <template v-slot:content>{{ $t("sendReport") }}</template>
    </GradientButton>
  </div>
</template>
