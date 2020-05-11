import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";
import * as actionTypes from "../../store/actions";

class Checkout extends Component {
  state = {
    cdataselected: false,
  };

  cancelHandler = () => {
    this.props.history.goBack();
  };

  successHandler = () => {
    this.setState({ cdataselected: true });
    this.props.history.replace("checkout/contact-data");
  };

  render() {
    return (
      <div>
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
            render={() => (
              <ContactData
                price={this.props.totalPrice}
                ingredients={this.props.ingredients}
              />
            )}
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
