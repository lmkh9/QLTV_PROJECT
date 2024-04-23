import Cart from "../models/cart.model.js";

//[PUT] /cart/add
const addCart = async (req, res) => {
    const { idItem, idCustomer, quantity } = req.body;
    try {
        const carts = await Cart.findOne({userID: idCustomer});
        const books = {
            item: idItem,
            quantity
        }       
        carts.cartBooks.push(books);

        await carts.save();
        return res.status(200).json('add item to cart successfully');
    } catch (error) {
        return res.status(500).json(error);
    }
}

// [DELETE] /cart/:idUser/:idItem
const deleteItemInCart = async (req, res) => {
    try {
        const carts = await Cart.findOne({userID: req.params.idUser});
        
            const idxRemove = carts.cartBooks.findIndex(books => books._id.toString() == req.params.idItem.toString());
            
            console.log(idxRemove);

        await carts.save();
        return res.status(200).json('item deleted successfully');
    } catch {
        return res.status(500).json('Something wrong');
    }
}

export default {addCart, deleteItemInCart};