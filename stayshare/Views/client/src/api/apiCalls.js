import api from './axios.js';

export const choreService = {
    getAllChores: () => api.get('/chores'),
    updateChore: (id, choreData) => api.put(`/chores/${id}`, choreData)
}

export const residenceService = {
    getAllResidences: () => api.get('/residences'),
    getResidence: (id) => api.get(`/residences/${id}`),
    getResidenceWithUsers: (id) => api.get(`/residences/${id}/users`),
    getResidencesByAdmin: (id) => api.get(`/residences/admin/${id}`),
    createResidence: (residenceData) => api.post('/residences', residenceData),
    updateResidence: (id, residenceData) => api.put(`/residences/${id}`, residenceData),
    deleteResidence: (id) => api.delete(`/residences/${id}`),
    addUserToResidence: (userName, passcode) => api.post(`/residences/users/${userName}`, { userName, passcode }),
    removeUserFromResidence: (residenceId, userId) => api.delete(`/residences/${residenceId}/users/${userId}`)
}

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/account/login', credentials, {
                withCredentials: true // Important for handling cookies
            });
            console.log('from login service:' + JSON.stringify(response));
            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return response
            }
        } catch (error) {
            throw error;
        }
    },
    logout: async () => {
        try {
            await api.post('/account/logout', {}, {
                withCredentials: true
            });
            localStorage.removeItem('user');
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            return await api.post('/account/register', userData, {
                withCredentials: true
            });
        } catch (error) {
            throw error;
        }
    },
    validate: async () => {
        try {
            return await api.get('/account/validate', {
                withCredentials: true
            });
        } catch(error) {
            throw error;
        }
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}