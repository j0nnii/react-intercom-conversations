const INITIAL_STATE = {
  users: [],
  companies: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USER":
      const newUsers = [action.payload, ...state.users];
      const companiesArr = [];
      newUsers.forEach(user => {
        user.companies.companies.forEach(company => {
          if (!companiesArr[company.name]) {
            companiesArr[company.name] = 1;
          } else {
            companiesArr[company.name] = companiesArr[company.name] + 1;
          }
        });
      });
      return {
        ...state,
        users: newUsers,
        companies: companiesArr
      };
    default:
      return state;
  }
};
