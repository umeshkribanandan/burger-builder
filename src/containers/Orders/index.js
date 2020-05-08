import React, { Component } from "react";
import styles from "./orders.module.css";
import Order from "../../components/Order";
import axiosOrders from "../../axios-orders";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axiosOrders
      .get("/orders.json")
      .then((response) => {
        const tempOrderArray = [];
        for (let key in response.data) {
          tempOrderArray.push({
            ...response.data[key],
            id: key,
          });
        }
        console.log(tempOrderArray);
        this.setState({ loading: false, orders: tempOrderArray });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    let ords = null;
    if (this.state.loading) {
      ords = <Spinner />;
    } else if (!this.state.loading && this.state.orders.length) {
      ords = this.state.orders.map((o) => {
        return (
          <Order key={o.id} price={+o.price} ingredients={o.ingredients} />
        );
      });
    }

    return <div>{ords}</div>;
  }
}

export default withErrorHandler(Orders, axiosOrders);
