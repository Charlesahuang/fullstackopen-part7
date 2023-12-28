import React, { useState, useEffect } from 'react';
import { setUserListRedux } from '../slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Service from '../services/api';
import Header from '../components/Header';
import './UsersPage.css'
const User = () => {
    const user = useSelector((state) => state.app.user);
    const [userList, setUserList] = useState(null);
    const dispatch = useDispatch();

    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px'
        },
        margin: {
            marginRight: '10px'
        },
        userList: {
            listStyle: 'none',
            padding: 0
        },
        userItem: {
            marginBottom: '10px',
            borderBottom: '1px solid #ddd',
            paddingBottom: '10px'
        }
    };

    const getUsersDta = async () => {
        let users = await Service.getUsers();
        setUserList(users);
        dispatch(setUserListRedux(users))
    };

    useEffect(() => {
        getUsersDta();
    }, []);

    return (
        <>
            <Header user={user} />
            <div className="user-container">
                <h1 className="user-title">USER page</h1>
                <ul className="user-list">
                    {userList ? (
                        userList.map((userobj) => (
                            <li key={userobj.id} className="user-item">
                                <p>username: {userobj.username}</p>
                                <p>
                                    {userobj.username} have{' '}
                                    {userobj.notes.length} notes
                                </p>
                                <Link to={`/user/${userobj.id}`} className="user-profile-link">View Profile</Link>
                            </li>
                        ))
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </ul>
            </div>
        </>
    );
};

export default User;
