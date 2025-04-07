import api from './axios.js';

export const choreCompletionService = {
    createChoreCompletion: (completionData) => api.post("/chorecompletion", completionData),
    getChoreCompletionByDate: (date) => api.get(`/chorecompletion/${date}`),
    updateChoreCompletion: (updatedCompletionData) => api.put("/chorecompletion", updatedCompletionData),
    getAllChoreCompletionsRejectedOrPending: () => api.get("/chorecompletion/rejected/pending")
}

export const residentChoreService = {
    getResidentChore: (residentId, choreId) => api.get(`/residentchores/${residentId}/${choreId}`),
    createResidentChore: (residentChoreData) => api.post('/residentchores', residentChoreData),
    getAllChoresByResidentId: async (usersInResidence) => {
        const choresForAllResidents = await Promise.all(usersInResidence.map(user => api.get(`/residentchores/chores/${user.id}`)));
        console.log("Data before cleaned: " + JSON.stringify(choresForAllResidents));
        const cleanedData = [];
        for (let i = 0; i < choresForAllResidents.length; i++) {
            cleanedData.push(choresForAllResidents[i].data);
        }
        console.log("CLEANED DATA:" + JSON.stringify(cleanedData));
        return cleanedData;
    },
    getAllUsersByChoreId: async (choreId) => {
        const response = await api.get(`/residentchores/residents/${choreId}`);
        return response.data;
    },
    updateResidentChoreCompletionCount: async (updatedResidentChoreData) => api.put("/residentchores/updateCount", updatedResidentChoreData)
}

export const choreService = {
    getAllChores: () => api.get('/chores'),
    createChore: async (choreData, usersInResidence) => {
        try {
            const response = await api.post('/chores', choreData)
            console.log("responsestatustext:" + JSON.stringify(response))
            if (response.status === 201) {
                try {
                    console.log("creating resident -> chore relationship")
                    await Promise.all(usersInResidence.map(user => 
                        residentChoreService.createResidentChore({residentId: (user.id).toString(), choreId: response.data.id})));
                }  catch(e) {
                    console.error(e.message);
                }
            }
            return response
        } catch (e) {
            console.error(e.message);
        }
    },
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