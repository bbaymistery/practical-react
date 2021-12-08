import React, { useState } from "react";
const ProductImage = ({ loadingSingleProduct, singleProduct, id }) => {
  const [imageState, setİmageState] = useState("");
  const changeActiveClass = (e) => {
    let allSelectiveImages = e.target.parentElement.children;
    let src = e.target.getAttribute("src");
    setİmageState(src);
    if (allSelectiveImages) {
      for (let i = 0; i < allSelectiveImages.length; i++) {
        allSelectiveImages[i].className = "null";
        e.target.className = "active";
      }
    }
  };

  return (
    <div className="up">
      <div className="imageContainer">
        <div className="upImage">
          {!loadingSingleProduct && (
            <img
              src={imageState ? imageState : singleProduct?.images[0].url}
              alt="img"
            />
          )}
        </div>
        <div className="downImages">
          {!loadingSingleProduct &&
            singleProduct?.images.map((image, index) => {
              return (
                <img
                  src={image.large.url}
                  alt=""
                  key={`${image.id}`}
                  className={`${index === 0 ? "active" : "null"}`}
                  onClick={changeActiveClass}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
