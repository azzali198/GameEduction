import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5169/api';

export const subscribeUser = async (userData) => {
    try {
        // Add headers to handle CORS and content type
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            }
        };

        const response = await axios.post(
            `${API_URL}/User/subscribe`, 
            JSON.stringify(userData), 
            config
        );
        
        return response.data;
    } catch (error) {
        // Enhanced error handling
        if (error.response) {
            if (error.response.status === 405) {
                throw new Error('This operation is not allowed. Please contact support.');
            }
            throw new Error(error.response.data.message || 'Subscription failed');
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        }
        throw new Error('Error processing your request');
    }
};