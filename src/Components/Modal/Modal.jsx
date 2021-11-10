import "./Modal.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";

//material icons
import YouTubeIcon from "@material-ui/icons/YouTube";
import Carousel from "../Carousel/Carousel";
import { CloseSharp } from "@material-ui/icons";

//configauratins
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
//components

import Loading from "../Loading/Loading";

//animation importing
import AOS from "aos";
import "aos/dist/aos.css";
//
const Modal = ({ showModal, setShowModal, idForModal }) => {
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(idForModal);
  //
  const fetchData = async () => {
    setLoading(true);

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${idForModal.media_type}/${idForModal.id}?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US`
    );
    if (data) {
      setContent(data);
    } else {
      setContent(null);
    }
    setTimeout(() => {
      setLoading(false);
    }, 550);
  };

  //
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${idForModal.media_type}/${idForModal.id}/videos?api_key=dc72c666c72eb1ba78c1a070e26b9dd8&language=en-US`
    );
    setVideo(data.results[0]?.key);
    setTimeout(() => {
      setLoading(false);
    }, 5100);
  };

  //useEffect for  calling fetchData fetchVideo functions
  useEffect(() => {
    fetchData();
    fetchVideo();
    // useEFFECT FOR ANIMATION

    AOS.init({ duration: 1000 });
  }, []);

  //
  if (loading) {
    return <Loading />;
  }

  if (!content) {
    return <h2>We cant reach to modal</h2>;
  } else {
    return (
      <div
        className="modal"
        data-aos="fade-in"
        data-aos-easing="linear"
        onClick={() => setShowModal(!showModal)}
      >
        <div className="fixed">
          <div className="left">
            <img
              src={
                content.poster_path
                  ? `${img_500}/${content.poster_path}`
                  : unavailable
              }
              alt={content.name || content.title}
              alt=""
            />
          </div>
          <div className="right">
            <div className="right-title">
              <p className="closeBtn" onClick={() => setShowModal(!showModal)}>
                <CloseSharp />
              </p>
              <h1> {content.title || content.name} </h1>
            </div>
            <div className="right-desc">{content.overview}</div>

            <div className="right-carousel">
              <Carousel id={idForModal.id} media_type={idForModal.media_type} />
            </div>

            <a
              data-aos="flip-left"
              className="btn"
              href={`https://www.youtube.com/watch?v=${video}`}
              target="__blank"
            >
              <YouTubeIcon />

              <h3> The Trailer</h3>
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;
