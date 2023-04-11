import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_GROUPS } from "../../config";

function GroupList() {
  const [groups, setGroups] = useState([]);

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
      .get(GET_GROUPS)
      .then((resp) => setGroups(resp.data))
      .catch((err) => console.log(err));
  }, [groups]);

  return (
    <table className="table table-bordered table-warning">
      <thead>
        <tr>
          <th scope="col">GroupID</th>
          <th scope="col">Name</th>
          <th scope="col">Subject</th>
          <th scope="col">Language Of Studying</th>
          <th scope="col">Limit Of Students</th>
          <th scope="col">StudentID</th>
        </tr>
      </thead>
      <tbody>
        {groups
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((group) => (
            <tr key={group.id}>
              <th scope="row">{group.id}</th>
              <td>{group.name}</td>
              <td>{group.subject}</td>
              <td>{group.languageOfStudying}</td>
              <td>{group.limitOfStudents}</td>
              <td>{group.student.id}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default GroupList;
