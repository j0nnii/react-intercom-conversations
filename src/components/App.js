import React, { Component } from "react";
import Conversations from "components/Conversations";
import Companies from "components/Companies";
import Settings from "components/Settings";
import { connect } from "react-redux";
import {
  changeTab,
  fetchConversations,
  fetchUser,
  setIntercomKey,
  setLipsumMode
} from "actions";
import moment from "moment";
import _ from "lodash";

class App extends Component {
  state = { loading: false, usersAmount: 0 };

  isActive(tab) {
    if (tab === this.props.tab) {
      return " active";
    }
    return "";
  }

  getDateRange = () => {
    if (this.props.conversations.length) {
      const endDate = moment
        .unix(this.props.conversations[0].created_at)
        .format("ll");
      const startDate = moment
        .unix(
          this.props.conversations[this.props.conversations.length - 1]
            .created_at
        )
        .format("ll");
      return `(${startDate} - ${endDate})`;
    }
    return "";
  };

  handleFetchConversations = () => {
    this.setState({ loading: true });
    this.props.fetchConversations(this.props.nextPage, () => {
      const users = this.props.conversations.map(conversation =>
        conversation.user.type === "user" ? conversation.user.id : null
      );

      _.uniqBy(users).map(userId =>
        userId ? this.props.fetchUser(userId) : null
      );

      this.setState({ loading: false });
    });
  };

  getConversationsAmount = () => {
    return this.props.users.length > 0 ? ` (${this.props.users.length})` : "";
  };

  getCompaniesAmount = () => {
    if (this.props.companies) {
      return Object.entries(this.props.companies).length > 0
        ? ` (${_.uniq(Object.entries(this.props.companies)).length})`
        : "";
    }
    return;
  };

  render() {
    return (
      <div className="ui container">
        <Settings />
        <h1>Intercom - Recent new conversations</h1>
        {this.props.intercomKey.length > 10 ? (
          <React.Fragment>
            <button
              className="ui button fetch-comments"
              onClick={this.handleFetchConversations}
            >
              Fetch page {this.props.nextPage}
            </button>{" "}
            {this.state.loading ? (
              <div className="ui active inline loader" />
            ) : null}
            <div style={{ float: "right" }}>{this.getDateRange()}</div>
            <div className="ui top attached tabular menu">
              <div
                className={"item" + this.isActive("conversations")}
                data-tab="first"
                onClick={() => this.props.changeTab("conversations")}
              >
                Conversations{this.getConversationsAmount()}
              </div>
              <div
                className={"item" + this.isActive("companies")}
                data-tab="second"
                onClick={() => this.props.changeTab("companies")}
              >
                Companies{this.getCompaniesAmount()}
              </div>
            </div>
            <div
              className={
                "ui bottom attached tab segment" +
                this.isActive("conversations")
              }
              data-tab="first"
            >
              <Conversations />
            </div>
            <div
              className={
                "ui bottom attached tab segment" + this.isActive("companies")
              }
              data-tab="second"
            >
              <Companies />
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, conversations, users }) => {
  return {
    tab: ui.tab,
    conversations: conversations.conversations,
    nextPage: conversations.nextPage,
    users: users.users,
    companies: users.companies,
    intercomKey: ui.intercomKey,
    lipsumMode: ui.lipsumMode
  };
};

export default connect(
  mapStateToProps,
  { changeTab, fetchConversations, fetchUser, setIntercomKey, setLipsumMode }
)(App);
