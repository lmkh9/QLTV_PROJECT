
import mongoose from "mongoose";

const orderList = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orders: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Order'},
    ],
}, { collection: 'orderList' });

const OrderList = mongoose.model('OrderList', orderList);
export default OrderList;