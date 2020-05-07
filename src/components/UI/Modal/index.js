import React, { Component } from "react";
import styles from "./modal.module.css";

import Aux from "../../../hoc/Aux";
import Backdrop from "../Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <Aux>
        <Backdrop clicked={this.props.modalClosed} show={this.props.show} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "traslateY(0)" : "transalteY(-100)",
            opacity: this.props.show ? "1" : "0",
            zIndex: this.props.show ? "500" : "-100",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
