import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { initialValues, validationSchema } from "../_constants";
import styles from "./form.module.css";
import { FormField } from "../_types";
import { getOpenWeatherService } from "./api";

export default function Form({ setWeather }: { setWeather: (data: any) => void }) {
  const [formValue, setFormValue] = useState<FormField>(initialValues);

  async function fetchWeather() {
    fetch(getOpenWeatherService(formValue.city, formValue.country))
      .then((response) => response.json())
      .then((data) => setWeather(data));
  }

  async function handleSubmit(values: FormField) {
    setFormValue(values);
    fetchWeather();
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
          <input
            type="text"
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
          {errors.city && touched.city && errors.city}

          <input
            type="text"
            name="country"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.country}
          />
          {errors.country && touched.country && errors.country}

          <button type="submit">Search</button>
          <button type="button">Clear</button>
        </form>
      )}
    </Formik>
  );
}
