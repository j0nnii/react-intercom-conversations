const INITIAL_STATE = {
  conversations: [],
  nextPage: 1
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_CONVERSATIONS":
      return {
        ...state,
        conversations: [
          ...state.conversations,
          ...action.payload.conversations
        ],
        nextPage: action.payload.pages.page + 1
      };
    default:
      return state;
  }
};
