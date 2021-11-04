import "./Trending.scss";
import "./welcome.scss";
import { useEffect, useState, useCallback } from "react";
//

//components
import Modal from "../../Components/Modal/Modal";
import Pagination from "../../Components/Pagination/Pagination";
import SingleContent from "../../Components/SingleContent/SingleContent";
//animation importing
import AOS from "aos";
import "aos/dist/aos.css";
//
const Trending = () => {
  //useStates
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [idForModal, setIdForModal] = useState({});
  //

  //fething arrangements
  const ApiKey = "dc72c666c72eb1ba78c1a070e26b9dd8";
  const page = "&page=";
  const MainAdress = ` https://api.themoviedb.org/3/trending/all/day?api_key=${ApiKey}&${page}${pageNumber}`;

  //getting datas
  const getTrendingMovies = async (query) => {
    // setLoading(true);
    try {
      const response = await fetch(query);
      const datas = await response.json();
      setData(datas.results);
      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    getTrendingMovies(MainAdress);
  }, [pageNumber]);

  // //for hiding scrool on dody
  useEffect(() => {
    if (showModal) {
      document.querySelector("body").classList.add("body");
    } else {
      document.querySelector("body").classList.remove("body");
    }
  }, [showModal]);

  //
  const getIdForCarousel = (id, media_type) => {
    // bunu ilk single gonderdik id alsin diye ordan idni alib  idFormodala atb ordan  idfor modali gonderirik ki modal ile id regiust elesin
    let finalResult = { id, media_type };
    setIdForModal(finalResult);
  };

  //useEFFECT FOR ANIMATION
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="content">
      {/* <h1 className="welcome">
        <span>I</span>M<span>POSSIBLE</span>
      </h1> */}
      <div className="wrapper">
        <span>W</span>
        <span>E</span>
        <span>L</span>
        <span>C</span>
        <span>O</span>
        <span>M</span>
        <span>E</span>
      </div>
      <div className="container">
        <p className="text-center" data-aos="zoom-out-down">
          Today's Trendings
        </p>
        <div className="content-card-sections">
          <div className="cards" data-aos="fade-up">
            {data.map((d) => {
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
                  pageNumber={pageNumber}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Pagination setPageNumber={setPageNumber} />

      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          idForModal={idForModal}
        />
      ) : null}
    </div>
  );
  // }
};

export default Trending;
