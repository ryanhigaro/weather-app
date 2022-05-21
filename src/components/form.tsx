import React, { useEffect, useState } from "react";
import { FastField, Field, Formik } from "formik";
import { initialValues, searchForm, validationSchema } from "../_constants";
import styles from "./form.module.css";
import { FormField } from "../_types";
import { getOpenWeatherService } from "./api";
import axios from "axios";
import { getLocalStorage, setLocalStorage } from "../appData";
import moment from "moment";

export default function Form({
  setWeather,
  setHistoryList
}: {
  setWeather: (data: any) => void;
  setHistoryList: (data: any) => void
}) {
  async function fetchWeather(values: FormField) {
    axios
      .get(getOpenWeatherService(values.city, values.country))
      .then((response: { data: any }) => {
        setWeather(response.data);
      })
      .catch((error: any) => console.error(error));
  }

  async function handleSubmit(values: FormField) {
    const currentTime = moment().format("YYYY-MM-DD h:mm:ss a");
    setHistoryList((prevState: any) => [...prevState, { ...values, date: currentTime }])
    fetchWeather(values);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <label>
            City:
            <FastField type="text" name="city" placeholder="City" />
          </label>
          <p>{errors.city && touched.city && errors.city}</p>
          <label>
            Country:
            <FastField type="text" name="country" placeholder="Country" />
          </label>
          <p>{errors.country && touched.country && errors.country}</p>
          <button type="submit">Search</button>
          <button type="button">Clear</button>
        </form>
      )}
    </Formik>
  );
}
