import { Component } from "react";
import { Link, Route } from "react-router-dom";
import classes from "./Cart.module.css";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import ShippingDetails from "../../components/ShippingDetails/ShippingDetails";
import PaymentOptions from "../../components/PaymentOptions/PaymentOptions";

class Cart extends Component {
  render() {
    return (
      <div>
        <div className={classes.nav}>
          <Link to="/cart/shopping-cart" className={classes.shopping}>
            <p className={classes.navItem}>
              1.
              <br /> Shopping Cart
            </p>
          </Link>
          <p className={classes.navItem}>
            2.
            <br /> Shipping Details
          </p>
          <p className={classes.navItem}>
            3.
            <br /> Payment Options
          </p>
        </div>

        <Route path="/cart/shipping" component={ShippingDetails} />
        <Route path="/cart/payment" component={PaymentOptions} />
        <Route path="/cart/shopping-cart" component={ShoppingCart} />
      </div>
    );
  }
}

export default Cart;
