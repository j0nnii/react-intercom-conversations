const INITIAL_STATE = {
  users: [],
  companies: [],
  filteredCompanies: []
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
      //console.log(newUsers);
      //console.log(companiesArr);
      return {
        ...state,
        users: newUsers,
        companies: companiesArr
      };
    case "SET_COMPANY_FILTER":
      const companyExists = state.filteredCompanies.find(
        company => company === action.payload
      );
      if (!companyExists) {
        return {
          ...state,
          filteredCompanies: [action.payload, ...state.filteredCompanies]
        };
      } else {
        return {
          ...state,
          filteredCompanies: state.filteredCompanies.filter(
            company => company !== action.payload
          )
        };
      }

    default:
      return state;
  }
};
