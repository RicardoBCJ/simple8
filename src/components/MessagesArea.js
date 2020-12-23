import React ,{ Fragment } from "react";
import NewMessageForm2 from "./NewMessageForm2";

const MessagesArea = props => {
  const author = props.activeUserName;
  const messages = props.conversation.messages;
  const helpReqID = props.conversation.help_request_id;
  const convID = props.conversation.id
  const title = props.conversation.title
  const participants = props.conversation.participants
  return (
    <Fragment>
    <div>
      <div className="messagesArea">
        <h5 className="chat-header">
          Chat aboout the help request:{" "}
          <span className="pink darken-2 white-text chat-title z-depth-3">
            {title}
          </span>
        </h5>
        <h5>{participants}</h5>
        {/*<h5>{HRI}</h5>*/}
        <ul>{orderedMessages(messages, author)}</ul>
      </div>
    </div>
    <div className="mFormCont">
        <NewMessageForm2 conversation_id={convID} author={author} /> 
    </div>
    </Fragment>
  )
}

export default MessagesArea;

// helpers

const orderedMessages = (Messages, user) => {
  let curUser = user
  const sortedMessages = Messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedMessages.map((message) => {
    if (message.author !== curUser) {
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
