// authActions.js
export const setAuthToken = (token) => {
    return {
      type: "SET_AUTH_TOKEN",
      payload: token,
    };
  };
  