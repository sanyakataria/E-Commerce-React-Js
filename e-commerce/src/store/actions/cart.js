import * as actionTypes from "./actionTypes";

const addProductToCart = (product, size) => {
  product.quantity = 1;
  product.size = size;
  return {
    type: actionTypes.ADD_TO_CART,
    product,
  };
};

const removeProductFromCart = (product) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    product,
  };
};

// const changeProductQuantityInCart = (product, qty) => {
//   product.quantity = qty;
//   return {
//     type: actionTypes.CHANGE_QTY_IN_CART,
//     product,
//   };
// };

const applyPromoCodeToCart = (code) => {
  return {
    type: actionTypes.APPLY_PROMOCODE,
    code,
  };
};

const emptyCartinStore = () => {
  return {
    type: actionTypes.EMPTY_CART,
  };
};

export const addToCart = (product, size) => (dispatch) => {
  return dispatch(addProductToCart(product, size));
};

export const removeFromCart = (product) => (dispatch) => {
  return dispatch(removeProductFromCart(product));
};

// export const changeQtyInCart = (product, qty) => (dispatch) => {
//   return dispatch(changeProductQuantityInCart(product, qty));
// };
export const applyPromoCode = (code) => (dispatch) => {
  return dispatch(applyPromoCodeToCart(code));
};

export const emptyCart = () => (dispatch) => {
  return dispatch(emptyCartinStore());
};
