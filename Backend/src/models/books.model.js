import mongoose from "mongoose";

const booksSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    discription: { type: String, required: true },
    price: { type: Number, required: true },
    author: { type: String, required: true },
    publisherID: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
    image: [
      {
        public_id: { type: String },
        url: { type: String },
      },
    ],
  },
  { collection: "books" }
);

const Books = mongoose.model("Books", booksSchema);
export default Books;
