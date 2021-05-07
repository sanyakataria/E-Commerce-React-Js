import * as actionTypes from "../actions/actionTypes";

const initialState = {
  shippingDetails: {},
  paymentData: {},
};

function setShippingDetails(state, action) {
  return {
    ...state,
    shippingDetails: action.data,
  };
}

function setPaymentData(state, action) {
  return {
    ...state,
    paymentData: action.data,
  };
}

function emptyShippingPaymentData(state, action) {
  return {
    ...state,
    shippingDetails: {},
    paymentData: {},
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SHIPPING_DATA:
      return setShippingDetails(state, action);
    case actionTypes.SET_PAYMENT_DATA:
      return setPaymentData(state, action);
    case actionTypes.EMPTY_SHIPPING_PAYMENT_DATA:
      return emptyShippingPaymentData(state, action);
    default:
      return state;
  }
};

export default reducer;
