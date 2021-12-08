import {
  ADD_PRODUCT_TO_CART,
  CLEAR_SHOPPING,
  COUNT_CART_TOTALS,
  DELETE_PRODUCT_FROM_CART,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";
import Cart from "../components/CartContainer/MainCart";

const reducer = (state, action) => {
  switch (action.type) {
    //eynidirse eyni olani alb degisiklik edib sonra cartlarin icine ekliyrik
    case ADD_PRODUCT_TO_CART:
      let newCartItems = [];

      //idColoru yaratdggki eynisi yuklenende o idColora gore tapb miktarlarini ona gore degismek
      const { idColor, amount } = action.payload;

      newCartItems = [...state.addedCartItems, action.payload];
      let tempItem = state.addedCartItems.find(
        (item) => item.idColor === idColor
      );

      if (tempItem) {
        newCartItems = state.addedCartItems.map((item) => {
          if (item.idColor === idColor) {
            return { ...item, amount: amount };
          } else {
            return item;
          }
        });
        return {
          ...state,
          addedCartItems: newCartItems,
        };
      } else {
        return { ...state, addedCartItems: newCartItems };
      }

    case DELETE_PRODUCT_FROM_CART:
      let tempCartItems = state.addedCartItems.filter((pr) => {
        return pr.idColor !== action.payload.idColor;
      });
      console.log(tempCartItems);
      console.log(state.addedCartItems);

      return {
        ...state,
        addedCartItems: tempCartItems,
      };

    case CLEAR_SHOPPING:
      return {
        ...state,
        addedCartItems: [],
      };

    case TOGGLE_CART_ITEM_AMOUNT: {
      // console.log(action.payload);
      // console.log(state.addedCartItems);

      let tempCart = state.addedCartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            let newAmount = cartItem.amount + 1;
            // Eger artirdigimizda amount Stock degerinnen boyukse  stock degerini veriyoruz

            if (newAmount > cartItem.maxAmount) {
              newAmount = cartItem.maxAmount;
            }
            return { ...cartItem, amount: newAmount };
          }
          if (action.payload.type === "desc") {
            let newAmount = cartItem.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...cartItem, amount: newAmount };
          }
        }
        return cartItem;
      });

      return {
        ...state,
        addedCartItems: tempCart,
      };
    }
    case COUNT_CART_TOTALS: {
      let { total, amount } = state.addedCartItems.reduce(
        (cartTotal, cartItem) => {
          const { amount, price } = cartItem;
          const itemTotal = amount * price;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      return {
        ...state,
        toralPrice: total,
        amount: amount,
      };
    }
    default:
      return state;
  }
};

export default reducer;
