import "./header.css";
import React, { useEffect } from "react";

import { ArrowDownwardSharp } from "@material-ui/icons";
const Header = () => {
  window.addEventListener("scroll", (e) => {
    // console.log();
    // console.log(window.pageYOffset);
    if (window.pageYOffset >= 0 && window.pageYOffset < 800) {
      document.querySelector(".animation").classList.add("arrow");
    } else {
      document.querySelector(".animation").classList.remove("arrow");
      document.querySelector(".animation").style.opacity = 0;
    }
  });
  return (
    <span
      onClick={
        () =>
          window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth",
          })
        // window.scrollTo(0,document.body.scrollHeight)
      }
      className="header"
    >
      🎬 Entertainment Hub 🎥
      <p className="animation">
        <ArrowDownwardSharp />
      </p>
      {/* <p class="scroll-down">
        <a href="#complements" class="animate">
          More
        </a>
      </p> */}
    </span>
  );
};

export default Header;
