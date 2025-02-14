import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  tmdbId:{
    type:String,
    required:true,
    unique:true
  },
  title: {
    type: String,
    required: true,
  },
  releasedate: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

  export default mongoose.model("movies", movieSchema);
