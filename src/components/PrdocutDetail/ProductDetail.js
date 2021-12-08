import styled from "styled-components";
import React, { useEffect } from "react";
import "../../global.scss";
import { useParams } from "react-router-dom";
import { useProductsGlobalContext } from "../../contexts/ProductContext";
//comps
import Footer from "../../components/Footer/Footer";
import Loading from "../Loading";
import ProductImage from "./ProductImage";
import ProductHeader from "./ProductHeader";
import ProductDescription from "./ProductDescription";
// //icons
// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { AiOutlinePlus } from "react-icons/ai";
// import { HiMinusSm } from "react-icons/hi";
// import { svgTrueIcon } from "../../utils/constants";

const ProductDetail = () => {
  //
  const { fetchSingleProduct, loadingSingleProduct, singleProduct } =
    useProductsGlobalContext();
  const { id } = useParams();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  if (loadingSingleProduct) {
    return <Loading />;
  }

  if (!singleProduct) {
    return <p>Go to reload</p>;
  } else {
    // console.log(singleProduct);

    return (
      <>
        <Wrapper>
          <ProductHeader
            singleProduct={singleProduct}
            loadingSingleProduct={loadingSingleProduct}
          />
          <div className="product_content section-center">
            <ProductImage
              singleProduct={singleProduct}
              loadingSingleProduct={loadingSingleProduct}
              id={id}
            />

            <ProductDescription
              singleProduct={singleProduct}
              id={id}
              loadingSingleProduct={loadingSingleProduct}
            />
          </div>
        </Wrapper>
        <Footer />
      </>
    );
  }
};
const Wrapper = styled.section`
  .header {
    background: var(--clr-primary-10);
    width: 100%;
    min-height: 17vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--clr-primary-1);

    a {
      text-transform: capitalize;
      font-size: 2rem;
      &:not(:first-child) {
        margin-left: 2rem;
      }
      &:not(:last-child) {
        color: var(--clr-primary-5);
      }
      &:last-child {
        color: var(--clr-primary-1);
      }
    }
  }

  .product_content {
    /* border: 1px solid red; */
    padding: 4rem 0rem;
    display: flex;
    align-items: center;
    .up {
      flex: 1;
      margin-right: 2rem;
      .btn {
        margin-bottom: 1rem;
      }
      .imageContainer {
        width: 600px;
        .upImage {
          img {
            border-radius: 10px;
            width: 100%;
            height: 480px;
            object-fit: cover;
          }
        }
        .downImages {
          /* background-color: red; */
          /* display: flex;
          justify-content: space-between; */
          align-content: center;
          justify-items: center;
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(5, 1fr);
          margin-top: 1rem;
          .active {
            border: 2px solid black;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
              rgba(0, 0, 0, 0.22) 0px 10px 10px;
          }
          img {
            height: 60px;
            border-radius: 10px;
            object-fit: cover;
            cursor: pointer;
          }
        }
      }
    }
    .down {
      flex: 1;
      /* border: 1px solid yellow; */
      margin-top: 1rem;
      margin-left: 2rem;
      font-family: var(--font-quickSand);
      .reviewAndStars {
        display: flex;
        /* background-color: yellow; */

        .stars {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          /* background-color: red; */
          .star {
            color: rgb(255, 185, 0);
          }
        }
        .reviews {
          display: flex;
          align-items: center;
          font-weight: bold;
          /* background-color: green; */
        }
      }
      .price {
        span {
          font-size: 1rem;
          font-weight: 900;
        }
        color: var(--clr-primary-5);
        margin-top: 1rem;
        letter-spacing: var(--spacing);
      }
      .description {
        font-weight: bold;
      }
      .info {
        color: var(--clr-primary-5);
        font-weight: bold;
        text-transform: capitalize;
        width: 300px;
        display: grid;
        grid-template-columns: 125px 1fr;
        span {
          font-weight: 900;
          margin-right: 1.5rem;
          color: black;
        }
        .colors {
          display: flex;
          align-items: center;
          .color-btn.active {
            opacity: 1;
          }
          .color-btn {
            margin-right: 0.75rem;
            border-radius: 20px;
            padding: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            width: 1.5rem;
            height: 1.5rem;
            opacity: 0.5;

            svg {
              font-size: 0.75rem;
              color: white;
            }
          }
        }
      }
      .calculating {
        /* border: 1px solid red; */
        div {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          width: 180px;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
          span {
            font-size: 1.8rem;
          }
          .minus,
          .plus {
            cursor: pointer;
          }
        }
      }
    }
  }

  //burda sadece sekil terefi responsive eledik
  @media (max-width: 992px) {
    .header {
      min-height: 17vh;
      letter-spacing: 0.1rem;
    }
    .product_content {
      display: flex;
      flex-direction: column;
      .up {
        margin-right: 0rem;
        .imageContainer {
          .upImage {
            img {
              border-radius: 10px;
              width: 100%;
            }
          }
          .downImages {
          }
        }
      }
      .down {
        margin-left: 0;
        margin-top: 2.5rem;
      }
    }
  }
  @media (max-width: 576px) {
    .header {
      a {
        font-size: 1rem;
      }
    }
    .product_content {
      .up {
        .imageContainer {
          width: auto;

          .downImages {
            img {
              width: 75px;
            }
          }
        }
      }
      .down {
      }
    }
  }
`;
export default ProductDetail;
