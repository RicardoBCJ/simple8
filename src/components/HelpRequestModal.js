import React, { Component, Fragment } from "react";
import { makeHelpRequest } from "../thunks/axiosHelpRequests";
import { connect } from "react-redux";
import { Modal, Button, RadioGroup } from "react-materialize";
import M from "materialize-css/dist/js/materialize.min.js";



export class HelpRequestModal extends Component {
  state = {
    title: "",
    date: "",
    user_id: this.props.userId,
    kind: "",
    address: "",
    helpers: null,
    description: "",
    condition: "help needed",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  

  validate = () => {
    // let passwordError=""
    let isValid = true;
    let submissionError = "";

    if (
      !this.state.title ||
      !this.state.kind ||
      !this.state.address ||
      !this.state.description
    ) {
      submissionError = "Invalid, please include all fields";
    }

    if (submissionError) {
      this.setState({ submissionError });
      isValid = false;
      console.log("error mate");
    }

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      this.props.makeHelpRequest(this.state);
      this.setState({
        title: "",
        date: "",
        user_id: this.props.userId,
        kind: "",
        address: "",
        helpers: null,
        description: "",
        condition: "help needed",
      });
    }
  };
  render() {
    return (
      <Fragment>
        <Button
          className="modal-trigger orange darken-2"
          href="#modal3"
          node="button"
        >
          Create Help Request
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
          id="modal3"
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
          <h4>Please, describe how do you need help</h4>
          <div className="input-field col s8">
            <input
              type="text"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
            <label htmlFor="title" className="active">
              Title
            </label>
          </div>
          <div className="input-field col s8">
            <input
              type="date"
              name="date"
              onChange={this.handleChange}
              value={this.state.date}
            />
            <label htmlFor="date"></label>
          </div>
          <p>Is the help needed a task or a material/physycal product?</p>
          <p>
            <label>
              <input 
              name="kind" 
              type="radio"
              value="task"
              onChange={this.handleChange}
              />
              <span>Task</span>
            </label>
          </p>
          <p>
            <label>
              <input 
              name="kind" 
              type="radio"
              value="material"
              onChange={this.handleChange}
              />
              <span>Material</span>
            </label>
          </p>

          <div className="input-field col s8">
            <input
              type="text"
              name="address"
              onChange={this.handleChange}
              value={this.state.address}
            />
            <label htmlFor="address">Please enter full address</label>
          </div>
          <div className="input-field col s8">
            <textarea
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
              className="materialize-textarea" 
              data-length="250"
              id="textarea2"
            >
            </textarea>
            <label for="textarea2">description</label>
          </div>
          <br/>
          <a
            href="#!"
            onClick={this.handleSubmit}
            className="teal white-text modal-close waves-effect waves-green btn-flat"
          >
            Submit
          </a>
        </Modal>
      </Fragment>
    );
  }
}

const initCharacterCounter = () => {

  return document.addEventListener('DOMContentLoaded', () => {

      const elem = document.getElementById('textarea2')
      return  M.CharacterCounter.init(elem)

  })

}

initCharacterCounter()


const mapDispatchToProps = (dispatch) => {
  return {
    makeHelpRequest: (helpReq) => dispatch(makeHelpRequest(helpReq)),
  };
};

export default connect(null, mapDispatchToProps)(HelpRequestModal);
