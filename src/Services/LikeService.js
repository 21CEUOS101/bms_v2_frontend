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


async function getAllLikes() {

    const data = await Axios.get(`${url}/api/likes`,config).then((response) => {
        return response.data;
    });

    return data;
}

async function getLikesByUserId(id) {
    const data = await Axios.get(`${url}/api/users/${id}/likes`,config).then((response) => {
        return response.data;
    });

    return data;
}

async function getLikesByBlogId(id) {
    const data = await Axios.get(`${url}/api/blogs/${id}/likes`,config).then((response) => {
        return response.data;
    });

    return data;
}

async function likeBlog(id) {
    const data = await Axios.post(`${url}/api/blogs/${id}/like`,config).then((response) => {
        return response.data;
    });

    return data;
}

async function unlikeBlog(id) {
    const data = await Axios.post(`${url}/api/blogs/${id}/unlike`,config).then((response) => {
        return response.data;
    });

    return data;
}

export default { getAllLikes, getLikesByUserId, getLikesByBlogId , likeBlog , unlikeBlog };