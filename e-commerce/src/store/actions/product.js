import * as actionTypes from "./actionTypes";
import productdata from "../../products.json";

const setProductDetails = (product) => {
  return {
    type: actionTypes.GET_ACTIVE_PRODUCT,
    product,
  };
};

export const getActiveProductDetails = (productId) => async (dispatch) => {
  const searchedProductFromId = productdata.products.find(
    (product) => product.id === productId
  );
  return searchedProductFromId;
};

export const getSearchedProducts = (searchQuery) => async (dispatch) => {
  return productdata.products.filter(
    (product) =>
      product.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
  );
};

export const setActiveProductDetails = (product) => async (dispatch) => {
  return await dispatch(setProductDetails(product));
};
