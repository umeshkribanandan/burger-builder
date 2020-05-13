import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger";
import Controls from "../../components/Burger/Controls";
import Price from "../../components/Burger/Price";
import OrderButton from "../../components/Burger/OrderButton";
import OrderSummary from "../../components/Burger/OrderSummary";
import Modal from "../../components/UI/Modal";
import Spinner from "../../components/UI/Spinner";
import axiosOrders from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler";
import {
  addIngredient,
  removeIngredient,
  initIngredient,
} from "../../store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  updatePurchasable = () => {
    if (!this.props.ingredients) return false;
    const purchase = Object.keys(this.props.ingredients)
      .map((ig) => {
        return this.props.ingredients[ig];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return purchase > 0;
  };

  // addIngredientHandler = (type) => {
  // const currentIngCount = this.state.ingredients[type];
  // const updatedCount = currentIngCount + 1;
  // const updatedIngredients = {
  //   ...this.state.ingredients,
  // };
  // updatedIngredients[type] = updatedCount;
  // const addedPrice = INGREDEINT_PRICE[type];
  // const updatedPrice = this.state.totalPrice + addedPrice;
  // this.setState({
  //   totalPrice: updatedPrice,
  //   ingredients: updatedIngredients,
  // });
  //   this.props.onAddIngredient(type);
  //   this.updatePurchasable();
  // };

  // removeIngredientHandler = (type) => {
  // const currentIngCount = this.state.ingredients[type];

  // if (currentIngCount === 0) return;

  // const updatedCount = currentIngCount - 1;
  // const updatedIngredients = {
  //   ...this.state.ingredients,
  // };
  // updatedIngredients[type] = updatedCount;
  // const priceToBeDeducted = INGREDEINT_PRICE[type];
  // const updatedPrice = this.state.totalPrice - priceToBeDeducted;
  // this.setState({
  //   totalPrice: updatedPrice,
  //   ingredients: updatedIngredients,
  // });
  //   this.props.onRemoveIngredient(type);
  //   this.updatePurchasable();
  // };

  componentWillMount() {
    this.props.onInitIngredient();
    // axiosOrders
    //   .get("/ingredients.json")
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchasing = () => {
    if (!this.props.userId) {
      this.props.history.push("/auth");
    } else {
      this.setState({ purchasing: true });
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  continueHandler = () => {
    this.setState({ loading: true });
    this.props.history.push("/checkout");
  };

  render() {
    let orderSummary = "";

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          ingredients={this.props.ingredients}
          cancel={this.purchaseCancelHandler}
          continue={this.continueHandler}
        />
      );
    }

    let mainSection = (
      <div>
        <Burger ingredients={this.props.ingredients} />
        <Price cost={this.props.totalPrice} />
        <Controls
          addIngredients={this.props.onAddIngredient}
          removeIngredients={this.props.onRemoveIngredient}
        />
        <OrderButton
          isLoggedIn={this.props.userId}
          ordered={this.updatePurchasing}
          buttonStatus={!this.updatePurchasable()}
        />
      </div>
    );
    if (!this.props.ingredients && !this.props.error) {
      mainSection = <Spinner />;
    }
    if (this.props.error) {
      mainSection = <p>Ingredients is not loading .... </p>;
    }

    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {mainSection}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingre.ingredients,
    totalPrice: state.ingre.totalPrice,
    error: state.ingre.error,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (type) => dispatch(addIngredient(type)),
    onRemoveIngredient: (type) => dispatch(removeIngredient(type)),
    onInitIngredient: () => dispatch(initIngredient()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
