import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const { userId } = useParams();
    const userList = useSelector((state) => state.app.userList);
    const history = useHistory();

    if (!userList || userList.length === 0) {
        console.log('用户列表找不到');
        history.push('/users'); // 执行重定向到 /users 路由
        return null;
    }

    const userobj = userList.find((user) => user.id === userId);
    if (!userobj) {
        console.log('用户找不到');
        history.push('/users'); // 执行重定向到 /users 路由
        return null;
    }

    return (
        <>
            <Header user={userobj} />
            <div>
                <h2>User Profile</h2>
                <h3>username:{userobj.username}</h3>
                <p>User ID: {userId}</p>

                {userobj.notes && (
                    <>
                        <h3>Notes</h3>
                        <ul>
                            {userobj.notes.map((note, index) => (
                                <li key={index} style={{ listStyleType: 'disc' }}>
                                    <h4>{note.title}</h4>
                                    <p>Likes: {note.likes}</p>
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
