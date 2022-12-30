<template>
  <div class="flex flex-col space-y-6 mt-6">
    <!-- Overview -->
    <DepartureCOSPOverview />

    <!-- Departure and Destination TODO: may need to disable some fields -->
    <DepartureAndDestinationCOSP />

    <!-- Pilot Station - Departure -->
    <DepartureCOSPPilotStation />

    <!-- Pilot Station - Arrival -->
    <DeparturePilotStationArrival />

    <!-- Distance & Time (R/UP Engine) & S/BY to R/UP (In Harbour)-->
    <DepartureDistanceAndTime />

    <!-- Budget Trans Ocean (Pilot to Pilot) -->
    <DepartureBudgetTransOcean />

    <!-- Consumption & Condition (S/BY to R/UP) -->
    <DepartureCOSPConsumption />
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

<script setup>
import GradientButton from "@/components/Buttons/GradientButton.vue";
// import CustomButton from "@/components/Buttons/CustomButton.vue";
import DepartureAndDestinationCOSP from "@/components/Reports/DepartureReport/DepartureAndDestinationCOSP.vue";
import DepartureCOSPConsumption from "@/components/Reports/DepartureReport/DepartureCOSPConsumption.vue";
import DeparturePilotStationArrival from "@/components/Reports/DepartureReport/DeparturePilotStationArrival.vue";
import DepartureCOSPPilotStation from "@/components/Reports/DepartureReport/DepartureCOSPPilotStation.vue";
import DepartureDistanceAndTime from "@/components/Reports/DepartureReport/DepartureDistanceAndTime.vue";
import DepartureBudgetTransOcean from "@/components/Reports/DepartureReport/DepartureBudgetTransOcean.vue";
import DepartureCOSPOverview from "@/components/Reports/DepartureReport/DepartureCOSPOverview.vue";
import { storeToRefs } from "pinia";
import { useDepartureCOSPReportStore } from "@/stores/useDepartureCOSPReportStore";
import { useSubmissionStatusStore } from "@/stores/useSubmissionStatusStore";
import { Report, FuelOil, LubricatingOil, ConsumptionType } from "@/constants";
import { parsePositionToString, parsePortLocode } from "@/utils/helpers.js";

const store = useDepartureCOSPReportStore();
const {
  // Overview
  reportNo,
  legNo,
  voyageNo,
  reportingDateTimeUTC,
  reportingTimeZone,
  // Departure and Destination
  departurePortCountry,
  departurePortName,
  departureTimeZone,
  departureDateTimeUTC,
  destinationPortCountry,
  destinationPortName,
  destinationTimeZone,
  destinationEstimatedArrivalUTC,
  // Pilot station - Departure
  pilotDepName,
  pilotDepDateTimeUTC,
  pilotDepLatDir,
  pilotDepLatDegree,
  pilotDepLatMinute,
  pilotDepLongDir,
  pilotDepLongDegree,
  pilotDepLongMinute,
  shouldPilotDepDataBeSent,
  // Pilot Station - Arrival
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
  // R/UP Engine / Distance & Time
  rupEngLatDir,
  rupEngLatDegree,
  rupEngLatMinute,
  rupEngLongDir,
  rupEngLongDegree,
  rupEngLongMinute,
  sbyToRupTime,
  sbyToRupDistanceObs,
  sbyToRupDistanceEng,
  sbyToRupRevolutionCount,
  sbyToRupSetRPM,
  // Budget Trans Ocean (Pilot to Pilot)
  budgetDistance,
  budgetSpeed,
  meDaily,
  meRPM,
  // Consumption and Condition
  lsfoBreakdown,
  mgoBreakdown,
  lsfoTotalConsumption,
  lsfoRob,
  mgoTotalConsumption,
  mgoRob,
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
} = storeToRefs(store);

const submissionStatusStore = useSubmissionStatusStore();
const {
  isSubmissionRequested,
  isSubmissionModalVisible,
  isSubmissionSuccessful,
  errorMessage,
} = storeToRefs(submissionStatusStore);

const sendReport = async () => {
  isSubmissionRequested.value = true;

  const pilotDepPosition = parsePositionToString({
    latDir: pilotDepLatDir.value,
    latMinutes: pilotDepLatMinute.value,
    latDegree: pilotDepLatDegree.value,
    longDir: pilotDepLongDir.value,
    longMinutes: pilotDepLongMinute.value,
    longDegree: pilotDepLongDegree.value,
  });
  const pilotArrPosition = parsePositionToString({
    latDir: pilotArrLatDir.value,
    latMinutes: pilotArrLatMinute.value,
    latDegree: pilotArrLatDegree.value,
    longDir: pilotArrLongDir.value,
    longMinutes: pilotArrLongMinute.value,
    longDegree: pilotArrLongDegree.value,
  });
  const departureRupPosition = parsePositionToString({
    latDir: rupEngLatDir.value,
    latMinutes: rupEngLatMinute.value,
    latDegree: rupEngLatDegree.value,
    longDir: rupEngLongDir.value,
    longMinutes: rupEngLongMinute.value,
    longDegree: rupEngLongDegree.value,
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
    report_type: Report.type.DEP_COSP_RUP,
    voyage: voyageNo.value,
    voyage_leg: legNo.value,
    report_num: reportNo.value,
    report_date: reportingDateTimeUTC.value,
    report_tz: reportingTimeZone.value,
    reportroute: {
      departure_port: departurePort,
      departure_date: departureDateTimeUTC.value,
      depature_tz: departureTimeZone.value,
      arrival_port: destinationPort,
      arrival_date: destinationEstimatedArrivalUTC.value,
      arrival_tz: destinationTimeZone.value,
    },
    departurepilotstation: shouldPilotDepDataBeSent.value
      ? {
          name: pilotDepName.value,
          date: pilotDepDateTimeUTC.value || null,
          position: pilotDepPosition,
        }
      : null,
    arrivalpilotstation: {
      name: pilotArrName.value,
      date: pilotArrDateTimeUTC.value,
      position: pilotArrPosition,
      draft_fwd: pilotArrDraftFwd.value,
      draft_mid: pilotArrDraftMid.value,
      draft_aft: pilotArrDraftAft.value,
    },
    departurerunup: {
      time: reportingDateTimeUTC.value,
      timezone: reportingTimeZone.value,
      position: departureRupPosition,
    },
    distancetimedata: {
      time: sbyToRupTime.value,
      distance_obs: sbyToRupDistanceObs.value,
      distance_eng: sbyToRupDistanceEng.value,
      revolution_count: sbyToRupRevolutionCount.value,
      set_rpm: sbyToRupSetRPM.value,
    },
    transoceanicbudget: {
      distance_to_go: budgetDistance.value,
      speed: budgetSpeed.value,
      me_daily_fo_consumption: meDaily.value,
      me_rpm: meRPM.value,
    },
    consumptionconditiondata: {
      fueloildata_set: [
        {
          fuel_oil_type: FuelOil.LSFO,
          total_consumption: lsfoTotalConsumption.value || 0,
          receipt: 0, // Does not apply for Departure COSP reports
          debunkering: 0, // Does not apply for Departure COSP reports
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
          receipt: 0, // Does not apply for Departure COSP reports
          debunkering: 0, // Does not apply for Departure COSP reports
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
        received: 0, // Does not apply for Departure COSP reports
        discharged: 0, // Does not apply for Departure COSP reports
        rob: freshwaterRob.value || 0,
      },
      consumption_type: ConsumptionType.SBY_TO_RUP,
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
    isSubmissionModalVisible.value = true;
  } catch (error) {
    console.log(error);
  }
};
</script>
