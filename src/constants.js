// work in progress to standardise varible names across components
export const Report = {
  type: {
    NOON: "NOON",
    DEP_SBY: "DSBY",
    DEP_COSP_RUP: "DCSP",
    ARR_SBY_EOSP: "ASBY",
    ARR_FWE: "AFWE",
    BUNKER: "BDN",
    EVENT: "EVENT", // TODO: placeholder, remove when event types are implemented in backend
    EVENT_PORT: "EVNTP",
    EVENT_COASTAL: "EVNTC",
    NOON_PORT: "NOONP",
    NOON_COASTAL: "NOONC",
  },
  SRID: "4326",
  route: "route",
  weatherData: "weatherdata",
};

// temporary fix: for displaying report type (report no.) for each report in voyage card
export const ReportTypeToDisplay = {
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

export const ErrorFieldsToDisplay = {
  noonreporttimeandposition: "Reporting Noon",
  weatherdata: "Weather",
  distanceperformancedata: "Distance & Time / Performance",
  report_date: "Overview: Report Date",
  report_tz: "Overview: Report Time Zone",
  reportroute: "Overview: Departure & Destination",
  cargooperation: "Cargo Operation",
  departurepilotstation: "Pilot Station - Departure",
  departurevesselcondition: "Vessel Condition at Departure",
  totalconsumptiondata: "Consumption & Condition (Total in Harbour/Port)",
  consumptionconditiondata: "Consumption & Condition",
  arrivalpilotstation: "Pilot Station - Arrival",
  departurerunup: "R/UP Engine",
  distancetimedata: "Distance & Time",
  transoceanicbudget: "Budget Trans Ocean",
  actualperformancedata: "Actual Performance",
  arrivalstandbytimeandposition: "S/BY for Arrival",
  heavyweatherdata: "Heavy Weather Condition",
  stoppagedata: "Stoppage or Change in RPM (at Sea)",
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
  MOD: "MOD",
  HIGH: "HIGH",
  EXT: "EXT",
};

export const FuelOil = {
  LSFO: "LSFO",
  MGO: "MGO",
};

export const LubricatingOil = {
  ME_CYLINDER: "M/E Cylinder",
  ME_SYSTEM: "M/E System",
  ME_SUMP: "M/E Sump",
  GE_SYSTEM: "G/E System",
};

export const TotalConsumptionType = {
  IN_HARBOUR_PORT: "IN_HARBOUR_PORT",
  PILOT_TO_PILOT: "PILOT_TO_PILOT",
  PORT_TO_PORT: "PORT_TO_PORT",
};

export const ConsumptionType = {
  NOON_TO_NOON: "NOON_TO_NOON",
  LAST_TO_SBY: "LAST_TO_STANDBY",
  IN_HARBOUR_PORT: "IN_HARBOUR_PORT",
  SBY_TO_RUP: "STANDBY_TO_RUNUP",
  NOON_TO_SBY: "NOON_TO_STANDBY",
  SBY_TO_FWE: "STANDBY_TO_FWE",
  LAST_TO_EVENT: "LAST_TO_EVENT",
  PILOT_TO_PILOT: "PILOT_TO_PILOT",
};

export const ActualPerformanceType = {
  PILOT_TO_PILOT: "PILOT_TO_PILOT",
  PORT_TO_PORT: "PORT_TO_PORT",
};

export const UTCPlaceholder = "YYYY.MM.DD HH:MM (UTC)";

const constants = {
  SRID: "4326",
  Report: Report,
  Direction: Direction,
  ReportTypeToDisplay: ReportTypeToDisplay,
  IceCondition: IceCondition,
  FuelOil: FuelOil,
  LubricatingOil: LubricatingOil,
  ConsumptionType: ConsumptionType,
  TotalConsumptionType: TotalConsumptionType,
  ActualPerformanceType: ActualPerformanceType,
  UTCPlaceholder: UTCPlaceholder,
};

export default constants;
