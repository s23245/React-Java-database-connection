import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import config from "bootstrap/js/src/util/config";

function UserList() {
  const [users, setUsers] = useState([]);


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
      .get(BASE_URL + "get/users")
      .then((resp) => setUsers(resp.data))
      .catch((err) => console.log(err));
  }, [users]);
  return (
    <table className="table table-bordered table-primary">
      <thead>
        <tr>
          <th scope="col">UserID</th>
          <th scope="col">Login</th>
          <th scope="col">Password</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        {users
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((user) => (
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.login}</td>
              <td className="hidetext">{user.password}</td>
              <td>{user.email}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default UserList;
