import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

export const getConnectionsByDateRange = async (startDate, endDate) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            params: {
                startDate: startDate,
                endDate: endDate
            }
        };

        const response = await axios.get(
            `${API_URL}/Statistics/connections-by-date-range`,
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'Failed to get connections by date range');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 400) {
                errorMessage = 'Invalid date range provided.';
            } else if (error.response.status === 404) {
                errorMessage = 'Statistics endpoint not found.';
            } else if (error.response.status === 500) {
                errorMessage = 'Server error while retrieving statistics.';
            } else {
                errorMessage = error.response.data?.message || 'Failed to get connections by date range';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};

export const getConnectionsByCountry = async (startDate, endDate) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            params: {
                startDate: startDate,
                endDate: endDate
            }
        };

        const response = await axios.get(
            `${API_URL}/Statistics/connections-by-country`,
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'Failed to get connections by country');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 400) {
                errorMessage = 'Invalid date range provided.';
            } else if (error.response.status === 404) {
                errorMessage = 'Statistics endpoint not found.';
            } else if (error.response.status === 500) {
                errorMessage = 'Server error while retrieving country statistics.';
            } else {
                errorMessage = error.response.data?.message || 'Failed to get connections by country';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};
