import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/appSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(()=>{
        console.log('用户数据',user);
    },[])
    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(setUser(null));
        toast.success('logout success', { autoClose: 1000 });
    };

    const handleGoBack = () => {
        history.goBack(); // 使用 history.goBack() 返回上一页
    };

    return (
        <>
            <ToastContainer />
            <button onClick={handleGoBack} style={{ marginRight: '10px' }}>Back Pages</button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: '10px' }}>Logged in as {user.username}</p>
                <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
                <Link to="/users" style={{ marginRight: '10px' }}>users</Link>
                <Link to="/blogs">blogs</Link>
            </div>
        </>
    );
};

export default Header;
