import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, removeUser } from '../redux/userSlice';
import { API_URL } from '../config';

const auth = {
  isAuthenticated: async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      }
      return false;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      const user = await auth.isAuthenticated();
      const dispatch = useDispatch();
      dispatch(setUser(user));
      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/users`, {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      const user = await auth.isAuthenticated();
      const dispatch = useDispatch();
      dispatch(setUser(user));
      return true;
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  },

  logout: async () => {
    localStorage.removeItem('token');
    const dispatch = useDispatch();
    dispatch(removeUser());
    const router = useRouter();
    router.push('/login');
  },
};

export default auth;