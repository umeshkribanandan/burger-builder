import React from "react";

import Burger from "../../Burger";
import Button from "../../UI/Button";

import styles from "./checkoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={styles.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.success}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
