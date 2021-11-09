import Button from "@restart/ui/esm/Button";
import { Card } from "react-bootstrap";
import { useGlobalContext } from "../context/context";
import Rating from "./Rating";

const SingleProduct = ({ prd }) => {
  const {
    state: { cart },
    dispatch,
  } = useGlobalContext();
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prd.image} alt={prd.name} />
        <Card.Body>
          <Card.Title>{prd.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span> ₹ {prd.price}</span>
            <div>{prd.fastDelivery ? "Fast delivery" : "4 days delivery"}</div>
            <Rating rating={prd.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === prd.id) ? (
            <Button
              variant="danger"
              style={{ backgroundColor: "red", color: "white" }}
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: prd,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              style={{ backgroundColor: "blue", color: "wheat" }}
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: prd,
                })
              }
              disabled={!prd.inStock}
            >
              {!prd.inStock ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProduct;
