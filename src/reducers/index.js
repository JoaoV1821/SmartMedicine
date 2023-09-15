import currentUser from './currentUser'
import authReducer from './currentAuth';
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
    authReducer

})


export default rootReducer;
