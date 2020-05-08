import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    totalPrice: 0,
    cdataselected: false,
  };

  componentDidMount() {
    const igSearchParams = new URLSearchParams(this.props.location.search);
    let tempIng = {};
    let tempPrice = 0;
    for (const [key, value] of igSearchParams.entries()) {
      if (key === "price") {
        tempPrice = +value;
      } else {
        tempIng[key] = +value;
      }
    }
    console.log(tempIng);
    this.setState({ ingredients: tempIng, totalPrice: tempPrice });
  }

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
            ingredients={this.state.ingredients}
          />
        ) : null}
        {this.state.cdataselected ? (
          <Route
            path={this.props.match.path + "/contact-data"}
            render={() => (
              <ContactData
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
              />
            )}
          />
        ) : null}
      </div>
    );
  }
}

export default Checkout;
