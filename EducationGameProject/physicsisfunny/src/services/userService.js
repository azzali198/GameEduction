import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const subscribeUser = async (userData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const response = await axios.post(
            `${API_URL}/User/subscribe`, 
            userData,
            config
        );
        
        if (response.status !== 200) {
          
            throw new Error(response.data.message || 'Subscription failed');
        }
        
        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';
        
        if (error.response) {
            if (error.response.status === 405) {
                errorMessage = 'This operation is not allowed. Please contact support.';
            } else {
                errorMessage = error.response.data || 'Subscription failed';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }


        throw new Error(errorMessage);
    }
};