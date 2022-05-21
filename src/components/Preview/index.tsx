import React from "react";
import styles from "./index.module.css";
import moment from "moment";

export default function Preview({ queryResult }: { queryResult: any }) {
  const currentTime = moment().format("YYYY-MM-DD h:mm:ss a");

  if (!queryResult) return null;
  return (
    <div>
      <p>
        {queryResult?.name},{queryResult?.sys?.country}
      </p>
      <h2>{queryResult?.weather[0]?.main}</h2>
      <p>Description: {queryResult.weather.length > 0 && queryResult?.weather[0]?.description || "-"}</p>
      <p>
        Temperature: {queryResult?.main?.temp_min} - {queryResult?.main?.temp_max || '-'}
      </p>
      <p>Humidity: {queryResult?.main?.humidity}</p>
      <p>Time: {currentTime}</p>
    </div>
  );
}
