import React, { useState, useEffect } from "react";
//npmss
import axios from "axios";
//hooks
import useGenre from "../../hooks/useGenre";

//komponents
import Modal from "../../Components/Modal/Modal";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";

import Genres from "../../Components/Genres/Genres";
//
//animation importing
import AOS from "aos";
import "aos/dist/aos.css";
const Movies = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [idForModal, setIdForModal] = useState({});

  //eklentiler
  const [numOfPages, setNumOfPages] = useState();

  //genres ssadece type yazmag ucundur
  const [genres, setGenres] = useState([]);

  //selected genresi usegenres ile gondewrib id sini airix
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres); //bura atanan deger le tezden fetch etmis olurux

  ///fetching data and set variable setNumOfPages for gapination
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${genreforURL}`
    );
    setData(data.results);
    setNumOfPages(data.total_pages);
  };
  //fetching movies
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL, pageNumber]);

  //
  //showmodal open olunca body den scrollu kaldirdik
  useEffect(() => {
    if (showModal) {
      document.querySelector("body").classList.add("body");
    } else {
      document.querySelector("body").classList.remove("body");
    }
  }, [showModal]);

  //movies icin sadece id ye ihtiyacimiz var media type zaten belli oldugu icin onu elimizle yazicaz

  //moviesden fergli olarag burda gorunenler hamsi series olarag deyisdirdk
  const getIdForCarousel = (id) => {
    let media_type;
    let finalResult = { id, media_type: "tv" };
    setIdForModal(finalResult);
  };
  //useEFFECT FOR ANIMATION
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <div className="content">
        <div className="container">
          <div className="text-center" data-aos="fade-down-left">
            Discover Series...
          </div>
          <div className="types-of-movies" data-aos="zoom-out-right">
            <Genres
              type="tv"
              setPageNumber={setPageNumber}
              genres={genres}
              setGenres={setGenres} //bunlar ile type lari fetch edirik
              selectedGenres={selectedGenres} //bunlar ile selectedleri filter edirik
              setSelectedGenres={setSelectedGenres}
            />
          </div>
          <div className="content-card-sections">
            <div className="cards" data-aos="fade-up">
              {data ? (
                data.map((d) => {
                  return (
                    <SingleContent
                      key={d.id}
                      id={d.id}
                      poster={d.poster_path}
                      title={d.title || d.name}
                      date={d.first_air_date || d.release_date}
                      media_type={d.media_type}
                      vote_average={d.vote_average}
                      setShowModal={setShowModal}
                      showModal={showModal}
                      getIdForCarousel={getIdForCarousel}
                    />
                  );
                })
              ) : (
                <p>We dont have movies</p>
              )}
            </div>
          </div>
        </div>

        {numOfPages > 1 && (
          <CustomPagination
            setPageNumber={setPageNumber}
            numOfPages={numOfPages}
          />
        )}

        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            showModal={showModal}
            idForModal={idForModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Movies;
// {
/* <button className="btn-type active">
              Animation
              <CloseRounded className="icon" />
            </button>{" "}
            <button className="btn-type">
              Animation
              <CloseRounded className="icon" />
            </button> */
// }
