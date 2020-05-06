import React from "react";
import styles from "./orderbutton.module.css";

const OrderButton = (props) => {
  return (
    <button
      onClick={props.ordered}
      disabled={props.buttonStatus}
      className={styles.OrderButton}
    >
      Order
    </button>
  );
};

export default OrderButton;
