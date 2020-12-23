import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios";
import { uppdateRequest } from "../actions/helpReqactions";
import { API_ROOT } from "../constants/index"

export const UsersHelpRequests = (props) => {
    const updatingHelpRequest = (id) => {
        return (dispatch) => {
          axios({
            method: "put",
            responseType: "json",
            url: `${API_ROOT}/help_requests/${id}`,
            data: {
              condition: "ongoing",
            },
          })
            .then((response) => {
              props.uppdateRequest(response.data.id);
              axios({
                method: "put",
                responseType: "json",
                url: `${API_ROOT}/conversations/${id}`,
                data: {
                  "complete": null,
                },
              })
            })
            .catch((error) => {
              console.log(error);
            });
          console.log("called");
        };
    }
    const UserId = props.UserId;
    const UserHelpReq = Object.entries(props.UserHelpReqs).map(([k, v]) => {

        const checkHelpers = (helpers, user) => {
            if (helpers == null) {
              return false;
            }
            let helpersList = helpers.split(",");
            if (helpersList.includes(user + "") == true) {
              return true;
            } else {
              return false;
            }
        };

        if (checkHelpers(v.helpers, UserId) == true && v.condition == "help needed")
          return (
            <tbody key={v.id}>
              <tr>
                <td>Name</td>
                <td>{v.title}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{v.description}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{v.address}</td>
              </tr>
              <tr>
                <td>Kind</td>
                <td>{v.kind}</td>
              </tr>
              <tr>
                <td>Condition</td>
                <td>
                  {v.condition}{" "}
                  <a
                    className="waves-effect waves-light btn orange darken-2"
                    onClick={updatingHelpRequest(v.id)}
                  >
                    <i className="material-icons left">build</i>Mark as helped
                  </a>
                </td>
              </tr>
              <tr>
                <td className="orange" id="table-divider"></td>
                <td className="orange lighten-2" id="table-divider"></td>
              </tr>
            </tbody>
          );
      });
    return (
        <table className="striped responsive-table">
            {UserHelpReq}
        </table>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) =>{
    return {
        uppdateRequest: (updated) => dispatch(uppdateRequest(updated))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersHelpRequests)