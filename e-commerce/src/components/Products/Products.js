import { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Products.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/cart";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: "",
    };
  }

  handleChange(e) {
    console.log("Fruit Selected!!");
    this.setState({ size: e.target.value });
  }

  addToCart = (product, size) => {
    this.props.addToCart(product, size);
  };

  render() {
    return (
      <div>
        <h1 className={classes.heading}>Product Listings</h1>
        <div className={classes.products}>
          {this.props.products.map((product) => (
            <div className={classes.product} key={product.id}>
              <div className={classes.imgContainer}>
                <img
                  className={classes.img}
                  src={product.image}
                  alt={product.title}
                  width="150px"
                  height="200px"
                />
                <button
                  className={classes.btn}
                  onClick={() => {
                    this.addToCart(product, this.state.size);
                  }}
                >
                  Add to Cart
                </button>
              </div>

              <Link to={`/details/${product.id}`} className={classes.details}>
                <div className={classes.description}>
                  <div className={classes.title}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>&#9733;&#9733;&#9733; &#9734; &#9734; &nbsp;</p>
                  </div>
                  <div>
                    <p>Rs. {product.price}</p>
                    <label>Sizes : </label>
                  </div>
                </div>
              </Link>
              <select
                className={classes.sizeDropdown}
                name="size"
                id="size"
                onChange={(event) => {
                  this.handleChange(event);
                }}
              >
                {product?.sizes?.map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </select>
            </div>
          ))}
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
    addToCart: bindActionCreators(actions.addToCart, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
