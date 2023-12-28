import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/appSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css'

const Header = ({ user }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(setUser(null));
        history.push('/login')
        toast.success('logout success', { autoClose: 1000 });
    };

    const handleGoBack = () => {
        history.goBack(); // 使用 history.goBack() 返回上一页
    };

    return (
        <>
            <ToastContainer />
            <div className="header-container">
                <button onClick={handleGoBack} className="header-button">Back Pages</button>
                {user && (
                    <div className="header-user-info">
                        <p className="user-greeting">Logged in as {user.username}</p>
                        <button onClick={handleLogout} className="header-button">Logout</button>
                        <Link to="/users" className="header-link">users</Link>
                        <Link to="/blogs" className="header-link">blogs</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Header;
