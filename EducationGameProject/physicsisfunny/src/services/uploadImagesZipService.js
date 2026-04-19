import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

/**
 * Uploads a zip file of images for a given topic.
 * @param {File} zipFile - The zip file to upload.
 * @param {string} topic - The topic name.
 * @returns {Promise} Axios response promise
 */
const uploadImagesZip = async (zipFile, topic) => {
  debugger;
  const formData = new FormData();
  formData.append('zipFile', zipFile);
  formData.append('topic', topic);

  return axios.post(`${API_URL}/Physics/upload-images-zip`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default uploadImagesZip;