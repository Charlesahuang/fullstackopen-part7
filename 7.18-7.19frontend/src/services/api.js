import axios from 'axios'
const baseUrl = 'http://localhost:3001'

axios.interceptors.request.use(request => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (request.url.includes('/api/notes') && (request.method === 'post' || request.method === 'delete')) {
    const token = storedUser?.token;
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return request;
}, error => {
  return Promise.reject(error);
});

const getAll = async () => {
  const request = axios.get(baseUrl + '/api/notes')
  return request.then(response => response.data)
}

const getUsers = async () => {
  const request = axios.get(baseUrl + '/api/users')
  return request.then(response => response.data)
}

const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/api/login`, { username, password })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

const addBlog = async (url, title, content, author) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/notes`,
      { url, title, author, content }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const addlikes = async (obj) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/notes/${obj.id}`, obj
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

const removeBlog = async (id) => {
  try {
    await axios.delete(`${baseUrl}/api/notes/${id}`)
    return true
  } catch (error) {
    throw error
  }
}

const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/notes/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

const newComment = async (id,comments)=>{
  try {
    const response = await axios.post(`${baseUrl}/api/comment/${id}`,comments)
    return response.data
  } catch (error) {
    throw error
  }
}

export default { getAll, login, addBlog, addlikes, removeBlog, getUsers, getBlogById,newComment }
