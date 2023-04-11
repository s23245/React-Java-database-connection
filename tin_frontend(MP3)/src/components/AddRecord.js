import React from "react";
import RecordComponet from "../helper";
import GroupForm from "./addForm/GroupForm";
import GroupTeacherForm from "./addForm/GroupTeacherForm";
import StudentForm from "./addForm/StudentForm";
import TeacherForm from "./addForm/TeacherForm";
import UserForm from "./addForm/UserForm";

function AddRecord() {
  const User = () => <UserForm />;
  const Student = () => <StudentForm />;
  const Teacher = () => <TeacherForm />;
  const Group = () => <GroupForm />;
  const GroupTeacher = () => <GroupTeacherForm />;
  return RecordComponet(User, Student, Teacher, Group, GroupTeacher);
}

export default AddRecord;
