import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:2701/',
});

export default api;
