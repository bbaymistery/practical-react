import React, { useEffect, useState } from "react";

import { img_300, unavailable } from "../../config/config";
import "./SingleContent.scss";
//animation importing
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "../Loading/Loading";
const SingleContent = ({
  pageNumber,
  getIdForCarousel,
  showModal,
  setShowModal,
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <div
        // data-aos="fade-up"
        // data-aos-easing="linear"
        className="card"
        key={id}
        onClick={() => {
          setShowModal(!showModal), getIdForCarousel(id, media_type);
        }}
      >
        <img
          className="card-img-top"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <div className="card-body">
          <h3>{title}</h3>
          <p className="score">
            <span>{vote_average}</span>
          </p>
          <div className="desc">
            <span className="desc-name">{date}</span>
            <span className="desc-date">
              {" "}
              {media_type === "tv" ? "TV Series" : "Movie"}
            </span>
          </div>
        </div>
      </div>
      {/* Modal content */}
    </>
  );
};

export default SingleContent;
