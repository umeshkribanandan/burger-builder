import React from "react";
import styles from "./control.module.css";

const Control = (props) => {
  return (
    <div className={styles.Control}>
      <div className={styles.Label}>{props.label}</div>
      <button className={styles.Less} onClick={props.less}>
        Less
      </button>
      <button className={styles.More} onClick={props.more}>
        More
      </button>
    </div>
  );
};

export default Control;
