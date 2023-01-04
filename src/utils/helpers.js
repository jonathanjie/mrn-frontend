import { ref } from "vue";
import constants from "@/constants";

// TODO: handle leading zeros
export function preventNaN(event, content) {
  // only accept 0-9 and one decimal point
  if (!/\d/.test(event.key) && (event.key !== "." || /\./.test(content))) {
    return event.preventDefault();
  }
}

export const sumObjectValues = (obj, endIndex) => {
  endIndex = endIndex || Object.values(obj).length;

  return Object.values(obj)
    .slice(0, endIndex)
    .reduce((a, b) => Number(a) + Number(b), 0);
};

export const textInputOptions = ref({
  format: "yyyy.MM.dd HH:mm",
});

export function format(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

  return `${year}.${month}.${day} ${hour}:${minute} (LT)`;
}

export function formatUTC(date) {
  const day = ("0" + date.getUTCDate()).slice(-2);
  const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
  const year = date.getUTCFullYear();
  const hour = ("0" + date.getUTCHours()).slice(-2);
  const minute = ("0" + date.getUTCMinutes()).slice(-2);

  return `${year}.${month}.${day} ${hour}:${minute} (UTC)`;
}

export function readableUTCDate(date) {
  // 1 --> Jan, 2 --> Feb etc.
  function getMonthName(monthNumber) {
    const d = new Date();
    d.setMonth(monthNumber - 1);

    return d.toLocaleString("en-US", { month: "short" });
  }

  const day = date.getUTCDate();
  const month = getMonthName(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();
  const hour = date.getUTCHours();
  const minute = ("0" + date.getUTCMinutes()).slice(-2);

  let meridiemTime =
    (hour >= 12 && (hour - 12 || 12) + ":" + minute + " PM") ||
    (Number(hour) || 12) + ":" + minute + " AM";

  return `${day} ${month} ${year}, ${meridiemTime}`;
}

export function convertDMSToDD(degrees, minutes, direction) {
  var dd = degrees + minutes / 60;

  if (direction == "S" || direction == "E") {
    dd = dd * -1;
  } // Don't do anything for N or W

  return dd;
}

export const parsePositionToString = ({
  latDegree,
  latMinutes,
  latDir,
  longDegree,
  longMinutes,
  longDir,
}) => {
  const SRID = constants.SRID;
  const positionLat = convertDMSToDD(
    parseFloat(latDegree),
    parseFloat(latMinutes),
    latDir
  );
  const positionLong = convertDMSToDD(
    parseFloat(longDegree),
    parseFloat(longMinutes),
    longDir
  );

  return `SRID=${SRID};POINT (${positionLat} ${positionLong})`;
};

export const parsePositionFromString = (positionString) => {
  const splitString = positionString.split(" ");

  const rawLat = splitString[1].slice(1);
  const rawLong = splitString[2].slice(0, -1);

  const latDegree = rawLat.split(".")[0];
  const latMinutes = rawLat.split(".")[1] * 60;
  const latDir = Math.sign(+rawLat) === -1 ? "S" : "N";
  const longDegree = rawLong.split(".")[0];
  const longMinutes = rawLong.split(".")[1] * 60;
  const longDir = Math.sign(+rawLong) === -1 ? "E" : "W";

  return {
    latDegree,
    latMinutes,
    latDir,
    longDegree,
    longMinutes,
    longDir,
  };
};

export const convertLTToUTC = (date, offset) => {
  const userOffset = parseFloat(offset) * -60;
  const calcOffset = date.getTimezoneOffset();

  // calculate based on timezone input
  if (userOffset !== calcOffset) {
    date = new Date(
      date.getTime() - 3600000 * (parseFloat(offset) + calcOffset / 60)
    );
  }

  return date.toISOString();
};

export const convertUTCToLT = (date, offset) => {
  const userOffset = parseFloat(offset) * -60;
  const calcOffset = date.getTimezoneOffset();

  // calculate based on timezone input
  if (userOffset !== calcOffset) {
    date = new Date(
      date.getTime() + 3600000 * (parseFloat(offset) + calcOffset / 60)
    );
  }

  return date.toISOString();
};

export const parsePortLocode = ({ portCountry, portName }) => {
  return portCountry + " " + portName;
};

export const windSpeedToBeaufort = (wind_speed) => {
  return Number(wind_speed) < 1
    ? 0
    : Number(wind_speed) < 4
    ? 1
    : Number(wind_speed) < 7
    ? 2
    : Number(wind_speed) < 11
    ? 3
    : Number(wind_speed) < 17
    ? 4
    : Number(wind_speed) < 22
    ? 5
    : Number(wind_speed) < 28
    ? 6
    : Number(wind_speed) < 34
    ? 7
    : Number(wind_speed) < 41
    ? 8
    : Number(wind_speed) < 48
    ? 9
    : Number(wind_speed) < 56
    ? 10
    : Number(wind_speed) < 64
    ? 11
    : 12;
};

// ROB & data correction parameters are optional
export const generateFuelOilData = (
  fuelOils,
  fuelOilBreakdowns,
  fuelOilTotalConsumptions,
  fuelOilRobs,
  fuelOilDataCorrection
) => {
  const rtn = [];

  const dataCorrection = fuelOilDataCorrection || {};
  const rob = fuelOilRobs || {};

  for (const fuelOil of fuelOils) {
    rtn.push({
      fuel_oil_type: fuelOil,
      total_consumption: fuelOilTotalConsumptions[fuelOil] || 0,
      receipt: fuelOilBreakdowns.receipt || 0, // non-zero for DEP SBY reports
      debunkering: fuelOilBreakdowns.debunkering || 0, // non-zero for DEP SBY reports
      rob: rob[fuelOil] || 0, // zero for Arrival EOSP Total Consumption
      breakdown: Object.entries(fuelOilBreakdowns[fuelOil]).reduce(
        (p, [k, v]) => ({ ...p, [k]: v || 0 }),
        {}
      ),
      fueloildatacorrection:
        dataCorrection.type === fuelOil
          ? {
              correction: dataCorrection.correction,
              remarks: dataCorrection.remarks,
            }
          : null,
    });
  }
  return rtn;
};

// data correction parameter is optional
export const generateLubricatingOilData = (
  lubricatingOils,
  lubricatingOilBreakdowns,
  lubricatingOilRobs,
  lubricatingOilDataCorrection
) => {
  const rtn = [];

  for (const lubricatingOil of lubricatingOils) {
    rtn.push({
      fuel_oil_type: lubricatingOil,
      total_consumption:
        lubricatingOilBreakdowns[lubricatingOil]["total_consumption"] || 0,
      receipt: lubricatingOilBreakdowns[lubricatingOil]["receipt"] || 0,
      debunkering: lubricatingOilBreakdowns[lubricatingOil]["debunkering"] || 0,
      rob: lubricatingOilRobs[lubricatingOil] || 0,
      lubricatingoildatacorrection:
        lubricatingOilDataCorrection.type === lubricatingOil
          ? {
              correction: lubricatingOilDataCorrection.correction,
              remarks: lubricatingOilDataCorrection.remarks,
            }
          : null,
    });
  }
  return rtn;
};
