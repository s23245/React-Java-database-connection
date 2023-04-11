import React, { useState } from "react";

export const RecordComponet = (User, Student, Teacher, Group, TeacherGroup) => {
  const [component, setComponent] = useState(0);

  const getComponent = () => {
    switch (component) {
      case "0":
        return <User />;
      case "1":
        return <Student />;
      case "2":
        return <Teacher />;
      case "3":
        return <Group />;
      case "4":
        return <TeacherGroup />;
      default:
        return <User />;
    }
  };
  const selectChange = (event) => {
    setComponent(event.target.value);
  };
  return (
    <div className="add-form mx-auto">
      <div className="p-4">
        <select className="form-select" onClick={selectChange} defaultValue={0}>
          <option value="0">User</option>
          <option value="1">Student</option>
          <option value="2">Teacher</option>
          <option value="3">Group</option>
          <option value="4">TeacherGroup</option>
        </select>
      </div>
      <hr />
      <div>{getComponent()}</div>
    </div>
  );
};

export default RecordComponet;
