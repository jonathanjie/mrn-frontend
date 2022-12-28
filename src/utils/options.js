// (label or label for i18n : value to send backend) pair for select options

export const TIMEZONES = {
  "UTC-12:00": -12,
  "UTC-11:00": -11,
  "UTC-10:00": -10,
  "UTC-9:30": -9.5,
  "UTC-8:00": -8,
  "UTC-7:00": -7,
  "UTC-6:00": -6,
  "UTC-5:00": -5,
  "UTC-4:00": -4,
  "UTC-3:30": -3.5,
  "UTC-3:00": -3,
  "UTC-2:00": -2,
  "UTC-1:00": -1,
  UTC: 0,
  "UTC+1:00": 1,
  "UTC+2:00": 2,
  "UTC+3:00": 3,
  "UTC+3:30": 3.5,
  "UTC+4:00": 4,
  "UTC+4:30": 4.5,
  "UTC+5:00": 5,
  "UTC+5:45": 5.75,
  "UTC+6:00": 6,
  "UTC+6:30": 6.5,
  "UTC+7:00": 7,
  "UTC+8:00": 8,
  "UTC+9:00": 9,
  "UTC+9:30": 9.5,
  "UTC+10:00": 10,
  "UTC+10:30": 10.5,
  "UTC+11:00": 11,
  "UTC+12:00": 12,
  "UTC+12:45": 12.75,
  "UTC+13:00": 13,
  "UTC+14:00": 14,
};

export const OPERATIONS = {
  // excluding "waiting" and "other" operations
  cargoOperationBerth: "cargoOpBerth",
  cargoOperationSTSSTB: "cargoOpSTSSTB",
  bunkeringDebunkering: "bunkeringDebunkering",
  dryDocking: "dryDocking",
  crewChange: "crewChange",
  receivingProvisionSpareParts: "receivingProvisionSpareParts",
  survey: "survey",
};

export const ALL_FUEL_OILS = {
  mdo: "mdo",
  mgo: "mgo",
  lsfo: "lsfo",
  hfo: "hfo",
  lpgp: "propane",
  lpgb: "butane",
  lng: "lng",
};

export const ALL_LUBRICATING_OILS = {
  meCylinderOil: "me_cylinder_oil",
  meSystemOil: "me_system_oil",
  meSumpTank: "me_sump_tank",
  geSystemOil: "ge_system_oil",
  tgSystemOil: "tg_system_oil",
};

export const LOAD_CONDITIONS = {
  ballast: "BALLAST",
  laden: "LADEN",
  eastbound: "EASTBOUND",
  westbound: "WESTBOUND",
};

export const PARKING_STATUS_ARR_FWE = {
  anchoringStartOutside: "ANCHOR_START_OUTSIDE",
  anchoringStartInside: "ANCHOR_START_INSIDE",
  driftingStart: "DRIFTING_START",
  berthingStart: "BERTHING",
};

export const PARKING_STATUS_EVNT = {
  anchoringStartOutside: "ANCHOR_START_OUTSIDE",
  anchoringEndOutside: "ANCHOR_END_OUTSIDE",
  anchoringStartInside: "ANCHOR_START_INSIDE",
  anchoringEndInside: "ANCHOR_END_INSIDE",
  driftingStart: "DRIFTING_START",
  driftingEnd: "DRIFTING_END",
  shiftingStart: "SHIFTING_START",
  shiftingEnd: "SHIFTING_END",
};

export const START_STATUS = [
  "ANCHOR_START_OUTSIDE",
  "ANCHOR_START_INSIDE",
  "DRIFTING_START",
  "SHIFTING_START",
];

export const END_STATUS = [
  "ANCHOR_END_OUTSIDE",
  "ANCHOR_END_INSIDE",
  "DRIFTING_END",
  "SHIFTING_END",
];
