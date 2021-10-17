import React from "react";
import { Link } from "react-router-dom";
import PayPalButton from "./PayPalButton";
export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, cart, clearCart } = value;
  return (
    <>
      <div className="container">
        <div className="row text-center">
          <div className="col-10 mt-2 ml-sm-5 m-auto col-sm-8 text-capitalize">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-5 px-5 "
                onClick={() => clearCart()}
              >
                Clear cart
              </button>
            </Link>
          </div>

          <h5>
            <span className="text-title"> subtotal :</span>{" "}
            <strong>$ {cartSubTotal} </strong>
          </h5>
          <h5>
            <span className="text-title"> tax :</span>{" "}
            <strong>$ {cartTax} </strong>
          </h5>
          <h5>
            <span className="text-title"> total :</span>{" "}
            <strong>$ {cartTotal} </strong>
          </h5>

          <PayPalButton
            totalAmount={cartTotal}
            clearCart={clearCart}
            history={history}
          />
        </div>
      </div>
    </>
  );
}
