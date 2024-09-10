import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.backendBaseUrl,
  timeout: 10000,
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
