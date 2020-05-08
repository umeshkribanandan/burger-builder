import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/order" exact component={() => <h1>Order</h1>} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route component={() => <h1>404 page</h1>} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
