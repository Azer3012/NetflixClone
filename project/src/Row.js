import React, { useEffect, useState } from "react";
import axios from "axios";

import "./row.css";
import YouTube from "react-youtube";

import movieTrailer from 'movie-trailer'

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargerRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl,setTrailerUrl]=useState("")

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3${fetchUrl}`
      );
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [`https://api.themoviedb.org/3${fetchUrl}`]);

  const opts={
      height:"390",
      width:"100%",
      playerVars:{
          autoplay:1,
      }
  }

  const handleClick=(movie)=>{
    if(trailerUrl){
        setTrailerUrl()
    }
    else{
        movieTrailer(movie?.name || "")
        .then(url=>{
            const urlParams=new URLSearchParams(new URL(url).search) ;
            setTrailerUrl(urlParams.get('v')) 
        }).catch(error=>console.log(error))
    }
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={()=>handleClick(movie)}
            className={`row-poster ${isLargerRow  && "row-poster-large"}`}
            src={`${baseUrl}${isLargerRow?movie.poster_path:movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
