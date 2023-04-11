import React from "react";
import RecordComponet from "../helper";
import GroupDeleteForm from "./deleteForm/GroupDeleteForm";
import StudentDeleteForm from "./deleteForm/StudentDeleteForm";
import TeacherDeleteForm from "./deleteForm/TeacherDeleteForm";
import TeacherGroupDeleteForm from "./deleteForm/TeacherGroupDeleteForm";
import UserDeleteForm from "./deleteForm/UserDeleteForm";


function DeleteRecord() {
  const User = () => <UserDeleteForm />;
  const Student = () => <StudentDeleteForm />;
  const Teacher = () => <TeacherDeleteForm />;
  const Group = () => <GroupDeleteForm />;
  const TeacherGroup = () => <TeacherGroupDeleteForm />;
  return RecordComponet(User, Student, Teacher, Group, TeacherGroup);
}

export default DeleteRecord;
