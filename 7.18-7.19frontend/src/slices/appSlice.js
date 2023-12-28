// slices/blogsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogs: [],
    user: null,
    userList:[]
};

const blogsSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            state.blogs = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload; 
        },
        setUserListRedux: (state, action) => {
            state.userList = action.payload; 
        },
    },
});

export const { setBlogs,setUser,setUserListRedux } = blogsSlice.actions;
export default blogsSlice.reducer;
