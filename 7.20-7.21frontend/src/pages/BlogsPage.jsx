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
import './BlogsPage.css';

const BlogPage = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.app.blogs)
    const user = useSelector((state) => state.app.user);
    const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        FetchGetblog()
    }, [])


    const FetchGetblog = () => {
        Service.getAll().then((blogs) => {
            blogs.sort((b, a) => a.likes - b.likes);
            dispatch(setBlogs(blogs)); // 使用 Redux action 更新数据
        });
    };



    return (
        <>
            <ToastContainer />
            <div className="blog-page-container">
                <Header user={user} />
                <div className="blog-page-header">
                    {showForm ? (
                        <NewBlog
                            setShowForm={setShowForm}
                            user={user}
                            FetchGetblog={FetchGetblog}
                        />
                    ) : (
                        <button onClick={() => setShowForm(true)} className="new-blog-button">New Blog</button>
                    )}
                    
                </div>
                <h2 className="blog-page-title">BlogsList Page</h2>
                {blogs && blogs.length > 0 ? (
                    <ul className="blog-list">
                        {blogs.map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                user={user}
                                FetchGetblog={FetchGetblog}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="no-blogs-message">No blogs available.</p>
                )}
            </div>
        </>
    );
}

export default BlogPage;
