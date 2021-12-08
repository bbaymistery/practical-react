import { AiOutlinePlus } from "react-icons/ai";
import { HiMinusSm } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import { useCartGlobalContext } from "../../contexts/CardContext";
import { rgbToHex } from "../../utils/constants";
const ProductDescription = ({ singleProduct, loadingSingleProduct }) => {
  const {
    colors,
    name,
    company,
    description,
    stock,
    category,
    price,
    reviews,
    stars,
  } = singleProduct;

  const { addProduct } = useCartGlobalContext();
  //for star rating
  const [rating] = useState(stars);
  const [amount, setAmount] = useState(1);
  const [newColor, setNewColor] = useState();
  // console.log("newcolor" + newColor);

  //star rating function (bunu yazdkkli ona clikc edende errror vermesin)
  const handleRating = (e) => {
    e.preventDefault();
  };

  const takingActiveBtnColorFirstStep = () => {
    let actvbtn = document.querySelector(".color-btn.active");
    // console.log(actvbtn);

    //2.step get rgbHex and appoint to usestate
    let theValueOfColor = window
      .getComputedStyle(actvbtn, null)
      .getPropertyValue("background-color");
    // console.log(theValueOfColor);

    setNewColor(rgbToHex(theValueOfColor));
  };

  const changeActiveColor = (e) => {
    e.preventDefault();
    let eTarget = e.currentTarget;
    let buttons = eTarget.parentElement.children;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].firstChild) {
        buttons[i].firstChild.remove();
        buttons[i].classList.remove("active");
      }
    }
    eTarget.classList.add("active");
    eTarget.innerText = "✔️";

    //
    takingActiveBtnColorFirstStep();
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decrementAmount = () => {
    setAmount(amount - 1);
  };
  useEffect(() => {
    if (amount === stock) {
      document.querySelector(".plus").style.pointerEvents = "none";
      document.querySelector(".plus").style.opacity = ".5";
      document.querySelector(".plus").style.color = "green";
      document.querySelector(".plus").style.fontWeight = "700";
    } else {
      document.querySelector(".plus").style.pointerEvents = "visible";
      document.querySelector(".plus").style.opacity = "1";
      document.querySelector(".plus").style.color = "green";
      document.querySelector(".plus").style.fontWeight = "700";
    }
    if (amount === 1) {
      document.querySelector(".minus").style.pointerEvents = "none";
      document.querySelector(".minus").style.opacity = ".5";
      document.querySelector(".minus").style.color = "red";
      document.querySelector(".minus").style.fontWeight = "700";
    } else {
      document.querySelector(".minus").style.pointerEvents = "visible";
      document.querySelector(".minus").style.opacity = "1";
      document.querySelector(".minus").style.fontWeight = "700";
      document.querySelector(".minus").style.color = "red";
    }

    takingActiveBtnColorFirstStep();
    // //getting and converting color
    // 1.step Select active btn
    // let actvbtn = document.querySelector(".color-btn.active");
    // // console.log(actvbtn);

    // //2.step get rgbHex and appoint to usestate
    // let theValueOfColor = window
    //   .getComputedStyle(actvbtn, null)
    //   .getPropertyValue("background-color");
    // console.log(theValueOfColor);

    // setNewColor(rgbToHex(theValueOfColor));
  }, [amount]);
  return (
    <div>
      <div className="down">
        <h2 className="down_title">{name}</h2>
        <div className="reviewAndStars">
          <div className="stars">
            <Rating
              style={{ display: "flex", alignItems: "center", cursor: "none" }}
              allowHover={false}
              allowHalfIcon={true}
              size={20}
              ratingValue={rating}
              onClick={handleRating}
            />
          </div>
          <div className="reviews" style={{ marginBottom: "0.35rem" }}>
            ({reviews} customer reviews)
          </div>
        </div>
        <p
          className="price"
          style={{ letterSpacing: "0.2rem", fontWeight: "bold" }}
        >
          <span>$</span> {price}
        </p>
        <p className="description">{description}</p>
        <p className="info">
          <span>Available:</span>
          {stock ? "In stock" : " Out Of Stock"}
        </p>
        <p className="info">
          <span>Category:</span>
          {category}
        </p>
        <p className="info">
          <span>SKU:</span>
          {company}
        </p>
        <hr style={{ marginBottom: "1rem" }} />
        <div className="info">
          <span>Colors:</span>
          <p className="colors">
            {colors.map((clr, index) => {
              // console.log("colorsdan gelen" + clr);

              return (
                <button
                  key={index}
                  className={`${
                    index === 0 ? "color-btn active" : "color-btn"
                  } `}
                  style={{ backgroundColor: `${clr}` }}
                  onClick={changeActiveColor}
                >
                  {index === 0 ? "✔️" : ""}
                </button>
              );
            })}
          </p>
        </div>
        <div
          className="calculating"
          style={{ fontWeight: "700", userSelect: "none" }}
        >
          <div>
            <HiMinusSm className="minus" onClick={decrementAmount} />
            <span>{amount}</span>
            <AiOutlinePlus
              className="plus"
              disabled={true}
              onClick={increaseAmount}
            />
          </div>
          <Link
            className="btn"
            to="/cart"
            onClick={() => addProduct(singleProduct, amount, newColor)}
          >
            Add To Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
{
  /* <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStarHalfAlt className="star" /> */
}
/**      <NavLink
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "pink" : "yellow",
          };
        }}
        to={`/learn/course/${randomCourseName}`}
      >
        {randomCourseName}
      </NavLink>{" "}
      <NavLink className="btn btn-light" to={`/learn/course/tests`}>
        tests
      </NavLink> */

/*


      */
