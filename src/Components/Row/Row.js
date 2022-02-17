import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

// No curly braces as we are importing the default export [coming from axios.js in Src Root and we can change name then and here in import
import axios from "../../axios.js";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [movieUrl, setMovieUrl] = useState();

  // Run this piece of when the dependencies changes
  // If no dependencies run only once when component loads up
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchURL); // baseurl from axios.js + fetchurl from requests.js
      setMovies(response.data.results);
      return response;
    };
    fetchData();
  }, [fetchURL]);

  const clickHandler = (movie) => {
    !movieUrl
      ? movieTrailer(movie?.name || movie?.title)
          .then((url) => {
            const search = new URLSearchParams(new URL(url).search);
            const movieId = search.get("v");
            setMovieUrl(movieId);
          })
          .catch((error) => {
            alert("Oops! No Trailer found for this.");
          })
      : setMovieUrl("");
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1 className="row__title">{title}</h1>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => clickHandler(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${BASE_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_title}
          />
        ))}
      </div>
      {movieUrl && <YouTube videoId={movieUrl} opts={opts} />}
    </div>
  );
};

export default Row;
