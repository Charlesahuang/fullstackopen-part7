// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Service from '../services/api';

// const Blog = ({ blog, user, FetchGetblog }) => {
//   const [showDetail, setShowDetail] = useState(false);

//   const addlikesBtn = () => {
//     const updatedBlog = { ...blog, likes: blog.likes + 1 };
//     Service.addlikes(updatedBlog, user.token)
//       .then(() => {
//         FetchGetblog()
//       })
//       .catch((err) => {
//         toast.error(err.response.data.error, { autoClose: 1000 });
//         console.log(err);
//       });
//   };

//   //5.11
//   const removeBtn = () => {
//     Service.removeBlog(blog.id, user.token)
//       .then(() => {
//         toast.success('Delete Success!', { autoClose: 1000 });
//         FetchGetblog();
//       })
//       .catch((err) => {
//         toast.error(err.response.data.error, { autoClose: 1000 });
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div>
//         Title: {blog.title} By：{blog.author}{' '}
//         <button onClick={() => setShowDetail(!showDetail)}>showDetail</button>
//       </div>
//       {
//         //5.7
//         showDetail ? (
//           <>
//             <div>
//               content: {blog.content} ;id: {blog.id}
//             </div>
//             <div>
//               likes:{blog.likes} <button onClick={addlikesBtn}>likes</button>
//             </div>
//             <div>
//               import: {blog.import} ;url: <a href={blog.url}>{blog.url}</a>
//             </div>
//             <button style={{ marginBottom: '15px' }} onClick={removeBtn}>
//               Delelte
//             </button>
//           </>
//         ) : (
//           <></>
//         )
//       }
//     </>
//   );
// };

// export default Blog;


import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div>
      Title: <Link to={`/Ablog/${blog.id}`}>{blog.title}</Link> By: {blog.author}
    </div>
  );
};

export default Blog;
