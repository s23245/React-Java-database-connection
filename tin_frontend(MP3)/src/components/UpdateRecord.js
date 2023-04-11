import React from "react";
import RecordComponet from "../helper";
import UpdateGroupForm from "./updateForm/UpdateGroupForm";
import UpdateStudentForm from "./updateForm/UpdateStudentForm";
import UpdateTeacherForm from "./updateForm/UpdateTeacherForm";
import UpdateTeacherGroupForm from "./updateForm/UpdateTeacherGroupForm";
import UpdateUserForm from "./updateForm/UpdateUserForm";

function UpdateRecord() {
  const User = () => <UpdateUserForm />;
  const Student = () => <UpdateStudentForm />;
  const Teacher = () => <UpdateTeacherForm />;
  const Group = () => <UpdateGroupForm />;
  const TeacherGroup = () => <UpdateTeacherGroupForm />;
  return RecordComponet(User, Student, Teacher, Group, TeacherGroup);
}

export default UpdateRecord;
