import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case SET_STORIES: {
      let datas = action.payload;
      console.log(datas);

      return {
        ...state,
        stories: datas.hits,
        nbPages: datas.nbPages,
        loading: false,
      };
    }

    case HANDLE_PAGE:
      if (action.payload === "inc") {
        let nextPage = state.page + 1;
        if (nextPage > state.nbPages - 1) {
          nextPage = 0;
        }
        return { ...state, page: nextPage };
      }
      if (action.payload === "dec") {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1;
        }
        return { ...state, page: prevPage };
      }

    case HANDLE_SEARCH: {
      let query = action.payload;
      return { ...state, valueOfInput: query, page: 0 };
    }

    case REMOVE_STORY: {
      // let newStories = state.stories.filter((data) => {
      //   return data.objectID !== action.payload;
      // });
      return {
        ...state,
        stories: state.stories.filter(
          (story) => story.objectID !== action.payload
        ),
      };
    }
    case "ERROR": {
      throw new Error(`no mathching "${action.payload}" action type`);
    }

    default:
      return state;
  }
};
export default reducer;
