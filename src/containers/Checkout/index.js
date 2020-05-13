import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";
import { purchaseInit } from "../../store/actions";
class Checkout extends Component {
  state = {
    cdataselected: false,
  };

  componentDidMount() {
    this.props.onPurchaseInit();
  }

  cancelHandler = () => {
    this.props.history.push("/");
  };

  successHandler = () => {
    this.setState({ cdataselected: true });
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    console.log(this.props.ingredients);
    return (
      <div>
        {!this.props.ingredients && <Redirect to="/" />}
        {!this.state.cdataselected ? (
          <CheckoutSummary
            cancel={this.cancelHandler}
            success={this.successHandler}
            ingredients={this.props.ingredients}
          />
        ) : null}
        {this.state.cdataselected ? (
          <Route
            path={this.props.match.path + "/contact-data"}
            render={() => <ContactData />}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingre.ingredients,
    totalPrice: state.ingre.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseInit: () => {
      dispatch(purchaseInit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
