// API Configuration
const API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://blog-app-2qmq.onrender.com'
  : 'http://localhost:4000';

export default API_BASE_URL;
