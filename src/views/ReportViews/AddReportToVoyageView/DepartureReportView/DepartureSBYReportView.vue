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

const store = useDepartureSBYReportStore();
const {
  isFirstReport,
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
  totalAmountComputed,
  totalAmountStatic,
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
  fuelOilRobsComputed,
  fuelOilRobsStatic,
  fuelOilBreakdowns,
  fuelOilReceipts,
  fuelOilDebunkerings,
  fuelOilTotalConsumptions,
  fuelOilDataCorrection,
  lubricatingOilRobsComputed,
  lubricatingOilRobsStatic,
  lubricatingOilBreakdowns,
  lubricatingOilDataCorrection,
  freshwaterConsumed,
  freshwaterGenerated,
  freshwaterReceiving,
  freshwaterDischarging,
  freshwaterRobComputed,
  freshwaterRobStatic,
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

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
  isSubmissionResponse,
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
    isFirstReport.value ? fuelOilRobsStatic.value : fuelOilRobsComputed.value,
    fuelOilDataCorrection.value,
    fuelOilReceipts.value,
    fuelOilDebunkerings.value
  );

  // console.log(
  //   fuelOils.value,
  //   fuelOilBreakdowns.value,
  //   fuelOilTotalConsumptions.value,
  //   isFirstReport.value,
  //   fuelOilDataCorrection.value,
  //   fuelOilReceipts.value,
  //   fuelOilDebunkerings.value
  // );

  const lubricatingOilData = generateLubricatingOilData(
    lubricatingOils.value,
    lubricatingOilBreakdowns.value,
    isFirstReport.value
      ? lubricatingOilRobsStatic.value
      : lubricatingOilRobsComputed.value,
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
      loading: Number(loading.value) || 0,
      unloading: Number(unloading.value) || 0,
      total: isFirstReport.value
        ? Number(totalAmountStatic.value) || 0
        : Number(totalAmountComputed.value) || 0,
      time: Number(time.value) || 0,
    },
    departurevesselcondition: {
      draft_fwd: Number(draftFwd.value),
      draft_mid: Number(draftMid.value),
      draft_aft: Number(draftAft.value),
      constant: Number(constant.value),
      gm: Number(gm.value),
      ballast: Number(ballast.value),
      displacement: Number(displacement.value),
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
        consumed: Number(freshwaterConsumed.value) || 0,
        generated: Number(freshwaterGenerated.value) || 0,
        received: Number(freshwaterReceiving.value) || 0,
        discharged: Number(freshwaterDischarging.value) || 0,
        rob: isFirstReport.value
          ? Number(freshwaterRobStatic.value) || 0
          : Number(freshwaterRobComputed.value) || 0,
      },
      consumption_type: ConsumptionType.LAST_TO_SBY,
    },
    totalconsumptiondata: !isFirstReport.value
      ? {
          fueloiltotalconsumptiondata_set: fuelOilDataSum,
          lubricatingoiltotalconsumptiondata_set: lubricatingOilDataSum,
          freshwatertotalconsumptiondata: {
            consumed: Number(freshwaterConsumedSum.value) || 0,
            generated: Number(freshwaterGeneratedSum.value) || 0,
            received: Number(freshwaterReceivingSum.value) || 0,
            discharged: Number(freshwaterDischargingSum.value) || 0,
            rob: Number(freshwaterRobSum.value) || 0,
          },
          consumption_type: TotalConsumptionType.IN_HARBOUR_PORT,
        }
      : {
          fueloiltotalconsumptiondata_set: [],
          lubricatingoiltotalconsumptiondata_set: [],
          freshwatertotalconsumptiondata: {
            consumed: 0,
            generated: 0,
            received: 0,
            discharged: 0,
            rob: 0,
          },
          consumption_type: TotalConsumptionType.IN_HARBOUR_PORT,
        },
    // can change the above to null once the database is updated
  };

  // console.log("data: ", REPORT);

  isSubmissionModalVisible.value = true;
  const response = await fetch(
    `${process.env.VUE_APP_URL_DOMAIN}/marinanet/reports/`,
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
    // console.log(response);
    // console.log(data);

    if (response.ok) {
      isSubmissionSuccessful.value = true;
      store.$reset();
    } else {
      errorMessage.value = data;
    }
    // isSubmissionModalVisible.value = true;
    // isSubmissionResponse.value=true
  } catch (error) {
    console.log(error);
    errorMessage.value = {
      unexpectedError: ["Please contact the administrator."],
    };
    // isSubmissionModalVisible.value = true;
  }
  isSubmissionResponse.value = true;
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
    <DepartureSBYTotalConsumption v-if="!isFirstReport" />
  </div>

  <!-- Save and Send -->
  <div class="flex justify-end space-x-4 my-6">
    <!-- <CustomButton
          class="p-3 text-14"
          type="button"
          @click="saveChanges()"
        >
          <template v-slot:content>{{ $t("saveChanges") }}</template>
        </CustomButton> -->
    <GradientButton
      class="p-3 text-14"
      type="button"
      @click="sendReport()"
      :is-disabled="isSubmissionRequested"
    >
      <!-- TODO: need alternate function for saving changes to backend -->

      <template v-if="isSubmissionRequested" v-slot:content>
        <div>Loading...</div>
      </template>
      <template v-else v-slot:content>
        <div>{{ $t("sendReport") }}</div>
      </template>
    </GradientButton>
  </div>
</template>
