import React, { Component, useEffect, useRef } from "react";
import { connect } from "react-redux";
import NewMessageForm2 from "./NewMessageForm2";

export class MessagesArea2 extends Component {
  render() {
    let UserName = this.props.userName;
    let Conversation = this.props.conversation;
    let Title = Conversation.title;
    let ConvId = Conversation.id;
    let Complete = Conversation.complete;

    let Messages = Conversation.messages;

    const orderedMessages = (Messages) => {
      const sortedMessages = Messages.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      return sortedMessages.map((message) => {
        if (message.author !== UserName) {
          return (
            <div
              key={message.id}
              className="chat-message  teal lighten-4 right-align"
            >
              <h5 className="teal-text text-darken-5">{message.author}</h5>
              <p key={message.id}>{message.text}</p>
            </div>
          );
        } else {
          return (
            <div key={message.id} className="chat-message  blue lighten-4">
              <h5 className="blue-text text-darken-5">{message.author}</h5>
              <p key={message.id}>{message.text}</p>
            </div>
          );
        }
      });
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [orderedMessages(Messages)]);
    console.log(messagesEndRef)

    return (
      <div className="messagesArea" id="messagesAreaID">
        <h4 className="chat-header">
          Chat aboout the help request:{" "}
          <span className="pink darken-2 white-text chat-title z-depth-3">
            {" "}
            {Title}{" "}
          </span>{" "}
        </h4>
        {/*<h5>{Participants}</h5>*/}
        {/*<h5>{HRI}</h5>*/}
        <ul>{orderedMessages(Messages)}</ul>
        <NewMessageForm2 conversation_id={ConvId} currentUser={UserName} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userName: state.user.user.name,
    userId: state.user.user.id,
  };
};

export default connect(mapStateToProps, null)(MessagesArea2);
