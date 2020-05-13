import React from "react";
import styles from "./navitems.module.css";

import NavItem from "./NavItem";

const NavItems = (props) => (
  <ul className={styles.NavItems}>
    <NavItem exact link="/" active>
      Burger
    </NavItem>
    {props.isLoggedIn && (
      <NavItem exact link="/orders">
        Orders
      </NavItem>
    )}
    {props.isLoggedIn ? (
      <NavItem exact link="/logout">
        Logout
      </NavItem>
    ) : (
      <NavItem exact link="/auth">
        Authenticate
      </NavItem>
    )}
  </ul>
);

export default NavItems;
