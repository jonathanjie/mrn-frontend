<template>
  <div class="flex flex-col space-y-6 my-6">
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
    <GradientButton class="p-3 text-14" type="button" v-on:click="sendReport()">
      <!-- TODO: need alternate function for saving changes to backend -->
      <template v-slot:content>{{ $t("sendReport") }}</template>
    </GradientButton>
  </div>
</template>

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
import {
  Report,
  FuelOil,
  LubricatingOil,
  ConsumptionType,
  TotalConsumptionType,
} from "@/constants";
import { parsePositionToString, parsePortLocode } from "@/utils/helpers.js";

const store = useDepartureSBYReportStore();
const {
  // Overview
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
  freshwaterRob,
  // Consumption And Condition (Total)
  lsfoTotalConsumptionSum,
  lsfoRobSum,
  mgoTotalConsumptionSum,
  mgoRobSum,
  lsfoBreakdownSum,
  mgoBreakdownSum,
  fuelOilDataCorrectionSum,
  mecylinderBreakdownSum,
  mesystemBreakdownSum,
  mesumpBreakdownSum,
  gesystemBreakdownSum,
  mecylinderRobSum,
  mesystemRobSum,
  mesumpRobSum,
  gesystemRobSum,
  lubricatingOilDataCorrectionSum,
  freshwaterConsumedSum,
  freshwaterEvaporatedSum,
  freshwaterReceivingSum,
  freshwaterDischargingSum,
  freshwaterRobSum,
} = storeToRefs(store);

const submissionStatusStore = useSubmissionStatusStore();
const { isSubmissionRequested, isSubmissionSuccessful, errorMessage } =
  storeToRefs(submissionStatusStore);

const sendReport = async () => {
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

  const REPORT = {
    report_type: Report.type.DEP_SBY,
    voyage: voyageNo.value,
    voyage_leg: legNo.value,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    reportroute: {
      departure_port: departurePort,
      departure_date: reportingDateTimeUTC.value,
      depature_tz: reportingTimeZone.value,
      // should be optional
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
      fueloildata_set: [
        {
          fuel_oil_type: FuelOil.LSFO,
          total_consumption: lsfoTotalConsumption.value || 0,
          receipt: lsfoBreakdown.value.receipt || 0,
          debunkering: lsfoBreakdown.value.debunkering || 0,
          rob: lsfoRob.value || 0,
          breakdown: {
            "G/E": lsfoBreakdown.value.ge || 0,
            "M/E": lsfoBreakdown.value.me || 0,
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
          receipt: mgoBreakdown.value.receipt || 0,
          debunkering: mgoBreakdown.value.debunkering || 0,
          rob: mgoRob.value || 0,
          breakdown: {
            "G/E": mgoBreakdown.value.ge || 0,
            "M/E": mgoBreakdown.value.me || 0,
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
        generated: freshwaterEvaporated.value || 0,
        received: freshwaterReceiving.value || 0,
        discharged: freshwaterDischarging.value || 0,
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.LAST_TO_SBY,
    },
    totalconsumptiondata: {
      fueloiltotalconsumptiondata_set: [
        {
          fuel_oil_type: FuelOil.LSFO,
          total_consumption: lsfoTotalConsumptionSum.value || 0,
          receipt: lsfoBreakdownSum.value.receipt || 0,
          debunkering: lsfoBreakdownSum.value.debunkering || 0,
          rob: lsfoRobSum.value || 0,
          breakdown: {
            GE: lsfoBreakdownSum.value.ge || 0,
            ME: lsfoBreakdownSum.value.me || 0,
            BLR: lsfoBreakdownSum.value.blr || 0,
            IGG: lsfoBreakdownSum.value.igg || 0,
          },
          fueloiltotalconsumptiondatacorrection:
            fuelOilDataCorrectionSum.value.type === FuelOil.LSFO
              ? {
                  correction: fuelOilDataCorrectionSum.value.correction,
                  remarks: fuelOilDataCorrectionSum.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: FuelOil.MGO,
          total_consumption: mgoTotalConsumptionSum.value || 0,
          receipt: mgoBreakdownSum.value.receipt || 0,
          debunkering: mgoBreakdownSum.value.debunkering || 0,
          rob: mgoRobSum.value || 0,
          breakdown: {
            GE: mgoBreakdownSum.value.ge || 0,
            ME: mgoBreakdownSum.value.me || 0,
            BLR: mgoBreakdownSum.value.blr || 0,
            IGG: mgoBreakdownSum.value.igg || 0,
          },
          fueloiltotalconsumptiondatacorrection:
            fuelOilDataCorrectionSum.value.type === FuelOil.MGO
              ? {
                  correction: fuelOilDataCorrectionSum.value.correction,
                  remarks: fuelOilDataCorrectionSum.value.remarks,
                }
              : null,
        },
      ],
      lubricatingoiltotalconsumptiondata_set: [
        {
          fuel_oil_type: LubricatingOil.ME_CYLINDER,
          total_consumption:
            mecylinderBreakdownSum.value.total_consumption || 0,
          receipt: mecylinderBreakdownSum.value.receipt || 0,
          debunkering: mecylinderBreakdownSum.value.debunkering || 0,
          rob: mecylinderRobSum.value || 0,
          lubricatingoiltotalconsumptiondatacorrection:
            lubricatingOilDataCorrectionSum.value.type ===
            LubricatingOil.ME_CYLINDER
              ? {
                  correction: lubricatingOilDataCorrectionSum.value.correction,
                  remarks: lubricatingOilDataCorrectionSum.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.ME_SYSTEM,
          total_consumption: mesystemBreakdownSum.value.total_consumption || 0,
          receipt: mesystemBreakdownSum.value.receipt || 0,
          debunkering: mesystemBreakdownSum.value.debunkering || 0,
          rob: mesystemRobSum.value || 0,
          lubricatingoiltotalconsumptiondatacorrection:
            lubricatingOilDataCorrectionSum.value.type ===
            LubricatingOil.ME_SYSTEM
              ? {
                  correction: lubricatingOilDataCorrectionSum.value.correction,
                  remarks: lubricatingOilDataCorrectionSum.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.ME_SUMP,
          total_consumption: mesumpBreakdownSum.value.total_consumption || 0,
          receipt: mesumpBreakdownSum.value.receipt || 0,
          debunkering: mesumpBreakdownSum.value.debunkering || 0,
          rob: mesumpRobSum.value || 0,
          lubricatingoiltotalconsumptiondatacorrection:
            lubricatingOilDataCorrectionSum.value.type ===
            LubricatingOil.ME_SUMP
              ? {
                  correction: lubricatingOilDataCorrectionSum.value.correction,
                  remarks: lubricatingOilDataCorrectionSum.value.remarks,
                }
              : null,
        },
        {
          fuel_oil_type: LubricatingOil.GE_SYSTEM,
          total_consumption: gesystemBreakdownSum.value.total_consumption || 0,
          receipt: gesystemBreakdownSum.value.receipt || 0,
          debunkering: gesystemBreakdownSum.value.debunkering || 0,
          rob: gesystemRobSum.value || 0,
          lubricatingoiltotalconsumptiondatacorrection:
            lubricatingOilDataCorrectionSum.value.type ===
            LubricatingOil.GE_SYSTEM
              ? {
                  correction: lubricatingOilDataCorrectionSum.value.correction,
                  remarks: lubricatingOilDataCorrectionSum.value.remarks,
                }
              : null,
        },
      ],
      freshwatertotalconsumptiondata: {
        consumed: freshwaterConsumedSum.value || 0,
        generated: freshwaterEvaporatedSum.value || 0,
        received: freshwaterReceivingSum.value || 0,
        discharged: freshwaterDischargingSum.value || 0,
        rob: freshwaterRobSum.value || 0,
      },
      consumption_type: TotalConsumptionType.IN_HARBOUR_PORT,
    },
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
