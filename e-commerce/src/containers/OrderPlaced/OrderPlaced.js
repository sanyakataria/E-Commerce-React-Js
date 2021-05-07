import { Component } from "react";
import classes from "./OrderPlaced.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../store/actions/cart";
import * as shippingActions from "../../store/actions/shipping";
import { withRouter } from "react-router-dom";

class OrderPlaced extends Component {
  continueShoppping = () => {
    this.props.emptyCart();
    this.props.emptyDataInStore();
    this.props.history.push("/");
  };

  render() {
    console.log("this.props line 8 orderPace", JSON.stringify(this.props));

    const { cart, shipping } = this.props;
    const { shippingDetails, paymentData } = shipping;
    return (
      <div className={classes.order}>
        <h1>Your order has been Placed !</h1>
        <i className="fa fa-smile-o"></i>
        <br />
        <button className={classes.btn} onClick={this.continueShoppping}>
          Continue Shopping
        </button>
        <div className={classes.shopping}>
          <h2>Products</h2>
          <div>
            {cart.items &&
              cart.items.map((item) => (
                <div className={classes.product}>
                  <img
                    src={item.image}
                    alt={item.title}
                    height="150"
                    width="100"
                    className={classes.img}
                  ></img>
                  <div>
                    <h3>{item.title}</h3>
                    <p>Rs. {item.price}</p>
                    <p>size : {item.size}</p>
                  </div>
                  <div className={classes.qtyDiv}>
                    <label for="quantity">Qty:</label>
                    <br />
                    <input
                      className={classes.quantityValue}
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
                </div>
              ))}
          </div>
        </div>
        <div className={classes.shipping}>
          <h2>Shipping Details</h2>
          <div>
            <div className={classes.details}>
              <label> First Name : </label>
              <span>{shippingDetails?.firstName?.value}</span>
            </div>
            <div className={classes.details}>
              <label> Last Name : </label>
              <span>{shippingDetails?.lastName?.value}</span>
            </div>
            <div className={classes.details}>
              <label> Address Line 1 : </label>
              <span>{shippingDetails?.address?.value}</span>
            </div>
            <div className={classes.details}>
              <label> Address Line 2 : </label>
              <span>{shippingDetails?.address2?.value}</span>
            </div>
            <div className={classes.details}>
              <label> Country : </label>
              <span>{shippingDetails?.country?.value}</span>
            </div>
            <div className={classes.details}>
              <label> City : </label>
              <span>{shippingDetails?.city?.value}</span>
            </div>
            <div className={classes.details}>
              <label> ZipCode : </label>
              <span>{shippingDetails?.zipCode?.value}</span>
            </div>
            <div className={classes.details}>
              <label> Phone : </label>
              <span>{shippingDetails?.phone?.value}</span>
            </div>
          </div>
        </div>

        <div>
          <h2>Payment Details</h2>
          <div>
            <div> Payment Mode: </div>
            <div className={classes.payment}>
              {paymentData?.paymentType?.value}
            </div>
          </div>
          {console.log(paymentData.paymentType)}
          {paymentData?.cardNumber?.value && <span> Card Number : </span>}
          <span>{paymentData?.cardNumber?.value}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    shipping: state.shipping,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    emptyCart: bindActionCreators(cartActions.emptyCart, dispatch),
    emptyDataInStore: bindActionCreators(
      shippingActions.emptyDataInStore,
      dispatch
    ),
  };
};

export const routedComponent = withRouter(OrderPlaced);
export default connect(mapStateToProps, mapDispatchToProps)(routedComponent);
