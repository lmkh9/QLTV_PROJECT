import axios from 'axios';
const baseUrl = 'http://localhost:3000/book';

class bookService {
    async allBook() {
        return await axios.get(`${baseUrl}`);
    }
    async detailBook(id) {
        return await axios.get(`${baseUrl}/show/${id}`);
    }
    
    async update(id, form) {
        return await axios.put(`${baseUrl}/${id}`, form);
    }

    async remove(id) {
        return await axios.delete(`${baseUrl}/delete/${id}`);
    }

    async createNewBook(form) {
        return await axios.post(`${baseUrl}/create`, form);
    }
}

export default new bookService;