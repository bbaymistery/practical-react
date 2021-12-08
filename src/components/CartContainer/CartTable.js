import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { HiMinusSm } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { formatPrice } from "../../utils/helpers";
const CartTable = ({ addedCartItems, deleteCartItem, toggleAmount }) => {
  return (
    <TableContent>
      <div className="section-center section">
        <div className="table">
          <div className="header_table">
            <p>Item</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          <hr />
          {addedCartItems.map((cartItem, index) => {
            const { amount, price, color, name } = cartItem;
            return (
              <div key={index}>
                <div className="header_body">
                  <div className="header_body_image">
                    <div>
                      <img src={`${cartItem?.images[0].url}`} alt="mainImage" />
                    </div>
                    <div className="desc">
                      <p className="desc_name">{name}</p>

                      <div className="desc_color">
                        <p
                          className="color_title"
                          // style={{ backgroundColor: "black" }}
                        >
                          Color
                          <button
                            className="color_box"
                            style={{ backgroundColor: `${color}` }}
                          ></button>
                        </p>
                      </div>
                      <span className="priceForMobile">
                        {formatPrice(price)}
                      </span>
                    </div>
                  </div>
                  <div className="header_body_price">
                    <p>{formatPrice(price)}</p>
                  </div>
                  {/* guantity */}
                  <div
                    className="header_body_quantity"
                    style={{ userSelect: "none" }}
                  >
                    {/* <HiMinusSm className="minus" onClick={decrementAmount} /> */}
                    <HiMinusSm
                      className="minus"
                      onClick={() =>
                        toggleAmount(cartItem.id, "desc", cartItem.stock)
                      }
                    />

                    <span>{amount}</span>
                    {/* <AiOutlinePlus className="plus" onClick={increaseAmount} /> */}
                    <AiOutlinePlus
                      className="plus"
                      onClick={() =>
                        toggleAmount(cartItem.id, "inc", cartItem.stock)
                      }
                    />
                  </div>

                  <div className="header_body_subtotal">
                    <p>{formatPrice(amount * price)}</p>
                  </div>
                  <div
                    className="header_body_icon"
                    onClick={() =>
                      deleteCartItem(cartItem.id, index, cartItem.color)
                    }
                  >
                    <p>
                      <FaTrashAlt className="trash_icon" />
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </TableContent>
  );
};

const TableContent = styled.div`
  .table {
    width: 100%;
  }
  .header_table {
    display: grid;
    text-align: center;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    p {
      color: var(--clr-grey-5);
      font-weight: 400;
    }
  }

  .header_body {
    padding: 3rem 0;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
    &_image {
      display: grid;
      grid-template-columns: 100px 200px;
      align-content: center;
      justify-items: flex-start;
      gap: 1rem;
      div {
        img {
          width: 100%;
          border-radius: 5px;
        }
      }
      .desc {
        display: flex;
        /* align-items: center; */
        flex-direction: column;
        justify-content: center;
        .desc_name {
          /* background-color: red; */
          margin-bottom: -0.1rem;
          font-weight: 600;
        }
        .desc_color {
          margin-bottom: -0.1rem;

          .color_title {
            display: flex;
            align-items: center;
            font-weight: 600;
            .color_box {
              margin-left: 1rem;
            }
          }
          .color_box {
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 10px;
            border: none;
            background-color: red;
          }
        }
        .priceForMobile {
          display: none;
          margin-top: -1rem;
          font-weight: 500;
          color: var(--cl-primary-10);
        }
      }
    }
    &_price {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        color: var(--clr-primary-2);
      }
    }
    &_quantity {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;

      span {
        font-weight: 800;
        font-size: 1.5rem;
      }
      .minus,
      .plus {
        cursor: pointer;
      }
    }
    &_subtotal {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &_icon {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      p {
        .trash_icon {
          color: red;
          transition: 0.5s ease;
        }
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  @media (max-width: 992px) {
    .header_table {
      display: none;
    }
    .header_body {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 1rem;
      &_image {
        grid-template-columns: 100px 140px;
        gap: 0.5rem;
        div {
          img {
            width: 80%;
          }
        }
        .desc {
          .desc_name {
            font-size: 0.8rem;
          }
          .desc_color {
            margin-bottom: -0.1rem;

            .color_title {
              font-size: 0.8rem;

              .color_box {
                margin-top: 0.1rem;
              }
            }
            .color_box {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 10px;
              border: none;
              background-color: red;
            }
          }
          .priceForMobile {
            display: block;
            color: brown;
            font-size: 0.8rem;
          }
        }
      }
      &_price {
        display: none;
      }
      &_quantity {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;

        span {
          font-weight: 800;
          font-size: 1.5rem;
        }
        .minus,
        .plus {
          cursor: pointer;
        }
      }
      &_subtotal {
        display: none;
      }
      &_icon {
        margin-top: 5px;
      }
    }
  }
  @media (max-width: 576px) {
    /* background-color: red; */
  }
`;
export default CartTable;
/*
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
  }, [amount]);
  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decrementAmount = () => {
    setAmount(amount - 1);
  };
*/
