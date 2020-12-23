import React, { Component, Fragment } from "react";
import { loginUserFetch } from "../thunks/fetchUser";
//import { getHelpRequests } from "../thunks/axiosHelpRequests";
import { connect } from "react-redux";
import HelpRequestModal from "./HelpRequestModal";
import { uppdateRequest } from "../actions/helpReqactions";
import axios from "axios";
import ConversationsList2 from "./ConversationsList2";
//import { updatingHelpRequest } from "../thunks/axiosHelpRequests";
// import UpdateRequestModal from "./UpdateRequestModal";
import UsersHelpRequests from "./UsersHelpRequests";
import OtherHelpRequests from "./OtherHelpRequests";
import { Tabs, Tab, Card, Row, Col, ProgressBar } from "react-materialize";

export class Panel extends Component {
  updatingHelpRequest(id) {
    return (dispatch) => {
      axios({
        method: "put",
        responseType: "json",
        url: `/api/v1/help_requests/${id}`,
        data: {
          condition: "completed",
        },
      })
        .then((response) => {
          dispatch(uppdateRequest(response.data.id));
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("called");
    };
  }

  render() {
    return (
      <Fragment>
        <Card
                className="blue-grey lighten-1 dashB"
              
                title="Your Dashboard"
              >
        {this.props.helpReqs && this.props.userId && this.props.userName ?
          
          <Tabs className="tab-demo z-depth-1 tabs-fixed-width">
            <Tab
              active
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              title="Help Requests"
            >
              <UsersHelpRequests
                    UserId={this.props.userId}
                    UserName={this.props.userName}
                    UserHelpReqs={this.props.helpReqs}
                  />
                  {this.props.userId >= 0 ? (
                    <HelpRequestModal userId={this.props.userId} />
                  ) : <div><h2>Please log in to request help</h2></div>}
              
            </Tab>

            <Tab
              
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              title="Volunteered to help"
            >
              
              
              <OtherHelpRequests
                    UserId={this.props.userId}
                    UserName={this.props.userName}
                    UserHelpReqs={this.props.helpReqs}
                  />

              
            </Tab>

            <Tab
              
              options={{
                duration: 300,
                onShow: null,
                responsiveThreshold: Infinity,
                swipeable: false,
              }}
              title="Available Chats"
            >
              
              
                <ConversationsList2
                    CurrentUser={this.props.userId}
                    CurrentUserName={this.props.userName}
                  />

              
            </Tab>
          </Tabs> :
          <Row>
            <Col s={12}>
              <ProgressBar />
            </Col>
          </Row>
        
        }

      
        </Card>
      </Fragment>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    helpReqs: state.helpRequests,
    userId: state.user.user.id,
    userName: state.user.user.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserFetch: (userInfo) => dispatch(loginUserFetch(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
