const initialState = {
    token: null,
    loggedIn: false,
    // ...outros campos relacionados à autenticação
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_AUTH_TOKEN":
        return {
          ...state,
          token: action.payload,
          loggedIn: true,
        };
      // ...outros casos para ações relacionadas à autenticação
      default:
        return state;
    }
  };
  
  export default authReducer;