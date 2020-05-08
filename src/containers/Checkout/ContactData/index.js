import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./contactdata.module.css";
import Button from "../../../components/UI/Button";
import axiosOrders from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      pstalCode: "",
    },
    loading: false,
  };

  cancelHandler = () => {
    this.props.history.push("/");
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.street,
          zipCode: this.state.pstalCode,
          country: "India",
        },
        email: this.state.email,
        deliveryMode: "prime",
      },
    };

    axiosOrders
      .post("/orders.json", order)
      .then((response) => {
        console.log(response.data);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={styles.Input}
          type="text"
          name="name"
          placeholder="Enter your Name"
        />
        <input
          className={styles.Input}
          type="text"
          name="email"
          placeholder="Enter your Email"
        />
        <input
          className={styles.Input}
          type="text"
          name="street"
          placeholder="Enter your Street"
        />
        <input
          className={styles.Input}
          type="text"
          name="postalCode"
          placeholder="Enter your PostalCode"
        />
        <br />
        <Button type="Danger" clicked={this.cancelHandler}>
          CANCEL
        </Button>
        <Button type="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
