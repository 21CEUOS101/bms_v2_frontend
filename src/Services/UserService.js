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

async function getAllUsers() {
    const data = await Axios.get(`${url}/api/users`,config).then((response) => {
        return response.data;
    });

    return data;
}

async function getUserById(id) {
    
    const data = await Axios.get(`${url}/api/users/${id}`,config).then((response) => {
        console.log(response.data);
        return response.data;
    });

    return data;
}

async function createUser(userData) {
    const data = await Axios.post(`${url}/api/users`, userData , config).then((response) => {
        return response.data;
    });

    return data;
}

async function updateUser(id, userData) {
        const data = await Axios.put(`${url}/api/users/${id}`, userData , config).then((response) => {
            return response.data;
        });
    
        return data;
}

async function deleteUser(id) {
    const data = await Axios.delete(`${url}/api/users/${id}` , config).then((response) => {
        return response.data;
    });

    return data;
}

async function getUserByBlogId(blogId) {
    const data = await Axios.get(`${url}/api/blogs/${blogId}/user`,config).then((response) => {
        return response.data;
    });

    return data;
}

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByBlogId };