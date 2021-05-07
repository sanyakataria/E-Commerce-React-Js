import { Component } from "react";
import classes from "./ProductDescription.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/product";
import * as actionsCart from "../../store/actions/cart";
import { withRouter } from "react-router-dom";

class ProductDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProduct: {},
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

  async componentDidMount() {
    const product = await this.props.getActiveProductDetails(
      this.props.match.params.id
    );
    if (product) {
      this.setState({ activeProduct: product });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    const { activeProduct } = this.state;
    console.log(activeProduct.availableSizes);
    return activeProduct ? (
      <div>
        <div className={classes.productContainer}>
          <img
            className={classes.img}
            src={activeProduct.image}
            alt={activeProduct.title}
            width="300"
            height="350"
          ></img>
          <div className={classes.description}>
            <h2>{activeProduct.title}</h2>
            <span>&#9733;&#9733;&#9733; &#9734; &#9734; &nbsp;</span>
            <span className={classes.smallFont}>
              {activeProduct?.reviewDesc?.length} Reviews
            </span>
            <hr />
            <div>
              <span className={classes.price}>Rs. {activeProduct.price}</span>
              <label>Sizes : </label>
              <select
                name="size"
                id="size"
                onChange={(event) => {
                  this.handleChange(event);
                }}
              >
                {activeProduct?.sizes?.map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </select>
            </div>
            <hr />
            <p>{activeProduct.description}</p>
<p className={classes.gray}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
            <button
              className={classes.btn}
              onClick={() => {
                this.addToCart(activeProduct, this.state.size);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className={classes.review}>
          <h2>Reviews</h2>

          {activeProduct.reviewDesc &&
            activeProduct.reviewDesc.map((r) => (
              <div className={classes.reviewDesc}>
                <i className="fa fa-smile-o"></i>
                <div>
                  <span>{r.name}</span>
                  <br />
                  <span>&#9733;&#9733;&#9733; &#9734; &#9734; &nbsp;</span>
                  <br />
                  <span className={classes.smallFont}>{r.date}</span>
                </div>
                <div className={classes.revDesc}>{r.rev}</div>
              </div>
            ))}
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    aciveProduct: state.product.activeProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveProductDetails: bindActionCreators(
      actions.getActiveProductDetails,
      dispatch
    ),
    addToCart: bindActionCreators(actionsCart.addToCart, dispatch),
  };
};
export const routedComponent = withRouter(ProductDescription);
export default connect(mapStateToProps, mapDispatchToProps)(routedComponent);
