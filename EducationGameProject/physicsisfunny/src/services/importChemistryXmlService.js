import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

/**
 * Imports a Chemistry XML file to the backend using multipart/form-data.
 * @param {File} xmlFile - The XML file to upload.
 * @returns {Promise} Axios response promise
 */
const importChemistryXml = async (xmlFile) => {
  const formData = new FormData();
  formData.append('xmlFile', xmlFile);

  return axios.post(`${API_URL}/Chemistry/import-xml`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

/**
 * Retrieves all chemistry questions from the backend.
 * @returns {Promise} Axios response promise
 */
const getChemistryQuestions = async () => {
  return axios.get(`${API_URL}/Chemistry/get-questions`);
};

/**
 * Updates chemistry questions using the backend API.
 * @param {Array} changedQuestions - Array of changed question objects.
 * @returns {Promise} Axios response promise
 */
const updateChemistryQuestions = async (changedQuestions) =>
  axios.put(`${API_URL}/Chemistry/update-questions`, changedQuestions);

/**
 * Deletes a chemistry question by its identifier using the backend API.
 * @param {number|string} identifier - The identifier of the question to delete.
 * @returns {Promise} Axios response promise
 */
const deleteChemistryQuestion = async (identifier) =>
  axios.delete(`${API_URL}/Chemistry/delete-question/${identifier}`);

export  { importChemistryXml, getChemistryQuestions, updateChemistryQuestions, deleteChemistryQuestion };