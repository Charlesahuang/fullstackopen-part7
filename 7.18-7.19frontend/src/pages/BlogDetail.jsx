import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header'
import { useSelector, useDispatch } from 'react-redux';

const BlogDetail = () => {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [commentText, setCommentText] = useState(''); // 添加评论文本状态
    const history = useHistory();
    const user = useSelector((state) => state.app.user);
    useEffect(() => {
        getBlogData();
    }, [blogId]);

    const getBlogData = async () => {
        try {
            const fetchedBlog = await Service.getBlogById(blogId);
            setBlog(fetchedBlog);
        } catch (error) {
            console.error(error);
            history.push('/blogs');
            toast.error(error.response.data.error);
        }
    };

    const addLikesBtn = () => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 };
        Service.addlikes(updatedBlog)
            .then(() => {
                getBlogData();
            })
            .catch((error) => {
                toast.error(error.response.data.error, { autoClose: 1000 });
                console.log(error);
            });
    };

    const removeBtn = () => {
        Service.removeBlog(blog.id)
            .then(() => {
                toast.success('Delete Success!', { autoClose: 1000 });
                history.push('/blogs');
            })
            .catch((error) => {
                toast.error(error.response.data.error, { autoClose: 1000 });
                console.log(error);
            });
    };

    const handleCommentInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const submitComment = async () => {
        const obj = await Service.newComment(blog.id, { comment: commentText })
        setBlog(obj)
        setCommentText('');
    };

    const renderComments = () => {
        if (!blog) {
            return null;
        }

        if (blog.comments && blog.comments.length > 0) {
            return (
                <div>
                    <h3>Comments:</h3>
                    <ul>
                        {blog.comments.map((comment, index) => (
                            <li key={index}>
                                {comment}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <ToastContainer />
            <Header user={user} />
            {blog && (
                <>
                    <h2>{blog.title}</h2>
                    <p>By: {blog.author}</p>
                    <div>Content: {blog.content}</div>
                    <div>Likes: {blog.likes} <button onClick={addLikesBtn}>Like</button></div>
                    <div>Url: <a href={blog.url}>{blog.url}</a></div>
                    <button onClick={removeBtn}>Delete</button>
                    <div>
                        <input
                            type="text"
                            placeholder="Add a comment"
                            value={commentText}
                            onChange={handleCommentInputChange}
                        />
                        <button onClick={submitComment}>Submit</button>
                    </div>
                </>
            )}
            {blog && renderComments()}
        </>
    );
};

export default BlogDetail;
