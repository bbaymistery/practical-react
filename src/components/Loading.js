import React from "react";
import Gif from "../assets/gif/loading-gear.gif";
const Loading = () => {
  return (
    <div className="section section-center " style={{ textAlign: "center" }}>
      <img src={Gif} alt="" style={{ width: "5%", margin: "0 auto" }} />
    </div>
  );
};

export default Loading;
