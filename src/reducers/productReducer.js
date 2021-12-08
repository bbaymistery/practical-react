import {
  IS_SIDEBAR_OPEN,
  GET_PRODUCTS,
  SET_LOADING,
  GET_SINGLE_PRODUCT,
  SET_SINGLE_PRODUCT_LOADING,
} from "../actions";
//
// GET_SINGLE_PRODUCT = "GET_
const reducer = (state, action) => {
  switch (action.type) {
    case IS_SIDEBAR_OPEN:
      let value = action.payload;
      return {
        ...state,
        isSideBarOpen: value === "open" ? true : false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS:
      let featuredRooms = action.payload.filter((room) => {
        return room.featured;
      });
      // eger apiden gelen urunler garsig olsaydi burda aykliyib formatData() ile sonra riooomsa yapisdirasiydik
      return {
        ...state,
        featuredRooms,
        rooms: action.payload,
        loading: false,
      };
    case SET_SINGLE_PRODUCT_LOADING:
      return {
        ...state,
        loadingSingleProduct: true,
      };
    case GET_SINGLE_PRODUCT:
      // console.log(action.payload);
      const formatData = (items) => {
        //desctructng directly
        let {
          price,
          id,
          name,
          filename,
          category,
          company,
          colors,
          featured,
          stars,
          reviews,
          description,
          shipping,
          stock,
        } = items;

        //desxtructing images smla medium and url
        let images = items.images.map((img) => {
          let { small, large } = img.thumbnails;
          let { id, filename, url } = img;
          let newImg = {
            small,
            large,
            id,
            filename,
            url,
          };

          return newImg;
        });

        //creating new con value for singleproduc state
        const newValue = {
          name,
          id,
          filename,
          category,
          company,
          colors,
          featured,
          stars,
          reviews,
          description,
          shipping,
          stock,
          images,
          price,
        };
        return newValue;
      };

      let values = formatData(action.payload);

      return {
        ...state,
        singleProduct: values,
        loadingSingleProduct: false,
      };
    default:
      return state;
  }
};

export default reducer;
// IS_SIDE_BAR_OPEN;
