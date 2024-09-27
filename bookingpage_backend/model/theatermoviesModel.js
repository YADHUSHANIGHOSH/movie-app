import mongoose from "mongoose";

const theatermoviesSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theaters",
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  },
  tmdbId: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

export default mongoose.model("theatermovies", theatermoviesSchema);
