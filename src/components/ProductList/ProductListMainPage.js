import React from "react";
import { useFilterGlobalContext } from "../../contexts/FilterContext";
import ProductListHeader from "./ProductListHeader";
import ProductListLeftSide from "./ProductListLeftSide";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import ProductListRightSide from "./ProductListRightSide";
import Loading from "../Loading";
const ProductListMainPage = () => {
  const { sortedProducts, loading } = useFilterGlobalContext();
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="main">
      <ProductListHeader />

      <div className="section-center">
        <Product_List_Style_Container>
          {/* left side it WAS side bar which located on the left */}
          <ProductListLeftSide />
          <ProductListRightSide />
        </Product_List_Style_Container>
      </div>

      <Footer />
    </div>
  );
};

export default ProductListMainPage;

const Product_List_Style_Container = styled.div`
  display: flex;
  /* border: 1px solid red; */
  padding: 1rem 0rem;

  .left {
    padding: 1rem;
    flex-basis: 20%;
    position: -webkit-sticky;
    position: sticky;
    height: 70vh;
    color: white;
    top: 20px;
    div {
      margin-bottom: 1.25rem;
    }
    input {
      padding: 0.5rem;
      background: var(--clr-grey-10);
      border-radius: var(--radius);
      border-color: transparent;
      letter-spacing: var(--spacing);
      border: none;
      &:focus {
        border: none;
        outline: none;
        padding: 0.5rem;
      }
    }
    .categories {
      /* border: 1px solid red; */

      h5 {
        color: black;
      }
      &_list {
        /* display: block;
         */
        list-style: none;
        button {
          text-transform: capitalize;
          margin-bottom: 0.5rem;
          color: var(--clr-grey-5);
          cursor: pointer;
          padding: 0.1rem 0rem;
          display: block;
          background-color: transparent;
          border: none;
        }
        button.active {
          text-decoration: underline;
          text-underline-position: under;
        }
      }
    }
    .companies {
      h5 {
        color: black;
      }
      select {
        color: var(--clr-grey-5);
        border: none;
        cursor: pointer;
        background-color: #eeeeee;
        padding: 5px 5px;
        border-radius: 5px;
        &:focus {
          outline: none;
        }
        &:hover {
          /* background-color:red; */
        }
      }
    }
    .colors {
      h5 {
        color: black;
      }
      button {
        border: none;
        outline: none;
        margin-right: 16px;
        background-color: transparent;
        /* opacity: 0.1; */
      }
      button.all {
        color: var(--clr-grey-5);
        text-underline-position: under;
      }
      button.active {
        text-decoration: underline;
        opacity: 1;
      }

      button.color {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: rgb(34, 34, 34);
        margin-right: 0.5rem;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        /* display: flex; */
        /* -webkit-box-align: center; */
        /* align-items: center; */
        /* -webkit-box-pack: center; */
        /* justify-content: center; */
      }
      button.color.active {
        opacity: 1;
      }
      .color-box {
        display: flex;
        align-items: center;
      }
    }
    .price {
      h5 {
        color: black;
      }
      p {
        /* background-color: red; */
        font-weight: bold;
      }
      input {
        width: 100%;
        margin-top: -5rem;
      }
    }
    .shipping {
      /* background-color: red; */
      display: flex;
      align-items: center;
      justify-content: space-around;
      label {
        color: black;
      }
    }
    .clearFilter {
      display: flex;
      justify-content: center;
      button {
        display: block;
        margin: 0.25em 0px;
        text-transform: capitalize;

        border-top: none;
        border-right: none;
        border-left: none;
        border-image: initial;
        border-bottom: 1px solid transparent;
        letter-spacing: var(--spacing);
        cursor: pointer;

        background: var(--clr-red-dark);
        color: var(--clr-white);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius);
      }
    }
  }
  .right {
    /* border: 1px solid black; */
    flex-basis: 80%;
    padding: 1rem;
    display: flex;
    flex-direction: column;

    &_up {
      /* background-color: red; */
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn_container {
        button {
          background-color: transparent;
          cursor: pointer;
          border: none;
          outline: none;
          &:active {
            transform: scale(1.1);
          }
        }
        button.active {
          .icon {
            color: white;
            background-color: black;
          }
        }
        .grid_view-btn {
          .icon {
            font-size: 1.2rem;
          }
        }
        .list_view-btn {
          margin-left: 1rem;
          .icon {
            font-size: 1.2rem;
          }
        }
      }
      span {
        letter-spacing: 3px;
      }
      hr {
        /* border: none; */
        display: block;
        border-top: 1px solid red;
      }
      form {
        text-transform: capitalize;
        label {
          margin-right: 1rem;
        }
        select {
          text-transform: capitalize;

          color: var(--clr-grey-5);
          border: none;
          cursor: pointer;
          background-color: #eeeeee;
          padding: 5px 5px;
          border-radius: 5px;
          &:focus {
            outline: none;
          }
          &:hover {
            /* background-color:red; */
          }
        }
      }
    }
    &_down {
    }
    &_down.grid_view {
      margin-top: 2rem;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-content: center;
      justify-items: center;
      grid-gap: 2rem;
      .container {
        img {
          height: 175px;
          width: 280px;
        }
      }
    }
  }

  @media (max-width: 992px) {
    .right_down.grid_view {
      grid-template-columns: repeat(1, 1fr);
      article {
        width: 100%;
        .container {
          img {
            width: 100%;
            /* img {
        } */
          }
        }
      }
    }
  }
  @media (max-width: 762px) {
    flex-direction: column;
    .left {
      /* background-color: red; */
      position: relative;
      width: 230px;
      flex-basis: 10%;
      margin-bottom: 4rem;
    }
    .right_up {
      span {
        letter-spacing: 1px;
        color: red;
      }

      form {
        label {
          display: none;
        }
      }
    }
  }
  @media (max-width: 570px) {
    .left {
      /* margin: 0 auto; */
    }
  }
`;
