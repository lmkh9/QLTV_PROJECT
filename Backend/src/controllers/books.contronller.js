import Books from "../models/books.model.js";

// [POST] /books/create
const createBooks = async (req, res) => {
  const { name, quantity, publisher, discription, price, author, image } = req.body;
  try {
    const books = await Books.create({
      name,
      quantity,
      discription,
      price,
      author,
      publisher,
      image,
    });
    console.log("check books: ", books);
    return res.status(201).json(books);
  } catch {
    return res.status(500).json("Something wrong");
  }
};

// [GET] /books/
const getBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    return res.status(200).json(books);
  } catch {
    return res.status(500).json("Something wrong");
  }
};

// [DELETE] /books/delete/:id
const deleteBooks = async (req, res) => {
  try {
    const books = await Books.findOneAndDelete({
      _id: req.params.id,
    });
    return res.status(200).json(books);
  } catch {
    return res.status(500).json("Something wrong");
  }
};

//[PUT] /books/:id
const updateBooks = async (req, res) => {
  const { name, quantity, discription, price, author, image } = req.body;
  console.log(req.params.id);
  try {
    const books = await Books.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { name, quantity, discription, price, author, image },
      { new: true }
    );

    return res.status(200).json(books);
  } catch {
    return res.status(500).json("Something wrong");
  }
};

// [GET] /books/show/:id
const showDetail = async (req, res) => {
  try {
    const books = await Books.findById(req.params.id);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default {
  createBooks,
  getBooks,
  deleteBooks,
  updateBooks,
  showDetail,
};
