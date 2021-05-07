import * as actionTypes from "../actions/actionTypes";

const initialState = {
  activeProduct: {},
};

function setActiveProduct(state, action) {
  return {
    ...state,
    activeProduct: action.activeProduct,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_PRODUCT:
      return setActiveProduct(state, action);
    default:
      return state;
  }
};

export default reducer;
