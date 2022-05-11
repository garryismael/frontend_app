import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

const instance = axios.create({
    baseURL
});

const token = localStorage.getItem('token');
if (token && token !== '')
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default instance;