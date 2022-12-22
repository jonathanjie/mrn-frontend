// work in progress to standardise varible names across components
export const Report = {
  type: {
    noon: "NOON",
    departure: "DEP",
    arrival: "ARR",
    bunker: "BUNKER",
    harbourPort: "HARBOUR_PORT",
  },
  SRID: "4326",
  route: "route",
  weatherData: "weatherdata",
};

// temporary fix: for displaying report type (report no.) for each report in voyage card
export const reportTypeToDisplay = {
  NOON: "NOON",
  DSBY: "DEPS",
  DCSP: "DEPR",
  ASBY: "ARRS",
  AFWE: "ARRF",
  BDN: "BDN",
  EVNT: "EVNT", // TODO: replace with 4 subtypes below
  EVNTP: "EVNTP",
  EVNTC: "EVNTC",
  NOONP: "NOONP",
  NOONC: "NOONC",
};

export const Direction = {
  N: "N",
  S: "S",
  E: "E",
  W: "W",
};

export const IceCondition = {
  NONE: "NONE",
  LOW: "LOW",
  MOD: "MODERATE",
  HIGH: "HIGH",
  EXT: "EXTENSIVE",
};

export const ReportType = {
  NOON: "NOON",
  DEPARTURE_SBY: "DEP_SBY",
  DEPARTURE_COSP: "DEP_COSP",
  ARRIVAL_SBY: "ARR_SBY",
  ARRIVAL_FWE: "ARR_FWE",
  BUNKER_DELIVERY: "BDN",
  EVENT: "EVENT",
};

export const FuelOil = {
  LSFO: "LSFO",
  MGO: "MGO",
};

export const LubricateOil = {
  ME_CYLINDER: "M/E Cylinder",
  ME_SYSTEM: "M/E System",
  ME_SUMP: "M/E Sump",
  GE_SYSTEM: "G/E System",
};

export const ConsumptionType = {
  NOON_TO_NOON: "NOON_TO_NOON",
  LAST_TO_SBY: "LAST_TO_SBY",
  IN_HARBOUR_PORT: "IN_HARBOUR_PORT",
  STANDBY_TO_RUNUP: "STANDBY_TO_RUNUP",
  NOON_TO_STANDBY: "NOON_TO_STANDBY",
  STANDBY_TO_FWE: "STANDBY_TO_FWE",
  LAST_TO_EVENT: "LAST_TO_EVENT",
};

const constants = {
  SRID: "4326",
  Report: Report,
  Direction: Direction,
  reportTypeToDisplay: reportTypeToDisplay,
  IceCondition: IceCondition,
  ReportType: ReportType,
  FuelOil: FuelOil,
  LubricateOil: LubricateOil,
  ConsumptionType: ConsumptionType,
};

export default constants;
