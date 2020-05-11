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
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  updatePurchasable = () => {
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
  //   // const currentIngCount = this.state.ingredients[type];
  //   // const updatedCount = currentIngCount + 1;
  //   // const updatedIngredients = {
  //   //   ...this.state.ingredients,
  //   // };
  //   // updatedIngredients[type] = updatedCount;
  //   // const addedPrice = INGREDEINT_PRICE[type];
  //   // const updatedPrice = this.state.totalPrice + addedPrice;
  //   // this.setState({
  //   //   totalPrice: updatedPrice,
  //   //   ingredients: updatedIngredients,
  //   // });
  //   this.props.onAddIngredient(type);
  //   this.updatePurchasable();
  // };

  // removeIngredientHandler = (type) => {
  //   // const currentIngCount = this.state.ingredients[type];

  //   // if (currentIngCount === 0) return;

  //   // const updatedCount = currentIngCount - 1;
  //   // const updatedIngredients = {
  //   //   ...this.state.ingredients,
  //   // };
  //   // updatedIngredients[type] = updatedCount;
  //   // const priceToBeDeducted = INGREDEINT_PRICE[type];
  //   // const updatedPrice = this.state.totalPrice - priceToBeDeducted;
  //   // this.setState({
  //   //   totalPrice: updatedPrice,
  //   //   ingredients: updatedIngredients,
  //   // });
  //   this.props.onRemoveIngredient(type);
  //   this.updatePurchasable();
  // };

  componentDidMount() {
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
    this.setState({ purchasing: true });
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
          ordered={this.updatePurchasing}
          buttonStatus={!this.updatePurchasable()}
        />
      </div>
    );
    if (!this.props.ingredients && !this.state.error) {
      mainSection = <Spinner />;
    }
    if (this.state.error) {
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (type) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, payload: type }),
    onRemoveIngredient: (type) =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: type }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrders));
