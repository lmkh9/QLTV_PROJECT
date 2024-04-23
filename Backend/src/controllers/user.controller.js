import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import Books from "../models/books.model.js";
import OrderList from "../models/orderList.model.js";

// [GET] /user/:id
const showUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// [GET] /user/:id/cart
const cartUser = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.params.id });
    for (let i = 0; i < cart.cartBooks.length; i++) {
      const books = await Books.findById(cart.cartBooks[i].item);
      cart.cartBooks[i].item = books;
    }
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// [GET] /user/
const allUser = async (req, res) => {
  try {
    const all = await User.find({ role: "customer" });
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// [DELETE] /user/delete/:id
const removeUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    await Cart.deleteOne({ userID: req.params.id });
    return res.status(200).json("deleted successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};

// [GET] /user/:id/order
const orderListUser = async (req, res) => {
  try {
    const ordersList = await OrderList.findOne({ userID: req.params.id })
      .populate("userID")
      .populate("orders");
    ordersList.userID.password = undefined;
    for (let i = 0; i < ordersList.orders.length; i++) {
      for (let j = 0; j < ordersList.orders[i].contentDiamond.length; j++) {
        const detail = await Diamond.findById(
          ordersList.orders[i].contentDiamond[j].itemId
        );
        ordersList.orders[i].contentDiamond[j].itemId = detail;
      }

      for (let k = 0; k < ordersList.orders[i].contentProduct.length; k++) {
        const detail = await Product.findById(
          ordersList.orders[i].contentProduct[k].itemId
        );
        ordersList.orders[i].contentProduct[k].itemId = detail;
      }
    }
    return res.status(200).json(ordersList);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  allUser,
  removeUser,
  showUser,
  cartUser,
  orderListUser,
};
