import React from "react";
import { connect } from "react-redux";
import { setIntercomKey, setLipsumMode } from "../actions";

class Settings extends React.Component {
  render() {
    return (
      <div style={{ float: "right", paddingTop: "5px" }}>
        <div className="ui input focus">
          <input
            type="text"
            placeholder="Intecom API-key"
            id="intercomKey"
            value={this.props.intercomKey}
            onChange={e => this.props.setIntercomKey(e.target.value)}
          />
        </div>
        <div className="ui toggle checkbox" style={{ paddingLeft: "20px" }}>
          <input
            type="checkbox"
            name="public"
            onChange={() => this.props.setLipsumMode(this.props.lipsumMode)}
          />
          <label>Lorem ipsumize all content</label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => {
  return { intercomKey: ui.intercomKey, lipsumMode: ui.lipsumMode };
};

export default connect(
  mapStateToProps,
  { setIntercomKey, setLipsumMode }
)(Settings);
