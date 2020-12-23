import React, { Component } from "react";
import { updatingHelpRequest } from "../thunks/axiosHelpRequests";
import { connect } from "react-redux";

const initialState = {
  id: "",
  condition: "",
};

export class UpdateRequestModal extends Component {
  state = initialState;

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
        user_id: "",
        kind: "",
        address: "",
        helpers: null,
        description: "",
        condition: "ongoing",
      });
    }
  };
  render() {
    return (
      <div id="modal4" className="modal modal-fixed-footer">
        <div class="row">
          <h4>Has the problem been solved?</h4>
          <div class="input-field col s8">
            <input
              type="text"
              name="kind"
              onChange={this.handleChange}
              value={this.state.kind}
            />
            <label htmlFor="kind">kind</label>
          </div>

          <a
            href="#!"
            onClick={this.handleSubmit}
            class="teal white-text modal-close waves-effect waves-green btn-flat"
          >
            Submit
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    helpReqs: state.helpRequests,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatingHelpRequest: (helpReq) => dispatch(updatingHelpRequest(helpReq)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRequestModal);
