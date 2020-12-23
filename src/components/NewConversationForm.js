import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewConversationForm extends React.Component {
  state = {
    title: '',
    participants: '',
    help_request_id: ''
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state),
    });
    this.setState({ title: '', participants: '', help_request_id: '' });
  };

  render = () => {
    return (
      <div className="newConversationForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <label>Participants:</label>
          <br />
          <input
            type="text"
            name="participants"
            value={this.state.participants}
            onChange={this.handleChange}
          />
          <label>Help Request Id:</label>
          <br />
          <input
            type="text"
            name="help_request_id"
            value={this.state.help_request_id}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewConversationForm;