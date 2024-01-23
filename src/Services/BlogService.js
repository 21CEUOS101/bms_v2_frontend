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

console.log(token);


async function getAllBlogs() {
    
    const data = await Axios.get(`${url}/api/blogs`, config).then((response) => {
        console.log(response.data);
        return response.data;
    });

    return data;

}

async function getBlogsByUserId (id){
    const data = await Axios.get(`${url}/api/users/${id}/blogs`, config).then((response) => {
        return response.data;
    });

    return data;

}

async function getBlogById(id) {
    const data = await Axios.get(`${url}/api/blogs/${id}`, config).then((response) => {
        return response.data;
    });

    return data;
}

async function createBlog(blogData) {
    const data = await Axios.post(`${url}/api/blogs`, blogData, config).then((response) => {
        return response.data;
    });

    return data;
}

async function updateBlog(id, blogData) {
    const data = await Axios.put(`${url}/api/blogs/${id}`, blogData, config).then((response) => {
        return response.data;
    });

    return data;
}

async function deleteBlog(id) {
    
    const data = await Axios.delete(`${url}/api/blogs/${id}`, config).then((response) => {
        return response.data;
    });

    return data;
}

async function getBlogsByCategoryId(category) {
    const all_blogs = await Axios.get(`${url}/api/blogs`, config).then((response) => {
        return response.data;
    });

    const data = all_blogs.filter((blog) => blog.category === category);

    return data;
}

async function getBlogsByTagId(tag) {
    const all_blogs = await Axios.get(`${url}/api/blogs`, config).then((response) => {
        return response.data;
    });

    const data = all_blogs.filter((blog) => blog.bTags.includes(tag));

    return data;
}

async function getBlogsBySearchTerm(searchTerm) {
    const all_blogs = await Axios.get(`${url}/api/blogs`, config).then((response) => {
        return response.data;
    });

    const data = all_blogs.filter((blog) => blog.bTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    return data;
}

async function getBlogsByDate(date) {
    
    const all_blogs = await Axios.get(`${url}/api/blogs`, config).then((response) => {
        return response.data;
    });

    const data = all_blogs.filter((blog) => blog.bDate === date);

    return data;
}

async function getAllCategories() {
    const data = await Axios.get(`${url}/api/blogs/categories`, config).then((response) => {
        return response.data;
    });

    return data;
}

async function getRecentPosts() {
    const data = await Axios.get(`${url}/api/recent-blogs`, config).then((response) => {
        return response.data;
    });

    return data;
}

export default {
    getAllBlogs,
    getBlogsByUserId,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogsByCategoryId,
    getBlogsByTagId,
    getBlogsBySearchTerm,
    getBlogsByDate,
    getAllCategories,
    getRecentPosts
};

