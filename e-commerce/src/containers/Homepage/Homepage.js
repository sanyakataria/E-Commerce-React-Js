import { Component } from "react";
import Tagline from "../../components/Tagline/Tagline";
import Products from "../../components/Products/Products";
import productdata from "../../products.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions/product";
import { debounce } from "debounce";
import axios from "axios";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      size: "",
    };
  }

  onProductSearch = debounce(async (query) => {
    const { getSearchedProducts } = this.props;

    const products = await getSearchedProducts(query);
    this.setState({ products: products });
  }, 500);

  componentDidMount() {
    axios
      .get(`https://60927ccf85ff510017212ebe.mockapi.io/products`)
      .then((res) => {
        console.log("api request", res.data);
        this.setState({ products: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Tagline onProductSearch={this.onProductSearch} />
        <main>
          <Products products={this.state.products} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchedProducts: bindActionCreators(
      actions.getSearchedProducts,
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
