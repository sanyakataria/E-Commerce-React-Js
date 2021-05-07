import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cart: {
    items: [],
    promocode: "",
  },
};

function addToCart(state, action) {
  console.log("action in cart reducer" + action);
  const cart = JSON.parse(JSON.stringify(state.cart));
  const { items } = cart;
  const { product } = action;
  console.log("product in cart reducer" + product.size);
  const existingProduct = items.find(
    (p) => p.id === product.id && p.size === product.size
  );
  let subTotal = cart.subTotal || 0;
  if (existingProduct) {
    items.forEach((p) => {
      if (p.id === product.id) {
        p.quantity = p.quantity + 1;
      }
      subTotal += p.price;
      return p;
    });
  } else {
    items.push(product);
    subTotal += product.price;
  }
  cart.items = items;
  cart.subTotal = subTotal;
  cart.taxes = subTotal * 0.18;
  cart.totalPrice = cart.taxes + cart.subTotal;
  localStorage.setItem("cart", JSON.stringify(cart));
  return {
    ...state,
    cart: cart,
  };
}

function removeFromCart(state, action) {
  const cart = JSON.parse(JSON.stringify(state.cart));
  const { items } = cart;
  const { product } = action;
  let subTotal = 0;
  // const existingProduct = items.find(p => p.id === product.id);
  const index = items.findIndex((p) => p.id === product.id);
  console.log("index", index);
  if (index > -1) {
    items.splice(index, 1);
  }

  items.forEach((p) => {
    subTotal += p.quantity * p.price;
    return p;
  });

  cart.items = items;
  cart.subTotal = subTotal;
  cart.taxes = subTotal * 0.18;
  cart.totalPrice = cart.taxes + cart.subTotal;
  localStorage.setItem("cart", JSON.stringify(cart));
  return {
    ...state,
    cart: cart,
  };
}

function applyPromoToCart(state, action) {
  const cart = JSON.parse(JSON.stringify(state.cart));
  const { items } = cart;
  const { code } = action;
  let subTotal = cart.subTotal;

  cart.subTotal = subTotal * 0.9;
  cart.items = items;
  cart.taxes = subTotal * 0.18;
  cart.totalPrice = cart.taxes + cart.subTotal;
  cart.promocode = code;
  localStorage.setItem("cart", JSON.stringify(cart));
  return {
    ...state,
    cart: cart,
  };
}

function setCartData(state, action) {
  return {
    ...state,
    cart: action.cart,
  };
}

function emptyCart(state, action) {
  localStorage.removeItem("cart");
  return {
    ...state,
    cart: {
      items: [],
      subTotal: "",
      taxes: "",
      totalPrice: "",
      promocode: "",
    },
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case actionTypes.SET_CART:
      return setCartData(state, action);
    case actionTypes.APPLY_PROMOCODE:
      return applyPromoToCart(state, action);
    case actionTypes.EMPTY_CART:
      return emptyCart(state, action);
    default:
      return state;
  }
};

export default reducer;
