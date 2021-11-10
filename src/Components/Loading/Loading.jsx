import React from "react";
import loadingGif from "./gif/loading-arrow.gif";
import "./loading.scss";
const Loading = () => {
  return (
    <div className="loading">
      <h4>Modalss....</h4>
      <img src={loadingGif} alt="" />
    </div>
  );
};

export default Loading;
