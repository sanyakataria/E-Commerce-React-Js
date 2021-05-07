import { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";
import { connect } from "react-redux";

class NavigationBar extends Component {
  render() {
    console.log(this.props);
    return (
      <div className={classes.navbar}>
        <ul className={classes.navList}>
          <li className={classes.listItem}>
            <Link to="/" className={classes.navItem}>
              Home
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/" className={classes.navItem}>
              Shop
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/" className={classes.navItem}>
              Help
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/" className={classes.navItem}>
              About
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/cart/shopping-cart" className={classes.cartBtn}>
              <button className={classes.btn}>
                <i className="fa fa-shopping-cart">&nbsp;</i>Your Cart (
                {this.props.cart.items.length})
              </button>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default connect(mapStateToProps)(NavigationBar);
