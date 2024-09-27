import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  theaterName: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  showTime: {
    type: String,
    required: true,
  },
  moviename: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  seatnames: {
    type: [String],
    required: true,
  },
  movieId: {
    type: String,
    ref: "movies",
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theaters",
    required: true,
  },
});

export default mongoose.model("ticket", ticketSchema);
