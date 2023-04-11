import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function GroupTeacherForm() {
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
      groupId: Yup.number().required("GroupID is required"),
      teacherId: Yup.number().required("TeacherID  is required"),
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
      .post(BASE_URL + "post/teacherGroup", data)
      .then((resp) => {
        resetForm({ data: "" });
        setErr("");
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setErr("Wrong GroupID or TeacherID");
      });
  };
  const initialValues = {
    teacherId: "",
    groupId:""
  };
  return (
    <>
      {success ? (
        <h5 className="text-primary">GroupTeacher Added Successfully!</h5>
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
              <label>GroupID</label>
              <Field
                name="groupId"
                type="number"
                min="0"
                className={
                  "form-control" +
                  (errors.groupId && touched.groupId ? " is-invalid" : "")
                }
              />
              <ErrorMessage
                name="groupId"
                component="div"
                className="invalid-feedback"
              />
            </div>

            <div className="form-group">
              <label>TeacherID</label>
              <Field
                name="teacherId"
                type="number"
                min="0"
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

export default GroupTeacherForm;
