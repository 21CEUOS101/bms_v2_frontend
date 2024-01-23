import Axios from 'axios';
import { url } from './index.js';

const token = localStorage.getItem('jwt');
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

async function getCommentsByBlogId(blogId) {
    const data = await Axios.get(`${url}/api/blogs/${blogId}/comments`, config).then((response) => {
        return response.data;
    });

    return data;

}

async function getCommentsByUserId(userId) {
    const data = await Axios.get(`${url}/api/users/${userId}/comments` , config).then((response) => {
        return response.data;
    });

    return data;

}

async function createComment(id, commentData) {
    const data = await Axios.post(`${url}/api/blogs/${id}/comment`, commentData , config).then((response) => {
        return response.data;
    });

    return data;
}

async function updateComment(id, commentData) {
        const data = await Axios.put(`${url}/api/blogs/${id}/comment`, commentData , config).then((response) => {
            return response.data;
        });
    
        return data;
}

async function deleteComment(id) {
    const data = await Axios.delete(`${url}/api/blogs/${id}/comment`,config).then((response) => {
        return response.data;
    });

    return data;
}

// async function getUserByCommentId(commentId) {
    
//     const data = await Axios.get(`${url}/api/comments/${commentId}/user`).then((response) => {
//         return response.data;
//     });

//     return data;
// }

// async function getBlogByCommentId(commentId) {
    
//     const data = await Axios.get(`${url}/api/comments/${commentId}/blog`).then((response) => {
//         return response.data;
//     });

//     return data;
// }

export default { getCommentsByBlogId, getCommentsByUserId, createComment, updateComment, deleteComment };

