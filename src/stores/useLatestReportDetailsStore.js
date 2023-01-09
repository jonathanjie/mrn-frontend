import { defineStore, storeToRefs } from "pinia";
import { useLatestReportDetailsQuery } from "@/queries/useLatestReportDetailsQuery";
import { useShipStore } from "./useShipStore";
import { computed } from "vue";

export const useLatestReportDetailsStore = defineStore(
  "latestReportDetails",
  () => {
    const shipStore = useShipStore();
    const { imoReg } = storeToRefs(shipStore);

    const {
      refetch: refetchLatestReportDetails,
      isFetching: isFetchingLatestReportDetails,
      isSuccess: isSuccessLatestReportDetails,
      data: latestReportDetails,
    } = useLatestReportDetailsQuery(imoReg.value);

    const arrivalDate = computed(() => latestReportDetails.value.arrival_date);
    const arrivalPort = computed(() => latestReportDetails.value.arrival_port);
    const arrivalTz = computed(() => latestReportDetails.value.arrival_tz);
    const departureDate = computed(
      () => latestReportDetails.value.departure_date
    );
    const departurePort = computed(
      () => latestReportDetails.value.departure_port
    );
    const departureTz = computed(() => latestReportDetails.value.departure_tz);
    const displacementAtDeparture = computed(
      () => latestReportDetails.value.displacement_at_departure
    );
    const distanceEngineTotal = computed(
      () => latestReportDetails.value.distance_engine_total
    );
    const distanceObservedTotal = computed(
      () => latestReportDetails.value.distance_observed_total
    );
    const distanceToGo = computed(
      () => latestReportDetails.value.distance_to_go
    );
    const freshwaterRob = computed(
      () => latestReportDetails.value.freshwater_rob
    );
    const fuelOilConsInHarbourPort = computed(
      () => latestReportDetails.value.fuel_oil_cons_in_harbour_port
    );
    const fuelOilConsPilotToPilot = computed(
      () => latestReportDetails.value.fuel_oil_cons_pilot_to_pilot
    );
    const fuelOilConsPortToPort = computed(
      () => latestReportDetails.value.fuel_oil_cons_port_to_port
    );
    const fuelOilRobs = computed(() => latestReportDetails.value.fuel_oil_robs);
    const id = computed(() => latestReportDetails.value.id);
    const lastReportDate = computed(
      () => latestReportDetails.value.last_report_date
    );
    const lastReportType = computed(
      () => latestReportDetails.value.last_report_type
    );
    const loadCondition = computed(
      () => latestReportDetails.value.load_condition
    );
    const lubeOilRobs = computed(() => latestReportDetails.value.lube_oil_robs);
    const parkingStatus = computed(
      () => latestReportDetails.value.parking_status
    );
    // object with key : val operation: boolean to array
    const plannedOperations = computed(() =>
      Object.keys(latestReportDetails.value.planned_operations).filter(
        (key) => latestReportDetails.value.planned_operations[key]
      )
    );
    const propellerPitch = computed(
      () => latestReportDetails.value.propeller_pitch
    );
    const revolutionCount = computed(
      () => latestReportDetails.value.revolution_count
    );
    const rpmAverage = computed(() => latestReportDetails.value.rpm_average);
    const slipAverage = computed(() => latestReportDetails.value.slip_average);
    const speedAverage = computed(
      () => latestReportDetails.value.speed_average
    );
    const totalHours = computed(() => latestReportDetails.value.total_hours);
    const voyageLeg = computed(() => latestReportDetails.value.voyage_leg);

    return {
      refetchLatestReportDetails,
      isFetchingLatestReportDetails,
      isSuccessLatestReportDetails,
      // latestReportDetails,
      arrivalDate,
      arrivalPort,
      arrivalTz,
      departureDate,
      departurePort,
      departureTz,
      displacementAtDeparture,
      distanceEngineTotal,
      distanceObservedTotal,
      distanceToGo,
      freshwaterRob,
      fuelOilConsInHarbourPort,
      fuelOilConsPilotToPilot,
      fuelOilConsPortToPort,
      fuelOilRobs,
      id,
      lastReportDate,
      lastReportType,
      loadCondition,
      lubeOilRobs,
      parkingStatus,
      plannedOperations,
      propellerPitch,
      revolutionCount,
      rpmAverage,
      slipAverage,
      speedAverage,
      totalHours,
      voyageLeg,
    };
  }
);
