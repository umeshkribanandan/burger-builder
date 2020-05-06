import React from "react";
import styles from "./price.module.css";

const Price = (props) => {
  return <div className={styles.Price}> $ {props.cost.toFixed(2)}</div>;
};

export default Price;
