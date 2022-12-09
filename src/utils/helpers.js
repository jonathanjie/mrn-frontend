import { ref } from "vue";
import constants from "@/constants";

// TODO: handle leading zeros
export function preventNaN(event, content) {
  // only accept 0-9 and one decimal point
  if (!/\d/.test(event.key) && (event.key !== "." || /\./.test(content))) {
    return event.preventDefault();
  }
}

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

export function convertDMSToDD(degrees, minutes, direction) {
  var dd = degrees + minutes / 60;

  if (direction == "S" || direction == "E") {
    dd = dd * -1;
  } // Don't do anything for N or W

  return dd;
}

export const parsePosition = ({
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

export const parsePortLocode = ({ portCountry, portName }) => {
  return portCountry + " " + portName;
};
