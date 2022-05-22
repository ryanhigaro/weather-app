import React from "react";
import { Formik } from "formik";
import { validationSchema } from "../_constants";
import styles from "./Form.module.css";
import { FormField } from "../_types";
import { Button, Form as BootstrapForm, FloatingLabel } from "react-bootstrap";

export default function Form({
  initialValues,
  handleSubmit,
  handleClear,
}: {
  initialValues: FormField;
  handleSubmit: (values: FormField) => void;
  handleClear: () => void;
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize
    >
      {({ values, errors, handleChange, handleSubmit, resetForm }) => (
        <BootstrapForm onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputForm}>
            <BootstrapForm.Group>
              <FloatingLabel label="City">
                <BootstrapForm.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.city}
                </BootstrapForm.Control.Feedback>
              </FloatingLabel>
            </BootstrapForm.Group>
          </div>
          <div className={styles.inputForm}>
            <BootstrapForm.Group>
              <FloatingLabel label="Country">
                <BootstrapForm.Control
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  isInvalid={!!errors.country}
                />
                <BootstrapForm.Control.Feedback type="invalid">
                  {errors.country}
                </BootstrapForm.Control.Feedback>
              </FloatingLabel>
            </BootstrapForm.Group>
          </div>
          <div className={styles.btnGroup}>
            <Button
              variant="primary"
              type="submit"
              className={styles.btn}
              size="lg"
            >
              Search
            </Button>
            <Button
              size="lg"
              className={styles.btn}
              type="button"
              variant="light"
              onClick={() => {
                resetForm();
                handleClear();
              }}
            >
              Clear
            </Button>
          </div>
        </BootstrapForm>
      )}
    </Formik>
  );
}
