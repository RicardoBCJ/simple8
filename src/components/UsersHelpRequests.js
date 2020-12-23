import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from "axios";
import { uppdateRequest } from "../actions/helpReqactions";
import { API_ROOT } from "../constants/index"

export const UsersHelpRequests = (props) => {
  const UserId = props.UserId;


    const updatingHelpRequest = (id) => {
        return (dispatch) => {
          axios({
            method: "put",
            responseType: "json",
            url: `${API_ROOT}/help_requests/${id}`,
            data: {
              condition: "completed",
            },
          })
            .then((response) => {
              props.uppdateRequest(response.data.id);
              axios({
                method: "put",
                responseType: "json",
                url: `${API_ROOT}/conversations/${id}`,
                data: {
                  complete: true,
                },
              })
            })
            .catch((error) => {
              console.log(error);
            });
          console.log("called");
        };
    }

    const updatingHelpRequest2 = (id, user) => {
      return (dispatch) => {
        axios({
          method: "put",
          responseType: "json",
          url: `${API_ROOT}/help_requests/${id}`,
          data: {
            condition: "help needed",
            helpers: null
          },
        })
          .then((response) => {
            props.uppdateRequest(response.data.id);
            axios({
              method: "put",
              responseType: "json",
              url: `${API_ROOT}/conversations/${id}`,
              data: {
                complete: null,
                participants: user + "",
              },
            })
          })
          .catch((error) => {
            console.log(error);
          });
        console.log("called");
      };
  }




    
    const UserHelpReq = Object.entries(props.UserHelpReqs).map(([k, v]) => {
        if (v.user_id == UserId && v.condition != "completed")
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
                  {v.condition == "ongoing" ?  (
                  <span>
                  <a
                    className="waves-effect waves-light btn orange darken-2"
                    onClick={updatingHelpRequest(v.id)}
                  >
                    <i className="material-icons left">beenhere</i>mark as completed
                  </a> 
                  <a
                    className="waves-effect waves-light btn pink darken-2"
                    onClick={updatingHelpRequest2(v.id, props.UserId)}
                  >
                    <i className="material-icons left">beenhere</i>request republish
                  </a> 
                  </span>
                   ) : (
                  
                    <span><i className="material-icons left">beenhere</i>Waiting for updates <span className="waves-effect waves-light btn orange darken-2">{v.condition}</span></span>
                  
                   )}
                </td>
              </tr>
              <tr>
                <td className="teal" id="table-divider"></td>
                <td className="teal lighten-2" id="table-divider"></td>
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
