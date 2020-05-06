import React from "react";
import styles from "./sidedrawer.module.css";

import Logo from "../Logo";
import NavItems from "../NavItems";
import Backdrop from "../../UI/Backdrop";
import Aux from "../../../hoc/Aux";

const SideDrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.close} />
      <div className={attachedClasses.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};
export default SideDrawer;
