import React, { useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function UpdateGroupForm() {
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState("");
  const validationSchema = () => {
    return Yup.object().shape({
      groupId: Yup.number().required("Group Id is required"),
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
    let groupId = data.groupId;
    let groupData = {
      name: data.name,
      subject: data.subject,
      limitOfStudents: data.limitOfStudents,
      languageOfStudying: data.languageOfStudying,
      studentId: data.studentId,
    };
    api
      .put(BASE_URL + "update/group/" + groupId, groupData)
      .then((resp) => {
        resetForm({ data: "" });
        setErr("");
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setErr("Wrong Group ID");
      });
  };
  const initialValues = {
    groupId: "",
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
              <label htmlFor="groupId">Group ID </label>
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

export default UpdateGroupForm;
