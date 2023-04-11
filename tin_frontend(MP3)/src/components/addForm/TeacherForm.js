import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function TeacherForm() {
  // const [teacher, setTeacher] = useState({
  //   name: "",
  //   surname: "",
  //   degree: "",
  //   userId: "",
  // });
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const validationSchema = () => {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      degree: Yup.string().required("Degree is required"),
      userId: Yup.number().required("User Id is required"),
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
      .post(BASE_URL + "post/teacher", data)
      .then((resp) => {
        resetForm({ data: "" });
        // setTeacher({
        //   userId: resp.data.login,
        //   name: resp.data.name,
        //   surname: resp.data.surname,
        //   degree: resp.data.degree,
        // });
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
    surname: "",
    degree: "",
    userId: "",
  };
  return (
    <>
      {success ? (
        <h5 className="text-primary">Teacher Added Successfully!</h5>
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
              <label htmlFor="degree">Degree </label>
              <Field
                name="degree"
                type="text"
                className={
                  "form-control" +
                  (errors.degree && touched.degree ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="degree"
                component="div"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userId">UserID </label>
              <Field
                name="userId"
                type="number"
                min="0"
                className={
                  "form-control" +
                  (errors.userId && touched.userId ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="userId"
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

export default TeacherForm;
