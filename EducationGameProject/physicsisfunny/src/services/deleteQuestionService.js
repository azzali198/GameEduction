import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

/**
 * Calls the web API 'delete-question' endpoint with a DELETE request.
 * @param {string} topic - The topic of the question.
 * @param {number} identifier - The identifier of the question.
 * @returns {Promise} Axios response promise.
 */
async function deleteQuestion(topic, identifier) {
  return axios.delete(`${API_URL}/Physics/delete-question`, {
    data: {
      Topic: topic,
      Identifier: identifier
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export default deleteQuestion;