// work in progress to standardise varible names across components
export const REPORT_CONSTANTS = {
  type: {
    NOON: "NOON",
    DEP_SBY: "DEPS",
    DEP_COSP_RUP: "DEPR",
    ARR_SBY_EOSP: "ARRS",
    ARR_FWE: "ARRF",
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
