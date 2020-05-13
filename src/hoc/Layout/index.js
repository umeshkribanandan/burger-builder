import React, { Component } from "react";
import { connect } from "react-redux";
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
        <Toolbar
          isLoggedIn={this.props.userId}
          drawerClick={this.drawerToggleHandler}
        />
        <SideDrawer
          isLoggedIn={this.props.userId}
          open={this.state.showSideDrawer}
          close={this.closeSideDrawerHandler}
        />
        <main className={style.content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, null)(Layout);
