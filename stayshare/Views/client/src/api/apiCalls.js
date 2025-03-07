import api from './axios.js';

export const choreService = {
    getChore: api.get('/chores')
}