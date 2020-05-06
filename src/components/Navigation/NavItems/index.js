import React from "react";
import styles from "./navitems.module.css";

import NavItem from "./NavItem";

const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem link="/" active>
      Burger
    </NavItem>
    <NavItem link="/checkout">Checkout</NavItem>
  </ul>
);

export default NavItems;
