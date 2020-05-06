import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button";
//import styles from "./ordersummary.module.css";

const OrderSummary = (props) => {
  const ing = Object.keys(props.ingredients).map((ig) => {
    return (
      <li key={ig}>
        <span style={{ textTransform: "capitalize" }}>{ig}: </span>
        {props.ingredients[ig]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients</p>
      <ul>{ing}</ul>
      <h5>Total Cost: $ {props.price.toFixed(2)}</h5>
      <p>Would you like to Checkout ?</p>
      <Button type="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
