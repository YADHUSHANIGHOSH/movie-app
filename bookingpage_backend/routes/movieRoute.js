import  express from  "express"
import {createMovie,fetchMovie,updateMovie,deleteMovie} from "../controller/movieController.js"

const movieroute =express.Router();

movieroute.post('/createmovie', createMovie);
movieroute.get("/fetchmovie", fetchMovie);
movieroute.put("/updatemovie/:id", updateMovie);
movieroute.delete("/deletemovie/:id",deleteMovie);
export default movieroute;