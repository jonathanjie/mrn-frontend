// work in progress to standardise varible names across components
export const REPORT_CONSTANTS = {
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
export const ENUM_TO_REPORT_TYPE = {
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

export const DIRECTION_CONSTANTS = {
  n: "N",
  s: "S",
  e: "E",
  w: "W",
};

const constants = {
  SRID: "4326",
  REPORT_CONSTANTS: REPORT_CONSTANTS,
  DIRECTION_CONSTANTS: DIRECTION_CONSTANTS,
};

export default constants;
