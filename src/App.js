import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

import { authCheck } from "./store/actions";
import asyncComponent from "./hoc/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth");
});

const asyncLogout = asyncComponent(() => {
  return import("./containers/Auth/Logout");
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoAuthCheck();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" exact component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        {/* <Route component={() => <h1>404 page</h1>} /> */}
      </Switch>
    );

    if (this.props.isLoggedIn) {
      routes = (
        <Switch>
          <Route path="/orders" component={asyncOrders} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/logout" exact component={asyncLogout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route component={() => <h1>404 page</h1>} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Switch>{routes}</Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAutoAuthCheck: () => dispatch(authCheck()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
