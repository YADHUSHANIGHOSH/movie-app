'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from "./movielist.module.css"
import Cards from '@/components/card/page'
import { useParams } from "next/navigation"



const Movielist = () => {
   
  const [movieList, setMovieList] = useState([])
  const {type} = useParams()

  useEffect(() => {
      getData()
  }, [])

  useEffect(() => {
      getData()
  }, [type])

  const getData = () => {
      fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=667d4a1053a6fd04eb20ab964b6c4a1a&language=en-US`)
      .then(res => res.json())
      .then(data => setMovieList(data.results))
  }

  return (
      <div className={styles.movie__list}>
          <h2 className={styles.list__title}>{type ? type : "POPULAR".toUpperCase()}</h2>
          <div className={styles.list__cards}>
              {
                  movieList.map(movie => (
                      <Cards movie={movie} />
                  ))
              }
          </div>
      </div>
  )
  
}
export default Movielist


// 'use client'

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import styles from './movielist.module.css';
// import Cards from '@/components/card/page';
// import { useParams } from 'next/navigation';

// const Movielist = () => {
//   const [movieList, setMovieList] = useState([]);
//   const { type } = useParams();

//   useEffect(() => {
//     getData();
//   }, [type]);

//   const getData = () => {
//     fetch(`https://api.themoviedb.org/3/movie/${type ? type : 'popular'}?api_key=667d4a1053a6fd04eb20ab964b6c4a1a&language=en-US`)
//       .then((res) => res.json())
//       .then((data) => setMovieList(data.results));
//   };

//   return (
//     <div className={styles.movie__list}>
//       <div className={styles.list__header}>
//       <h2 className={styles.list__title}>{type ? type : "POPULAR".toUpperCase()}</h2>
//         <div className={styles.list__links}>
//           <Link href="/movies/popular">
//             <a className={type === 'popular' ? styles.active : ''}>Popular</a>
//           </Link>
//           <Link href="/movies/upcoming">
//             <a className={type === 'upcoming' ? styles.active : ''}>Upcoming</a>
//           </Link>
//           <Link href="/movies/top_rated">
//             <a className={type === 'top_rated' ? styles.active : ''}>Top Rated</a>
//           </Link>
//         </div>
//       </div>
//       <div className={styles.list__cards}>
//         {movieList.map((movie) => (
//         //   <Cards key={movie.id} movie={movie} />
//         <Cards movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Movielist;
