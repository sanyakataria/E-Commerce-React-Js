import { Component } from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div className={classes.footer}>
        <nav>
          <ul className={classes.list}>
            <li>
              <Link to="/" className={classes.navItem}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.navItem}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.navItem}>
                Help
              </Link>
            </li>
            <li>
              <Link to="/" className={classes.navItem}>
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div className={classes.bottom}>&copy; Easy-Shop.</div>
      </div>
    );
  }
}

export default Footer;
