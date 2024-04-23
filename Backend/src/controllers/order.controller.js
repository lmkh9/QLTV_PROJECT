import Order from '../models/order.model.js';
import OrderList from '../models/orderList.model.js';
import Books from '../models/books.model.js';


// [POST] /order/new
const newOrder = async (req, res) => {
    const {userID, contentBooks} = req.body;
    try {
        const order = await Order.create({userID, contentBooks});
        const orderList = await OrderList.findOne({userID });
        orderList.orders.push(order._id);
        await orderList.save();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
}
//[GET] / order/list
const allOrder = async (req, res) => {
    try {
        const all = await Order.find(req.params.id).populate('userID');
        for(let i = 0; i < all.length; i++){
            for (let k = 0; k < all[i].contentBooks.length; k++) {
                const books = await Books.findById(all[i].contentBooks[k].itemId);
                all[i].contentBooks[k].itemId = books;
            }
        }
        return res.status(200).json(all);
    } catch (error) {
        return res.status(500).json(error);
    }
    
}

// [DELETE] /order/:idBuyer/:idItem
const removeOrder = async (req, res) => {
    try {
        await Order.deleteOne({_id: req.params.idItem});
        const orderL = await OrderList.findOne({userID: req.params.idBuyer});
        let index = -1;
        for (let i = 0; i < orderL.orders.length; i++) {
            if(orderL.orders[i] == req.params.idItem) {
                index = i;
                break;
            }
        }
        if(index !== -1) {
            orderL.orders.splice(index, 1);
            await orderL.save();
        }
        return res.status(200).json('remove successfully');
    } catch (error) {
        return res.status(500).json(error);
    }
}


export default{
 newOrder,allOrder,
  removeOrder
}