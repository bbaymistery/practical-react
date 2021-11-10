import React, { useEffect, useState } from "react";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.scss";

const SingleContent = ({
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
  return (
    <>
      <div
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
    </>
  );
};

export default SingleContent;
