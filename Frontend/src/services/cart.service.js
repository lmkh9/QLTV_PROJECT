import axios from 'axios';
const baseUrl = 'http://localhost:3000/cart';

class cartService {
    async pushNewItem(data) {
        return await axios.put(`${baseUrl}/add`, data);
    }
    async removeInCart(idUser,idItem){
        return await axios.delete(`${baseUrl}/${idUser}/${idItem}`);
    }
}

export default new cartService;