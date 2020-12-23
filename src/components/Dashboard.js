import React, { Component, Fragment } from "react";
import Map from "./layouts/Map";
import Panel from "./Panel";
import axios from "axios";
import { getHelpRequests } from "../thunks/axiosHelpRequests";
import { connect } from "react-redux";

export class Dashboard extends Component {
  componentWillMount() {
    this.props.getHelpRequests();
  }

  componentDidMount() {
    axios.get("/api/v1/users").then((res) => {
    });
    axios.get("/api/v1/help_requests").then((res) => {
    });
  }
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="top">
            <Panel />
          </div>
        </div>
        <Map />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHelpRequests: () => dispatch(getHelpRequests()),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
