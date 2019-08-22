const INITIAL_STATE = {
  tab: "conversations",
  lipsumMode: false,
  intercomKey: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return { ...state, tab: action.payload };
    case "SET_INTERCOM_KEY":
      return { ...state, intercomKey: action.payload };
    case "SET_LIPSUM_MODE":
      return { ...state, lipsumMode: !action.payload };
    default:
      return state;
  }
};
