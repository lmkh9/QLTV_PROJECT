import axios from 'axios';
const baseUrl = 'http://localhost:3000/order';

class orderService {
    async create(data) {
        return await axios.post(`${baseUrl}/new`, data);
    }
    async allOrder(){
        return await axios.get(`${baseUrl}/list`);
    }
    async removeOrder(idBuyer, idItem) {
        return await axios.delete(`${baseUrl}/${idBuyer}/${idItem}`);
    }
    async personalOrder(){
        return await axios.get(`${baseUrl}/list`);
    }
}

export default new orderService;