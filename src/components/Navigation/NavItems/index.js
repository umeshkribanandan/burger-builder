import React from "react";
import styles from "./navitems.module.css";

import NavItem from "./NavItem";

const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem exact link="/" active>
      Burger
    </NavItem>
    <NavItem exact link="/orders">
      Orders
    </NavItem>
    <NavItem exact link="/auth">
      Authenticate
    </NavItem>
  </ul>
);

export default NavItems;
