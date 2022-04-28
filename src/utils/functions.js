import dateFormat from "dateformat";
import { countryCodeList, tagOptions } from "./constants";

export const getColoredTime = (timeString) => {
  const times = timeString.split(":");
  const keys = ["S", "M", "H", "D"];

  return (
    <>
      {times.map((time, i) => (
        <>
          {time}
          <span className="small text-secondary">
            {keys[keys.length - i - 1] + (keys.length !== i + 1 ? ":" : "")}
          </span>
        </>
      ))}
    </>
  );
};

export const getDateFromTimestamp = ({ timestamp, format }) => {
  return dateFormat(timestamp, format);
};

export const countDown = (timestamp) => {
  const date = new Date(timestamp);

  return date.toISOString();
};

export const getCountryNameByCode = (code) => {
  return countryCodeList.filter((x) => x.value === code)[0]?.label;
};
export const getTagInfoByValue = (value) => {
  return tagOptions.filter((x) => x.value === value)[0];
};

export default getColoredTime;
