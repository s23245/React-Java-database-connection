import React, { useEffect, useState } from "react";
import { GET_TEACHERGROUPS } from "../../config";
import axios from "axios";

function TeacherGroupList() {
  const [teacherGroups, setTeacherGroups] = useState([]);

  useEffect(() => {
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
      .get(GET_TEACHERGROUPS)
      .then((resp) => setTeacherGroups(resp.data))
      .catch((err) => console.log(err));
  }, [teacherGroups]);
  return (
    <table className="table table-bordered table-success">
      <thead>
        <tr>
          <th scope="col">Teacher GroupID</th>
          <th scope="col">Group ID</th>
          <th scope="col">TeacherID</th>
        </tr>
      </thead>
      <tbody>
        {teacherGroups
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((teacherGroup) => (
            <tr key={teacherGroup.id}>
              <th scope="row">{teacherGroup.id}</th>
              <td>{teacherGroup.group.id}</td>
              <td>{teacherGroup.teacher.id}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default TeacherGroupList;
