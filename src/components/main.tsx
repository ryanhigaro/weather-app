import React, { ReactElement, useState } from "react";
import styles from "./main.module.css";
import Form from "./Form";
import Preview from "./Preview";
import History from "./History";
import moment from "moment";
import { getOpenWeatherService } from "./api";
import { FormField } from "../_types";
import axios from "axios";
import { initialValues } from "../_constants";
import _ from "lodash";

export default function WeatherPage(): ReactElement {
  const [weather, setWeather] = useState(null);
  const [historyList, setHistoryList] = useState<any>([]);
  const [formValue, setFormValue] = useState<FormField>(initialValues);
  const [isError, setIsError] = useState<string>('');

  async function fetchWeather(values: FormField) {
    axios
      .get(getOpenWeatherService(values.city, values.country))
      .then((response: { data: any }) => {
        saveHistoryList({
          city: response.data.name,
          country: response.data.sys.country,
        });
        setWeather(response.data);
      })
      .catch((error: any) => {
        setIsError(error.response.data.message);
        console.error(error.response.data.message);
      });
  }

  function saveHistoryList(values: { city: string; country: string }) {
    // if (_.filter(historyList, { city: values.city.toLowerCase() })) return;
    const currentTime = moment().format("YYYY-MM-DD h:mm:ss a");
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
        setWeather={setWeather}
        setHistoryList={setHistoryList}
      />
      {isError.length > 0 ? <p> {isError || 'Not Found'} </p> : <Preview queryResult={weather} />}
      <History
        historyList={historyList}
        handleDelete={handleDelete}
        handleSearch={handleSearch}
        formValue={formValue}
      />
    </div>
  );
}
