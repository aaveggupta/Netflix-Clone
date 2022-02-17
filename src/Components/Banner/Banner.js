import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import "./Banner.css";

const Banner = ({ fetchURL }) => {
  const [movieInfo, setMovieInfo] = useState({});

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(fetchURL);
      setMovieInfo(response.data.results[Math.floor(Math.random() * 20)]);
      return response;
    };
    fetchData();
  }, [fetchURL]);

  const truncateString = (string = "", maxLength = 50) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

  console.log(movieInfo);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "Cover",
        backgroundImage: `url(${BASE_URL}${movieInfo.backdrop_path})`,
        backgroundPosition: "top center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner__title">{movieInfo?.name || movieInfo?.title}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">
          {truncateString(movieInfo?.overview || movieInfo?.description, 150)}
        </p>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
};

export default Banner;
