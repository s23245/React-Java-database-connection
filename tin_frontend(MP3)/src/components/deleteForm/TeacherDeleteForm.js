import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function TeacherDeleteForm() {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const validationSchema = () => {
    return Yup.object().shape({
      teacherId: Yup.number().required("Teacher Id is required"),
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
    let teacherId = data.teacherId;
    api
      .delete(BASE_URL + "delete/teacher/" + teacherId)
      .then((resp) => {
        resetForm({ data: "" });
        setSuccess(true);
      })
      .catch((err) =>
        setErr(
          "Wrong Teacher ID or Still Referenced from other tables"
        )
      );
  };
  const initialValues = {
    teacherId: "",
  };
  return (
    <>
      {success ? (
        <h5 className="text-primary">Teacher removed Successfully!</h5>
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
              <label>Teacher Id to Delete</label>
              <Field
                name="teacherId"
                type="number"
                className={
                  "form-control" +
                  (errors.teacherId && touched.teacherId ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="teacherId"
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

export default TeacherDeleteForm;
