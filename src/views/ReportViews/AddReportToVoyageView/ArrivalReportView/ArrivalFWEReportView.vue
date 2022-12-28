<template>
  <div class="flex flex-col space-y-6 mt-6">
    <!-- Overview -->
    <ArrivalFWEOverview />

    <!-- Finish With Engine -->
    <ArrivalFinishWithEngine />

    <!-- Pilot Station - Arrival -->
    <ArrivalFWEPilotStation />

    <!-- Distance & Time (S/BY to F.W.E) -->
    <ArrivalFWEDistanceAndTime />

    <!-- Consumption & Condition (S/BY - F.W.E) -->
    <ArrivalFWEConsumption />

    <!-- ArrivalFWESummary: Actual Performance (Port to Port) & Total Consumption (Pilot to Pilot) -->
    <ArrivalFWESummary />
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
    <GradientButton class="p-3 text-14" type="button" v-on:click="sendReport()">
      <!-- TODO: need alternate function for saving changes to backend -->
      <template v-slot:content>{{ $t("sendReport") }}</template>
    </GradientButton>
  </div>
</template>

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import ArrivalFWEDistanceAndTime from "@/components/Reports/ArrivalReport/ArrivalFWEDistanceAndTime.vue";
import ArrivalFWEPilotStation from "@/components/Reports/ArrivalReport/ArrivalFWEPilotStation.vue";
import ArrivalFWEConsumption from "@/components/Reports/ArrivalReport/ArrivalFWEConsumption.vue";
import ArrivalFinishWithEngine from "@/components/Reports/ArrivalReport/ArrivalFinishWithEngine.vue";
import ArrivalFWESummary from "@/components/Reports/ArrivalReport/ArrivalFWESummary.vue";
import ArrivalFWEOverview from "@/components/Reports/ArrivalReport/ArrivalFWEOverview.vue";
import { storeToRefs } from "pinia";
import { useArrivalFWEReportStore } from "@/stores/useArrivalFWEReportStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import {
  Report,
  FuelOil,
  LubricatingOil,
  ConsumptionType,
  TotalConsumptionType,
  ActualPerformanceType,
} from "@/constants";
import { parsePositionToString } from "@/utils/helpers.js";
import { OPERATIONS } from "@/utils/options";

const store = useArrivalFWEReportStore();
const {
  // Overview
  reportNo,
  legNo,
  voyageNo,
  reportingTimeZone,
  reportingDateTimeUTC,
  // Finish With Engine
  latDir,
  latMinute,
  latDegree,
  longDir,
  longMinute,
  longDegree,
  otherPlannedOperation,
  operations,
  status,
  // Pilot Station -- Arrival
  shouldPilotArrDataBeSent,
  pilotArrName,
  pilotArrDateTimeUTC,
  pilotArrDraftFwd,
  pilotArrDraftMid,
  pilotArrDraftAft,
  pilotArrLatDir,
  pilotArrLatDegree,
  pilotArrLatMinute,
  pilotArrLongDir,
  pilotArrLongDegree,
  pilotArrLongMinute,
  // Distance & Time (S/BY to F.W.E)
  hours,
  distanceObs,
  distanceEng,
  revolutionCount,
  // Consumption and Condition
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
  freshwaterRob,
  // Actual performance
  totalDistanceObs,
  totalSailingTime,
  lsfoMeSum,
  lsfoGeSum,
  lsfoBoilerSum,
  lsfoIggSum,
  lsfoTotalSum,
  mgoMeSum,
  mgoGeSum,
  mgoBoilerSum,
  mgoIggSum,
  mgoTotalSum,
} = storeToRefs(store);

const submissionStatusStore = useSubmissionStatusStore();
const { isSubmissionRequested, isSubmissionSuccessful, errorMessage } =
  storeToRefs(submissionStatusStore);

console.log(operations.value);

const includesOperation = (op) => operations.value.includes(op);

const sendReport = async () => {
  const pilotArrPosition = parsePositionToString({
    latDir: pilotArrLatDir.value,
    latMinutes: pilotArrLatMinute.value,
    latDegree: pilotArrLatDegree.value,
    longDir: pilotArrLongDir.value,
    longMinutes: pilotArrLongMinute.value,
    longDegree: pilotArrLongDegree.value,
  });
  const arrivalFwePosition = parsePositionToString({
    latDir: latDir.value,
    latMinutes: latMinute.value,
    latDegree: latDegree.value,
    longDir: longDir.value,
    longMinutes: longMinute.value,
    longDegree: longDegree.value,
  });

  const REPORT = {
    report_type: Report.type.ARR_FWE,
    voyage: voyageNo.value,
    voyage_leg: legNo.value,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    arrivalfwetimeandposition: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: arrivalFwePosition,
      parking_status: status.value,
    },
    plannedoperations: {
      cargo_operation_berth: includesOperation(OPERATIONS.cargoOperationBerth),
      cargo_operation_stsstb: includesOperation(
        OPERATIONS.cargoOperationSTSSTB
      ),
      bunkering_debunkering: includesOperation(OPERATIONS.bunkeringDebunkering),
      dry_docking: includesOperation(OPERATIONS.dryDocking),
      crew_change: includesOperation(OPERATIONS.crewChange),
      receiving_provisions_spares: includesOperation(
        OPERATIONS.receivingProvisionSpareParts
      ),
      surveying: includesOperation(OPERATIONS.survey),
      others: includesOperation("others"),
      planned_operation_othersdetails: otherPlannedOperation.value || "NIL",
    },
    arrivalpilotstation: shouldPilotArrDataBeSent.value
      ? {
          name: pilotArrName.value,
          date: pilotArrDateTimeUTC.value,
          position: pilotArrPosition,
          draft_fwd: pilotArrDraftFwd.value,
          draft_mid: pilotArrDraftMid.value,
          draft_aft: pilotArrDraftAft.value,
        }
      : null,
    distancetimedata: {
      time: hours.value,
      distance_obs: distanceObs.value,
      distance_eng: distanceEng.value,
      revolution_count: revolutionCount.value,
      set_rpm: 0, // irrelevant for Arrival FWE report
    },
    consumptionconditiondata: {
      fueloildata_set: [
        {
          fuel_oil_type: FuelOil.LSFO,
          total_consumption: lsfoTotalConsumption.value || 0,
          receipt: 0, // Does not apply for Arrival FWE reports
          debunkering: 0, // Does not apply for Arrival FWE reports
          rob: lsfoRob.value || 0,
          breakdown: {
            GE: lsfoBreakdown.value.ge || 0,
            ME: lsfoBreakdown.value.me || 0,
            BLR: lsfoBreakdown.value.blr || 0,
            IGG: lsfoBreakdown.value.igg || 0,
          },
          fueloildatacorrection:
            fuelOilDataCorrection.value.type === FuelOil.LSFO
              ? {
                  correction: fuelOilDataCorrection.value.correction,
                  remarks: fuelOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: FuelOil.MGO,
          total_consumption: mgoTotalConsumption.value || 0,
          receipt: 0, // Does not apply for Arrival FWE reports
          debunkering: 0, // Does not apply for Arrival FWE reports
          rob: mgoRob.value || 0,
          breakdown: {
            GE: mgoBreakdown.value.ge || 0,
            ME: mgoBreakdown.value.me || 0,
            BLR: mgoBreakdown.value.blr || 0,
            IGG: mgoBreakdown.value.igg || 0,
          },
          fueloildatacorrection:
            fuelOilDataCorrection.value.type === FuelOil.MGO
              ? {
                  correction: fuelOilDataCorrection.value.correction,
                  remarks: fuelOilDataCorrection.value.remarks,
                }
              : null,
        },
      ],
      lubricatingoildata_set: [
        {
          fuel_oil_type: LubricatingOil.ME_CYLINDER,
          total_consumption: mecylinderBreakdown.value.total_consumption || 0,
          receipt: mecylinderBreakdown.value.receipt || 0,
          debunkering: mecylinderBreakdown.value.debunkering || 0,
          rob: mecylinderRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type ===
            LubricatingOil.ME_CYLINDER
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.ME_SYSTEM,
          total_consumption: mesystemBreakdown.value.total_consumption || 0,
          receipt: mesystemBreakdown.value.receipt || 0,
          debunkering: mesystemBreakdown.value.debunkering || 0,
          rob: mesystemRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === LubricatingOil.ME_SYSTEM
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.ME_SUMP,
          total_consumption: mesumpBreakdown.value.total_consumption || 0,
          receipt: mesumpBreakdown.value.receipt || 0,
          debunkering: mesumpBreakdown.value.debunkering || 0,
          rob: mesumpRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === LubricatingOil.ME_SUMP
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.GE_SYSTEM,
          total_consumption: gesystemBreakdown.value.total_consumption || 0,
          receipt: gesystemBreakdown.value.receipt || 0,
          debunkering: gesystemBreakdown.value.debunkering || 0,
          rob: gesystemRob.value || 0,
          lubricatingoildatacorrection:
            lubricatingOilDataCorrection.value.type === LubricatingOil.GE_SYSTEM
              ? {
                  correction: lubricatingOilDataCorrection.value.correction,
                  remarks: lubricatingOilDataCorrection.value.remarks,
                }
              : null,
        },
      ],
      freshwaterdata: {
        consumed: freshwaterConsumed.value || 0,
        generated: freshwaterGenerated.value || 0,
        received: 0, // Does not apply for Arrival FWE reports
        discharged: 0, // Does not apply for Arrival FWE reports
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.SBY_TO_FWE,
    },
    actualperformancedata: {
      actual_performance_type: ActualPerformanceType.PORT_TO_PORT,
      distance_obs_total: totalDistanceObs.value,
      sailing_time: totalSailingTime.value,
      displacement: 0, // Does not apply for Arrival FWE reports
      speed_average: 0, // Does not apply for Arrival FWE reports
      rpm_average: 0, // Does not apply for Arrival FWE reports
      me_average_daily_fo_consumption: 0, // Does not apply for Arrival FWE reports
    },
    totalconsumptiondata: {
      fueloiltotalconsumptiondata_set: [
        {
          fueloiltotalconsumptiondatacorrection: null,
          fuel_oil_type: FuelOil.LSFO,
          total_consumption: lsfoTotalSum.value,
          receipt: 0, // irrelevant for total consumption in Arrival FWE
          debunkering: 0, // irrelevant for total consumption in Arrival FWE
          rob: 0, // irrelevant for total consumption in Arrival FWE
          breakdown: {
            GE: lsfoGeSum.value,
            ME: lsfoMeSum.value,
            IGG: lsfoIggSum.value,
            BLR: lsfoBoilerSum.value,
          },
        },
        {
          fueloiltotalconsumptiondatacorrection: null,
          fuel_oil_type: FuelOil.MGO,
          total_consumption: mgoTotalSum.value,
          receipt: 0, // irrelevant for total consumption in Arrival FWE
          debunkering: 0, // irrelevant for total consumption in Arrival FWE
          rob: 0, // irrelevant for total consumption in Arrival FWE
          breakdown: {
            GE: mgoGeSum.value,
            ME: mgoMeSum.value,
            IGG: mgoIggSum.value,
            BLR: mgoBoilerSum.value,
          },
        },
      ],
      freshwatertotalconsumptiondata: null,
      consumption_type: TotalConsumptionType.PORT_TO_PORT,
    },
  };

  console.log("data: ", REPORT);

  const response = await fetch(
    "https://testapi.marinachain.io/marinanet/reports/",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify(REPORT),
    }
  );

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
    isSubmissionRequested.value = true;
  } catch (error) {
    console.log(error);
  }
};
</script>
