import React, { Component } from 'react'
import { connect } from "react-redux";

export class OrderedMessages extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      helpReqs: state.helpRequests,
      userId: state.user.user.id,
    };
  };

  export default connect(mapStateToProps, null)(OrderedMessages)
