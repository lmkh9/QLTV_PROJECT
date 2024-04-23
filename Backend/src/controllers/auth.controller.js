import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import OrderList from "../models/orderList.model.js";
import bcrypt from "bcryptjs";

// [POST] /auth/signup      -- dang ky
const createUser = async (req, res) => {
  const { name, username, gender, password, numberphone, email, address } = req.body;
  try {
    const isExist = await User.findOne({ username });
    if (isExist) {
      return res.status(409).json("user already exists"); // 409 : dung do
    }
    const saltRounds = 10;
    const pwdHashed = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      name,
      username,
      gender,
      password: pwdHashed,
      numberphone,
      email,
      address,
    });
    await Cart.create({ userID: user._id });
    await OrderList.create({ userID: user._id });
    return res.status(201).json(user);
  } catch {
    return res.status(500).json("Something wrong");
  }
};

// [POST] /auth/signin    -- dang nhap
const signinUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return res.status(200).json(user);
      } else {
        return res.status(401).json("wrong password");
      }
    } else {
      return res.status(404).json("username not found");
    }
  } catch {
    return res.status(500).json("Something wrong");
  }
};

export default { createUser, signinUser };
