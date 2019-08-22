import "components/Conversations.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import faker from "faker";
import moment from "moment";
import Message from "components/Message";

class Conversations extends Component {
  renderConversations() {
    return this.props.conversations.map(
      ({ author, created_at, id, conversation_message }) => {
        if (conversation_message.author.type === "user") {
          return (
            <Message
              key={created_at}
              date={moment.unix(created_at).format("ll")}
              name={`${faker.name.firstName()} ${faker.name.lastName()}`}
              message={
                this.props.lipsumMode
                  ? faker.lorem.sentence()
                  : conversation_message.body
              }
              messageId={id}
              userId={conversation_message.author.id}
              image={faker.image.avatar()}
            />
          );
        }
        return "";
      }
    );
  }

  renderContent() {
    if (this.props.conversations.length) {
      return this.renderConversations();
    }

    return <p>No conversations loaded yet</p>;
  }

  render() {
    return (
      <div>
        <div className="ui comments">{this.renderContent()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ conversations, ui }) => {
  return {
    conversations: conversations.conversations,
    lipsumMode: ui.lipsumMode
  };
};

export default connect(
  mapStateToProps,
  null
)(Conversations);
