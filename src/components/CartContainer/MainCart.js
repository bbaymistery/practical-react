import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import CartHeader from "./CartHeader";

import CartTable from "./CartTable";
import Footer from "../../components/Footer/Footer";
import { useCartGlobalContext } from "../../contexts/CardContext";
import IfCartIsEmpty from "./IfCartIsEmpty";
import { formatPrice } from "../../utils/helpers";

const Cart = () => {
  const { addedCartItems, deleteCartItem, clearShooping, toggleAmount } =
    useCartGlobalContext();

  const [subtotal, setSubtotal] = useState();
  const [orderTotal, setOrderTotal] = useState();
  useEffect(() => {
    let totalValue = addedCartItems.reduce((total, item) => {
      let totals = item.price * item.amount + total;
      return totals;
    }, 0);
    // totalValue = formatPrice(totalValue);
    // financial(totalValue);
    let orderTotal = totalValue - (totalValue * 5.34) / 100;
    setOrderTotal(formatPrice(orderTotal));
    setSubtotal(formatPrice(totalValue));
  }, [toggleAmount]);
  if (addedCartItems.length === 0) {
    return <IfCartIsEmpty />;
  }
  return (
    <>
      <CartHeader />
      <CartTable
        addedCartItems={addedCartItems}
        deleteCartItem={deleteCartItem}
        toggleAmount={toggleAmount}
      />
      <Buttons>
        <div className="section-center">
          <div>
            <Link to="/products" className="link-btn">
              {" "}
              Continue Shopping
            </Link>
            <a className="link-btn clear-btn" onClick={clearShooping}>
              {" "}
              Clear Shopping Cart
            </a>
          </div>
        </div>
      </Buttons>

      <Subtotal>
        <div className="section-center">
          <article>
            <h5>
              subtotal :<span>{subtotal ? subtotal : ""}</span>
            </h5>
            <p>
              shipping fee :<span>5.34 %</span>
            </p>
            <hr />
            <h4>
              order total :<span>{orderTotal ? orderTotal : ""}</span>
            </h4>
            <button className="btn">login</button>
          </article>
        </div>
      </Subtotal>
      <Footer />
    </>
  );
};
const Buttons = styled.div`
  .section-center {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .link-btn {
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background-color: var(--clr-black);
  }
`;
const Subtotal = styled.div`
  div {
    margin-top: 3rem;
    margin-bottom: 3rem;

    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    article {
      border: 1px solid var(--clr-grey-8);
      border-radius: var(--radius);
      padding: 1.5rem 3rem;
      h5 {
        display: grid;
        grid-template-columns: 200px 1fr;
      }
      p {
        text-transform: capitalize;
        display: grid;
        grid-template-columns: 200px 1fr;
      }
      h4 {
        margin-top: 2rem;
        display: grid;
        grid-template-columns: 200px 1fr;
      }
    }
    .btn {
      width: 100%;
      margin-top: 1rem;
      text-align: center;
      font-weight: 700;
      margin-top: 2rem;
    }
  }
  @media (max-width: 992px) {
    .section-center {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
export default Cart;
