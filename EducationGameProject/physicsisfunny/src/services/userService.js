import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5001/api';

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

// Login service
export const loginUser = async (credentials) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const response = await axios.post(
            `${API_URL}/User/login`,
            credentials,
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'Login failed');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 401) {
                errorMessage = 'Invalid username or password.';
            } else {
                errorMessage = error.response.data || 'Login failed';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/User/get-all-users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserByUsername = async (username) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const response = await axios.get(
            `${API_URL}/User/get-user/${username}`,
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'Failed to get user');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 404) {
                errorMessage = 'User not found.';
            } else if (error.response.status === 400) {
                errorMessage = 'Invalid username provided.';
            } else {
                errorMessage = error.response.data?.message || 'Failed to get user';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};

export const updateUser = async (userData) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const response = await axios.put(
            `${API_URL}/User/update-user`,
            userData,
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'User update failed');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 404) {
                errorMessage = 'User not found.';
            } else if (error.response.status === 400) {
                errorMessage = 'Invalid user data provided.';
            } else if (error.response.status === 401) {
                errorMessage = 'You are not authorized to update this user.';
            } else if (error.response.status === 409) {
                errorMessage = 'User data conflicts with existing records.';
            } else {
                errorMessage = error.response.data?.message || 'User update failed';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};

export const activateUser = async (username) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const response = await axios.put(
            `${API_URL}/User/activate-user/${username}`,
            {},
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'User activation failed');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 404) {
                errorMessage = 'User not found.';
            } else if (error.response.status === 400) {
                errorMessage = 'Invalid request. User may already be active.';
            } else {
                errorMessage = error.response.data?.message || 'User activation failed';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};

export const deactivateUser = async (username) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const response = await axios.put(
            `${API_URL}/User/deactivate-user/${username}`,
            {},
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'User deactivation failed');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 404) {
                errorMessage = 'User not found.';
            } else if (error.response.status === 400) {
                errorMessage = 'Invalid request. User may already be inactive.';
            } else {
                errorMessage = error.response.data?.message || 'User deactivation failed';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};

export const deleteUser = async (username) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const response = await axios.delete(
            `${API_URL}/User/delete-user/${username}`,
            config
        );

        if (response.status !== 200) {
            throw new Error(response.data.message || 'User deletion failed');
        }

        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            if (error.response.status === 404) {
                errorMessage = 'User not found.';
            } else if (error.response.status === 400) {
                errorMessage = 'Invalid request. User cannot be deleted.';
            } else if (error.response.status === 403) {
                errorMessage = 'Permission denied. You are not authorized to delete this user.';
            } else {
                errorMessage = error.response.data?.message || 'User deletion failed';
            }
        } else if (error.request) {
            errorMessage = 'No response from server. Please check your connection.';
        }

        throw new Error(errorMessage);
    }
};