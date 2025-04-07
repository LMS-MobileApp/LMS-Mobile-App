import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:5001/api/auth';

class Auth {
  // Register user
  static async register(userData) {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      const { token } = res.data;
      await AsyncStorage.setItem('token', token);
      return { success: true, token };
      // return { success: true };
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  }

  // Login user
  static async login(credentials) {
    try {
      const res = await axios.post(`${API_URL}/login`, credentials);
      const { token } = res.data;
      await AsyncStorage.setItem('token', token);
      return { success: true, token };
      // return { success: true };
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  }

  // Logout user
  static async logout() {
    try {
      await AsyncStorage.removeItem('token');
      return true;
    } catch (err) {
      console.error('Logout error:', err);
      return false;
    }
  }

  // Get stored token
  static async getToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (err) {
      console.error('Get token error:', err);
      return null;
    }
  }

  // Check if user is logged in
  static async isLoggedIn() {
    const token = await this.getToken();
    return !!token;
  }
}

export default Auth;
