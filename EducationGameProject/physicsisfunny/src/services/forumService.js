import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

export const submitFeedback = async (body) => {
  // body: { login, feedbackText, date }
  try {
    const response = await axios.post(`${API_URL}/Forum/add-feedback`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFeedbacks = async () => {
  try {
    const response = await axios.get(`${API_URL}/Forum/get-all-feedbacks`);
    return response.data;
  } catch (error) {
    throw error;
  }
};