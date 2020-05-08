import React from "react";

import styles from "./order.module.css";

const Order = (props) => {
  const igts = Object.keys(props.ingredients).map((ig) => {
    return (
      <span
        style={{
          border: "1px solid black",
          padding: "2px",
          margin: "2px 5px",
          textTransform: "capitalize",
        }}
        key={ig}
      >
        <span>{ig}</span>({props.ingredients[ig]})
      </span>
    );
  });

  return (
    <div className={styles.Order}>
      <p>
        Ingredients:
        {igts}
      </p>
      <p>
        Price : <strong> $ {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
