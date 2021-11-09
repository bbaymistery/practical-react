import { FaShoppingCart } from "react-icons/fa";
import {
  Badge,
  Container,
  Dropdown,
  FormControl,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context/context";
import { AiFillDelete } from "react-icons/ai";
import Button from "@restart/ui/esm/Button";
//burdaki id falanda cartcontainerdfen gonderile spread ...item sekline olannan gelir

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = useGlobalContext();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping</Link>
        </Navbar.Brand>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            type="search"
            placeholder="Search a product..."
            className="m-auto"
            aria-label="Search"
            onChange={() =>
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              })
            }
          />
        </Navbar.Text>
        <Dropdown drop="start">
          <Dropdown.Toggle variant="success" align="end">
            <FaShoppingCart color="white" fontSize="25px" />
            <Badge bg="success">{cart.length}</Badge>
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              minWidth: 480,
              alignSelf: "flex-start",
              color: "white",
              backgroundColor: "black",
            }}
          >
            {cart.length > 0 ? (
              <>
                {cart.map((prod) => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span> ₹ {prod.price}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <Button style={{ width: "95%", margin: "0 10px" }}>
                    Go To Cart
                  </Button>
                </Link>
              </>
            ) : (
              <span
                style={{
                  padding: "10px",
                }}
              >
                Cart is Empty
              </span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
