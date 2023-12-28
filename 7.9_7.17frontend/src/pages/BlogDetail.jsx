import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const BlogDetail = ({ user }) => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const history = useHistory();
    useEffect(() => {
        getBlogData()
    }, [blogId]);

    const getBlogData = async () => {
        Service.getBlogById(blogId)
            .then((blog) => {
                console.log('请求的数据', blog);
                setBlog(blog);
            })
            .catch((err) => {
                console.error(err)
                history.push('/blogs');
                toast.error(err.response.data.error);
            });
    }

    if (!blog) {
        return <p>Loading...</p>;
    }

    const addlikesBtn = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 };
        Service.addlikes(updatedBlog)
            .then(() => {
                getBlogData()
            })
            .catch((err) => {
                toast.error(err.response.data.error, { autoClose: 1000 });
                console.log(err);
            });
    };

    const removeBtn = () => {
        Service.removeBlog(blog.id)
            .then(() => {
                toast.success('Delete Success!', { autoClose: 1000 });
                history.push('/blogs');
            })
            .catch((err) => {
                toast.error(err.response.data.error, { autoClose: 1000 });
                console.log(err);
            });
    };

    return (
        <>
            <ToastContainer />
            <h2>{blog.title}</h2>
            <p>By: {blog.author}</p>
            <div>Content: {blog.content}</div>
            <div>Likes: {blog.likes} <button onClick={addlikesBtn}>Like</button></div>
            <div>Url: <a href={blog.url}>{blog.url}</a></div>
            <button onClick={removeBtn}>Delete</button>
        </>
    );
};

export default BlogDetail;
