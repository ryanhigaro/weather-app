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

export default function WeatherPage(): ReactElement {
  const [weather, setWeather] = useState(null);
  const [historyList, setHistoryList] = useState<any>([]);
  const [formValue, setFormValue] = useState<FormField>(initialValues);
  async function fetchWeather(values: FormField) {
    axios
      .get(getOpenWeatherService(values.city, values.country))
      .then((response: { data: any }) => {
        setWeather(response.data);
      })
      .catch((error: any) => console.error(error));
  }

  async function handleSubmit(values: FormField) {
    setFormValue(values);
    fetchWeather(values);

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

  function handleSearch(values: FormField) {
    handleSubmit(values)
  }

  function handleClear() {
    setFormValue(initialValues);
    setWeather(null)
  }

  function handleDelete(index: any) {
    const temp = [...historyList];
    temp.splice(index, 1);
    setHistoryList(temp);
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
      <Preview queryResult={weather} />
      <History
        historyList={historyList}
        handleDelete={handleDelete}
        handleSearch={handleSearch}
        formValue={formValue}
      />
    </div>
  );
}
