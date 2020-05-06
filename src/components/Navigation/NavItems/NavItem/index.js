import React from "react";
import styles from "./navitem.module.css";

const NavItem = (props) => (
  <li className={styles.NavItem}>
    <a className={props.active ? styles.active : ""} href={props.link}>
      {props.children}
    </a>
  </li>
);

export default NavItem;
