import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import BlogPage from './BlogsPage';
import User from './UsersPage';
import UserProfile from './userProfile'; // 新增的用户个人页面组件
import BlogDetail from './BlogDetail';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../slices/appSlice';

const Index = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.app.user);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log('');
            dispatch(setUser(JSON.parse(storedUser)));
        }
    }, []);

    return (
        <div>
            <Router>
                <Switch>

                    <Route path="/login">
                        {user ? <Redirect to="/blogs" /> : <Login />}
                    </Route>
                    <Route path="/blogs">
                        {user ? <BlogPage /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/users">
                        {user ? <User /> : <Redirect to="/login" />}
                    </Route>
                    {/* 添加动态路由以支持用户个人页面 */}
                    <Route path="/user/:userId" component={UserProfile} />
                    <Route path="/Ablog/:blogId" component={BlogDetail} />
                    <Redirect from="/" to="/login" />
                </Switch>
            </Router>
        </div>
    );
};

export default Index;
