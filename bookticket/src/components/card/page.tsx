import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";

type Movie = {
    id: string;
    poster_path: string;
    original_title: string;
    release_date: string;
    vote_average: number;
    overview: string;
  };



const Cards = ({movie}:{movie :Movie}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

    return <>
    {
        isLoading
        ?
        <div className={styles.cards}>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link href={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className={styles.cards}>
                <img className={styles.cards__img} src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
                <div className={styles.cards__overlay}>
                    <div className={styles.card__title}>{movie?movie.original_title:""}</div>
                    <div className={styles.card__runtime}>
                        {movie?movie.release_date:""}
                        <span className={styles.card__rating}>{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className={styles.card__description}>{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div>
        </Link>
    }
    </>
}

export default Cards;
