import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.backendBaseUrlProduction,
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

export const postData = async (endpoint, data) => {
  try {
    // const url = "http://localhost:5000/api" + endpoint
    const response = await axiosInstance.post(endpoint, data);
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error posting data:', error);
    throw error; // Re-throw the error for further handling
  }
};
