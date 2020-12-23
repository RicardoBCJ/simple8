import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT, HEADERS } from "../constants";
import Cable from "./Cable";
import MessagesArea from "./MessagesArea";
import MessagesArea2 from "./MessagesArea2";
import NewMessageForm2 from "./NewMessageForm2";
import axios from "axios";
import { connect } from "react-redux";

class ConversationsList2 extends React.Component {
  state = {
    conversations: [],
    activeConversation: null,
    activeUserId: this.props.CurrentUser + "",
    activeUserName: this.props.CurrentUserName,
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then((res) => res.json())
      .then((conversations) => this.setState({ conversations }))
      .then(console.log(this.state.conversations));

    this.myInterval = setInterval(() => {
      let convs = this.state.conversations;
      for (let conv in convs) {
        let ec = convs[conv];
        if (ec.participants.split(",").length >= 7 && ec.fullat2 == null) {
          console.log(ec.id + " is full");
          console.log(ec.fullat2);
          console.log(ec.id);
          console.log(ec.fullat2);
          axios({
            method: "put",
            responseType: "json",
            url: `${API_ROOT}/conversations/${ec.id}`,
            data: {
              fullat2: Date.now(),
            },
          });
          fetch(`${API_ROOT}/conversations`)
            .then((res) => res.json())
            .then((conversations) => this.setState({ conversations }))
            .then(console.log(this.state.conversations));
        } else if (
          ec.participants.split(",").length >= 7 &&
          ec.fullat2 !== null
        ) {
          console.log("participants are full and we have a date");
          let nowTime = Date.now();
          console.log(
            "the difference between now and when it was full is " +
              (nowTime - ec.fullat2)
          );
          if (nowTime - ec.fullat2 >= 86400000) {
            console.log(
              "more than 1440 minutes have passed (or 24 hours!), lets reset for the sake of testing"
            );
            let arrOfH = ec.participants.split(",");
            axios({
              method: "put",
              responseType: "json",
              url: `${API_ROOT}/help_requests/${ec.id}`,
              data: {
                condition: "ongoing",
                helpers: null,
              },
            })
              .then((response) => {
                //this.props.uppdateRequest(response.data.id);
                axios({
                  method: "put",
                  responseType: "json",
                  url: `${API_ROOT}/conversations/${ec.id}`,
                  data: {
                    complete: null,
                    participants: arrOfH[0] + "",
                    fullat2: null,
                  },
                });
              })
              .catch((error) => {
                console.log(error);
              });
            console.log("called");
            fetch(`${API_ROOT}/conversations`)
              .then((res) => res.json())
              .then((conversations) => this.setState({ conversations }))
              .then(console.log(this.state.conversations));
          }
        } else {
          console.log(ec.id + " is not full");
        }
      }
    }, 10000);
  };

  forceUpdateOnClick = () => {
    this.forceUpdate();
    fetch(`${API_ROOT}/conversations`)
      .then((res) => res.json())
      .then((conversations) => this.setState({ conversations }))
      .then(console.log(this.state.conversations));
  };

  handleClick = (id) => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = (response) => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation],
    });
  };

  handleReceivedMessage = (response) => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      (conversation) => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  render = () => {
    const { conversations, activeConversation } = this.state;

    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: "ConversationsChannel" }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <div>
          <h4>Available Chats</h4>
          <button
            className="waves-effect waves-light btn orange darken-2"
            onClick={this.forceUpdateOnClick}
          >
            <i className="material-icons left">refresh</i>
            Refresh
          </button>
          
          {mapConversations(
            conversations,
            this.handleClick,
            this.props.CurrentUser
          )}
        </div>
        <div className="chat-box">
          {activeConversation ? (
            <MessagesArea
              conversation={findActiveConversation(
                conversations,
                activeConversation
              )}
              activeUserName={this.props.CurrentUserName}
              activeUserID={this.props.CurrentUser + ""}
            />
          ) : null}
        </div>
      </div>
    );
  };
}

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    (conversation) => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick, userID) => {
  let currentUserConv = userID + "";
  return conversations.map((conversation) => {
    let conversationParticipants = conversation.participants.split(",");
    if (conversation.complete == true) {
      return;
    } else if (conversationParticipants[0] == currentUserConv) {
      return (
        <a
          className="waves-effect waves-light btn p-chats"
          key={conversation.id}
          value={conversation.id}
          onClick={() => handleClick(conversation.id)}
        >
          {conversation.title}
          <span className="span-for-chat teal-text">Request you made</span>
        </a>
      );
    } else if (conversationParticipants.includes(currentUserConv)) {
      return (
        <a
          className="waves-effect waves-light btn p-chats orange darken-2"
          key={conversation.id}
          value={conversation.id}
          onClick={() => handleClick(conversation.id)}
        >
          {conversation.title}
          <span className="span-for-chat teal-text">
            Request you are helping
          </span>
        </a>
      );
    }
  });
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList2);
