import { defineStore, storeToRefs } from "pinia";
import { useLatestReportDetailsQuery } from "@/queries/useLatestReportDetailsQuery";
import { useShipStore } from "./useShipStore";
import { computed } from "vue";
import { Report } from "@/constants";

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
    const arrivalPortCountry = computed(
      () => latestReportDetails.value.arrival_port.split(" ")[0]
    );
    const arrivalPortName = computed(
      () => latestReportDetails.value.arrival_port.split(" ")[1]
    );

    const arrivalTz = computed(() => latestReportDetails.value.arrival_tz);

    const departureDate = computed(
      () => latestReportDetails.value.departure_date
    );
    const departurePort = computed(
      () => latestReportDetails.value.departure_port
    );
    const departurePortCountry = computed(
      () => latestReportDetails.value.departure_port.split(" ")[0]
    );
    const departurePortName = computed(
      () => latestReportDetails.value.departure_port.split(" ")[1]
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
    const hoursAtSea = computed(
      () =>
        +(
          Math.abs(
            Date.parse(lastReportDate.value) - Date.parse(departureDate.value)
          ) / 36e5
        ).toFixed(2)
    );
    const id = computed(() => latestReportDetails.value.id);
    const lastReportDate = computed(
      () => latestReportDetails.value.last_report_date
    );
    const lastReportType = computed(
      () => latestReportDetails.value.last_report_type
    );
    const validReportTypes = computed(() => {
      switch (lastReportType.value) {
        case Report.type.DEP_SBY:
          return [Report.type.DEP_COSP_RUP, Report.type.BUNKER];
        case Report.type.DEP_COSP_RUP || Report.type.NOON:
          return [Report.type.NOON, Report.type.ARR_SBY_EOSP];
        case Report.type.ARR_SBY_EOSP:
          return [Report.type.ARR_FWE];
        case Report.type.ARR_FWE:
          return [Report.type.DEP_SBY, Report.type.BUNKER];
        case Report.type.BUNKER:
          return [
            Report.type.DEP_SBY,
            Report.type.DEP_COSP_RUP,
            Report.type.BUNKER,
          ];
        default:
          return [];
      }
    });
    const isAddVoyageEnabled = computed(() => {
      return (
        lastReportType.value === Report.type.ARR_FWE ||
        lastReportType.value === Report.type.BUNKER ||
        lastReportType.value === Report.type.EVENT_HARBOUR ||
        lastReportType.value === Report.type.EVENT_PORT ||
        lastReportType.value === Report.type.NOON_HARBOUR ||
        lastReportType.value === Report.type.NOON_PORT
      );
    });
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
      arrivalPortCountry,
      arrivalPortName,
      arrivalTz,
      departureDate,
      departurePort,
      departurePortCountry,
      departurePortName,
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
      hoursAtSea,
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
      validReportTypes,
      isAddVoyageEnabled,
    };
  }
);
