import React, { ReactElement, useState } from "react";
import styles from "./WeatherPage.module.css";
import Form from "./Form";
import Preview from "./Preview";
import History from "./History";
import moment from "moment";
import { getOpenWeatherService } from "../api";
import { FormField } from "../_types";
import axios from "axios";
import { initialValues } from "../_constants";
import { Alert, Spinner } from "react-bootstrap";
import { capitalize } from "../_utils";

export default function WeatherPage(): ReactElement {
  const [weather, setWeather] = useState(null);
  const [historyList, setHistoryList] = useState<any>([]);
  const [formValue, setFormValue] = useState<FormField>(initialValues);
  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchWeather(values: FormField) {
    setIsLoading(true);
    axios
      .get(getOpenWeatherService(values.city, values.country))
      .then((response: { data: any }) => {
        setIsLoading(false);
        saveHistoryList({
          city: response.data.name,
          country: response.data.sys.country,
        });
        setWeather(response.data);
      })
      .catch((error: any) => {
        setIsLoading(false);
        setIsError(error.response.data.message);
        console.error(error.response.data.message);
      });
  }

  function saveHistoryList(values: { city: string; country: string }) {
    const currentTime = moment().format("h:mm:ss a");
    setHistoryList((prevState: any) => [
      ...prevState,
      {
        city: values.city.toLowerCase(),
        country: values.country.toLowerCase(),
        date: currentTime,
      },
    ]);
  }

  async function handleSubmit(values: FormField) {
    setIsError("");
    setFormValue(values);
    fetchWeather(values);
  }

  function handleSearch(values: FormField) {
    handleSubmit(values);
  }

  function handleClear() {
    setFormValue(initialValues);
    setWeather(null);
    setIsError("");
  }

  function handleDelete(index: any) {
    const tempList = [...historyList];
    tempList.splice(index, 1);
    setHistoryList(tempList);
  }

  return (
    <div className={styles.cardContainer}>
      <h2>Today's Weather</h2>
      <hr />
      <Form
        initialValues={formValue}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
      />
      {isLoading ? (
        <div className={styles.loader}>
          <Spinner animation="border" />
        </div>
      ) : isError.length > 0 ? (
        <Alert key="danger" variant="danger">
          {capitalize(isError) || "Not Found"}
        </Alert>
      ) : (
        <Preview queryResult={weather} />
      )}
      <History
        historyList={historyList}
        handleDelete={handleDelete}
        handleSearch={handleSearch}
        formValue={formValue}
      />
    </div>
  );
}
