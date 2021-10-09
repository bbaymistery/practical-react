import { useGlobalContext } from "../context";
const Modal = () => {
  const { score, playAgain } = useGlobalContext();
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>You answered {score} of questions correctly</p>
        <button className="close-btn" onClick={(e) => playAgain(e)}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
