import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function UpdateUserForm() {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const validationSchema = () => {
    return Yup.object().shape({
      userId: Yup.number().required("User ID is required"),
      login: Yup.string().required("Login is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password must not exceed 40 characters"),
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
    let userId = data.userId;
    let userData = {
      login: data.login,
      password: data.password,
      email: data.email,
    };
    api
      .put(BASE_URL + `update/user/${userId}`, userData)
      .then((resp) => {
        resetForm({ data: "" });
        setSuccess(true);
        setErr("");
      })
      .catch((err) => {
        setSuccess(false);
        setErr("Wrong UserID");
      });
  };
  const initialValues = {
    userId: "",
    login: "",
    email: "",
    password: "",
  };
  return (
    <>
      {success ? (
        <h5 className="text-primary">User Updated Successfully!</h5>
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
              <label>User Id to Update</label>
              <Field
                name="userId"
                type="number"
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
            <div className="form-group">
              <label>Login</label>
              <Field
                name="login"
                type="text"
                className={
                  "form-control" +
                  (errors.login && touched.login ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="login"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email"> Email </label>
              <Field
                name="email"
                type="email"
                className={
                  "form-control" +
                  (errors.email && touched.email ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password"> Password </label>
              <Field
                name="password"
                type="password"
                className={
                  "form-control" +
                  (errors.password && touched.password ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="password"
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

export default UpdateUserForm;
