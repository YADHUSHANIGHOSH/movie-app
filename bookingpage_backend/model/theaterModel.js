import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
  theaterName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
});

  export default mongoose.model("theaters", theaterSchema);
