import { useState, useEffect } from "react";

const Paginate = ({ pages, setCurrentPage }) => {
  const numberOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  const [currentBtn, setCurrentBtn] = useState(1);
  useEffect(() => {
    setCurrentPage(currentBtn);
    //setCurentPage in direk setCurrent buton degerine cevrlmesi
  }, [currentBtn, setCurrentPage]);
  return (
    <>
      <button
        className="prev-btn"
        onClick={() => setCurrentBtn((prev) => (prev === 1 ? prev : prev - 1))}
      >
        Prev
      </button>
      {numberOfPages.map((pg, index) => {
        return (
          <button
            key={index}
            className={`${
              currentBtn === pg ? "page-btn active-btn" : "page-btn null"
            }`}
            onClick={() => setCurrentBtn(pg)}
          >
            {pg}
          </button>
        );
      })}
      <button
        className="next-btn"
        onClick={() =>
          setCurrentBtn((prev) =>
            prev === numberOfPages.length ? prev : prev + 1
          )
        }
      >
        Next
      </button>
    </>
  );
};
export default Paginate;
