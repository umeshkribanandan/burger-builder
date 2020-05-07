import React, { Component } from "react";

import Aux from "../Aux";
import style from "./layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.currentSideBarState };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerClick={this.drawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={style.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
