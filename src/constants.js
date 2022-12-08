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
