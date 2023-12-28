import React, { useState, useEffect } from "react";
import Service from '../services/api'
import {setUser} from '../slices/appSlice'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        if (username === '' || password === '') {
            alert('Username and password are required.');
            return;
        }
        Service.login(username, password)
            .then((e) => {
                localStorage.setItem('user', JSON.stringify(e));
                dispatch(setUser(e));
                toast.success('logout success', { autoClose: 1000 });
            })
            .catch((err) => {
                console.error(err)
                toast.error(err.error, { autoClose: 1000 });
            });
    };

    return (
        <>
            <ToastContainer />
            <div>
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username：
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        password：
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login