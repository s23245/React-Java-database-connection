import "./App.css";
import TabMenu from "./layouts/TabMenu";
import Login from './components/loginForm/loginForm';
import {useEffect, useState} from "react";
import { Redirect } from 'react-router-dom';

function App()
{
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

    useEffect(() => {
        if (token)
        {
            setIsAuthenticated(true);
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        window.location.reload();
    };

    if (!isAuthenticated)
        return <Login setToken={setToken} setIsAuthenticated={setIsAuthenticated} />



        return (
        <div className="container-fluid">
            <div className="main">
                <TabMenu/>
            </div>
            <nav className="navbar  navbar-light bg-light">
                <span>Created by Bohdan Bondarenko 2023</span>
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
}

export default App;

