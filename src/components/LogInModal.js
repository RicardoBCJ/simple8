import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { loginUserFetch } from "../thunks/fetchUser";
import M from "materialize-css/dist/js/materialize.min.js";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Modal, Button } from "react-materialize";

const initialState = {
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
};

class LogInUser extends Component {
  state = initialState;

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  navigateToHome() {
    useHistory().push("/dashboard");
  }

  validate = () => {
    // let passwordError=""
    let isValid = true;
    let passwordError = "";
    let emailError = "";

    if (!this.state.email || !this.state.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (!this.state.password) {
      passwordError = "You have to enter password to log in";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      isValid = false;
    }

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      this.props.loginUserFetch(this.state);
      this.setState(initialState);
    }
  };

  authenticateUser = (j) => {
    if (j.status === "error") {
      alert(j.message);
    } else {
      this.props.loginUserFetch(j);
    }
  };

  render() {
    return (
      <Fragment>
        <Button className="modal-trigger orange darken-2" href="#modal1" node="button">
          Log In
        </Button>

        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Close
            </Button>,
          ]}
          bottomSheet={false}
          fixedFooter={false}
          //header="Modal Header"
          id="modal1"
          open={false}
          options={{
            dismissible: true,
            endingTop: "10%",
            inDuration: 250,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: "4%",
          }}
        >
          <div className="modal-content">
            <h6 className="btn">Sign in your account</h6>
          </div>
          <div className="modal-content">
            <h6>Enter Email</h6>
            <div className="row">
              <div className="input-field">
                <input
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <label htmlFor="email" className="active">
                  email
                </label>
                {this.state.emailError ? (
                  <div className="error">{this.state.emailError}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="modal-content">
            <h6>Enter Password</h6>
            <div className="row">
              <div className="input-field">
                <input
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
                <label htmlFor="password" className="active">
                  Password
                </label>
                {this.state.passwordError ? (
                  <div className="error">{this.state.passwordError}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <a
              href="/"
              className="waves-effect waves-green btn"
              onClick={this.handleSubmit}
            >
              Submit
            </a>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserFetch: (userInfo) => dispatch(loginUserFetch(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(LogInUser);
