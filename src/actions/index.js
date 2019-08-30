import axios from "axios";

const intercomHeaders = key => {
  return {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${key}`
    }
  };
};

export const setIntercomKey = key => {
  return {
    type: "SET_INTERCOM_KEY",
    payload: key
  };
};

export const setLipsumMode = status => {
  return {
    type: "SET_LIPSUM_MODE",
    payload: status
  };
};

export const changeTab = tab => {
  return {
    type: "CHANGE_TAB",
    payload: tab
  };
};

export const setCompanyFilter = companyName => {
  return {
    type: "SET_COMPANY_FILTER",
    payload: companyName
  };
};

export const fetchConversations = (nextPage, callback) => async (
  dispatch,
  getState
) => {
  const response = await axios.get(
    `https://api.intercom.io/conversations?type=admin&admin_id=1881793&order=created_at&sort=desc&display_as=plaintext&per_page=50&page=${nextPage}`,
    intercomHeaders(getState().ui.intercomKey)
  );
  dispatch({
    type: "FETCH_CONVERSATIONS",
    payload: response.data
  });
  callback();
};

export const fetchUser = userId => async (dispatch, getState) => {
  const response = await axios.get(
    `https://api.intercom.io/users/${userId}`,
    intercomHeaders(getState().ui.intercomKey)
  );
  dispatch({
    type: "FETCH_USER",
    payload: response.data
  });
};
