import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styles from "./contactdata.module.css";
import Button from "../../../components/UI/Button";
import axiosOrders from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner";
import Input from "../../../components/UI/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        config: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valueType: "Name",
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        config: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valueType: "Email",
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        config: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valueType: "Street",
        valid: false,
        touched: false,
      },
      pincode: {
        elementType: "input",
        config: {
          type: "text",
          placeholder: "Your Pin Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valueType: "Pincode",
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        config: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valueType: "Country",
        valid: false,
        touched: false,
      },
      deliveryMode: {
        elementType: "select",
        config: {
          options: [
            { label: "Prime", value: "prime" },
            { label: "Normal", value: "normal" },
          ],
          placeholder: "Select Deleivery Mode",
        },
        validation: {
          required: true,
        },
        value: "Prime",
        valueType: "Delivery Mode",
        touched: false,
        valid: true,
      },
    },
    validForm: false,
    loading: false,
  };

  cancelHandler = () => {
    this.props.history.push("/");
  };

  validity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangeHandler = (event, key) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[key],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.validity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[key] = updatedFormElement;

    let isFormValid = true;
    for (let key in updatedOrderForm) {
      isFormValid = updatedOrderForm[key].valid && isFormValid;
    }
    this.setState({ orderForm: updatedOrderForm, validForm: isFormValid });
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          street: this.state.orderForm.street.value,
          pincode: this.state.orderForm.pincode.value,
          country: this.state.orderForm.country.value,
        },
        email: this.state.orderForm.email.value,
        deliveryMode: this.state.orderForm.deliveryMode.value,
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
    let formelements = [];
    for (let key in this.state.orderForm) {
      formelements.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formelements.map((formelement) => {
          return (
            <Input
              key={formelement.id}
              elementType={formelement.config.elementType}
              elementConfig={formelement.config.config}
              value={formelement.value}
              invalid={!formelement.config.valid}
              shouldValidate={formelement.config.validation}
              touched={formelement.config.touched}
              valueType={formelement.config.valueType}
              change={(event) => this.inputChangeHandler(event, formelement.id)}
            />
          );
        })}
        <Button type="Danger" clicked={this.cancelHandler}>
          CANCEL
        </Button>
        <Button type="Success" disabled={!this.state.validForm}>
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
