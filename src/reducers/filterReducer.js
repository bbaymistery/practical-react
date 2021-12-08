import {
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  GET_ALL_PRODUCTS_TOBE_FILTERED,
  UPDATE_SORT_VALUE,
  SORT_PRODUCTS_BY,
  SET_LOADING,
  CLEAR_FILTER,
} from "../actions";
import { formatPrice, getUniqueValues } from "../utils/helpers";
const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ALL_PRODUCTS_TOBE_FILTERED:
      let prices = getUniqueValues(action.payload, "price");
      prices = prices.slice(1, prices.length);
      let maxPrice = formatPrice(Math.max.apply(null, prices));
      let minPrice = formatPrice(Math.min.apply(null, prices));
      let maxPriceForRange = Math.max.apply(null, prices);
      let minPriceForRange = Math.min.apply(null, prices);
      return {
        ...state,
        allProducts: action.payload,
        sortedProducts: action.payload,
        loading: false,
        clearFields: false,
        filter: {
          minPrice: minPrice,
          maxPrice: maxPrice,
          //yuxardaki ikisi dollarnandi deye oonu range gatmmirix
          price: maxPriceForRange,
          maxPriceForRange,
          color: "all",
          category: "all",
          company: "all",
          freeShipping: false,
          searchQuery: "",
        },
      };

    case UPDATE_SORT_VALUE: {
      return {
        ...state,
        sort: action.payload,
      };
    }
    case SORT_PRODUCTS_BY: {
      const { sortedProducts, sort } = state;
      let tempProducts = [...sortedProducts];

      if (sort === "price-highest") {
        //by default sort by low price
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      } else if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => (a.name < b.name ? -1 : 1));
      } else if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => (a.name < b.name ? 1 : -1));
      }
      return {
        ...state,
        sortedProducts: tempProducts,
        loading: false,
      };
    }

    case UPDATE_FILTERS: {
      const { name, value } = action.payload;
      return {
        ...state,
        //eski filteri al icinde  uyusan varsa degisdir
        filter: { ...state.filter, [name]: value },
      };
    }
    //biz ana productsi yani all prodcutsi deyisib sortuda gonderik Ve gondedrilen productsnan da yuxarda sort islemi yapirik  Cunki ozunde filterlenen yani sorted prodcuts yazdirilir eger besdenedise besdenye gore sort a-z  ve ya highest pricee olunur
    case FILTER_PRODUCTS: {
      const {
        allProducts,
        filter: { searchQuery, company, category, color, shipping },
      } = state;

      let tempProducts = [...allProducts];

      //input values
      if (searchQuery) {
        tempProducts = tempProducts.filter((pr) => {
          return pr.name.toLowerCase().startsWith(searchQuery);
        });
      } else {
        tempProducts = [...state.allProducts];
      }

      //companies
      if (company !== "all") {
        tempProducts = tempProducts.filter((pr) => {
          return pr.company === company;
        });
      }

      if (category !== "all") {
        tempProducts = tempProducts.filter((pr) => {
          return pr.category === category;
        });
      }
      if (color !== "all") {
        tempProducts = tempProducts.filter((pr) => {
          return pr.colors.includes(color);
        });
      }
      if (shipping) {
        tempProducts = tempProducts.filter((pr) => pr.shipping === true);
      }

      return {
        ...state,
        sortedProducts: tempProducts,
      };
    }

    case CLEAR_FILTER: {
      return {
        ...state,
        clearFields: true,
        filter: {
          color: "all",
          category: "all",
          company: "all",
          freeShipping: false,
          searchQuery: "",

          // maxPriceForRange: state.filter.maxPriceForRange,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;

/*




*/
