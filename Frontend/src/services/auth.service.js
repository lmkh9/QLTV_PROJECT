import axios from 'axios';
const baseUrl = 'http://localhost:3000/auth';

class authService {
    async register(form) {
        return await axios.post(`${baseUrl}/signup`, form);
    }

    async login(form) {
        return await axios.post(`${baseUrl}/signin`, form);
    }
}

export default new authService;