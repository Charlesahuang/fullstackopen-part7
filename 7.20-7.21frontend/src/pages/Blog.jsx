import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const Blog = ({ blog }) => {
  return (
    <div className="blog-item">
      <span className="blog-title">Title: </span>
      <Link to={`/Ablog/${blog.id}`}>{blog.title}</Link>
      <span className="blog-author"> By: {blog.author}</span>
    </div>
  );
};

export default Blog;
