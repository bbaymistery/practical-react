import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.scss";
import SingleContent from "../../Components/SingleContent/SingleContent";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import Modal from "../../Components/Modal/Modal";
//
//animation importing
import AOS from "aos";
import "aos/dist/aos.css";
const Searchh = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [idForModal, setIdForModal] = useState({});
  const [query_value, setQuery_Value] = useState("");
  const [movieType, setMovieType] = useState("movie"); //tv
  // //eklentiler
  const [numOfPages, setNumOfPages] = useState();

  //active btn arrangements
  const [movieButtonActive, setMovieButtonActive] = useState(true);
  const [tvSeriesButton, setTvSeriesButton] = useState(false);
  const fetchTv_Movie_Series = async () => {
    if (query_value.length > 0) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${movieType}?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US&page=${pageNumber}&query=${query_value}&include_adult=false`
      );
      setData(data.results);
      setNumOfPages(data.total_pages);
    }
  };

  //fetching movies
  useEffect(() => {
    fetchTv_Movie_Series();
    AOS.init({ duration: 1000 });

    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setPageNumber(1);
  }, [movieType, pageNumber]);

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
  const getIdForCarousel = (id) => {
    let media_type;
    if (movieType) {
      media_type = "movie";
    } else {
      media_type = "tv";
    }
    let finalResult = { id, media_type };
    setIdForModal(finalResult);
  };

  //active btn arrangements
  //
  const setActiveClassAndTakeValue = (e) => {
    //for movie series
    if (e.target.innerText === "Search Movies") {
      setMovieButtonActive(true);
      setTvSeriesButton(false);
      setMovieType("movie");
    }

    //for tv series
    if (e.target.innerText === "Search Tv Series") {
      setMovieButtonActive(false);
      setTvSeriesButton(true);
      setMovieType("tv");
    }
  };

  //reaching to the in put value whwen typing sth
  const settingInputValue = (e) => {
    setQuery_Value(e.target.value);
  };
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="searching-items" data-aos="fade-in">
            <input
              type="text"
              value={query_value}
              onChange={settingInputValue}
            />
            <span>
              <i
                className="fas fa-search"
                onClick={() => fetchTv_Movie_Series()}
              ></i>
            </span>
          </div>
          <div className="buttons" data-aos="flip-down">
            <ul>
              <li
                className={`${movieButtonActive ? "active" : ""}`}
                onClick={setActiveClassAndTakeValue}
              >
                Search Movies
              </li>
              <li
                className={`${tvSeriesButton ? "active" : ""}`}
                onClick={setActiveClassAndTakeValue}
              >
                Search Tv Series
              </li>
            </ul>
          </div>
          <div className="content-card-sections">
            <div className="cards" data-aos="fade-up">
              {data
                ? data.map((d) => {
                    return (
                      <SingleContent
                        key={d.id}
                        id={d.id}
                        poster={d.poster_path}
                        title={d.title || d.name}
                        date={d.first_air_date || d.release_date}
                        media_type={movieType}
                        vote_average={d.vote_average}
                        setShowModal={setShowModal}
                        showModal={showModal}
                        getIdForCarousel={getIdForCarousel}
                      />
                    );
                  })
                : console.log("s")}
            </div>
          </div>
        </div>
        {numOfPages > 1 ? (
          <CustomPagination
            setPageNumber={setPageNumber}
            numOfPages={numOfPages}
          />
        ) : null}

        {showModal ? (
          <Modal
            setShowModal={setShowModal}
            showModal={showModal}
            idForModal={idForModal}
          />
        ) : null}
      </div>
    </>
  );
};

export default Searchh;
