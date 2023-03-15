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
import AdditionalRemarks from "@/components/Reports/DepartureReport/DepartureSBYAddRemarks.vue";
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
import axios from "axios";

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
  pilotDepTimeZone,
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
  // Additional Remarks
  additionalRemarks,
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
          timezone: reportingTimeZone.value,
          date: pilotDepDateTimeUTC.value || null,
          position: pilotPosition,
        }
      : null,
    consumptionconditiondata: {
      fueloildata_set: fuelOilData,
      lubricatingoildata_set: lubricatingOilData,
      freshwaterdata: {
        consumed: Number(freshwaterConsumed.value),
        generated: Number(freshwaterGenerated.value),
        received: Number(freshwaterReceiving.value),
        discharged: Number(freshwaterDischarging.value),
        rob: isFirstReport.value
          ? Number(freshwaterRobStatic.value)
          : Number(freshwaterRobComputed.value),
      },
      consumption_type: ConsumptionType.LAST_TO_SBY,
    },
    totalconsumptiondata: !isFirstReport.value
      ? {
          fueloiltotalconsumptiondata_set: fuelOilDataSum,
          lubricatingoiltotalconsumptiondata_set: lubricatingOilDataSum,
          freshwatertotalconsumptiondata: {
            consumed: Number(freshwaterConsumedSum.value),
            generated: Number(freshwaterGeneratedSum.value),
            received: Number(freshwaterReceivingSum.value),
            discharged: Number(freshwaterDischargingSum.value),
            rob: Number(freshwaterRobSum.value),
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
    additionalremarks:
      additionalRemarks.value === ""
        ? null
        : { remarks: additionalRemarks.value },
    // can change the above to null once the database is updated
  };

  console.log("data: ", JSON.stringify(REPORT));

  isSubmissionModalVisible.value = true;
  axios
    .post(`${process.env.VUE_APP_URL_DOMAIN}/marinanet/reports/`, REPORT)
    .then(() => {
      isSubmissionSuccessful.value = true;
    })
    .catch((error) => {
      if (error.response.status == 400) {
        errorMessage.value = error.response.data;
      } else {
        errorMessage.value = {
          unexpectedError: ["Please contact the administrator."],
        };
      }
    })
    .finally(() => {
      isSubmissionResponse.value = true;
    });
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

    <!-- Additional Remarks -->
    <AdditionalRemarks />
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
