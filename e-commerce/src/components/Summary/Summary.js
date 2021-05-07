import { Component, createRef } from "react";
import classes from "./Summary.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/cart";
class Summary extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }

  applyPromo = () => {
    const code = this.inputRef.current.value;
    console.log("applyPromo called");

    if (code.toLowerCase() === "bootcamp2021") {
      this.props.applyPromo(code);
    }
  };

  render() {
    const { cart = {} } = this.props;
    return (
      <div>
        <div className={classes.summary}>
          <h2>Summary</h2>
          <input
            className={classes.coupon}
            ref={this.inputRef}
            placeholder="Enter coupon Code"
            defaultValue={cart.promocode}
          ></input>
          <button
            className={classes.btn}
            onClick={this.applyPromo}
            disabled={cart.promocode === "bootcamp2021"}
          >
            Apply
          </button>
          <hr />
          <div className={classes.summaryDetails}>
            <p>SubTotal</p>
            <p>Rs. {cart?.subTotal?.toFixed(2)}</p>
          </div>
          <div className={classes.summaryDetails}>
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className={classes.summaryDetails}>
            <p>Taxes</p>
            <p>Rs. {cart?.taxes?.toFixed(2)}</p>
          </div>
          {cart?.promocode?.toLowerCase() === "bootcamp2021" && (
            <div className={classes.summaryDetails}>
              <p>Discount</p>
              <p>Rs. {(cart?.subTotal * 0.1).toFixed(2)}</p>
            </div>
          )}
          <div className={classes.summaryDetails}>
            <h3>Total</h3>
            <p>Rs. {cart?.totalPrice?.toFixed(2)}</p>
          </div>
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
    applyPromo: bindActionCreators(actions.applyPromoCode, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
