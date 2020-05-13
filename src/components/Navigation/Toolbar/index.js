import React from "react";
import styles from "./toolbar.module.css";

import Logo from "../Logo";
import NavItems from "../NavItems";
import DrawerToggle from "../SideDrawer/DrawerToggle";

const Toolbar = (props) => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.drawerClick} />
    <div className={styles.Logo}>
      <Logo />
    </div>
    <nav className={styles.DesktopOnly}>
      <NavItems isLoggedIn={props.isLoggedIn} />
    </nav>
  </header>
);

export default Toolbar;
