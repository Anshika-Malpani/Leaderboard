import axios from 'axios';

const API = axios.create({ baseURL: 'https://leaderboard-backend-gsv2.onrender.com/api' });

export const fetchUsers = () => API.get('/users');
export const addUser = (name) => API.post('/users', { name });
export const claimPoints = (userId) => API.post('/claim', { userId });
export const fetchLeaderboard = () => API.get('/leaderboard');
export const fetchHistory = () => API.get('/history');

