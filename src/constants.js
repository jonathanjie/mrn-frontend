// work in progress to standardise varible names across components
export const Report = {
  type: {
    NOON: "NOON",
    DEP_SBY: "DSBY",
    DEP_COSP_RUP: "DCSP",
    ARR_SBY_EOSP: "ASBY",
    ARR_FWE: "AFWE",
    BUNKER: "BDN",
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
  DSBY: "DSBY",
  DCSP: "DCSP",
  ASBY: "ASBY",
  AFWE: "AFWE",
  BDN: "BDN",
  EVNT: "EVNT", // TODO: replace with 4 subtypes below
  EVNTP: "EVNTP",
  EVNTC: "EVNTC",
  NOONP: "NOONP",
  NOONC: "NOONC",
};

export const ErrorFieldsToDisplay = {
  time: "Time",
  timezone: "Time zone",
  weather_notation: "Weather notation",
  visibility: "Visibility",
  wind_direction: "Wind direction",
  wind_speed: "Wind force",
  sea_direction: "Wave direction",
  sea_state: "Wave force",
  swell_direction: "Swell direction",
  swell_scale: "Swell scale",
  air_pressure: "Air pressure",
  air_temperature_dry: "Air temperature (dry)",
  air_temperature_wet: "Air temperature (wet)",
  sea_temperature: "Sea water temperature",
  ice_condition: "Glacier ice condition",
  distance_observed_since_noon: "Distanace by observation",
  distance_engine_since_noon: "Distance by engine",
  distance_engine_total: "Distance by engine (total)",
  slip_average: "Average slip",
  slip_since_noon: "Slip",
  hours_since_noon: "Time",
  revolution_count: "Revolution counter",
  noonreporttimeandposition: "Reporting Noon",
  weatherdata: "Weather",
  distanceperformancedata: "Distance & Time / Performance",
  report_date: "Overview: Report Date",
  report_tz: "Overview: Report Time Zone",
  reportroute: "Overview: Departure & Destination",
  depature_tz: "Departure time zone",
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

export const LubricatingOil = {
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
  ReportTypeToDisplay: ReportTypeToDisplay,
  IceCondition: IceCondition,
  ReportType: ReportType,
  FuelOil: FuelOil,
  LubricatingOil: LubricatingOil,
  ConsumptionType: ConsumptionType,
};

export default constants;
