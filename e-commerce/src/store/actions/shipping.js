import * as actionTypes from "./actionTypes";

const setShippingData = (data) => {
  return {
    type: actionTypes.SET_SHIPPING_DATA,
    data,
  };
};

const setPaymentData = (data) => {
  return {
    type: actionTypes.SET_PAYMENT_DATA,
    data,
  };
};

const emptyShippingPaymentData = (data) => {
  return {
    type: actionTypes.EMPTY_SHIPPING_PAYMENT_DATA,
    data,
  };
};

export const setShippingDataInStore = (data) => (dispatch) => {
  return dispatch(setShippingData(data));
};

export const setPaymentDataInStore = (data) => (dispatch) => {
  return dispatch(setPaymentData(data));
};

export const emptyDataInStore = (data) => (dispatch) => {
  return dispatch(emptyShippingPaymentData(data));
};
