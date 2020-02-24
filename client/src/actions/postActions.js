import axios from 'axios'
import { setAlert } from './index'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './types';

export const getPosts = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/posts');
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//add like
export const addLike = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/api/posts/like/${id}`);
            dispatch({
                type: UPDATE_LIKES,
                payload: { id, likes: res.data }
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//remove like
export const removeLike = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.put(`/api/posts/unlike/${id}`);
            dispatch({
                type: UPDATE_LIKES,
                payload: { id, likes: res.data }
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//delete post
export const deletePost = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/posts/${id}`);
            dispatch({
                type: DELETE_POST,
                payload: id
            })
            dispatch(setAlert('Post Removed', 'success'))
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

// add post
export const addPost = (formdata) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/posts`, formdata, config);
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
            dispatch(setAlert('Post created', 'success'))
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

export const getPost = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`/api/posts/${id}`);
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Add comment to post
export const addComment = (postId, formdata) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post(`/api/posts/comment/${postId}`, formdata, config);
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            })
            dispatch(setAlert('Comment Added', 'success'))
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}

//Delete comment 
export const removeComment = (postId, commentId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
            dispatch({
                type: REMOVE_COMMENT,
                payload: commentId
            })
            dispatch(setAlert('Comment Removed', 'success'))
        } catch (err) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        }
    }
}