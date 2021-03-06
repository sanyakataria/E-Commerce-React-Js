import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Component } from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";
import Homepage from "./containers/Homepage/Homepage";
import ProductDescription from "./containers/ProductDescription/ProductDescription";
import Cart from "./containers/Cart/Cart";
import OrderPlaced from "./containers/OrderPlaced/OrderPlaced";
import About from './components/About/About';
import Help from './components/Help/Help';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route path="/details/:id" component={ProductDescription} />
          <Route path="/order-placed" component={OrderPlaced} />
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={About} />
          <Route path="/help" component={Help} />
          <Route path="/" component={Homepage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
