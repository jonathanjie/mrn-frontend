import { defineStore, storeToRefs } from "pinia";
import { useLatestReportDetailsQuery } from "@/queries/useLatestReportDetailsQuery";
import { useShipStore } from "./useShipStore";
import { computed } from "vue";
import { Report } from "@/constants";
import { useVoyageStore } from "./useVoyageStore";

export const useLatestReportDetailsStore = defineStore(
  "latestReportDetails",
  () => {
    const shipStore = useShipStore();
    const { imoReg } = storeToRefs(shipStore);
    const voyageStore = useVoyageStore();
    const { voyageLegs } = storeToRefs(voyageStore);

    const {
      refetch: refetchLatestReportDetails,
      isFetching: isFetchingLatestReportDetails,
      isSuccess: isSuccessLatestReportDetails,
      isError: isErrorLatestReportDetails,
      data: latestReportDetails,
    } = useLatestReportDetailsQuery(imoReg.value);

    const arrivalDate = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.arrival_date
        ? latestReportDetails.value.arrival_date
        : ""
    );
    const arrivalPort = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.arrival_port
        ? latestReportDetails.value.arrival_port
        : ""
    );
    const arrivalPortCountry = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.arrival_port
        ? latestReportDetails.value.arrival_port.split(" ")[0]
        : ""
    );
    const arrivalPortName = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.arrival_port
        ? latestReportDetails.value.arrival_port.split(" ")[1]
        : ""
    );

    const arrivalTz = computed(() =>
      isSuccessLatestReportDetails.value && latestReportDetails.value.arrival_tz
        ? latestReportDetails.value.arrival_tz
        : ""
    );

    const departureDate = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.departure_date
        ? latestReportDetails.value.departure_date
        : ""
    );
    const departurePort = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.departure_port
        ? latestReportDetails.value.departure_port
        : ""
    );
    const departurePortCountry = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.departure_port
        ? latestReportDetails.value.departure_port.split(" ")[0]
        : ""
    );
    const departurePortName = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.departure_port
        ? latestReportDetails.value.departure_port.split(" ")[1]
        : ""
    );

    const departureTz = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.departure_tz
        ? latestReportDetails.value.departure_tz
        : ""
    );
    const displacementAtDeparture = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.displacement_at_departure
        ? latestReportDetails.value.displacement_at_departure
        : ""
    );
    const distanceEngineTotal = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.distance_engine_total
        ? latestReportDetails.value.distance_engine_total
        : ""
    );
    const distanceObservedTotal = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.distance_observed_total
        ? latestReportDetails.value.distance_observed_total
        : ""
    );
    const distanceToGo = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.distance_to_go
        ? latestReportDetails.value.distance_to_go
        : ""
    );
    const distanceSbyToCosp = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.distance_standby_to_cosp
        ? latestReportDetails.value.distance_standby_to_cosp
        : ""
    );
    const timeSbyToCosp = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.time_standby_to_cosp
        ? latestReportDetails.value.time_standby_to_cosp
        : ""
    );
    const freshwaterRob = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.freshwater_rob
        ? latestReportDetails.value.freshwater_rob
        : ""
    );
    const fuelOilConsInHarbourPort = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.fuel_oil_cons_in_harbour_port
        ? latestReportDetails.value.fuel_oil_cons_in_harbour_port
        : ""
    );
    const fuelOilConsPilotToPilot = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.fuel_oil_cons_pilot_to_pilot
        ? latestReportDetails.value.fuel_oil_cons_pilot_to_pilot
        : ""
    );
    const fuelOilConsPortToPort = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.fuel_oil_cons_port_to_port
        ? latestReportDetails.value.fuel_oil_cons_port_to_port
        : ""
    );
    const fuelOilRobs = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.fuel_oil_robs
        ? latestReportDetails.value.fuel_oil_robs
        : ""
    );
    const id = computed(() =>
      isSuccessLatestReportDetails.value && latestReportDetails.value.id
        ? latestReportDetails.value.id
        : ""
    );
    const lastReportDate = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.last_report_date
        ? latestReportDetails.value.last_report_date
        : ""
    );
    const lastReportType = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.last_report_type
        ? latestReportDetails.value.last_report_type
        : ""
    );
    const validReportTypes = computed(() => {
      if (voyageLegs.value.length == 0) {
        return [Report.type.DEP_SBY];
      }
      switch (lastReportType.value) {
        case Report.type.DEP_SBY:
          return [
            Report.type.DEP_COSP_RUP,
            Report.type.BUNKER,
            Report.type.EVENT_HARBOUR,
            Report.type.EVENT_PORT,
            Report.type.NOON_HARBOUR,
            Report.type.NOON_PORT,
          ];
        case Report.type.DEP_COSP_RUP:
          return [
            Report.type.NOON,
            Report.type.ARR_SBY_EOSP,
            Report.type.EVENT_HARBOUR,
            Report.type.EVENT_PORT,
            Report.type.NOON_HARBOUR,
            Report.type.NOON_PORT,
          ];
        case Report.type.NOON:
          return [Report.type.NOON, Report.type.ARR_SBY_EOSP];
        case Report.type.ARR_SBY_EOSP:
          return [
            Report.type.ARR_FWE,
            Report.type.EVENT_HARBOUR,
            Report.type.EVENT_PORT,
            Report.type.NOON_HARBOUR,
            Report.type.NOON_PORT,
          ];
        case Report.type.ARR_FWE:
          return [
            Report.type.DEP_SBY,
            Report.type.BUNKER,
            Report.type.EVENT_HARBOUR,
            Report.type.EVENT_PORT,
            Report.type.NOON_HARBOUR,
            Report.type.NOON_PORT,
          ];
        case Report.type.BUNKER:
          return [
            Report.type.DEP_SBY,
            Report.type.BUNKER,
            Report.type.EVENT_HARBOUR,
            Report.type.EVENT_PORT,
            Report.type.NOON_HARBOUR,
            Report.type.NOON_PORT,
          ];
        // TODO: handle case for EVENT; may result in any moment of sea path
        case "":
        case undefined:
        case null:
          return [Report.type.DEP_SBY];

        default:
          return Object.values(Report.type);
      }
    });
    const isAddVoyageEnabled = computed(() => {
      return (
        lastReportType.value === Report.type.ARR_FWE ||
        lastReportType.value === Report.type.BUNKER ||
        lastReportType.value === Report.type.EVENT_HARBOUR ||
        lastReportType.value === Report.type.EVENT_PORT ||
        lastReportType.value === Report.type.NOON_HARBOUR ||
        lastReportType.value === Report.type.NOON_PORT ||
        !lastReportType.value
      );
    });
    const loadCondition = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.load_condition
        ? latestReportDetails.value.load_condition
        : ""
    );
    const lubeOilRobs = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.lube_oil_robs
        ? latestReportDetails.value.lube_oil_robs
        : ""
    );
    const parkingStatus = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.parking_status
        ? latestReportDetails.value.parking_status
        : ""
    );
    // object with key : val operation: boolean to array
    const plannedOperations = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.planned_operations
        ? Object.keys(latestReportDetails.value.planned_operations).filter(
            (key) => latestReportDetails.value.planned_operations[key]
          )
        : []
    );
    const propellerPitch = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.propeller_pitch
        ? latestReportDetails.value.propeller_pitch
        : ""
    );
    const revolutionCount = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.revolution_count
        ? latestReportDetails.value.revolution_count
        : ""
    );
    const rpmAverage = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.rpm_average
        ? latestReportDetails.value.rpm_average
        : ""
    );
    const slipAverage = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.slip_average
        ? latestReportDetails.value.slip_average
        : ""
    );
    const speedAverage = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.speed_average
        ? latestReportDetails.value.speed_average
        : ""
    );
    const totalHours = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.total_hours
        ? latestReportDetails.value.total_hours
        : ""
    );
    const voyageLeg = computed(() =>
      isSuccessLatestReportDetails.value && latestReportDetails.value.voyage_leg
        ? latestReportDetails.value.voyage_leg
        : ""
    );
    const cargoTotal = computed(() =>
      isSuccessLatestReportDetails.value &&
      latestReportDetails.value.cargo_total_at_departure
        ? latestReportDetails.value.cargo_total_at_departure
        : ""
    );

    return {
      refetchLatestReportDetails,
      isFetchingLatestReportDetails,
      isSuccessLatestReportDetails,
      isErrorLatestReportDetails,
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
      distanceSbyToCosp,
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
      validReportTypes,
      isAddVoyageEnabled,
      timeSbyToCosp,
      cargoTotal,
    };
  }
);
