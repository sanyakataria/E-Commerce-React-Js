import { Component } from "react";
import Summary from "../Summary/Summary";
import classes from "./PaymentOptions.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/shipping";
import { withRouter } from "react-router-dom";
class PaymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        paymentType: {
          value: "creditcard",
          valid: false,
        },
        cardNumber: {
          value: "",
          valid: false,
        },
        expiry: {
          value: "",
          valid: false,
        },
        cvv: {
          value: "",
          valid: false,
        },
        cardHolderName: {
          value: "",
          valid: false,
        },
      },
      formIsValid: false,
    };
  }

  onChangeHandler = (event) => {
    console.log("pnChage handler called");
    let key = event.target.name;
    let val = event.target.value;
    const myFormData = this.state.formData;
    let object = myFormData[key];
    object.value = val;
    console.log("key", key);
    console.log("value", val);
    switch (key) {
      case "paymentType":
        if (val === "paypal") {
          console.log("paypal");
          this.setState({
            formIsValid: true,
          });
        }
        if (val === "creditcard") {
          this.setState({
            formIsValid: false,
          });
        }
        break;
      case "cardNumber":
        if (val.length === 16) {
          object.valid = true;
        } else {
          object.valid = false;
        }
        break;
      case "expiry":
        let d = new Date();
        let currY = d.getFullYear();
        currY = parseInt(currY.toString().substring(2, 4));
        let currM = d.getMonth();
        let mon = val.substring(0, 2);
        let year = val.substring(3, 5);
        if ((year === currY && mon >= currM) || year >= currY) {
          object.valid = true;
        } else {
          object.valid = false;
        }
        break;
      case "cvv":
        if (val.length === 3) {
          object.valid = true;
        } else {
          object.valid = false;
        }
        break;
      case "cardHolderName":
        if (val !== "") {
          object.valid = true;
        } else {
          object.valid = false;
        }
        break;
      default:
        break;
    }
    console.log(object);
    myFormData[key] = object;
    this.setState({ formData: myFormData });

    if (
      !this.state.formIsValid &&
      this.state.formData.cardNumber.valid &&
      this.state.formData.expiry.valid &&
      this.state.formData.cvv.valid &&
      this.state.formData.cardHolderName.valid
    ) {
      this.setState({ formIsValid: true });
      console.log(this.state);
    }
    console.log(this.state);
  };

  routeToOrderSummary = () => {
    this.props.setPaymentData(this.state.formData);
    this.props.history.push("/order-placed");
  };

  render() {
    const { formData = {} } = this.state;
    const { paymentType = {} } = formData;
    return (
      <div className={classes.paymentoptions}>
        <div className={classes.payment}>
          <h2>Payment method</h2>
          <form>
            <div className={classes.container}>
              <input
                className={classes.creditcard}
                type="radio"
                id="creditcard"
                name="paymentType"
                value="creditcard"
                onClick={this.onChangeHandler}
                checked={paymentType.value === "creditcard"}
              ></input>
              <label>
                Credit Card <br />
                <input
                  className={classes.cardNumber}
                  type="text"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  onChange={this.onChangeHandler}
                  maxLength={16}
                ></input>
                <input
                  className={classes.cardDetail}
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  onChange={this.onChangeHandler}
                ></input>
                <input
                  className={classes.cardDetail}
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  maxLength="3"
                  onChange={this.onChangeHandler}
                ></input>
                <input
                  className={classes.cardHolder}
                  type="text"
                  name="cardHolderName"
                  placeholder="Card Holder Name"
                  onChange={this.onChangeHandler}
                ></input>
              </label>
            </div>
            <div className={classes.container}>
              <input
                className={classes.paypal}
                type="radio"
                id="paypal"
                name="paymentType"
                value="paypal"
                onClick={this.onChangeHandler}
                checked={paymentType.value === "paypal"}
              ></input>
              <label>Paypal</label>
            </div>
          </form>
        </div>
        <Summary />
        <div>
          <button
            onClick={this.routeToOrderSummary}
            className={classes.btn}
            disabled={!this.state.formIsValid}
          >
            Pay Now
          </button>

          <Link to="/cart/shipping">
            <button className={classes.btn}>Back</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPaymentData: bindActionCreators(actions.setPaymentDataInStore, dispatch),
  };
};

export const routedComponent = withRouter(PaymentOptions);
export default connect(mapStateToProps, mapDispatchToProps)(routedComponent);
