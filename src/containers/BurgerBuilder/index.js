import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger";
import Controls from "../../components/Burger/Controls";
import Price from "../../components/Burger/Price";
import OrderButton from "../../components/Burger/OrderButton";
import OrderSummary from "../../components/Burger/OrderSummary";
import Modal from "../../components/UI/Modal";

const INGREDEINT_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9,
  meat: 1.5,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  updatePurchasable = (ingredients) => {
    const purchase = Object.keys(ingredients)
      .map((ig) => {
        return ingredients[ig];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: purchase > 0 });
  };

  addIngredientHandler = (type) => {
    const currentIngCount = this.state.ingredients[type];
    const updatedCount = currentIngCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const addedPrice = INGREDEINT_PRICE[type];
    const updatedPrice = this.state.totalPrice + addedPrice;
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const currentIngCount = this.state.ingredients[type];

    if (currentIngCount === 0) return;

    const updatedCount = currentIngCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceToBeDeducted = INGREDEINT_PRICE[type];
    const updatedPrice = this.state.totalPrice - priceToBeDeducted;
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchasable(updatedIngredients);
  };

  updatePurchasing = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  continueHandler = () => {
    console.log("continue");
  };

  render() {
    return (
      <Aux>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          <OrderSummary
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
            cancel={this.purchaseCancelHandler}
            continue={this.continueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <Price cost={this.state.totalPrice} />
        <Controls
          addIngredients={this.addIngredientHandler}
          removeIngredients={this.removeIngredientHandler}
        />
        <OrderButton
          ordered={this.updatePurchasing}
          buttonStatus={!this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
