import React, { useEffect, useState } from "react";
import { FastField, Field, Formik } from "formik";
import { initialValues, searchForm, validationSchema } from "../_constants";
import styles from "./form.module.css";
import { FormField } from "../_types";

export default function Form({
  setWeather,
  setHistoryList,
  handleSubmit,
  handleClear,
}: {
  setWeather: (data: any) => void;
  setHistoryList: (data: any) => void;
  handleSubmit: (values: FormField) => void;
  handleClear: () => void;
}) {
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
        resetForm,
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
          <button
            type="button"
            onClick={() => {
              resetForm();
              handleClear();
            }}
          >
            Clear
          </button>
        </form>
      )}
    </Formik>
  );
}
