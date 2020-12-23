import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { createUser } from "../thunks/fetchUser";
import M from "materialize-css/dist/js/materialize.min.js";
import { Modal, Button } from "react-materialize";
import axios from "axios";
import { API_ROOT } from "../constants/index";

class RegisterModal extends Component {
 state = {
      user_id: "",
      date: "",
      name: "",
      lastname: "",
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      nameError: "",
      lastnameError: "",
      image: null,
      imageError: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  

  fileSelectedHandler = event => {
    console.log(event.target.files[0])
    this.setState({
      image: event.target.files[0]
    })
  }

  validate = () => {
    // let passwordError=""
    let isValid = true;
    let passwordError = "";
    let emailError = "";
    let nameError = "";
    let lastnameError = "";
    let imageError = ""

    if (!this.state.email || !this.state.email.includes("@")) {
      emailError = "Invalid email";
    }

    if (!this.state.password) {
      passwordError = "Password can't be empty.";
    }

    if (!this.state.name) {
      nameError = "Name can't be empty.";
    }

    if (!this.state.lastname) {
      lastnameError = "Last Name can't be empty.";
    }

    if(this.state.image === null) {
      imageError = "You need to upload a \"legal document\" *wink wink* PS: Please a fake document "
    }

    if (emailError || passwordError || nameError || lastnameError || imageError) {
      this.setState({ emailError, passwordError, nameError, lastnameError, imageError });
      isValid = false;
    }

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
   
    if (this.validate()) {
      console.log(this.state);
      console.log(this.state);
      console.log(this.state.image)

      var body = new FormData();
      body.append("picture[attachment]", this.state.image);
      for (var pair of body.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      axios({
        method: "post",
        responseType: "json",
        url: `${API_ROOT}/signup`,
        data: {
          name: this.state.name,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password,
        }
      })
      .then(response => {
        if (response.data.error === "Error creating account") {
          alert("This emails is allready taken, please use another");
        }
        console.log(response.data.user)
        console.log(response.data)
        let finU = response.data.user;
        console.log(finU)
        for (let key in finU) {
          if (key == "id") {
            let uid = finU[key]
            console.log(finU[key])
            body.append("picture[user_id]", uid);
          }
        }
        for (var pair of body.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        fetch(
          `${API_ROOT}/pictures.json`,
          {
            method: 'post',
            body: body
          }
        )
        .then((response) => response.json(),
        )
      })
     
      this.setState({
        email: "",
        password: "",
        name: "",
        lastname: "",
        image: null,
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Button
          className="modal-trigger orange darken-2"
          href="#modal2"
          node="button"
        >
          Register
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
          id="modal2"
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
            <h6 className="btn">Sign up for your account</h6>
          </div>
          <div className="modal-content">
            
            <div className="row">
              <div className="input-field">
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
                <label htmlFor="name" className="active">
                  Name
                </label>
                {this.state.nameError ? (
                  <div className="error">{this.state.nameError}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="modal-content">
            
            <div className="row">
              <div className="input-field">
                <input
                  type="text"
                  name="lastname"
                  onChange={this.handleChange}
                  value={this.state.lastname}
                />
                <label htmlFor="lastname">Last Name</label>
                {this.state.lastnameError ? (
                  <div className="error">{this.state.lastnameError}</div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="modal-content">
            
            <div className="row">
              <div className="input-field">
                <input
                  type="email"
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
          <p>Please select a legal document(A FAKE ONE, THIS IS A STUDENT PROJECT)</p>
          <input type="file"  onChange={this.fileSelectedHandler} />
          {this.state.imageError ? (
                  <div className="error">{this.state.imageError}</div>
                ) : null}
          
          <div className="modal-footer">
            <a
              className="modal-close waves-effect waves-green btn"
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
    createUser: (userInfo) => dispatch(createUser(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterModal);
