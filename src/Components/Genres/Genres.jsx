import React, { useState, useEffect } from "react";
import axios from "axios";
import { CloseRounded } from "@material-ui/icons";
//animation importing
import AOS from "aos";
import "aos/dist/aos.css";
const Genres = ({
  type,
  genres,
  setGenres,
  setSelectedGenres,
  selectedGenres,
  setPageNumber,
}) => {
  //fetching genres  types and setting them to the setGenres(genres ve setGenres type icidir)
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();
    // useEFFECT FOR ANIMATION

    AOS.init({ duration: 1000 });

    return () => {
      setGenres({});
    };
  }, []);
  // console.log(selectedGenres);

  const handleAdd = (e, genre) => {
    //selectedin icine ekliyoruz
    setSelectedGenres([...selectedGenres, genre]);

    // toplu genres icinden cikariyoruz
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPageNumber(1);
  };

  const handleRemove = (e, genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPageNumber(1);
  };

  return (
    <>
      {selectedGenres.map((d) => {
        return (
          <button
            data-aos="zoom-in-down"
            data-aos-easing="linear"
            className="btn-type active"
            key={d.id}
            onClick={(e) => handleRemove(e, d)}
          >
            {d.name}
            <CloseRounded className="icon" key={d.id} />
          </button>
        );
      })}
      {genres.map((d) => {
        return (
          <button
            data-aos="zoom-out-left"
            data-aos-easing="linear"
            className="btn-type"
            key={d.id}
            onClick={(e) => handleAdd(e, d)}
          >
            {d.name}
            <CloseRounded className="icon" key={d.id} />
          </button>
        );
      })}
    </>
  );
};

export default Genres;
