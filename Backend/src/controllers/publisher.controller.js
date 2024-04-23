import Publisher from "../models/publisher.model.js";

const showPublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    return res.status(200).json(publisher);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getPublishers = async (req, res) => {
  try {
    const Publishers = await Publishers.find({});
    return res.status(200).json(publishers);
  } catch {
    return res.status(500).json("Something wrong");
  }
};


const createPublisher = async (req, res) => {
  const { name, address } = req.body;
  try {
    const publisher = await Publisher.create({
      name,
      address,
    });
    console.log("check publisher: ", publisher);
    return res.status(201).json(publisher);
  } catch {
    return res.status(500).json("Something wrong");
  }
};

//[PUT] /publisher/:id
const updatePublisher = async (req, res) => {
  const { name, address } = req.body;
  console.log(req.params.id);
  try {
    const publisher = await Publisher.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { name, address },
      { new: true }
    );

    return res.status(200).json(publisher);
  } catch {
    return res.status(500).json("Something wrong");
  }
};

const removePublisher = async (req, res) => {
  try {
    await Publisher.deleteOne({ _id: req.params.id });
    await Cart.deleteOne({ publisherID: req.params.id });
    return res.status(200).json("deleted successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};
export default {
  updatePublisher, createPublisher, removePublisher, showPublisher, getPublishers
};
