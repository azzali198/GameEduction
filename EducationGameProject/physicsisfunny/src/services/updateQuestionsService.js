import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

/**
 * Updates questions for a given topic.
 * @param {string} topic - The topic to update questions for.
 * @param {Array} changedQuestions - The list of changed question objects.
 * @returns {Promise} Axios response promise
 */
const updateQuestions = async (topic, changedQuestions) => {
  return axios.put(`${API_URL}/Physics/update-questions`, {
    Topic : topic,
    Questions: changedQuestions
  });
};

export default updateQuestions;