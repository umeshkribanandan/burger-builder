import React from "react";
import styles from "./button.module.css";

const Button = (props) => (
  <button
    className={[styles.Button, styles[props.type]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
