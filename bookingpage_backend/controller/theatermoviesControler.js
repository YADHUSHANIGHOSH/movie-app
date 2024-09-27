import Theatermovies from "../model/theatermoviesModel.js";
import axios from "axios";
import movieModel from "../model/movieModel.js";

const TMDB_API_KEY = "667d4a1053a6fd04eb20ab964b6c4a1a";

export const createTheatermovies = async (req, res) => {
  try {
    const { movieId, theaterId, showTime } = req.body;

    if (!movieId || !theaterId || !showTime) {
      return res
        .status(400)
        .json({ message: "movieId, theaterId, and showTime are required" });
    }

    let movie = await movieModel.findOne({ _id: movieId });

    if (!movie) {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
      );
      const movieData = movieResponse.data;

      if (!movieData) {
        return res
          .status(404)
          .json({ message: "Movie details not found on TMDB." });
      }

      movie = await movieModel.create({
        tmdbId: movieData.id,
        title: movieData.title,
        releasedate: movieData.release_date,
        genre: movieData.genres.map((g) => g.name).join(", "),
        duration: movieData.runtime
          ? `${movieData.runtime} minutes`
          : "Unknown",
      });
    }

    const theaterMovie = new Theatermovies({
      movieId: movie._id,
      theaterId,
      showTime,
      tmdbId: movie.tmdbId,
      duration: movie.duration,
    });

    const savedTheaterMovie = await theaterMovie.save();
    res.status(200).json(savedTheaterMovie);
  } catch (error) {
    console.error("Error creating TheaterMovie:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};








export const fetchAllTheaterMovies = async (req, res) => {
  try {
    const theaterMovies = await Theatermovies.find()
      .populate("movieId")
      .populate("theaterId");

    const result = theaterMovies
      .map((tm) => {
        if (tm.movieId && tm.theaterId) {
          return {
            movie: {
              id: tm.movieId._id,
              title: tm.movieId.title,
              releasedate: tm.movieId.releasedate,
              genre: tm.movieId.genre,
              duration: tm.movieId.duration,
            },
            theater: {
              id: tm.theaterId._id,
              name: tm.theaterId.name,
              location: tm.theaterId.location,
            },
            showtime: tm.showTime,
          };
        } else {
          console.error(
            `Missing movieId or theaterId for theaterMovie: ${tm._id}`
          );
          return null; // Return null for entries with missing data
        }
      })
      .filter((tm) => tm !== null); // Filter out null entries

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching theater movies:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const fetchOneTheaterMovie = async (req, res) => {
  try {
    const { tmdbId } = req.params;
    const theaterMovies = await Theatermovies.find({ tmdbId })
      .populate("movieId")
      .populate("theaterId");

    if (theaterMovies.length === 0) {
      return res
        .status(404)
        .json({ message: "No theater movies found for the given TMDB ID." });
    }

    const result = theaterMovies
      .map((tm) => {
        if (tm.movieId && tm.theaterId) {
          return {
            movie: {
              id: tm.movieId._id,
              title: tm.movieId.title,
              releasedate: tm.movieId.releasedate,
              genre: tm.movieId.genre,
              duration: tm.movieId.duration,
            },
            theater: {
              id: tm.theaterId._id,
              theaterName: tm.theaterId.theaterName,
              location: tm.theaterId.location,
            },
            showtime: tm.showTime,
          };
        } else {
          console.error(
            `Missing movieId or theaterId for theaterMovie: ${tm._id}`
          );
          return null; // Return null for entries with missing data
        }
      })
      .filter((tm) => tm !== null); // Filter out null entries

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching theater movies:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const updateTheaterMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId, theaterId, showtime } = req.body;

    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
    );
    const movieData = movieResponse.data;
    if (!movieData) {
      return res.status(404).json({ message: "Movie details not found." });
    }

    const duration = movieData.runtime
      ? `${movieData.runtime} minutes`
      : "Unknown";
    let movie = await movieModel.findById(movieId);
    if (!movie) {
      movie = await movieModel.create({
        _id: movieId,
        title: movieData.title,
        date: movieData.release_date,
        genre: movieData.genres.map((g) => g.name).join(", "),
        duration: duration,
      });
    } else {
      movie = await movieModel.findByIdAndUpdate(
        movieId,
        {
          title: movieData.title,
          date: movieData.release_date,
          genre: movieData.genres.map((g) => g.name).join(", "),
          duration: duration,
        },
        { new: true }
      );
    }

    const updatedTheaterMovie = await Theatermovies.findByIdAndUpdate(
      id,
      {
        movieId,
        theaterId,
        showtime,
        duration: movie.duration,
      },
      { new: true }
    );

    if (!updatedTheaterMovie) {
      return res.status(404).json({ message: "TheaterMovie not found." });
    }
    res.status(200).json(updatedTheaterMovie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const deleteTheaterMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTheaterMovie = await Theatermovies.findByIdAndDelete(id);
    if (!deletedTheaterMovie) {
      return res.status(404).json({ message: "TheaterMovie not found." });
    }
    res.status(200).json({ message: "TheaterMovie deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error." });
  }
};
