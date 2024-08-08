import axios from 'axios';
import { API_URL } from '../config';

export const getMenu = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/menu`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu:', error);
    throw error;
  }
};

export const getFeaturedDishes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/dishes/featured`);
    return response.data;
  } catch (error) {
    console.error('Error fetching featured dishes:', error);
    throw error;
  }
};

export const getDishById = async (dishId) => {
  try {
    const response = await axios.get(`${API_URL}/api/dishes/${dishId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dish by ID:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};