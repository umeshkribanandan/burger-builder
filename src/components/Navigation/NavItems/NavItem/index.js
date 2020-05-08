import React from "react";
import styles from "./navitem.module.css";
import { NavLink } from "react-router-dom";

const NavItem = (props) => (
  <li className={styles.NavItem}>
    <NavLink
      exact={props.exact}
      activeClassName={styles.active}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
);

export default NavItem;
