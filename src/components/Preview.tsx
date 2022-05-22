import React from "react";
import styles from "./Preview.module.css";
import moment from "moment";
import { Image } from "react-bootstrap";
import { capitalize } from "../_utils";

export default function Preview({ queryResult }: { queryResult: any }) {
  const currentTime = moment().format("YYYY-MM-DD h:mm:ss a");

  if (!queryResult) return null;
  return (
    <div className={styles.container}>
      <div>
        <h5>
          {queryResult?.name},{queryResult?.sys?.country}
        </h5>

        <Image
          fluid
          src={`http://openweathermap.org/img/wn/${queryResult.weather[0]?.icon}@2x.png`}
        />
        <h2>{queryResult?.weather[0]?.main}</h2>
      </div>

      <table className={styles.table}>
        <tbody>
          <tr>
            <th>Description: </th>
            <td>
              {capitalize(
                queryResult.weather.length > 0 &&
                  queryResult?.weather[0]?.description
              ) || "N/A"}
            </td>
          </tr>
          <tr>
            <th>Temperature: </th>
            <td>
              {queryResult?.main?.temp_min || "N/A"}°C -{" "}
              {queryResult?.main?.temp_max || "N/A"}°C
            </td>
          </tr>
          <tr>
            <th>Humidity: </th>
            <td>{queryResult?.main?.humidity || "N/A"}%</td>
          </tr>
          <tr>
            <th>Time: </th>
            <td>{currentTime || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
