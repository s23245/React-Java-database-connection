import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function UserDeleteForm() {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const validationSchema = () => {
    return Yup.object().shape({
      userId: Yup.number().required("Group Id is required"),
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
    api
      .delete(BASE_URL + "delete/user/" + userId)
      .then((resp) => {
        resetForm({ data: "" });
        setSuccess(true);
      })
      .catch((err) =>
        setErr("Wrong UserID or Still Referenced from other tables")
      );
  };
  const initialValues = {
    userId: "",
  };
  return (
    <>
      {success ? (
        <h5 className="text-primary">User removed Successfully!</h5>
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
              <label>UserID to Delete</label>
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

            <div className="form-group mt-2">
              <button type="submit" className="btn btn-danger btn-sm">
                DELETE RECORD
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

export default UserDeleteForm;
