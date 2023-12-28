import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import './UserProfile.css';

const UserProfile = () => {
    const { userId } = useParams();
    const userList = useSelector((state) => state.app.userList);
    const history = useHistory();

    if (!userList || userList.length === 0) {
        history.push('/users'); // 执行重定向到 /users 路由
        return null;
    }

    const userobj = userList.find((user) => user.id === userId);
    if (!userobj) {
        history.push('/users'); // 执行重定向到 /users 路由
        return null;
    }

    return (
        <>
            <Header user={userobj} />
            <div className="user-profile-container">
                <h2 className="user-profile-title">User Profile</h2>
                <h3 className="user-profile-info">username: {userobj.username}</h3>
                <p className="user-profile-info">User ID: {userId}</p>

                {userobj.notes && (
                    <>
                        <h3 className="user-profile-title">Notes</h3>
                        <ul className="user-profile-notes">
                            {userobj.notes.map((note, index) => (
                                <li key={index} className="note-item">
                                    <h4 className="note-title">{note.title}</h4>
                                    <p className="note-likes">Likes: {note.likes}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </>
    );
};

export default UserProfile;
