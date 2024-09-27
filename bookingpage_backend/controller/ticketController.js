import Ticket from "../model/ticketModel.js";
import Theatermovies from "../model/theatermoviesModel.js";
import mongoose from 'mongoose';
import movieModel from "../model/movieModel.js";


export const createTicket = async (req, res) => {
  try {
    const { theaterName, ticketPrice, date, showTime, moviename, seats,seatnames,theaterId, movieId } = req.body;
    const theaterObjectId = new mongoose.Types.ObjectId(theaterId);
    const seatNamesArray = Array.isArray(seatnames) ? seatnames : [seatnames];
   

    const ticketData = new Ticket({
      theaterName,
      ticketPrice,
      date,
      showTime,
      moviename,
      movieId,
      theaterId: theaterObjectId,
      seats,
      seatnames: seatNamesArray
    });

    const savedTicket = await ticketData.save();
    res.status(200).json(savedTicket);
  } catch (error) {
    console.error("Error creating TheaterMovie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const fetchOneTicket = async (req, res) => {
  const { id } = req.params;
try {
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }
  res.status(200).json(ticket);
} catch (error) {
  console.error("Error fetching ticket:", error);
  res.status(500).json({ error: "Internal Server Error." });
}
};



export const fetchTicket = async (req, res) => {
  try {
    const ticket = await Ticket.find();
    if (!ticket) {
      return res.status(404).json({ message: "movie not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "internel server error" });
  }
};




 export const updateTicket =async(req,res)=>{
    try{
        const id =req.params.id;
        const movieExist = await Ticket.findOne({_id:id});
        if(!movieExist){
            return res.status(404).json({message: "movie not found"});
        }
        const updateTicket =await Ticket.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(updateTicket)

    } catch(error){
        res.status(500).json({error: "internel server error" });

    }
 };







 export const deleteTicket =async(req,res)=>{
    try{
        const id =req.params.id;
        const movieExist = await Ticket.findById({_id:id});
        if(!movieExist){
            return res.status(404).json({message: "ticket not found"});
        }
        await Ticket.findByIdAndDelete(id);
        res.status(201).json({message:"ticket removed successfully"})

    } catch(error){
        res.status(500).json({error: "internel server error" });

    }
 };
 

