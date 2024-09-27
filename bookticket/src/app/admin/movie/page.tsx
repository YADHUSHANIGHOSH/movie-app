"use client";

import React, { useEffect, useState } from "react";
import Style from "./movie.module.css";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieModal from "@/components/modal/moviemodal/page";

interface Movies {
  _id: string;
  tmdbId: string;
  title: string;
  releaseDate: string;
  genre: string;
  duration: string;
}

const MovieCurd = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movies | null>(null);

  const fetchMovie = async () => {
    await axios
      .get("http://localhost:8000/api/movie/fetchmovie")
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
      });
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  const handleSaveMovie = async (movie: Movies) => {
    try {
      if (currentMovie && currentMovie._id) {
        await axios.put(`http://localhost:8000/api/movie/updatemovie/${currentMovie._id}`, movie);
      } else {
        await axios.post("http://localhost:8000/api/movie/createmovie", movie);
      }
      fetchMovie();
      setShowModal(false);
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };




  const deleteMovie = async(id:string)=>{
    try {
      await axios.delete(`http://localhost:8000/api/movie/deletemovie/${id}`)
      fetchMovie();
      
    } catch (error) {
      console.log("Error deleting movie",error)
      
    }
  }

  // const updateMovie = async(id:string)=>{
  //   try {
  //     await axios.delete(`http://localhost:8000/api/movie/updatemovie/${id}`)
  //     fetchMovie();
      
  //   } catch (error) {
  //     console.log("Error deleting movie",error)
      
  //   }
  // }


  return (
    <div className={Style.container}>
      <h3 className={Style.h3}>movie</h3>
      <div className={Style.input_search}>
        <input type="search" />
        <button className={Style.btn}>add record</button>
      </div>
      <table className={Style.table}>
        <thead>
          <tr>
            <th>S.no</th>
            <th>tmdbId</th>
            <th>title</th>
            <th>genre</th>
            <th>duration</th>
            <th>edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {movies &&
            movies.map((movie, index) => {
              return (
                <tr key={movie._id}>
                  <td>{index + 1}</td>
                  <td>{movie.tmdbId}</td>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.duration}</td>

                  <td>
                    <button className={Style.btn1} onClick={()=>handleSaveMovie(movie._id)}>edit</button>
                  </td>
                  <td>
                    <button className={Style.btn2} onClick={()=> deleteMovie(movie._id)}>delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
    
  );
};

export default MovieCurd;
