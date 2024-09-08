import axios from 'axios';

// Create an Axios instance with the base URL and other global settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Your Flask API base URL
  timeout: 10000, // You can set a timeout (optional)
  headers: { 'Content-Type': 'application/json' },
});

// Function to fetch data
export const getData = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};