import React from "react";
import PropTypes from "prop-types";

const Message = ({
  userId,
  image,
  name,
  date,
  message,
  messageId,
  company
}) => {
  if (company === "") return null;
  return (
    <div className="comment">
      <a
        href={`https://app.intercom.io/a/apps/w5t2jh24/users/${userId}/all-conversations`}
        className="avatar"
      >
        <img src={image} alt="avatar" />
      </a>
      <div className="content">
        <a
          className="author"
          href={`https://app.intercom.io/a/apps/w5t2jh24/users/${userId}/all-conversations`}
        >
          {name}
        </a>
        <div className="metadata">
          <span className="date">{date}</span>
        </div>
        <div className="text">
          <a
            href={`https://app.intercom.io/a/apps/w5t2jh24/inbox/inbox/all/conversations/${messageId}`}
          >
            {message}
          </a>
        </div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  userId: "",
  image: "",
  date: "",
  message: "",
  messageId: ""
};

Message.propTypes = {
  userId: PropTypes.string,
  image: PropTypes.string,
  date: PropTypes.string,
  message: PropTypes.string,
  messageId: PropTypes.string
};

export default Message;
