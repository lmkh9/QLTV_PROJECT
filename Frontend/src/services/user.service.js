import axios from 'axios';
const baseUrl = 'http://localhost:3000/user';

class userService {
    async getCart(id) {
        return await axios.get(`${baseUrl}/${id}/cart`);
    }
    async removeInCart(idUser,idItem){
        return await axios.delete(`${baseUrl}/${idUser}/${idItem}`);
    }
    async allUser() {
        return await axios.get(`${baseUrl}/`);
    }
    async remove(id) {
        return await axios.delete(`${baseUrl}/delete/${id}`);
    }
    async detailUser(id){
        return await axios.get(`${baseUrl}/${id}`);
    }
    async ordersUser(id) {
        return await axios.get(`${baseUrl}/${id}/order`);
    }
}

export default new userService;