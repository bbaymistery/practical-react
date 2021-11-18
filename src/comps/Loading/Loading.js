import "./Loading.scss";
import loadingGif from "../../config/images/gif/loading-gear.gif";
const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingGif} alt="" />
    </div>
  );
};

export default Loading;
