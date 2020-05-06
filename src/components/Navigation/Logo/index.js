import React from "react";
import styles from "./logo.module.css";
import LogoImage from "../../../assets/images/logo.png";

const Logo = (props) => (
  <div className={styles.Logo}>
    <img src={LogoImage} alt="Logo" />
  </div>
);

export default Logo;
