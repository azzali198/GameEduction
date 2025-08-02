import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';
/**
 * Retrieves questions for a given topic using GET /api/get-questions?topic=...
 * @param {string} topic - The topic to retrieve questions for.
 * @returns {Promise} Axios response promise
 */
const getQuestions = async (topic) => {
  return axios.get(`${API_URL}/Physics/get-questions`, {
    params: { topic }
  });
};

export default getQuestions;