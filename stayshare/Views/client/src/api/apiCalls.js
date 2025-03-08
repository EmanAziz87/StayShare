import api from './axios.js';

export const choreService = {
    getChore: () => api.get('/chores'),
    updateChore: (id, choreData) => api.put(`/chores/${id}`, choreData)
}

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials, {
                withCredentials: true // Important for handling cookies
            });
            if (response.data.succeeded) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            }
            return null;
        } catch (error) {
            throw error;
        }
    },
    logout: async () => {
        try {
            await api.post('/logout', {}, {
                withCredentials: true
            });
            localStorage.removeItem('user');
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/register', userData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}