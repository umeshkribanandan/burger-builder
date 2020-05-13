import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./auth.module.css";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import { auth } from "../../store/actions";
import Spinner from "../../components/UI/Spinner";
import { updateObject, validity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
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
      password: {
        elementType: "input",
        config: {
          type: "password",
          placeholder: "Your Passowrd",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valueType: "Password",
        valid: false,
        touched: false,
      },
    },
    validForm: false,
    isSignUp: true,
  };

  inputChangeHandler = (event, key) => {
    const updatedForm = updateObject(this.state.controls, {
      [key]: updateObject(this.state.controls[key], {
        value: event.target.value,
        valid: validity(
          event.target.value,
          this.state.controls[key].validation
        ),
        touched: true,
      }),
    });

    let isFormValid = true;
    for (let key in updatedForm) {
      isFormValid = updatedForm[key].valid && isFormValid;
    }
    this.setState({ controls: updatedForm, validForm: isFormValid });
  };

  cancelHandler = (event) => {
    event.preventDefault();
    for (let key in this.state.controls) {
      const updatedForm = {
        ...this.state.controls,
        [key]: {
          ...this.state.controls[key],
          value: "",
          touched: false,
        },
      };
      this.setState({ controls: updatedForm, validForm: false });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
    if (this.props.building) {
      this.props.history.push("/checkout");
    } else {
      this.props.history.push("/");
    }
  };

  switchHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    let formelements = [];
    for (let key in this.state.controls) {
      formelements.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = (
      <form onSubmit={this.submitHandler}>
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
        {this.props.error ? <p> {this.props.error} </p> : null}
        <Button type="Danger" clicked={this.cancelHandler}>
          CANCEL
        </Button>
        <Button type="Success" disabled={!this.state.validForm}>
          SUBMIT
        </Button>
        <Button clicked={this.switchHandler} type="Danger">
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </form>
    );
    return (
      <div className={styles.Auth}>
        {this.props.loading ? <Spinner /> : form}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    building: state.ingre.building,
    loading: state.auth.loading,
    error: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
