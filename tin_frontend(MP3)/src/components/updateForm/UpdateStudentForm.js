import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function UpdateStudentForm() {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      yearOfStudy: Yup.number().required("Year Of Study is required"),
      studentId: Yup.number().required("User Id is required"),
    });
  };
  const handleSubmit = (data, { resetForm }) => {
    const token = localStorage.getItem('token');
    const api = axios.create();
    api.interceptors.request.use(
        config =>{
          if(token)
            config.headers.Authorization = `Bearer ${token}`;

          return config;
        },
        error => {
          return Promise.reject(error);
        }
    );
    let studentId = data.studentId;
    let studentData = {
      name: data.name,
      surname: data.surname,
      yearOfStudy: data.yearOfStudy,
    };
    api
      .put(BASE_URL + `update/student/${studentId}`, studentData)
      .then((resp) => {
        resetForm({ data: "" });
        setErr("");
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setErr("Wrong UserID");
      });
  };
  const initialValues = {
    studentId: "",
    name: "",
    surname: "",
    yearOfStudy: "",
  };
  return (
    <>
      {success ? (
        <h5 className="text-primary">Student updated Successfully!</h5>
      ) : null}
      {err.length > 0 && <h5 className="text-danger">{err}</h5>}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, resetForm }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="userId">Student ID to Update </label>
              <Field
                name="studentId"
                type="number"
                className={
                  "form-control" +
                  (errors.studentId && touched.studentId ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="studentId"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <Field
                name="name"
                type="text"
                className={
                  "form-control" +
                  (errors.name && touched.name ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="name"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="surname"> Surname </label>
              <Field
                name="surname"
                type="text"
                className={
                  "form-control" +
                  (errors.surname && touched.surname ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="surname"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="year_of_study"> Year Of Study </label>
              <Field
                name="yearOfStudy"
                type="number"
                step="0.5"
                max="4"
                min="1"
                className={
                  "form-control" +
                  (errors.yearOfStudy && touched.yearOfStudy
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="yearOfStudy"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group mt-2">
            <button type="submit" className="btn btn-success btn-sm">
                UPDATE RECORD
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-info btn-sm"
              >
                RESET
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default UpdateStudentForm;
