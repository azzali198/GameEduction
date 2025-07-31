import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';
/**
 * Calls the web API 'import-xml' endpoint with a POST request.
 * @param {string} xmlString - The XML file content as a string.
 * @param {string} topic - The selected topic value from the dropdown.
 * @returns {Promise} Axios response promise.
 */
async function importXml(xmlString, topic) {
  // Send as JSON payload with 'request' field
  return axios.post(`${API_URL}/Physics/import-xml`, {
    Xml: xmlString.trim(),
    Topic: topic
  }, {
  headers: {
    'Content-Type': 'application/json'
  }
});
}

export default importXml;