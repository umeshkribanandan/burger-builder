import React from "react";

import styles from "./controls.module.css";
import Control from "./Control";

const ctrls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];
const Controls = (props) => {
  return (
    <div className={styles.Controls}>
      {ctrls.map((c) => {
        return (
          <Control
            key={c.type}
            label={c.label}
            more={() => props.addIngredients(c.type)}
            less={() => props.removeIngredients(c.type)}
          />
        );
      })}
    </div>
  );
};

export default Controls;
