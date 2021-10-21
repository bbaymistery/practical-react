const reducer = (state, action) => {
  switch (action.type) {
    case "ALERT_FOR_EMPTY_BOX": {
      return {
        ...state,
        alert: {
          show: true,
          msg: "Please write something",
          type: "danger",
        },
      };
    }

    case "ADD_PRODUCT":
      let id = Math.random().toString(36).slice(2);
      let inp = action.payload;
      inp.id = id;
      let newList = [...state.list, inp];
      return {
        ...state,
        list: newList,
        alert: {
          show: true,
          msg: "Item was addedd",
          type: "green",
        },
      };

    case "REMOVE_ALERT": {
      return {
        ...state,
        alert: {
          show: false,
          msg: "",
          type: "",
        },
      };
    }

    case "CALC_TOTAL": {
      return {
        ...state,
        total: state.list.reduce((acc, list) => {
          return acc + parseInt(list.amount);
        }, 0),
      };
    }

    case "CLEAR_ALL": {
      return {
        ...state,
        list: [],
        alert: {
          show: true,
          msg: "All items was deleted",
          type: "danger",
        },
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        list: state.list.filter((list) => list.id !== action.payload),
        alert: {
          show: true,
          msg: `You deleted ${
            state.list.find((list) => list.id === action.payload).value
          }`,
          type: "danger",
        },
      };
    }

    case "SHOW_EDIT_ITEMS": {
      const { value, amount, id } = action.payload;
      return {
        ...state,
        isEditing: true,
        editingValue: value,
        editingAmount: amount,
        editItemId: id,
      };
    }

    case "UPDATING_EDIT_VALUE": {
      const { value, amount, id } = action.payload;
      const newList = state.list.map((list) =>
        list.id === id ? { ...list, value: value, amount: amount } : list
      );
      console.log(newList);

      return {
        ...state,
        list: newList,
        alert: {
          show: true,
          msg: "Updated",
          type: "green",
        },
        isEditing: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
