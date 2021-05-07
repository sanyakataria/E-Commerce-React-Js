import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import productReducer from "./store/reducers/product";
import cartReducer from "./store/reducers/cart";
import shippingDetailReducer from "./store/reducers/shipping";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  shipping: shippingDetailReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const loadState = async (store) => {
  try {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      const decoded = JSON.parse(cartItems);
      if (decoded?.items?.length) {
        store.dispatch({
          type: "SET_CART",
          cart: decoded,
        });
      }
    }
  } catch (e) {
    return undefined;
  }
};

loadState(store);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
