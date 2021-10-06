import React from "react";
import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";

const Movies = () => {
  const url =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";
  const { movies, loading } = useGlobalContext();

  if (loading) {
    return <h2 className="loading"></h2>;
  }
  if (!loading) {
    return (
      <section className="movies">
        {movies.map((movie) => {
          const { id, title, release_date, poster_path } = movie;
          return (
            <Link className="movie" to={`/movies/${id}`} key={id}>
              <article>
                <img
                  src={
                    poster_path
                      ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`
                      : url
                  }
                  alt={title}
                />
                <div className="movie-info">
                  <h4 className="title">{title}</h4>
                  <p>{release_date}</p>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    );
  }
};

export default Movies;
