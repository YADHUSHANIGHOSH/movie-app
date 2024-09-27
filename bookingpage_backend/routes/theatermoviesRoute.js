import express from "express";
import { createTheatermovies,fetchAllTheaterMovies ,fetchOneTheaterMovie,updateTheaterMovie,deleteTheaterMovie} from "../controller/theatermoviesControler.js";

const theatermoviesroute = express.Router();

theatermoviesroute.post('/createtheatermovies', createTheatermovies);
theatermoviesroute.get('/fetchalltheatermovies', fetchAllTheaterMovies);
theatermoviesroute.get('/fetchonetheatermovie/:tmdbId', fetchOneTheaterMovie);
theatermoviesroute.put('/updatetheatermovie/:id', updateTheaterMovie);
theatermoviesroute.delete('/deletetheatermovie/:id', deleteTheaterMovie);


export default theatermoviesroute;
