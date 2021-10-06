import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";
//https://api.themoviedb.org/3/movie/268?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US

const SingleMovie = () => {
  //states
  const { id } = useParams();
  const { error } = useGlobalContext();
  const [singleMovie, setSingleMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  //movie arrangements
  const url = "https://api.themoviedb.org/3/movie/";
  const movieId = id;
  const apikey = "?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US";

  //default image
  const urlDefaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      const res = await fetch(`${url}${movieId}${apikey}`);
      const data = await res.json();
      const { poster_path, original_title, overview, release_date, id } = data;

      setSingleMovie({
        name: original_title,
        image: poster_path,
        info: overview,
        date: release_date,
      });
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  if (loading) {
    return <h2 className="loading"></h2>;
  } else {
    const { name, image, info, date } = singleMovie;
    return (
      <section className="single-movie">
        <img
          src={
            image
              ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${image}`
              : urlDefaultImage
          }
          alt={name}
        />
        <div className="single-movie-info">
          <h4 className="title">{name}</h4>
          <p>{info}</p>
          <p>{date}</p>
          <Link className="btn" to="/">
            back to movies
          </Link>
        </div>
      </section>
    );
  }
};

export default SingleMovie;
