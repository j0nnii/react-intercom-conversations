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
        let companyShow = "";
        if (conversation_message.author.type === "user") {
          // fetch user information
          //console.log(conversation_message);
          const user = this.props.users.filter(
            user => user.id === conversation_message.author.id
          )[0];
          //console.log(user);

          if (
            this.props.filteredCompanies.length &&
            user &&
            user.companies.companies[0] &&
            user.companies.companies[0].name
          ) {
            const showUser = user.companies.companies.find(
              comp => this.props.filteredCompanies.indexOf(comp.name) !== -1
            );
            if (showUser) {
              companyShow = user.companies.companies[0].name;
              console.log(user);
            }
          }

          return (
            <Message
              company={
                !this.props.filteredCompanies.length ? "company" : companyShow
              }
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
        <div className="ui comments">
          {this.props.filteredCompanies.length ? (
            <p>{`Filtering for companies: ${this.props.filteredCompanies.toString()}`}</p>
          ) : null}

          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ conversations, ui, users }) => {
  return {
    conversations: conversations.conversations,
    lipsumMode: ui.lipsumMode,
    filteredCompanies: users.filteredCompanies,
    users: users.users
  };
};

export default connect(
  mapStateToProps,
  null
)(Conversations);
