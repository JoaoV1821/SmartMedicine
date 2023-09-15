const currentUser = (state = {}, action) => {
    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                token: action.token, // Adicione a propriedade 'token'
                loggedIn: true
            }
            
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                token: null, // Limpe o token ao fazer logout
                loggedIn: false
            }
        default:
            return state
    }
}

export default currentUser;
