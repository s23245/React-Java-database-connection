import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function UserForm() {
  // const [user, setUser] = useState({ login: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);
  const validationSchema = () => {
    return Yup.object().shape({
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
    api
      .post(BASE_URL + "post/user", data)
      .then((resp) => {
        resetForm({ data: "" });
        // setUser({
        //   login: resp.data.login,
        //   email: resp.data.email,
        //   password: resp.data.password,
        // });
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };
  const initialValues = {
    login: "",
    email: "",
    password: "",
  };
  return (
    <>
      {success ? <h5 className="text-primary">User Added Successfully!</h5>:null}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, resetForm }) => (
          <Form>
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

export default UserForm;
