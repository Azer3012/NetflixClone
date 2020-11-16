import React, { useEffect, useState } from 'react'
import requests from './request';
import axios from 'axios';
import './banner.css'


function Banner() {

    const [movie,setMovie]=useState([])

    useEffect(()=>{
        async function fetchData(){
            const request= await axios.get(`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`)
            const results=request.data.results
            setMovie(results[Math.floor(Math.random()*results.length-1)])
        }
        fetchData();
    },[`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`])
    
    console.log(movie);

  const truncate=(str,n)=>{
        return str?.length > n ? str.substr(0,n-1)+ "...":str;
    }
    return (
        <div className="banner"
        style={{
            backgroundSize:"cover",
            backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
            backgroundPosition:"center center"
        }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">
                    {movie?.title || movie?.name || movie?.original_name }
                </h1>
                <div className="banner-buttons">
                    <button className="banner-button">Play</button>
                    <button className="banner-button">My List</button>
                </div>
                <h1 className="banner-description">
                    {truncate(movie?.overview,150)}
                </h1>
            </div>
            <div className="banner-fade">
                
            </div>
        </div>
    )
}

export default Banner
