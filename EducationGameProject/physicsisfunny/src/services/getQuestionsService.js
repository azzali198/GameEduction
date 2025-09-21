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
/**
 * Retrieves a question by branch and index from the backend.
 * @param {string} branch - The branch (e.g., "Physics", "Chemistry").
 * @param {number} index - The index of the question.
 * @returns {Promise} Axios response promise
 */
const getQuestionByBranchAndIndex = async (branch, index) => {
  return axios.get(`${API_URL}/Physics/get-question-by-branch-and-index`, {
    params: { branch, index }
  });
};
/**
 * Retrieves the number of questions for a given branch from the backend.
 * @returns {Promise} Axios response promise
 */
const countQuestionsByBranch = async () => {
  return axios.get(`${API_URL}/Physics/count-questions-by-branch`);
};

export  {
  getQuestions,
  getQuestionByBranchAndIndex,
  countQuestionsByBranch
};