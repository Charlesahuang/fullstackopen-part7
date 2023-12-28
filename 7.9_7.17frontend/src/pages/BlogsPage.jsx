import React, { useState, useEffect } from 'react';
import NewBlog from "../components/NewBlog"
import Blog from "./Blog"
import Service from '../services/api';
import { setBlogs, setUser } from '../slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';

const BlogPage = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.app.blogs)
    const user = useSelector((state) => state.app.user);
    const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        FetchGetblog()
    }, [])

    useEffect(() => {
        console.log('用户数据', user.username);
    }, [user])

    const FetchGetblog = () => {
        Service.getAll().then((blogs) => {
            blogs.sort((b, a) => a.likes - b.likes);
            dispatch(setBlogs(blogs)); // 使用 Redux action 更新数据
        });
    };



    return (
        <>
            <ToastContainer />
            <div>
                <Header user={user} />

                {/* 5.5 */}
                {showForm ? (
                    <NewBlog
                        setShowForm={setShowForm}
                        user={user}
                        FetchGetblog={FetchGetblog}
                    />
                ) : (
                    // 显示按钮
                    <button onClick={() => setShowForm(true)}>New Blog</button>
                )}
                {blogs && blogs.length > 0 ? (
                    <>
                        <h2>Blogs</h2>
                        {blogs.map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                user={user}
                                FetchGetblog={FetchGetblog}
                            />
                        ))}
                    </>
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
        </>
    )
}

export default BlogPage;
