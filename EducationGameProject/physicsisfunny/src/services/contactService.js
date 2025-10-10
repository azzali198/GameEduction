import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

/**
 * Send email through the contact form
 * @param {Object} emailData - The email data object
 * @param {string} emailData.name - The sender's name
 * @param {string} emailData.category - The email category
 * @param {string} emailData.subject - The email subject
 * @param {string} emailData.emailAddress - The sender's email address
 * @param {string} emailData.message - The email message content
 * @param {string} emailData.institution - The sender's institution
 * @returns {Promise} - Promise resolving to the server response
 */
export const sendEmail = async (emailData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/Contact/send-email`, {
      name: emailData.name,
      category: emailData.category,
      subject: emailData.subject,
      emailAddress: emailData.emailAddress,
      message: emailData.message,
      institution: emailData.institution
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 seconds timeout
    });

    return response;
  } catch (error) {
    // Enhanced error handling
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network error: Unable to reach the server. Please check your connection.');
    } else {
      // Error in request setup
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

/**
 * Validate email data before sending
 * @param {Object} emailData - The email data to validate
 * @returns {Object} - Validation result with isValid boolean and errors array
 */
export const validateEmailData = (emailData) => {
  const errors = [];
  
  if (!emailData.name || emailData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!emailData.category || emailData.category.trim() === '') {
    errors.push('Category is required');
  }
  
  if (!emailData.subject || emailData.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  }
  
  if (!emailData.emailAddress || !isValidEmail(emailData.emailAddress)) {
    errors.push('Please provide a valid email address');
  }
  
  if (!emailData.message || emailData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  if (!emailData.institution || emailData.institution.trim().length < 2) {
    errors.push('Institution must be at least 2 characters long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Helper function to validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Send email with validation
 * @param {Object} emailData - The email data object
 * @returns {Promise} - Promise resolving to the server response
 */
export const sendEmailWithValidation = async (emailData) => {
  // Validate data first
  const validation = validateEmailData(emailData);
  
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
  }
  
  // Send email if validation passes
  return await sendEmail(emailData);
};

export default {
  sendEmail,
  validateEmailData,
  sendEmailWithValidation
};