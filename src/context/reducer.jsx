const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // console.log(action.payload);
      // console.log({ ...action.payload, qty: 1 });
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };

    case "REMOVE_FROM_CART":
      console.log(state.cart.filter((c) => c.id !== action.payload.id));
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      //burda o anki degerini degisirik  false dusa true edirik
      return { ...state, byStock: !state.byStock };
    case "FILTER_BY_DELIVERY":
      return { ...state, byFastDelivery: !state.byFastDelivery };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return { byStock: false, byFastDelivery: false, byRating: 0 };
    default:
      return state;
  }
};
