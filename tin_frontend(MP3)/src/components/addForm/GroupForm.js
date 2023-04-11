import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function GroupForm() {
  // const [group, setGroup] = useState({
  //   name: "",
  //   subject: "",
  //   language: "",
  //   limitOfStudents:"",
  //   languageOfStudying:"",
  //   studentId: "",
  // });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      subject: Yup.string().required("Subject is required"),
      limitOfStudents: Yup.number().required("Limit of Students is required"),
      languageOfStudying: Yup.string().required("Language is required"),
      studentId: Yup.number().required("Student Id is required"),
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
    api
      .post(BASE_URL + "post/group", data)
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
    name: "",
    subject: "",
    limitOfStudents: "",
    languageOfStudying: "",
    studentId: "",
  };
  return (
    <>
      {success ? (
        <h5 className="text-primary">Group Added Successfully!</h5>
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
              <label htmlFor="subject"> Subject </label>
              <Field
                name="subject"
                type="text"
                className={
                  "form-control" +
                  (errors.subject && touched.subject ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="subject"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="language">Language </label>
              <Field
                name="languageOfStudying"
                type="text"
                className={
                  "form-control" +
                  (errors.languageOfStudying && touched.languageOfStudying
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="languageOfStudying"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="language">Limit Of Students </label>
              <Field
                name="limitOfStudents"
                min="1"
                type="number"
                className={
                  "form-control" +
                  (errors.limitOfStudents && touched.limitOfStudents
                    ? " is-invalid"
                    : "")
                }
              />
              <ErrorMessage
                name="limitOfStudents"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentId">Student ID </label>
              <Field
                name="studentId"
                type="number"
                min="0"
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

            <div className="form-group mt-2">
              <button type="submit" className="btn btn-primary btn-sm">
                ADD NEW RECORD
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-warning btn-sm"
              >
                Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default GroupForm;
