import React, { Component } from "react";
import faker from "faker";
import Company from "components/Company";
import { connect } from "react-redux";
import _ from "lodash";

class Companies extends Component {
  state = { companies: [] };

  renderCompanies = () => {
    if (Object.entries(this.props.companies).length) {
      const companiesArr = Object.entries(this.props.companies).map(
        ([name, conversations]) => ({ name, conversations })
      );
      return _.orderBy(companiesArr, "conversations", "desc").map(
        ({ conversations, name }) => {
          return (
            <Company
              key={name}
              conversations={conversations}
              logo={faker.image.abstract()}
              name={
                this.props.lipsumMode === true
                  ? faker.company.companyName()
                  : name
              }
            />
          );
        }
      );
    }
    return <p>No companies loaded yet</p>;
  };

  render() {
    return (
      <div className="ui middle aligned divided list">
        {this.renderCompanies()}
      </div>
    );
  }
}

const mapStateToProps = ({ users, conversations, ui }) => {
  return {
    users: users.users,
    companies: users.companies,
    messages: conversations.conversations,
    lipsumMode: ui.lipsumMode
  };
};

export default connect(mapStateToProps)(Companies);
