"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Styles from "./moviedetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface MovieDetails {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  release_date: string;
  genres: { id: number; name: string }[];
  overview: string;
  homepage: string;
  imdb_id: string;
  production_companies: { logo_path: string; name: string }[];
}

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState<MovieDetails | null>(null);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=667d4a1053a6fd04eb20ab964b6c4a1a&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
  
    <div className={Styles.movie}>
      <div className={Styles.topPart}>
      <div className={Styles.movie__intro}>
        <img
          className={Styles.movie__backdrop}
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
        />
      </div>
      <div className={Styles.movie__detail}>
        <div className={Styles.movie__detailLeft}>
          <div className={Styles.movie__posterBox}>
            <img
              className={Styles.movie__poster}
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
            />
          </div>
        </div>
        <div className={Styles.movie__detailRight}>
          <div className={Styles.movie__detailRightTop}>
            <div className={Styles.movie__name}>
              {currentMovieDetail ? currentMovieDetail.original_title : ""}
            </div>
            <div className={Styles.movie__tagline}>
              {currentMovieDetail ? currentMovieDetail.tagline : ""}
            </div>
            <div className={Styles.movie__rating}>
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}
              <FontAwesomeIcon icon={faStar} />
              <span className={Styles.movie__voteCount}>
                {currentMovieDetail
                  ? "(" + currentMovieDetail.vote_count + ") votes"
                  : ""}
              </span>
            </div>
            <div className={Styles.movie__runtime}>
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </div>
            <div className={Styles.movie__releaseDate}>
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.release_date
                : ""}
            </div>
            <div className={Styles.movie__genres}>
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <>
                      <span
                        className={Styles.movie__genre}
                        key={genre.id}
                        id={String(genre.id)}
                      >
                        {genre.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          <div className={Styles.movie__detailRightBottom}>
            <div className={Styles.synopsisText}>Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>

            <button className={Styles.bookingbutton}>
              <Link href={`/booking?tmdbId=${id}`} className={Styles.link}>
                Book tickets
              </Link>
            </button>
          </div>
        </div>
      </div>
      </div>

      <div className={Styles.bottomPart}>
        <div className={Styles.movie__heading}>Production companies</div>
        <div className={Styles.movie__production}>
          {currentMovieDetail &&
            currentMovieDetail.production_companies &&
            currentMovieDetail.production_companies.map((company) => (
              <>
                {company.logo_path && (
                  <span className={Styles.productionCompanyImage}>
                    <img
                      className={Styles.movie__productionComapany}
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        company.logo_path
                      }
                    />
                    <span>{company.name}</span>
                  </span>
                )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
