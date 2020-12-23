import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewMessageForm extends React.Component {
  state = {
    text: '',
    conversation_id: this.props.conversation_id,
    author: this.props.author
  };


  componentWillReceiveProps = nextProps => {
    this.setState({ conversation_id: nextProps.conversation_id });
  };


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: ''});
    scrollDown()
  };

  render = () => {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
        
          <label className="pink darken-2 white-text chat-title z-depth-3">New Message:</label>
          <br />
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
          />   
          <input className="waves-effect waves-light btn" type="submit" value="Send Message"/>

        </form>
      </div>
    );
  };
}

const scrollDown = () => {
  var msgDiv = document.getElementsByClassName("chat-box");
  msgDiv.item(0).scrollTop = msgDiv.item(0).scrollHeight;
  console.log(msgDiv.item(0).scrollTop)
  console.log(msgDiv.item(0).scrollHeight)
  msgDiv.item(0).scrollTo({ top: 22300, behavior: "smooth"})
}

export default NewMessageForm;