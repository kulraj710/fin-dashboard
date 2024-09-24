import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_backendBaseUrlProduction,
  // baseURL: 'http://localhost:5000/api',
  timeout: 35000,
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
    const response = await axiosInstance.post(endpoint, data);

    if (response.data.status !== 200){
      throw new Error(response.data.error);
    }

    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
