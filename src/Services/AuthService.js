import Axios from 'axios';
import { url } from './index.js';

const token = localStorage.getItem('jwt');

async function login({ username, password }) {

    const userData = {
        "username": username,
        "password": password
    };
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('password');

    const data = await Axios.post(`${url}/auth/login`, userData).then((response) => {
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('userId', response.data.username);
        localStorage.setItem('password', userData.password);
        console.log(response.data);
        return response.data;
    });

    return data;
}

async function register(user) {

    const userData = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "about": user.about,
        "image": user.image,
        "role": user.role,
        "gender": user.gender
    };
    
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('password');

    const data = await Axios.post(`${url}/auth/create-user`, userData).then((response) => {
        console.log(response.data);
        return response.data;
    });

    return data;
}

export default { login , register};