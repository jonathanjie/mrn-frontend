// work in progress to standardise varible names across components
export const Report = {
  type: {
    NOON: "NOON",
    DEP_SBY: "DSBY",
    DEP_COSP_RUP: "DCSP",
    ARR_SBY_EOSP: "ASBY",
    ARR_FWE: "AFWE",
    BUNKER: "BDN",
    EVENT_HARBOUR: "EVHB",
    EVENT_PORT: "EVPO",
    NOON_HARBOUR: "NNHB",
    NOON_PORT: "NNPO",
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
  EVPO: "EVNTP",
  EVHB: "EVNTHB",
  NNPO: "NOONP",
  NNHB: "NOONHB",
};

export const ReportFilterCategories = {
  ALL: "allReports",
  DEP: "departure",
  ARR: "arrival",
  NOON: "noon",
  BDN: "bunkerDelivery",
  EVNT: "inHarbourOrPort",
};

export const ReportTypeToFilterCategories = {
  NOON: "noon",
  DSBY: "departure",
  DCSP: "departure",
  ASBY: "arrival",
  AFWE: "arrival",
  BDN: "bunkerDelivery",
  EVPO: "inHarbourOrPort",
  EVHB: "inHarbourOrPort",
  NNPO: "inHarbourOrPort",
  NNHB: "inHarbourOrPort",
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
  sailingplan: "Sailing Plam",
  actualperformancedata: "Actual Performance",
  arrivalstandbytimeandposition: "S/BY for Arrival",
  heavyweatherdata: "Heavy Weather Condition",
  stoppagedata: "Stoppage or Change in RPM (at Sea)",
  arrivalfwetimeandposition: "Finish With Engine",
  eventdata: "Report",
  bdndata: "BDN",
  performancedata: "Performance",
  unexpectedError: "Unexpected Error",
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
  MDO: "MDO",
  HFO: "HFO",
  LPGP: "LPGP",
  LPGB: "LPGB",
  LNG: "LNG",
};

export const LubricatingOil = {
  ME_CYLINDER: "me_cylinder_oil",
  ME_SYSTEM: "me_system_oil",
  ME_SUMP: "me_sump_tank",
  GE_SYSTEM: "ge_system_oil",
  TC_SYSTEM: "tc_system_oil",
};

export const Machinery = {
  ME: "main_engine",
  GE: "generator_engine",
  IGG: "inert_gas_generator",
  BLR: "boiler",
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

export const CargoLoadConditions = {
  LADEN: "LADEN",
  BALLAST: "BALLAST",
  EASTBOUND: "EASTBOUND",
  WESTBOUND: "WESTBOUND",
};

export const ActualPerformanceType = {
  PILOT_TO_PILOT: "PILOT_TO_PILOT",
  PORT_TO_PORT: "PORT_TO_PORT",
};

export const UTCPlaceholder = "YYYY.MM.DD HH:MM (UTC)";

export const shipRefs = {
  BULK: "Bulk Carrier",
  GAS: "Gas Carrier",
  OIL: "Oil Tanker",
  CNTR: "Container Ship",
  RORO: "Ro-Ro Cargo Ship",
  GEN: "General Cargo Ship",
  REFC: "Refrigerated Cargo Carrier",
  COMB: "Combination Carrier",
  LNGC: "LNG Carrier",
  RORV: "Ro-Ro Cargo Ship (Vehicle Carrier)",
  RORP: "Ro-Ro Passenger Ship",
  CRUZ: "Cruise Passenger Ship",
};

export const CIIModalTypes = {
  INITIAL_SETUP: "Initial Setup CII",
  UPLOAD_FILES: "Upload CII Report",
};

export const ShippingAuthorities = {
  IMODCS: "imodcs",
  EUMRV: "eumrv"
}

const constants = {
  SRID: "4326",
  Report: Report,
  Direction: Direction,
  ReportTypeToDisplay: ReportTypeToDisplay,
  ReportFilterCategories: ReportFilterCategories,
  ReportTypeToFilterCategories: ReportTypeToFilterCategories,
  IceCondition: IceCondition,
  FuelOil: FuelOil,
  LubricatingOil: LubricatingOil,
  Machinery: Machinery,
  ConsumptionType: ConsumptionType,
  TotalConsumptionType: TotalConsumptionType,
  ActualPerformanceType: ActualPerformanceType,
  UTCPlaceholder: UTCPlaceholder,
  shipRefs: shipRefs,
  CIIModalTypes: CIIModalTypes,
  ShippingAuthorities: ShippingAuthorities,
};

export default constants;
