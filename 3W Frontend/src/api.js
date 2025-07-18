import axios from 'axios';

const API = axios.create({ baseURL: 'https://leaderboard-6uko.onrender.com' });

export const fetchUsers = () => API.get('/users');
export const addUser = (name) => API.post('/users', { name });
export const claimPoints = (userId) => API.post('/claim', { userId });
export const fetchLeaderboard = () => API.get('/leaderboard');
export const fetchHistory = () => API.get('/history');

