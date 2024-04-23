
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cartBooks: [{
        item: {type: mongoose.Schema.Types.ObjectId, ref: 'Books'},
        quantity: {type: Number, required: true},
    }]
}, { collection: 'cart' });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;