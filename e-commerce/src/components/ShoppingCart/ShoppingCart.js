import { Component } from "react";
import classes from "./ShoppingCart.module.css";
import Summary from "../Summary/Summary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/cart";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    const { cart } = this.props;
    this.state = {
      disabled: !cart?.items?.length,
    };
  }

  removeProductFromCart = (product) => {
    console.log("product", product);
    this.props.removeFromCart(product);
  };

  render() {
    const { cart } = this.props;

    return (
      <div className={classes.shoppingCart}>
        <div className={classes.shopping}>
          <h2>Shopping Cart</h2>
          <div>
            {cart.items &&
              cart.items.map((item) => (
                <div>
                  <div className={classes.product}>
                    <img
                      src={item.image}
                      alt={item.title}
                      height="150"
                      width="100"
                    ></img>
                    <div className={classes.title}>
                      <h3>{item.title}</h3>
                      <p>Rs. {item.price}</p>
                      <p>size : {item.size}</p>
                    </div>
                    <div className={classes.qtyDiv}>
                      <label for="quantity">Qty:</label>
                      <br />
                      <input
                        className={classes.quantity}
                        type="text"
                        name="quantity"
                        defaultValue={item.quantity}
                        readOnly
                      ></input>
                    </div>
                    <div>
                      <p>
                        Total <br /> price:
                      </p>
                      <p> {item.price * item.quantity}</p>
                    </div>
                    <button
                      className={classes.btnDel}
                      onClick={() => {
                        this.removeProductFromCart(item);
                      }}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Summary />
        <div className={classes.btnContainer}>
          <Link to="/cart/shipping">
            <button className={classes.btn} disabled={this.state.disabled}>
              Next
            </button>
          </Link>
          <Link to="/">
            <button className={classes.btn}>Cancel</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: bindActionCreators(actions.addToCart, dispatch),
    removeFromCart: bindActionCreators(actions.removeFromCart, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
