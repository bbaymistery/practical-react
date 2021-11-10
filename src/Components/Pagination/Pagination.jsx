import { useState, useEffect } from "react";
import React from "react";
import "./pagination.scss";

const Pagination = ({ setPageNumber }) => {
  const pages = 10;

  const numberOfPages = [];
  const [currentBtn, setCurrentBtn] = useState(1);

  //pages number siralamasi
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  useEffect(() => {
    setPageNumber(currentBtn);
  }, [currentBtn]);

  return (
    <div className="pagination">
      <ul>
        {numberOfPages.map((page, index) => {
          return (
            <li
              key={index}
              className={`${currentBtn === page ? "active" : ""}`}
              onClick={() => setCurrentBtn(page)}
            >
              {page}
            </li>
          );
        })}
        {/* <li className="active">1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li> */}
      </ul>
    </div>
  );
};

export default Pagination;
