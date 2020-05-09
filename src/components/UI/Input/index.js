import React from "react";
import styles from "./input.module.css";

const Input = (props) => {
  let inputElement = null;
  let errorMessage = null;
  let classess = [styles.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    classess.push(styles.Error);
    errorMessage = (
      <p className={styles.ErrorMessage}>
        Please enter valid {props.valueType}
      </p>
    );
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classess.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
    case "checkbox":
      inputElement = (
        <input
          onChange={props.change}
          className={classess.join(" ")}
          type="checkbox"
          {...props}
        />
      );
      break;
    case "textare":
      inputElement = (
        <textare
          onChange={props.change}
          className={classess.join(" ")}
          {...props}
        ></textare>
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.change}
          className={classess.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classess.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
      break;
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default Input;
