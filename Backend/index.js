import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

import booksRouter from "./src/routes/books.route.js";
import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";
import cartRouter from "./src/routes/cart.route.js";
import orderRouter from "./src/routes/order.route.js";
import publisherRouter from "./src/routes/publisher.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

const port = process.env.PORT;

// Routes
app.use("/book", booksRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/publisher", publisherRouter);

app.get("/", (req, res) => {
  res.send("");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
