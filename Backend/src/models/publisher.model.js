import mongoose from "mongoose";

const publisherSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  { collection: "publisher" }
);

const Publisher = mongoose.model("Publisher", publisherSchema);
export default Publisher;
