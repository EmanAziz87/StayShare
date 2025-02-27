import api from './axios.js';

export const testService = {
    test: api.get('/Test')
}