import { Component } from "react";
import { Link } from "react-router-dom";
import Summary from "../Summary/Summary";
import classes from "./ShippingDetails.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/shipping";

class ShippingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: {
          value: "",
          valid: "",
        },
        lastName: {
          value: "",
          valid: "",
        },
        address: {
          value: "",
          valid: "",
        },
        address2: {
          value: "",
          valid: "",
        },
        country: {
          value: "",
          valid: "",
        },
        city: {
          value: "",
          valid: "",
        },
        zipCode: {
          value: "",
          valid: "",
        },
        phone: {
          value: "",
          valid: "",
        },
        delivery: {
          value: "",
          valid: "",
        },
      },
      formIsValid: false,
    };
  }

  onChangeHandler = (event) => {
    const {
      formData: {
        firstName,
        lastName,
        address,
        address2,
        city,
        country,
        zipCode,
        phone,
        delivery,
      },
    } = this.state || {};
    let key = event.target.name;
    let val = event.target.value;
    const myFormData = this.state.formData;
    let object = myFormData[key];
    object.value = val;
    if (key === "phone") {
      if (val.length === 10) {
        object.valid = true;
      } else {
        object.valid = false;
      }
    } else if (val !== "") {
      object.valid = true;
    } else {
      object.valid = false;
    }

    myFormData[key] = object;
    this.setState({ formData: myFormData });

    if (
      firstName.valid &&
      lastName.valid &&
      address.valid &&
      address2.valid &&
      city.valid &&
      country.valid &&
      zipCode.valid &&
      phone.valid &&
      delivery.valid
    ) {
      this.setState({ formIsValid: true });

      this.props.setShippingData(this.state.formData);
      console.log("lne 79", this.state);
    } else {
      this.setState({ formIsValid: false });
    }
    console.log(this.state);
  };

  render() {
    return (
      <div className={classes.shippingdetails}>
        <div className={classes.shipping}>
          <h2>Shipping Details</h2>
          <form>
            <div className={classes.details}>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={this.onChangeHandler}
              ></input>
              <input
                className={classes.leftMargin}
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={this.onChangeHandler}
              ></input>
            </div>
            <div className={classes.details}>
              <input
                className={classes.address}
                type="text"
                placeholder="Address line 1"
                name="address"
                onChange={this.onChangeHandler}
              ></input>
            </div>
            <div className={classes.details}>
              <input
                className={classes.address}
                type="text"
                placeholder="Address line 2"
                name="address2"
                onChange={this.onChangeHandler}
              ></input>
            </div>
            <div className={classes.details}>
              <input
                type="text"
                placeholder="Country"
                name="country"
                onChange={this.onChangeHandler}
              ></input>
              <input
                className={classes.leftMargin}
                type="text"
                placeholder="City"
                name="city"
                onChange={this.onChangeHandler}
              ></input>
            </div>
            <div className={classes.details}>
              <input
                type="type"
                placeholder="Zip/Postal Code"
                name="zipCode"
                maxLength={6}
                onChange={this.onChangeHandler}
              ></input>
              <input
                className={classes.leftMargin}
                type="tel"
                placeholder="Phone number"
                name="phone"
                maxLength={10}
                onChange={this.onChangeHandler}
              ></input>
            </div>
            <div className={classes.delivery}>
              <div className={classes.deliveryType}>
                <input
                  type="radio"
                  id="free"
                  name="delivery"
                  onChange={this.onChangeHandler}
                ></input>
                <label>Free shipping</label>
              </div>
              <div className={classes.deliveryType}>
                <input
                  type="radio"
                  id="next-day"
                  name="delivery"
                  onChange={this.onChangeHandler}
                ></input>
                <label>Next day delivery</label>
              </div>
            </div>
          </form>
        </div>
        <Summary />
        <div>
          <Link to="/cart/payment">
            <button className={classes.btn} disabled={!this.state.formIsValid}>
              Next
            </button>
          </Link>
          <Link to="/cart/shopping-cart">
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
    setShippingData: bindActionCreators(
      actions.setShippingDataInStore,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingDetails);
