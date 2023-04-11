import React, { useState } from "react";
import {BASE_URL} from "../../config";

function Login({setToken})
{
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(BASE_URL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login, password }),
        });

        if (response.ok) {
            const token = await response.text();
            localStorage.setItem("token", token);
            window.location.reload();
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="card" style={{width: '50%'}}>
                <div className="card-body">
                    <h5 className="card-title text-center">Login</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Login:</label>
                            <div className="col-sm-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Password:</label>
                            <div className="col-sm-6">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;
